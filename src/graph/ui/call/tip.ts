import type { ShadowElement } from "@challenai/depict/graph";
import { stateCall } from "./state";
import { stateTheme } from "../theme/state";
import { nodes } from "@pattaya/pattaya/components";

export const buildCallTip = (): ShadowElement => {
  const width = 520;
  const height = 40;
  const styles = stateTheme.graph.pannel;
  const textTheme = stateTheme.graph.text;
  return {
    x: 0,
    y: 0,
    shapes: nodes.rectangle.shapes({ width, height, radius: 3, aligned: true }, styles.normal),
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