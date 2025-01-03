import type { ShadowElement } from "@pattaya/depict/graph";
import { Line, Triangle } from "@pattaya/pather";
import { stateFile } from "./state";
import { stateTheme } from "../theme/state";

export const buildLineArrow = (startID: string, endID: string, x0: number, y0: number, x1: number, y1: number): ShadowElement => {
  const deltaX = x1 - x0;
  const deltaY = y1 - y0;
  const angle = Math.atan2(deltaY, deltaX);
  x0 += Math.cos(angle) * 36;
  y0 += Math.sin(angle) * 36;
  x1 -= Math.cos(angle) * 36;
  y1 -= Math.sin(angle) * 36;
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: Line.Basic(x0, y0, x1, y1),
        opts: {
          stroke: stateTheme.palette.muted3,
          lineWidth: 1,
        }
      },
    ],
    data: { s: startID, e: endID },
    update(_delta) {
      const edgeOpts = this.shapes![0].opts!;
      const triangleOpts = this.children![0].shapes![0].opts!;
      if (this.data.s === stateFile.state.active || this.data.e === stateFile.state.active) {
        edgeOpts.stroke = stateTheme.palette.highlight;
        triangleOpts.stroke = stateTheme.palette.highlight;
        triangleOpts.fill = stateTheme.palette.highlight;
      } else {
        edgeOpts.stroke = stateTheme.palette.muted3;
        triangleOpts.stroke = stateTheme.palette.muted1;
        triangleOpts.fill = "#fff";
      }
    },
    children: [
      {
        x: x1,
        y: y1,
        shapes: [{
          path: Triangle.Equilateral(0, 0, 8),
          opts: {
            stroke: stateTheme.palette.muted1,
            lineWidth: 1,
            fill: "#fff",
            rotation: angle + 1.58,
          }
        },
        ]
      },
    ],
  };
};
