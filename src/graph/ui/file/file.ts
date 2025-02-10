import { MeshOptions, ShadowElement } from "@pattaya/depict/graph";
import { stateTheme } from "../theme/state";
import { stateFile } from "./state";
import { GraphMessageType } from "../../../message";
import { GraphFile, GraphType } from "../../../state";
import { PannelStyle } from "../../../themes/theme";
import { nodes } from "@pattaya/pattaya/components";

const setOpts = (style: PannelStyle, opts: MeshOptions) => {
  opts.stroke = style.strokeColor;
  opts.lineWidth = style.strokeWidth;
  opts.fill = style.backgroundColor;
  opts.shadowColor = style.shadowColor;
  opts.shadowBlur = style.shadowBlur;
};

export const buildFileNode = (x: number, y: number, r: number, file: GraphFile, highlight: boolean): ShadowElement => {
  const theme = stateTheme.graph.pannel;
  return {
    x,
    y,
    shapes: [
      {
        path: nodes.circle.wireframe({ radius: r }),
        opts: {
          background: true,
          border: true,
          shadowBlur: 0,
          fill: highlight ? theme.focus.backgroundColor : theme.normal.backgroundColor,
          stroke: highlight ? theme.focus.strokeColor : theme.normal.strokeColor,
          lineWidth: theme.normal.strokeWidth,
          shadowColor: theme.normal.shadowColor,
          // shadowBlur: stateTheme.graph.pannel.normal.shadowBlur,
        }
      },
    ],
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
      const theme = stateTheme.graph.pannel;
      const opts = this.shapes![0].opts!;
      const active = stateFile.state.active;
      if (active) {
        if (this.data.id === active.id) {
          setOpts(theme.focus, opts);
          return;
        }
        if (active.exports.has(this.data.id) || active.imports.has(this.data.id)) {
          setOpts(theme.active, opts);
          return;
        }
        setOpts(theme.muted, opts);
        return;
      }
      setOpts(theme.normal, opts);
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