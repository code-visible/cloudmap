import type { ShadowElement } from "@pattaya/depict/graph";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";
import { nodes } from "@pattaya/pattaya/components";

export const buildCallTip = (): ShadowElement => {
  const width = 520;
  const height = 40;
  const pannelTheme = stateTheme.graph.pannel;
  const textTheme = stateTheme.graph.text;
  return {
    x: 0,
    y: 0,
    shapes: [
      {
        path: nodes.rectangle.wireframe({ width, height, radius: 3, aligned: true }),
        opts: {
          background: true,
          border: true,
          stroke: pannelTheme.normal.strokeColor,
          fill: pannelTheme.normal.backgroundColor,
          shadowColor: pannelTheme.normal.shadowColor,
          shadowBlur: pannelTheme.normal.shadowBlur,
        }
      },
    ],
    texts: [
      {
        x: 20,
        y: 25,
        content: "",
        opts: {
          width: 480,
          ellipsis: true,
          font: textTheme.body.normal.font,
          fill: textTheme.body.normal.color,
        },
      },
    ],
    data: 0,
    hidden: true,
    update(_delta) {
      if (stateCall.state.active) {
        this.data++;
        this.hidden = false;
      } else {
        this.data++;
        this.hidden = true;
      }
      const callable = stateCall.state.active;
      if (callable) {
        // TODO: improve style
        // 1. hight light function parameters and returns
        // 2. auto scale
        // 3. hide returns if return void
        this.texts![0].content = callable.signature;
        this.x = stateCall.local.hoverX - 196;
        this.y = stateCall.local.hoverY - 60;
      }
    },
  };
};