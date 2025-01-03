import { ShadowElement } from "@pattaya/depict/graph";
import { Circle } from "@pattaya/pather";
import { stateTheme } from "../theme/state";
import { File } from "../../../resource/node";
import { stateFile } from "./state";
import { GraphMessageType } from "../../../message";
import { GraphType } from "../../../state";

export const buildFileNode = (x: number, y: number, r: number, file: File, highlight: boolean): ShadowElement => {
  return {
    x,
    y,
    shapes: [
      {
        path: Circle.Basic(0, 0, r),
        opts: {
          background: true,
          stroke: highlight ? stateTheme.palette.focus : stateTheme.palette.muted3,
          fill: highlight ? "#fafbfc" : "#fff",
          border: true,
          shadowColor: stateTheme.palette.cardShadow,
          shadowBlur: 0,
        }
      },
    ],
    texts: [
      {
        x: -28,
        y: 4,
        content: file.ref.name,
        opts: {
          width: 106,
          ellipsis: true,
          font: "bold 14px san-serf",
          fill: "#666",
        }
      },
    ],
    update(_delta) {
      const opts = this.shapes![0].opts!;
      opts.shadowBlur = this.data.id === stateFile.state.active ? 15 : 0;
      if (this.data.id === stateFile.state.entrance) {
        opts.stroke = stateTheme.palette.focus;
        opts.fill = "#fafbfc";
        return;
      }
      if (this.data.id === stateFile.state.active) {
        opts.stroke = stateTheme.palette.highlight;
        return;
      }
      opts.stroke = stateTheme.palette.muted3;
    },
    data: { id: file.ref.id, active: false },
    contain: (x, y) => x > -r && x < r && y > -r && y < r,
    onMouseenter(_render, x, y, _mx, _my) {
      this.data.active = true;
      stateFile.local.hoverX = x + this.x;
      stateFile.local.hoverY = y + this.y;
      postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: GraphType.FILE, data: { entrance: stateFile.state.entrance, active: this.data.id, set: [] } } });
      return true;
    },
    onMouseleave(_render, _x, _y, _mx, _my) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: GraphType.FILE, data: { entrance: stateFile.state.entrance, active: "", set: [] } } });
      return true;
    },
  }
};