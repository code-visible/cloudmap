import { useEffect, useRef, useState } from "react";
import { Depict } from "@pattaya/depict";
import { GraphType, StateCall, StateFile, StatePkg, StateShared, StateTheme } from '../state';
import { GraphMessageType } from "../message";

import styles from './graph.module.css';
import data from "../data";

export interface GraphProps {
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

const Graph = ({ pkg, file, call, theme, graphType, setPkg, setCall, setFile, setShared, shared, setGraphType }: GraphProps) => {
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
            const callableSet = data.getFileCallsByRoot(payload.data.entrance, 8);
            setCall({ pkg: "", entrance: payload.data.entrance, active: payload.data.active, set: callableSet });
          } else if (payload.data.pkg) {
            const callableSet = data.getFileCallsByPkg(payload.data.pkg, 8);
            setCall({ pkg: payload.data.pkg, entrance: "", active: payload.data.active, set: callableSet });
          }
          setGraphType(GraphType.CALL);
          break;
      }
    };

    return () => g?.destroy();
  }, []);

  useEffect(() => {
    worker.postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: graphType, data: pkg } });
  }, [pkg]);

  useEffect(() => {
    worker.postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: graphType, data: file } });
  }, [file]);

  useEffect(() => {
    worker.postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: graphType, data: call } });
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