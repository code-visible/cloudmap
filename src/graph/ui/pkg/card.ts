import type { ShadowElement } from "@pattaya/depict/graph";
import { Rectangle } from "@pattaya/pather";
import { buildCardField } from "./cardfield";
import { statePkg } from "./state";
import { stateTheme } from "../theme/state";
import { GraphMessageType } from "../../../message";
import { GraphType } from "../../../state";

export const buildPkgCard = (x: number, y: number, id: string, name: string, files: number, functions: number, abstract: number): ShadowElement => {
  const width = 160;
  const height = 120;
  return {
    x,
    y,
    shapes: [{
      path: Rectangle.RoundAligned(0, 0, width, height, 9),
      opts: {
        background: true,
        stroke: stateTheme.palette.card,
        fill: "#fff",
        border: true,
        shadowColor: stateTheme.palette.cardShadow,
        shadowBlur: 0,
      }
    }],
    texts: [
      {
        x: 20,
        y: 31,
        content: name,
        opts: {
          width: 106,
          ellipsis: true,
          font: "bold 14px san-serf",
          fill: "#000",
        }
      },
    ],
    children: [
      buildCardField(20, 58, "files", `${files}`, id, GraphType.FILE),
      buildCardField(20, 78, "functions", `${functions}`, id, GraphType.CALL),
      buildCardField(20, 98, "abstract", `${abstract}`, id, GraphType.REF),
    ],
    data: { id, active: false },
    update(_delta) {
      const opts = this.shapes![0].opts!;
      opts.shadowBlur = this.data.id === statePkg.state.active ? 15 : 0;
      if (this.data.id === statePkg.state.entrance) {
        opts.stroke = stateTheme.palette.focus;
        opts.fill = "#fafbfc";
        return;
      }
      if (this.data.id === statePkg.state.active) {
        opts.stroke = stateTheme.palette.highlight;
        return;
      }
      if (!this.data.active) {
        opts.stroke = stateTheme.palette.card;
      }
    },
    contain: (x, y) => x > 0 && x < width && y > 0 && y < height,
    onMouseenter(_render, x, y, _mx, _my) {
      this.data.active = true;
      statePkg.local.hoverX = x + this.x;
      statePkg.local.hoverY = y + this.y;
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data: { entrance: statePkg.state.entrance, active: this.data.id, set: [] } } });
      return true;
    },
    onMouseleave(_render, _x, _y, _mx, _my) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data: { entrance: statePkg.state.entrance, active: "", set: [] } } });
      return true;
    },
    onClick(_render, _x, _y, _mouseX, _mouseY) {
      this.data.active = false;
      postMessage({ type: GraphMessageType.UPDATE_PKG, msg: { graph: GraphType.PKG, data: { entrance: this.data.id, active: "", set: [] } } });
      return true;
    },
  };
};