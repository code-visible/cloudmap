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

const colors = {
  black1: "#282C34",
  black2: "#21252B",
  black3: "#1B1E23",
  line: "#534941",
  line2: "#A668BB",
  yellow: "#C9BD7A",
  purple: "#4992DF",
  red: "#AB4959",
  comment: "#55515A"
};

const background: CSSProperties = {
  backgroundColor: colors.black1,
};

const text: GraphText = {
  header: {
    normal: {
      color: "#A8CDE0",
      font: "bold 14px san-serf",
    },
    focus: {
      color: "#A8CDE0",
      font: "bold 14px san-serf",
    },
  },
  body: {
    normal: {
      color: "#7DA5BF",
      font: "14px/2 san-serf",
    },
    focus: {
      color: colors.yellow,
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = {
  muted: {
    backgroundColor: colors.black2,
    strokeWidth: 1,
    strokeColor: colors.comment,
    shadowColor: "rgba(33, 37, 43, .6)",
    shadowBlur: 5,
  },
  normal: {
    backgroundColor: colors.black2,
    strokeWidth: 1,
    strokeColor: colors.comment,
    shadowColor: "rgba(33, 37, 43, .6)",
    shadowBlur: 12,
  },
  focus: {
    backgroundColor: colors.black2,
    strokeWidth: 2,
    strokeColor: colors.yellow,
    shadowColor: "rgba(33, 37, 43, .6)",
    shadowBlur: 12,
  },
  active: {
    backgroundColor: colors.black2,
    strokeWidth: 2,
    strokeColor: colors.purple,
    shadowColor: "rgba(33, 37, 43, .6)",
    shadowBlur: 12,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: colors.line,
    endpointStrokeColor: colors.line,
    endpointBackgroundColor: colors.line,
    width: 1,
  },
  active: {
    color: colors.line2,
    endpointStrokeColor: colors.line2,
    endpointBackgroundColor: colors.line2,
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