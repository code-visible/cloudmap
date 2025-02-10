import type { ShadowElement } from "@pattaya/depict/graph";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";
import { edge } from "@pattaya/pattaya/components";

const theme = stateTheme.graph.arrow;

export const buildCallArrow = (startID: string, endID: string, points: number[][]): ShadowElement => {
  const points_ = points.map((p: number[]) => ({ x: p[0], y: p[1] }));
  const arrow = edge.fold.fragments({ points: points_, endDecoration: edge.ArrowType.Basic }, theme.muted);
  return {
    x: 0,
    y: 0,
    shapes: [],
    data: { s: startID, e: endID },
    update(_delta) {
      const callable = stateCall.state.active;
      const file = stateCall.state.activeHostFile;
      if (callable && file && ((callable.file === this.data.s && file.imports.has(this.data.e)) || (callable.file === this.data.e && file.exports.has(this.data.s)))) {
        edge.fold.applyStyles(arrow, theme.active);
        return;
      }
      edge.fold.applyStyles(arrow, theme.muted);
    },
    children: arrow.elements,
  };
};
