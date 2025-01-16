import type { ShadowElement } from "@pattaya/depict/graph";
import { Rectangle, Triangle } from "@pattaya/pather";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";

export const buildInfoCard = (): ShadowElement => {
  const width = 320;
  // +22
  const height = 56;
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: Rectangle.RoundAligned(0, 0, width, height, 9),
        opts: {
          background: true,
          border: true,
          stroke: stateTheme.graph.pannel.normal.strokeColor,
          fill: stateTheme.graph.pannel.normal.backgroundColor,
          shadowColor: stateTheme.graph.pannel.normal.shadowColor,
          shadowBlur: stateTheme.graph.pannel.normal.shadowBlur,
        }
      },
    ],
    texts: [
      {
        x: 20,
        y: 31,
        content: "",
        opts: {
          width: 256,
          ellipsis: true,
          font: stateTheme.graph.text.header.normal.font,
          fill: stateTheme.graph.text.header.normal.color,
        },
      },
      // {
      //   x: 21,
      //   y: 56,
      //   content: "🡰  30",
      //   opts: {
      //     width: 256,
      //     ellipsis: true,
      //     font: "14px san-serf",
      //     fill: "#000",
      //   },
      // },
      // {
      //   x: 72,
      //   y: 56,
      //   content: "🡲  20",
      //   opts: {
      //     width: 256,
      //     ellipsis: true,
      //     font: "14px san-serf",
      //     fill: "#000",
      //   },
      // },
    ],
    children: [
      {
        x: 160,
        y: 56,
        shapes: [
          {
            path: Triangle.Isosceles(0, 0, 16, 12),
            opts: {
              stroke: stateTheme.graph.pannel.normal.strokeColor,
              fill: stateTheme.graph.pannel.normal.backgroundColor,
              border: true,
              rotation: 3.142,
              shadowColor: stateTheme.graph.pannel.normal.shadowColor,
              shadowBlur: 6,
            }
          },
          {
            y: -6,
            path: Rectangle.Basic(0, 0, 32, 8),
            opts: {
              fill: stateTheme.graph.pannel.normal.backgroundColor,
              border: false,
            }
          }
        ]
      }
    ],
    hidden: true,
    update(_delta) {
      if (statePkg.state.active) {
        this.hidden = false;
        this.texts![0].content = statePkg.state.active.path;
        this.x = statePkg.local.hoverX - 72;
        this.y = statePkg.local.hoverY - 72;
      } else {
        this.hidden = true;
      }
      const theme = stateTheme.graph;
      const pannelOpts = this.shapes![0].opts!;
      const triangleOpts = this.children![0].shapes![0].opts!;
      const blockOpts = this.children![0].shapes![1].opts!;
      const textOpts = this.texts![0].opts!;
      pannelOpts.stroke = theme.pannel.normal.strokeColor;
      pannelOpts.fill = theme.pannel.normal.backgroundColor;
      pannelOpts.shadowColor = theme.pannel.normal.shadowColor;
      pannelOpts.shadowBlur = theme.pannel.normal.shadowBlur;
      textOpts.font = theme.text.body.normal.font;
      textOpts.fill = theme.text.body.normal.color;
      triangleOpts.stroke = theme.pannel.normal.strokeColor;
      triangleOpts.fill = theme.pannel.normal.backgroundColor;
      triangleOpts.shadowColor = theme.pannel.normal.shadowColor;
      blockOpts.fill = theme.pannel.normal.backgroundColor;
    },
  };
};