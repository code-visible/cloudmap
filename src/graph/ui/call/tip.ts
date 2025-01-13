import type { ShadowElement } from "@pattaya/depict/graph";
import { Rectangle } from "@pattaya/pather";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";
import data from "../../../data";

export const buildCallTip = (): ShadowElement => {
  const width = 520;
  const height = 40;
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: Rectangle.RoundAligned(0, 0, width, height, 3),
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
        y: 25,
        content: "",
        opts: {
          width: 480,
          ellipsis: true,
          font: "14px san-serf",
          fill: "#000",
        },
      },
    ],
    children: [],
    data: 0,
    hidden: true,
    update(_delta) {
      if (stateCall.state.active === "") {
        // this.x = -500;
        this.data++;
        this.hidden = true;
      } else {
        this.data++;
        this.hidden = false;
      }
      const callable = data.callables.get(stateCall.state.active);
      if (callable) {
        // TODO: improve style
        this.texts![0].content = callable.ref.signature;
        this.x = stateCall.local.hoverX - 180;
        this.y = stateCall.local.hoverY - 56;
      }
    },
  };
};