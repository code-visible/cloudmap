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
          stroke: stateTheme.palette.card,
          fill: "#fff",
          border: true,
          shadowColor: stateTheme.palette.cardShadow,
          shadowBlur: 12,
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
          font: "14px san-serf",
          fill: "#000",
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
              fill: "#fff",
              stroke: stateTheme.palette.card,
              border: true,
              rotation: 3.142,
              shadowColor: stateTheme.palette.cardShadow,
              shadowBlur: 6,
            }
          },
          {
            y: -6,
            path: Rectangle.Basic(0, 0, 32, 8),
            opts: {
              fill: "#fff",
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
    },
  };
};