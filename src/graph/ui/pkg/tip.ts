import type { ShadowElement } from "@challenai/depict/graph";
import { popup } from "@pattaya/pattaya/components";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";

export const buildInfoCard = (): ShadowElement => {
  const width = 320;
  const height = 56;
  const textTheme = stateTheme.graph.text;
  const styles = stateTheme.graph.pannel;
  return {
    x: 0,
    y: 0,
    shapes: popup.blueprint.shapes({ width, height, triangleHeight: 12, triangleWidth: 16, radius: 9, aligned: true }, styles.normal),
    texts: [
      {
        x: 20,
        y: 33,
        content: "",
        opts: {
          width: 256,
          ellipsis: true,
          font: textTheme.header.normal.font,
          fill: textTheme.header.normal.color,
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