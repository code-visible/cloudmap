import { CSSProperties } from "react";
import { GraphArrow, GraphPannel, GraphStyle, GraphText, Palette } from "./theme";

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
  // backgroundImage: "radial-gradient(#eee2e9 2px, transparent 2px)",
  // backgroundSize: "36px 36px",
  backgroundColor: "#000",
};

const text: GraphText = {
  header: {
    normal: {
      color: "#A8ADA9",
      font: "bold 14px san-serf",
    },
    focus: {
      color: "#A8ADA9",
      font: "bold 14px san-serf",
    },
  },
  body: {
    normal: {
      color: "#969A97",
      font: "14px/2 san-serf",
    },
    focus: {
      color: "#7CE486",
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = {
  muted: {
    backgroundColor: "#1c1c1c",
    strokeWidth: 1,
    strokeColor: "#333",
    shadowColor: "rgba(150, 150, 150, .2)",
    shadowBlur: 5,
  },
  normal: {
    backgroundColor: "#1c1c1c",
    strokeWidth: 1,
    strokeColor: "#666",
    shadowColor: "rgba(150, 150, 150, .2)",
    shadowBlur: 12,
  },
  focus: {
    backgroundColor: "#1c1c1c",
    strokeWidth: 1,
    strokeColor: "#7CE486",
    shadowColor: "rgba(255, 0, 255, .2)",
    shadowBlur: 24,
  },
  active: {
    backgroundColor: "#1c1c1c",
    strokeWidth: 1,
    strokeColor: "#7CE486",
    shadowColor: "rgba(255, 0, 0, .2)",
    shadowBlur: 24,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: "#333",
    endpointStrokeColor: "#333",
    endpointBackgroundColor: "#333",
    width: 1,
  },
  active: {
    color: "#FFE86B",
    endpointStrokeColor: "#FFE86B",
    endpointBackgroundColor: "#666",
    width: 1,
  },
};

const graph: GraphStyle = {
  background,
  pannel,
  arrow,
  text,
}

export default {
  palette,
  graph,
};