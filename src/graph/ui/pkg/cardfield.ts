import type { ShadowElement } from "@pattaya/depict/graph";

export const buildCardField = (x: number, y: number, key: string, val: string): ShadowElement => {
  return {
    x,
    y,
    // shapes: [
    //   {
    //     path: Rectangle.Basic(0, -13, 192, 18),
    //     opts: {
    //       stroke: "#993"
    //     }
    //   },
    // ],
    texts: [
      {
        content: key,
        opts: {
          width: 128,
          font: "14px/2 san-serf",
          fill: "#333",
        }
      },
      {
        x: 96,
        content: val,
        opts: {
          width: 128,
          font: "14px/2 san-serf",
          fill: "#666",
        }
      },
    ],
    contain(x, y) {
      return x > 0 && x < 192 && y > -10 && y < 0;
    },
    onMouseenter(render, x, y, mx, my) {
      this.texts![0].opts!.fill = "#993";
      render();
      return true;
    },
    onMouseleave(render, x, y, mx, my) {
      this.texts![0].opts!.fill = "#666";
      render();
      return true;
    },
  };
};
