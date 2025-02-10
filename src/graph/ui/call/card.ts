import { ShadowElement } from "@pattaya/depict/graph";
import { stateTheme } from "../theme/state";
import { buildCallableField } from "./callable";
import { GraphCallable, GraphFile } from "../../../state";
import { nodes } from "@pattaya/pattaya/components";

export const buildCallCard = (x: number, y: number, w: number, h: number, file: GraphFile, callables: GraphCallable[], highlight: boolean): ShadowElement => {
  const theme = stateTheme.graph.pannel;
  return {
    x,
    y,
    shapes: nodes.rectangle.shapes({ width: w, height: h, radius: 9, aligned: true }, {
      background: highlight ? theme.focus.backgroundColor : theme.normal.backgroundColor,
      border: highlight ? theme.focus.strokeColor : theme.normal.strokeColor,
      shadow: theme.normal.shadowColor,
      shadowBlur: stateTheme.graph.pannel.normal.shadowBlur,
    }),
    texts: [
      {
        x: 20,
        y: 31,
        content: file.name,
        opts: {
          width: 106,
          ellipsis: true,
          font: "bold 14px san-serf",
          fill: "#666",
        }
      },
    ],
    children: callables.map((c, idx) => buildCallableField(20, 56 + idx * 22, c)),
  }
};