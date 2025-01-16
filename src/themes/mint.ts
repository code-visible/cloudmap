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
    strokeWidth: 2,
    strokeColor: "#fff",
    shadowColor: "#fff",
  },
  focus: {
    backgroundColor: "#fff",
    strokeWidth: 2,
    strokeColor: "#fff",
    shadowColor: "#fff",
  },
  active: {
    backgroundColor: "#fff",
    strokeWidth: 2,
    strokeColor: "#fff",
    shadowColor: "#fff",
  },
};

const arrow: GraphArrow = {
  muted: {
    color: "#fff",
    width: 1,
  },
  active: {
    color: "#fff",
    width: 1,
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