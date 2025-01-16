import type { ShadowElement } from "@pattaya/depict/graph";
import { Rectangle, Triangle } from "@pattaya/pather";
import { stateFile } from "./state";
import { stateTheme } from "../theme/state";

export const buildFileTip = (): ShadowElement => {
  const width = 320;
  // +22
  const height = 96;
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
      {
        x: 20,
        y: 55, // +24
        content: "path:",
        opts: {
          width: 256,
          ellipsis: true,
          font: "14px san-serf",
          fill: stateTheme.palette.muted2,
        },
      },
      {
        x: 54,
        y: 55, // +24
        content: "/",
        opts: {
          width: 234,
          ellipsis: true,
          font: "14px san-serf",
          fill: stateTheme.palette.muted2,
        },
      },
      {
        x: 20,
        y: 75, // +20
        content: "fns:",
        opts: {
          width: 32,
          ellipsis: true,
          font: "14px san-serf",
          fill: stateTheme.palette.muted2,
        },
      },
      {
        x: 50,
        y: 75, // +20
        content: "-",
        opts: {
          width: 32,
          ellipsis: true,
          font: "14px san-serf",
          fill: stateTheme.palette.muted2,
        },
      },
      {
        x: 100,
        y: 75, // +20
        content: "abs:",
        opts: {
          width: 32,
          ellipsis: true,
          font: "14px san-serf",
          fill: stateTheme.palette.muted2,
        },
      },
      {
        x: 130,
        y: 75, // +20
        content: "-",
        opts: {
          width: 256,
          ellipsis: true,
          font: "14px san-serf",
          fill: stateTheme.palette.muted2,
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
        y: 98,
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
      const file = stateFile.state.active;
      if (file) {
        this.hidden = false;
        this.texts![0].content = file.name;
        this.texts![2].content = file.path;
        this.texts![4].content = `${file.callables}`;
        this.texts![6].content = `${file.abstracts}`;
        this.x = stateFile.local.hoverX - 160;
        this.y = stateFile.local.hoverY - 136;
      } else {
        this.hidden = true;
      }
    },
  };
};