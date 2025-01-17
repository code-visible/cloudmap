import type { ShadowElement } from "@pattaya/depict/graph";
import { Curve, Triangle } from "@pattaya/pather";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";

export const buildCallArrow = (startID: string, endID: string, points: number[][]): ShadowElement => {
  const theme = stateTheme.graph.arrow;
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: Curve.Multi(points, 12),
        opts: {
          stroke: theme.muted.color,
          lineWidth: theme.muted.width,
        }
      },
    ],
    data: { s: startID, e: endID },
    update(_delta) {
      const callable = stateCall.state.active;
      const file = stateCall.state.activeHostFile;
      const edgeOpts = this.shapes![0].opts!;
      const triangleOpts = this.children![0].shapes![0].opts!;
      if (callable && file && ((callable.file === this.data.s && file.imports.has(this.data.e)) || (callable.file === this.data.e && file.exports.has(this.data.s)))) {
        edgeOpts.stroke = theme.active.color;
        triangleOpts.stroke = theme.active.endpointStrokeColor;
        triangleOpts.fill = theme.active.endpointBackgroundColor;
        return;
      }
      edgeOpts.stroke = theme.muted.color;
      triangleOpts.stroke = theme.muted.endpointStrokeColor;
      triangleOpts.fill = theme.muted.endpointBackgroundColor;
    },
    children: [
      {
        x: points[points.length - 1][0],
        y: points[points.length - 1][1],
        shapes: [{
          path: Triangle.Equilateral(0, 0, 8),
          opts: {
            stroke: "#666",
            lineWidth: 1,
            fill: "#fff",
            rotation: 1.6,
          }
        },
        ]
      },
    ],
  };
};
