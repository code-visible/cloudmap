import { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";

// TODO: fix renderer
const colors = {
  navy: "#003B73",

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

const header: Header = {
  backgroundColor: "#ECE3CA",
  titleColor: "",
  titleSize: 12,
};

const page: Page = {
  seperator: colors.grid,
  scrollbarColor: "",
  scrollbarWidth: "",
};

const search: Search = {
  textColor: "",
  textSize: 12,
};

const directory: Directory = {
  backgroundColor: "#ECE3CA",
  dir: colors.text2,
  file: colors.text1,
  unit: colors.text2,
  active: colors.strong,
  muted: colors.text1,
  icon: colors.text1,
  hover: "#000B43",
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
  page,
  header,
  search,
  directory,
  graph,
};