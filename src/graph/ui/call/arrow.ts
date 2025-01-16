import type { ShadowElement } from "@pattaya/depict/graph";
import { Curve, Triangle } from "@pattaya/pather";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";

export const buildCallArrow = (startID: string, endID: string, points: number[][]): ShadowElement => {
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: Curve.Multi(points, 12),
        opts: {
          stroke: stateTheme.palette.arrow,
          lineWidth: 1,
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
        edgeOpts.stroke = stateTheme.palette.highlight;
        triangleOpts.stroke = stateTheme.palette.highlight;
        triangleOpts.fill = stateTheme.palette.highlight;
        return;
      }
      edgeOpts.stroke = stateTheme.palette.arrow;
      triangleOpts.stroke = "#aaa";
      triangleOpts.fill = "#fff";
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
