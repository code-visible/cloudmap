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

// TODO: fix renderer
const colors = {
  baby: "#BFD7ED",
  grotto: "#60A3D9",
  royal: "#0074B7",
  navy: "#003B73",
  comp1: "#EFFEFA",
  comp2: "#FAFBFF",

  // TODO:
  // new theme base color
  base: "#ECE3CA",
  // sketchy background grid/border
  grid: "#E4D8B4",
  // focus
  focus: "#16A34A",
  strong: "#2FAB59",
  comp3: "#ECE3CA",
  text1: "#8A8378",
  text2: "#282425",
};

const background: CSSProperties = {
  backgroundColor: "#ECE3CA",
};

const text: GraphText = {
  header: {
    normal: {
      color: colors.text2,
      font: "bold 14px san-serf",
    },
    focus: {
      color: colors.text2,
      font: "bold 14px san-serf",
    },
  },
  body: {
    normal: {
      color: colors.text1,
      font: "14px/2 san-serf",
    },
    focus: {
      color: colors.navy,
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = {
  muted: {
    backgroundColor: colors.grid,
    strokeWidth: 1,
    strokeColor: colors.grid,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
  normal: {
    backgroundColor: colors.grid,
    strokeWidth: 1,
    strokeColor: colors.grid,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
  focus: {
    backgroundColor: colors.focus,
    strokeWidth: 1,
    strokeColor: colors.focus,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
  active: {
    backgroundColor: colors.focus,
    strokeWidth: 1,
    strokeColor: colors.focus,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: colors.grid,
    width: 1,
    endpointStrokeColor: colors.grid,
    endpointBackgroundColor: colors.base,
  },
  active: {
    color: "#0074B7",
    width: 1,
    endpointStrokeColor: colors.navy,
    endpointBackgroundColor: colors.base,
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