import type { ShadowElement } from "@pattaya/depict/graph";
import { GraphMessageType } from "../../../message";
import { GraphCallable, GraphType } from "../../../state";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";

export const buildCallableField = (x: number, y: number, callable: GraphCallable): ShadowElement => {
  return {
    x,
    y,
    texts: [
      {
        content: callable.name,
        opts: {
          width: 110,
          font: "14px/2 san-serf",
          fill: "#333",
          ellipsis: true,
        }
      },
    ],
    data: { id: callable.id, active: false },
    update(_delta) {
      const opts = this.texts![0].opts!;
      if (this.data.active) {
        opts.fill = stateTheme.palette.focus;
        return;
      }
      if (stateCall.state.entrance?.id === this.data.id) {
        opts.fill = stateTheme.palette.focus;
        return
      }
      const active = stateCall.state.active;
      if (active && (active.callees.has(callable.id) || active.callers.has(callable.id))) {
        opts.fill = stateTheme.palette.highlight;
        return;
      }
      opts.fill = stateTheme.palette.muted3;
    },
    contain(x, y) {
      return x > 0 && x < 192 && y > -10 && y < 0;
    },
    onMouseenter(render, x, y, _mx, _my) {
      this.data.active = true;
      stateCall.local.hoverX = x + this.x;
      stateCall.local.hoverY = y + this.y;
      const data = {
        pkg: stateCall.state.pkg,
        entrance: stateCall.state.entrance ? stateCall.state.entrance.id : "",
        active: this.data.id,
      };
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data } });
      render();
      return true;
    },
    onMouseleave(render) {
      this.data.active = false;
      const data = {
        pkg: stateCall.state.pkg,
        entrance: stateCall.state.entrance ? stateCall.state.entrance.id : "",
        active: "",
      };
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data } });
      render();
      return true;
    },
    onClick() {
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data: { pkg: "", entrance: this.data.id, active: "", set: new Set() } } });
      return true;
    },
  };
};
