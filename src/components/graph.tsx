import { useEffect, useRef, useState } from "react";
import { Depict } from "@pattaya/depict";
// import { GraphBuilder } from "./builder";
// import { GraphLayout } from "./layout";

import styles from './graph.module.css';
import { State } from "../state";

export interface GraphProps {
  state: State;
  setState: (c: State) => void;
};

// function shouldUpdatePattaya(op: PattayaProps, np: PattayaProps): boolean {
//   console.log("compare")
//   return op.width === np.width && op.height === np.height;
// }
// const prevState = { graph: "pkg", pkg: { entrance: "", active: "" } };
// const gb = new GraphBuilder(new GraphLayout());

const worker = new Worker(new URL('../graph/worker.ts', import.meta.url), {
  type: "module"
})

const Graph = ({ state }: GraphProps) => {
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

    return () => g?.destory();
  }, []);

  useEffect(() => {
    const stateUpdate = 1;
    worker.postMessage({ type: stateUpdate, msg: state });
    worker.onmessage = (ev: MessageEvent) => {
      console.log(ev.data.type, ev.data.msg);
    };
  }, [state]);

  return (
    <div className={styles.graph}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          // boxSizing: "border-box",
          overflow: "hidden",
        }}
        ref={rootRef}
      ></div>
    </div>
  );
};

export default Graph;