import type { ShadowElement } from "@pattaya/depict/graph";
import { buildCardField } from "./cardfield";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";
import { GraphMessageType } from "../../../message";
import { GraphPkg, GraphType } from "../../../state";
import { nodes } from "@pattaya/pattaya/components";
import { rectContain } from "@pattaya/pattaya/core";

export const buildPkgCard = (x: number, y: number, pkg: GraphPkg): ShadowElement => {
  const theme = stateTheme.graph.pannel;
  const width = 160;
  const height = 120;
  const contain = rectContain(width, height, true);
  return {
    x: x,
    y: y,
    contain,
    shapes: nodes.rectangle.shapes({ width, height, radius: 5, aligned: true }, theme.normal),
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
      const active = statePkg.state.active;
      if (active) {
        if (this.data.id === active.id) {
          nodes.rectangle.applyStyle(this.shapes, theme.focus);
          return;
        }
        if (active.exports.has(this.data.id) || active.imports.has(this.data.id)) {
          nodes.rectangle.applyStyle(this.shapes, theme.active);
          return;
        }
        nodes.rectangle.applyStyle(this.shapes, theme.muted);
        return;
      }
      nodes.rectangle.applyStyle(this.shapes, theme.normal);
    },
    onMouseenter(_render, x, y, _mx, _my) {
      this.data.active = true;
      statePkg.local.hoverX = x + this.x;
      statePkg.local.hoverY = y + this.y;
      const data = {
        entrance: statePkg.state.entrance ? statePkg.state.entrance.id : "",
        active: this.data.id,
      };
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data } });
    },
    onMouseleave(_render, _x, _y, _mx, _my) {
      this.data.active = false;
      const data = {
        entrance: statePkg.state.entrance ? statePkg.state.entrance.id : "",
        active: "",
      };
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data } });
    },
    onClick(_render, _x, _y, _mouseX, _mouseY) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data: { entrance: this.data.id, active: "" } } });
    },
  };
};