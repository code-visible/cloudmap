import { CSSProperties } from "react";
import { GraphArrow, GraphPannel, GraphStyle, Palette } from "./theme";

const palette: Palette = {
  highlight: "#339",
  focus: "#117",
  muted1: "#666",
  muted2: "#999",
  muted3: "#ccc",
  arrow: "#ccc",
  card: "#666",
  seperator: "#000",
  cardShadow: "rgba(150, 150, 150, .2)",
  hover: "#000",
};

const background: CSSProperties = {
  backgroundImage: "linear-gradient(#fff2f9 1px, transparent 1px), linear-gradient(to right, #fff2f9 1px, transparent 1px)",
  backgroundSize: "22px 22px",
  backgroundColor: "#ffffff",
};

const pannel: GraphPannel = {
  muted: {
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: palette.card,
    shadowColor: "rgba(150, 150, 150, .2)",
    shadowBlur: 0,
  },
  normal: {
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: palette.card,
    shadowColor: "rgba(150, 150, 150, .2)",
    shadowBlur: 0,
  },
  focus: {
    backgroundColor: "#fafbfc",
    strokeWidth: 1,
    strokeColor: palette.focus,
    shadowColor: "rgba(150, 150, 150, .2)",
    shadowBlur: 0,
  },
  active: {
    backgroundColor: "#fafbfc",
    strokeWidth: 1,
    strokeColor: palette.focus,
    shadowColor: "rgba(150, 150, 150, .2)",
    shadowBlur: 0,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: "#ccc",
    width: 1,
    endpointStrokeColor: "#aaa",
    endpointBackgroundColor: "#fff",
  },
  active: {
    color: palette.focus,
    width: 1,
    endpointStrokeColor: palette.focus,
    endpointBackgroundColor: "#fff",
  },
};

const graph: GraphStyle = {
  background,
  pannel,
  arrow,
}

export default {
  palette,
  graph,
};