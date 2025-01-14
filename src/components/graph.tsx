import { useEffect, useRef, useState } from "react";
import { Depict } from "@pattaya/depict";
import { GraphFileCall, GraphType, StateCall, StateFile, StateGraphCall, StateGraphFile, StateGraphPkg, StatePkg, StateShared, StateTheme, toGraphCallable, toGraphFile, toGraphPkg } from '../state';
import { GraphMessageType } from "../message";
import { SourceMap } from "../resource/resource";

import styles from './graph.module.css';

export interface GraphProps {
  data: SourceMap;
  file: StateFile;
  setFile: (s: StateFile) => void;
  call: StateCall;
  setCall: (s: StateCall) => void;
  theme: StateTheme;
  graphType: GraphType;
  setGraphType: (s: GraphType) => void;
  pkg: StatePkg;
  setPkg: (s: StatePkg) => void;
  shared: StateShared;
  setShared: (s: StateShared) => void;
};

const worker = new Worker(new URL('../graph/worker.ts', import.meta.url), {
  type: "module"
});

worker.onerror = (err) => {
  console.log("fail to run the graph worker! ");
  if (err.message) console.log(err.message);
};

const Graph = ({ data, pkg, file, call, theme, graphType, setPkg, setCall, setFile, setShared, shared, setGraphType }: GraphProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<Depict | undefined>(undefined);

  useEffect(() => {
    let g = graph;
    if (!g) {
      const canvas = rootRef.current;
      if (canvas === null) return;
      g = new Depict({
        root: canvas,
        maxLayers: 2,
        worker,
      });
      setGraph(g);
      g.start();
    }

    worker.onmessage = (ev: MessageEvent) => {
      const payload = ev.data.msg;
      switch (ev.data.type) {
        case GraphMessageType.UPDATE_PKG:
          setShared({ ...shared, mutePannel: payload.data.active !== "" });
          if (pkg.entrance !== payload.data.entrance) {
            const pkgSet = data.getPkgsByRoot(payload.data.entrance, 12);
            setPkg({ entrance: payload.data.entrance, active: payload.data.active, set: pkgSet });
          }
          setGraphType(GraphType.PKG);
          break;
        case GraphMessageType.UPDATE_FILE:
          setShared({ ...shared, mutePannel: payload.data.active !== "" });
          if (payload.data.entrance) {
            const fileSet = data.getFilesByRoot(payload.data.entrance, 16);
            setFile({ pkg: "", entrance: payload.data.entrance, active: payload.data.active, set: fileSet });
          } else if (payload.data.pkg) {
            const fileSet = data.getFilesByPkg(payload.data.pkg, 16);
            setFile({ pkg: payload.data.pkg, entrance: "", active: payload.data.active, set: fileSet });
          }
          setGraphType(GraphType.FILE);
          break;
        case GraphMessageType.UPDATE_CALL:
          setShared({ ...shared, mutePannel: payload.data.active !== "" });
          if (payload.data.entrance) {
            const callableSet = data.getCallablesByRoot(payload.data.entrance, 8);
            setCall({ pkg: "", entrance: payload.data.entrance, active: payload.data.active, set: callableSet });
          } else if (payload.data.pkg) {
            const callableSet = data.getCallablesByPkg(payload.data.pkg, 8);
            setCall({ pkg: payload.data.pkg, entrance: "", active: payload.data.active, set: callableSet });
          }
          setGraphType(GraphType.CALL);
          break;
      }
    };

    return () => g?.destroy();
  }, []);

  useEffect(() => {
    const msgGraphPkg: StateGraphPkg = {
      nodes: new Map(),
      edges: [],
    };
    if (pkg.entrance) {
      const entrance = data.pkgs.get(pkg.entrance);
      if (entrance) {
        msgGraphPkg.entrance = toGraphPkg(entrance);
      }
    }
    if (pkg.active) {
      const active = data.pkgs.get(pkg.active);
      if (active) {
        msgGraphPkg.active = toGraphPkg(active);
      }
    }
    for (const pkgID of pkg.set) {
      const p = data.pkgs.get(pkgID);
      if (p) {
        const graphPkg = toGraphPkg(p);
        msgGraphPkg.nodes.set(graphPkg.id, graphPkg);
        for (const target of p.imports) {
          if (!pkg.set.has(target.ref.id) || p === target) continue;
          msgGraphPkg.edges.push({ start: pkgID, end: target.ref.id });
        }
      }
    }
    worker.postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: graphType, data: msgGraphPkg } });
  }, [pkg]);

  useEffect(() => {
    const msgGraphFile: StateGraphFile = {
      pkg: file.pkg,
      nodes: new Map(),
      edges: [],
    };
    if (file.entrance) {
      const entrance = data.files.get(file.entrance);
      if (entrance) {
        msgGraphFile.entrance = toGraphFile(entrance);
      }
    }
    if (file.active) {
      const active = data.files.get(file.active);
      if (active) {
        msgGraphFile.active = toGraphFile(active);
      }
    }
    for (const fileID of file.set) {
      const f = data.files.get(fileID);
      if (f) {
        const graphFile = toGraphFile(f);
        msgGraphFile.nodes.set(graphFile.id, graphFile);
        for (const target of f.imports) {
          if (!file.set.has(target.ref.id) || f === target) continue;
          msgGraphFile.edges.push({ start: fileID, end: target.ref.id });
        }
      }
    }
    worker.postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: graphType, data: msgGraphFile } });
  }, [file]);

  useEffect(() => {
    const msgGraphCall: StateGraphCall = {
      pkg: call.pkg,
      nodes: new Map(),
      edges: [],
    };
    if (call.entrance) {
      const entrance = data.callables.get(call.entrance);
      if (entrance) {
        msgGraphCall.entrance = toGraphCallable(entrance);
      }
    }
    if (call.active) {
      const active = data.callables.get(call.active);
      if (active) {
        msgGraphCall.active = toGraphCallable(active);
        msgGraphCall.activeHostFile = toGraphFile(active.file);
      }
    }
    const edges = new Set<string>();
    for (const callable of call.set) {
      const file = callable.file;
      if (!msgGraphCall.nodes.has(file.ref.id)) {
        const newFileCall: GraphFileCall = {
          file: toGraphFile(file),
          callables: new Map(),
        };
        msgGraphCall.nodes.set(file.ref.id, newFileCall);
      }
      const fc = msgGraphCall.nodes.get(file.ref.id)!;
      fc.callables.set(callable.ref.id, toGraphCallable(callable));

      for (const caller of callable.callers) {
        if (call.set.has(caller)) {
          const callerID = caller.file.ref.id;
          const calleeID = callable.file.ref.id;
          if (callerID === calleeID) continue;
          const edgeID = `${callerID}-${calleeID}`
          if (!edges.has(edgeID)) {
            edges.add(edgeID);
            msgGraphCall.edges.push({ start: callerID, end: calleeID });
          }
        }
      }
      for (const callee of callable.callees) {
        if (call.set.has(callee)) {
          const callerID = callable.file.ref.id;
          const calleeID = callee.file.ref.id;
          if (callerID === calleeID) continue;
          const edgeID = `${callerID}-${calleeID}`
          if (!edges.has(edgeID)) {
            edges.add(edgeID);
            msgGraphCall.edges.push({ start: callerID, end: calleeID });
          }
        }
      }
    }
    worker.postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: graphType, data: msgGraphCall } });
  }, [call]);

  useEffect(() => {
    worker.postMessage({ type: GraphMessageType.UPDATE_THEME, msg: theme });
  }, [theme]);

  return (
    <div className={styles.graph}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        ref={rootRef}
      ></div>
    </div>
  );
};

export default Graph;