import type { ShadowElement } from "@pattaya/depict/graph";
import { Curve, Triangle } from "@pattaya/pather";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";

export const buildArrow = (startID: string, endID: string, points: number[][]): ShadowElement => {
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
      const edgeOpts = this.shapes![0].opts!;
      const triangleOpts = this.children![0].shapes![0].opts!;
      if (this.data.s === statePkg.state.active?.id || this.data.e === statePkg.state.active?.id) {
        edgeOpts.stroke = stateTheme.palette.highlight;
        triangleOpts.stroke = stateTheme.palette.highlight;
        triangleOpts.fill = stateTheme.palette.highlight;
      } else {
        edgeOpts.stroke = stateTheme.palette.arrow;
        triangleOpts.stroke = "#aaa";
        triangleOpts.fill = "#fff";
      }
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
