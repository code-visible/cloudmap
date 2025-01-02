import type { ShadowElement } from "@pattaya/depict/graph";
import { Callable } from "../../../resource/node";
import { GraphMessageType } from "../../../message";
import { GraphType } from "../../../state";
import { stateCall } from "./state";

export const buildCallableField = (x: number, y: number, callable: Callable): ShadowElement => {
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
        content: callable.ref.name,
        opts: {
          width: 110,
          font: "14px/2 san-serf",
          fill: "#333",
          ellipsis: true,
        }
      },
    ],
    data: { id: callable.ref.id, active: false },
    update(_delta) {
      const opts = this.texts![0].opts!;
      if (this.data.active) {
        opts.fill = "#993";
        return;
      }
      if (stateCall.state.entrance === this.data.id) {
        opts.fill = "000";
        return
      }
      opts.fill = "#666";
    },
    contain(x, y) {
      return x > 0 && x < 192 && y > -10 && y < 0;
    },
    onMouseenter(render) {
      this.data.active = true;
      render();
      return true;
    },
    onMouseleave(render) {
      this.data.active = false;
      render();
      return true;
    },
    onClick() {
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data: { entrance: this.data.id, active: "", set: new Set() } } });
      return true;
    },
  };
};
