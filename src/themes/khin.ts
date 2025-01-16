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
  backgroundImage: "radial-gradient(#DBD9E7 2.5px, transparent 2.5px)",
  backgroundSize: "32px 32px",
  backgroundColor: "#EEEFFA",
};

const text: GraphText = {
  header: {
    normal: {
      color: "#59576A",
      font: "bold 14px san-serf",
    },
    focus: {
      color: "#59576A",
      font: "bold 14px san-serf",
    },
  },
  body: {
    normal: {
      color: "#858494",
      font: "14px/2 san-serf",
    },
    focus: {
      color: "#8476FA",
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = {
  muted: {
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: "#ccc",
    shadowColor: "rgba(102, 102, 102, .2)",
    shadowBlur: 5,
  },
  normal: {
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: "#999",
    shadowColor: "rgba(102, 102, 102, .2)",
    shadowBlur: 12,
  },
  focus: {
    backgroundColor: "#fff",
    strokeWidth: 2,
    strokeColor: "#8476FA",
    shadowColor: "rgba(255, 0, 255, .3)",
    shadowBlur: 24,
  },
  active: {
    backgroundColor: "#fff",
    strokeWidth: 2,
    strokeColor: "#F5718D",
    shadowColor: "rgba(255, 0, 0, .3)",
    shadowBlur: 24,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: "#ccc",
    endpointStrokeColor: "#aaa",
    endpointBackgroundColor: "#fff",
    width: 1,
  },
  active: {
    color: "#8476FA",
    endpointStrokeColor: "#8476FA",
    endpointBackgroundColor: "#fff",
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