import type { ShadowElement } from "@pattaya/depict/graph";
import { Curve, Triangle } from "@pattaya/pather";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";

export const buildArrow = (startID: string, endID: string, points: number[][]): ShadowElement => {
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
      const edgeOpts = this.shapes![0].opts!;
      const triangleOpts = this.children![0].shapes![0].opts!;
      if (this.data.s === statePkg.state.active?.id || this.data.e === statePkg.state.active?.id) {
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
        x: points[points.length - 1][0],
        y: points[points.length - 1][1],
        shapes: [{
          path: Triangle.Equilateral(0, 0, 8),
          opts: {
            lineWidth: 1,
            rotation: 1.6,
            stroke: theme.muted.endpointStrokeColor,
            fill: theme.muted.endpointBackgroundColor,
          }
        },
        ]
      },
    ],
  };
};
