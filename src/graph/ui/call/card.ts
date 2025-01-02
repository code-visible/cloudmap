import { ShadowElement } from "@pattaya/depict/graph";
import { Rectangle } from "@pattaya/pather";
import { stateTheme } from "../theme/state";
import { Callable, File } from "../../../resource/node";
import { buildCallableField } from "./callable";

export const buildCallCard = (x: number, y: number, w: number, h: number, file: File, callables: Callable[], highlight: boolean): ShadowElement => {
  return {
    x,
    y,
    shapes: [
      {
        path: Rectangle.RoundAligned(0, 0, w, h, 9),
        opts: {
          background: true,
          stroke: highlight ? stateTheme.palette.focus : stateTheme.palette.card,
          fill: highlight ? "#fafbfc" : "#fff",
          border: true,
          shadowColor: stateTheme.palette.cardShadow,
          shadowBlur: 0,
        }
      },
    ],
    texts: [
      {
        x: 20,
        y: 31,
        content: file.ref.name,
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