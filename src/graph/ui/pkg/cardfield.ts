import type { ShadowElement } from "@pattaya/depict/graph";
import { GraphType } from "../../../state";
import { GraphMessageType } from "../../../message";
import { FileCall } from "../../../resource/node";
import { stateTheme } from "../theme/state";

export const buildCardField = (x: number, y: number, key: string, val: string, id: string, typ: GraphType): ShadowElement => {
  return {
    x,
    y,
    texts: [
      {
        content: key,
        opts: {
          width: 128,
          font: "14px/2 san-serf",
          fill: stateTheme.graph.text.body.normal.color,
        }
      },
      {
        x: 96,
        content: val,
        opts: {
          width: 128,
          font: "14px/2 san-serf",
          fill: stateTheme.graph.text.body.normal.color,
        }
      },
    ],
    contain(x, y) {
      return x > 0 && x < 192 && y > -15 && y < 2;
    },
    onMouseenter(render) {
      this.texts![0].opts!.fill = stateTheme.graph.text.body.focus.color;
      render();
      return true;
    },
    onMouseleave(render) {
      this.texts![0].opts!.fill = stateTheme.graph.text.body.normal.color;
      render();
      return true;
    },
    onClick() {
      switch (typ) {
        case GraphType.FILE:
          const newStateFile = {
            pkg: id,
            entrance: "",
            active: "",
            set: new Set<string>(),
          };
          postMessage({
            type: GraphMessageType.UPDATE_FILE, msg: { graph: GraphType.FILE, data: newStateFile }
          });
          break;
        case GraphType.CALL:
          const newStateCall = {
            pkg: id,
            entrance: "",
            active: "",
            set: new Set<FileCall>(),
          };
          postMessage({
            type: GraphMessageType.UPDATE_CALL, msg: { graph: GraphType.CALL, data: newStateCall }
          });
          break;
        case GraphType.REF:
          break;
      }
      return true;
    },
  };
};
