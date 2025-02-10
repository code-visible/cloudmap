import type { ShadowElement } from "@pattaya/depict/graph";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";
import { edge } from "@pattaya/pattaya/components";

const theme = stateTheme.graph.arrow;
// const theme = {
//   muted: {},
//   active: {},
// };

export const buildArrow = (startID: string, endID: string, points: number[][]): ShadowElement => {
  const points_ = points.map((p: number[]) => ({ x: p[0], y: p[1] }));
  const arrow = edge.fold.fragments({ points: points_, endDecoration: edge.ArrowType.Triangle }, theme.muted);
  return {
    x: 0,
    y: 0,
    data: { s: startID, e: endID },
    shapes: [],
    update(_delta) {
      if (this.data.s === statePkg.state.active?.id || this.data.e === statePkg.state.active?.id) {
        edge.fold.applyStyles(arrow, theme.active);
      } else {
        edge.fold.applyStyles(arrow, theme.muted);
      }
    },
    children: arrow.elements,
  };
};
