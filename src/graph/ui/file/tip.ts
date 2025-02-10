import type { ShadowElement } from "@pattaya/depict/graph";
import { popup } from "@pattaya/pattaya/components";
import { stateFile } from "./state";
import { stateTheme } from "../theme/state";

const palette = {
  flat: "#FFFFFF",
  baby: "#BFD7ED",
  grotto: "#60A3D9",
  royal: "#0074B7",
  navy: "#003B73",
  comp1: "#EFFEFA",
  comp2: "#FAFBFF",
};

const popupStyle = {
  border: palette.grotto,
  background: palette.flat,
  shadow: "#fff",
  shadowBlur: 0,
};

export const buildFileTip = (): ShadowElement => {
  const width = 320;
  const height = 96;
  const textTheme = stateTheme.graph.text;
  return {
    x: 0,
    y: 0,
    shapes: popup.blueprint.shapes({ width, height, triangleHeight: 12, triangleWidth: 16, radius: 9, aligned: true }, popupStyle),
    texts: [
      {
        x: 20,
        y: 31,
        content: "",
        opts: {
          width: 256,
          ellipsis: true,
          font: textTheme.header.normal.font,
          fill: textTheme.header.normal.color,
        },
      },
      {
        x: 20,
        y: 55, // +24
        content: "path:",
        opts: {
          width: 256,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
        },
      },
      {
        x: 54,
        y: 55, // +24
        content: "/",
        opts: {
          width: 234,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
        },
      },
      {
        x: 20,
        y: 75, // +20
        content: "fns:",
        opts: {
          width: 32,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
        },
      },
      {
        x: 50,
        y: 75, // +20
        content: "-",
        opts: {
          width: 32,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
        },
      },
      {
        x: 100,
        y: 75, // +20
        content: "abs:",
        opts: {
          width: 32,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
        },
      },
      {
        x: 130,
        y: 75, // +20
        content: "-",
        opts: {
          width: 256,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
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