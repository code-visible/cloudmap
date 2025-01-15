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
  backgroundImage: "radial-gradient(#eee2e9 2px, transparent 2px)",
  backgroundSize: "36px 36px",
  backgroundColor: "#fff2f9",
};

const pannel: GraphPannel = {
  muted: {
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: palette.muted3,
    shadowColor: "rgba(150, 150, 150, .2)",
  },
  focus: {
    backgroundColor: "#fff",
    strokeWidth: 3,
    strokeColor: "#f0f",
    shadowColor: "rgba(150, 150, 150, .2)",
  },
  active: {
    backgroundColor: "#fff",
    strokeWidth: 2,
    strokeColor: "#ff0",
    shadowColor: "rgba(150, 150, 150, .2)",
  },
};

const arrow: GraphArrow = {
  muted: {
    color: "#ccc",
    endpointStrokeColor: "#ccc",
    endpointBackgroundColor: "#fff",
    width: 1,
  },
  active: {
    color: "#f0f",
    endpointStrokeColor: "#f0f",
    endpointBackgroundColor: "#fff",
    width: 2,
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