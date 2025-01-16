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

  const theme = stateTheme.graph.arrow;
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: Line.Basic(x0, y0, x1, y1),
        opts: {
          stroke: theme.muted.color,
          lineWidth: theme.muted.width,
        }
      },
    ],
    data: { s: startID, e: endID },
    update(_delta) {
      const edgeOpts = this.shapes![0].opts!;
      const triangleOpts = this.children![0].shapes![0].opts!;
      if (this.data.s === stateFile.state.active?.id || this.data.e === stateFile.state.active?.id) {
        edgeOpts.stroke = theme.active.color;
        edgeOpts.lineWidth = theme.active.width;
        triangleOpts.stroke = theme.active.endpointStrokeColor;
        triangleOpts.fill = theme.active.endpointBackgroundColor;
      } else {
        edgeOpts.stroke = theme.muted.color;
        edgeOpts.lineWidth = theme.muted.width;
        triangleOpts.stroke = theme.muted.endpointStrokeColor;
        triangleOpts.fill = theme.muted.endpointBackgroundColor;
      }
    },
    children: [
      {
        x: x1,
        y: y1,
        shapes: [{
          path: Triangle.Equilateral(0, 0, 8),
          opts: {
            lineWidth: 1,
            rotation: angle + 1.58,
            stroke: theme.muted.endpointStrokeColor,
            fill: theme.muted.endpointBackgroundColor,
          }
        },
        ]
      },
    ],
  };
};
