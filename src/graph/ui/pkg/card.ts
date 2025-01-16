import type { MeshOptions, ShadowElement } from "@pattaya/depict/graph";
import { Rectangle } from "@pattaya/pather";
import { buildCardField } from "./cardfield";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";
import { GraphMessageType } from "../../../message";
import { GraphPkg, GraphType } from "../../../state";
import { PannelStyle } from "../../../themes/theme";

const setOpts = (style: PannelStyle, opts: MeshOptions) => {
  opts.stroke = style.strokeColor;
  opts.lineWidth = style.strokeWidth;
  opts.fill = style.backgroundColor;
  opts.shadowColor = style.shadowColor;
  opts.shadowBlur = style.shadowBlur;
};

export const buildPkgCard = (x: number, y: number, pkg: GraphPkg): ShadowElement => {
  const width = 160;
  const height = 120;
  return {
    x,
    y,
    shapes: [{
      path: Rectangle.RoundAligned(0, 0, width, height, 9),
      opts: {
        background: true,
        border: true,
        fill: stateTheme.graph.pannel.normal.backgroundColor,
        stroke: stateTheme.graph.pannel.normal.strokeColor,
        lineWidth: stateTheme.graph.pannel.normal.strokeWidth,
        shadowColor: stateTheme.graph.pannel.normal.shadowColor,
        shadowBlur: stateTheme.graph.pannel.normal.shadowBlur,
      }
    }],
    texts: [
      {
        x: 20,
        y: 31,
        content: pkg.name,
        opts: {
          width: 106,
          ellipsis: true,
          font: stateTheme.graph.text.header.normal.font,
          fill: stateTheme.graph.text.header.normal.color,
        }
      },
    ],
    children: [
      buildCardField(20, 58, "files", `${pkg.files}`, pkg.id, GraphType.FILE),
      buildCardField(20, 78, "functions", `${pkg.callables}`, pkg.id, GraphType.CALL),
      buildCardField(20, 98, "abstracts", `${pkg.abstracts}`, pkg.id, GraphType.REF),
    ],
    data: { id: pkg.id, active: false },
    update(_delta) {
      const theme = stateTheme.graph.pannel;
      const opts = this.shapes![0].opts!;
      const active = statePkg.state.active;
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
    contain: (x, y) => x > 0 && x < width && y > 0 && y < height,
    onMouseenter(_render, x, y, _mx, _my) {
      this.data.active = true;
      statePkg.local.hoverX = x + this.x;
      statePkg.local.hoverY = y + this.y;
      const data = {
        entrance: statePkg.state.entrance ? statePkg.state.entrance.id : "",
        active: this.data.id,
      };
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data } });
      return true;
    },
    onMouseleave(_render, _x, _y, _mx, _my) {
      this.data.active = false;
      const data = {
        entrance: statePkg.state.entrance ? statePkg.state.entrance.id : "",
        active: "",
      };
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data } });
      return true;
    },
    onClick(_render, _x, _y, _mouseX, _mouseY) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data: { entrance: this.data.id, active: "" } } });
      return true;
    },
  };
};