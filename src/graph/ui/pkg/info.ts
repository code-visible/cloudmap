import type { ShadowElement } from "@pattaya/depict/graph";
import { Rectangle, Triangle } from "@pattaya/pather";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";
import data from "../../../data";

export const buildInfoCard = (): ShadowElement => {
  const width = 320;
  const height = 54;
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
        }
      },
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
    data: 0,
    hidden: true,
    update(_delta) {
      if (statePkg.state.active === "") {
        // this.x = -500;
        this.data++;
        this.hidden = true;
      } else {
        this.data++;
        this.hidden = false;
      }
      const pkg = data.pkgs.get(statePkg.state.active);
      if (pkg) {
        this.texts![0].content = pkg.path;
        this.x = statePkg.local.hoverX - 72;
        this.y = statePkg.local.hoverY - 72;
      }
    },
  };
};