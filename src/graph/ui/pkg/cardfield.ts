import type { ShadowElement } from "@pattaya/depict/graph";
import { GraphType } from "../../../state";
import { GraphMessageType } from "../../../message";
import { FileCall } from "../../../resource/node";

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
    onMouseenter(render) {
      this.texts![0].opts!.fill = "#993";
      render();
      return true;
    },
    onMouseleave(render) {
      this.texts![0].opts!.fill = "#666";
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
