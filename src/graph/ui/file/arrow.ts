import type { ShadowElement } from "@pattaya/depict/graph";
import { line, edge } from "@pattaya/pattaya/components";
import { stateFile } from "./state";
import { stateTheme } from "../theme/state";

export const buildLineArrow = (startID: string, endID: string, x0: number, y0: number, x1: number, y1: number): ShadowElement => {
  const theme = stateTheme.graph.arrow;
  const angle = line.basic.end({ start: { x: x0, y: y0 }, end: { x: x1, y: y1 } }).rotation;
  x0 += Math.cos(angle) * 36;
  y0 += Math.sin(angle) * 36;
  x1 -= Math.cos(angle) * 36;
  y1 -= Math.sin(angle) * 36;
  console.log(theme.muted)
  const arrow = edge.line.fragments({ start: { x: x0, y: y0 }, end: { x: x1, y: y1 }, endDecoration: edge.ArrowType.Basic }, theme.muted);
  return {
    x: 0,
    y: 0,
    shapes: [],
    data: { s: startID, e: endID },
    update(_delta) {
      if (this.data.s === stateFile.state.active?.id || this.data.e === stateFile.state.active?.id) {
        edge.line.applyStyles(arrow, edge.ArrowType.Basic, theme.active);
      } else {
        edge.line.applyStyles(arrow, edge.ArrowType.Basic, theme.muted);
      }
    },
    children: arrow.elements,
  };
};
