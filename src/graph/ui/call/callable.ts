import type { ShadowElement } from "@pattaya/depict/graph";
import { Callable } from "../../../resource/node";
import { GraphMessageType } from "../../../message";
import { GraphType } from "../../../state";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";

export const buildCallableField = (x: number, y: number, callable: Callable): ShadowElement => {
  return {
    x,
    y,
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
        opts.fill = stateTheme.palette.focus;
        return;
      }
      if (stateCall.state.entrance === this.data.id) {
        opts.fill = stateTheme.palette.focus;
        return
      }
      const active = stateCall.local.ativeCallable;
      if (active && (active.callees.has(callable) || active.callers.has(callable))) {
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
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data: { pkg: stateCall.state.pkg, entrance: stateCall.state.entrance, active: this.data.id, set: [] } } });
      render();
      return true;
    },
    onMouseleave(render) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data: { pkg: stateCall.state.pkg, entrance: stateCall.state.entrance, active: "", set: [] } } });
      render();
      return true;
    },
    onClick() {
      postMessage({ type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data: { pkg: "", entrance: this.data.id, active: "", set: new Set() } } });
      return true;
    },
  };
};
