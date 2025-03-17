import { ShadowElement } from "@challenai/depict/graph";
import { stateTheme } from "../theme/state";
import { stateFile } from "./state";
import { GraphMessageType } from "../../../message";
import { GraphFile, GraphType } from "../../../state";
import { nodes } from "@pattaya/pattaya/components";

export const buildFileNode = (x: number, y: number, r: number, file: GraphFile, highlight: boolean): ShadowElement => {
  const theme = stateTheme.graph.pannel;
  return {
    x,
    y,
    shapes: nodes.circle.shapes({ radius: r }, {
      shadowBlur: 0,
      background: highlight ? theme.focus.background : theme.normal.background,
      border: highlight ? theme.focus.border : theme.normal.border,
      shadow: theme.normal.shadow,
    }),
    texts: [
      {
        x: -28,
        y: 4,
        content: file.name,
        opts: {
          // textAlign: "center",
          width: 106,
          ellipsis: true,
          font: stateTheme.graph.text.body.normal.font,
          fill: stateTheme.graph.text.body.normal.color,
        }
      },
    ],
    update(_delta) {
      const active = stateFile.state.active;
      if (active) {
        if (this.data.id === active.id) {
          nodes.circle.applyStyle(this.shapes, theme.focus);
          return;
        }
        if (active.exports.has(this.data.id) || active.imports.has(this.data.id)) {
          nodes.circle.applyStyle(this.shapes, theme.active);
          return;
        }
        nodes.circle.applyStyle(this.shapes, theme.muted);
        return;
      }
      nodes.circle.applyStyle(this.shapes, theme.normal);
    },
    data: { id: file.id, active: false },
    contain: (x, y) => x > -r && x < r && y > -r && y < r,
    onMouseenter(_render, x, y, _mx, _my) {
      this.data.active = true;
      stateFile.local.hoverX = x + this.x;
      stateFile.local.hoverY = y + this.y;
      const data = {
        pkg: stateFile.state.pkg,
        entrance: stateFile.state.entrance ? stateFile.state.entrance.id : "",
        active: this.data.id,
      };
      postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: GraphType.FILE, data } });
      return false;
    },
    onMouseleave(_render, _x, _y, _mx, _my) {
      this.data.active = false;
      const data = {
        pkg: stateFile.state.pkg,
        entrance: stateFile.state.entrance ? stateFile.state.entrance.id : "",
        active: "",
      };
      postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: GraphType.FILE, data } });
      return false;
    },
    onClick(_render, _x, _y, _mouseX, _mouseY) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_FILE, msg: { graph: GraphType.FILE, data: { pkg: "", entrance: this.data.id, active: "" } } });
      return false;
    }
  }
};