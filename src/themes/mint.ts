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
  textNormal: colors.text1,
  textFocus: colors.text2,
  opacity: .45,
  background: "#ECE3CA",
  titleColor: colors.text2,
  titleSize: 20,
};

const page: Page = {
  brand: "#ECE3CA",
  seperator: colors.grid,
  scrollbarColor: "",
  scrollbarWidth: "",
};

const search: Search = {
  textColor: colors.text2,
  textSize: 18,
};

const directory: Directory = {
  background: "#ECE3CA",
  dir: colors.text2,
  file: colors.text1,
  unit: colors.text2,
  active: colors.strong,
  muted: colors.text1,
  icon: colors.text1,
  hover: "#000B43",
};

const background: CSSProperties = {
  background: "#ECE3CA",
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
    background: colors.grid,
    border: colors.grid,
    shadow: "#fff",
    shadowBlur: 0,
  },
  normal: {
    background: colors.grid,
    border: colors.grid,
    shadow: "#fff",
    shadowBlur: 0,
  },
  focus: {
    background: colors.focus,
    border: colors.focus,
    shadow: "#fff",
    shadowBlur: 0,
  },
  active: {
    background: colors.focus,
    border: colors.focus,
    shadow: "#fff",
    shadowBlur: 0,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: colors.grid,
    width: 1,
    endpointStrokeColor: colors.grid,
    endpointbackground: colors.base,
  },
  active: {
    color: "#0074B7",
    width: 1,
    endpointStrokeColor: colors.navy,
    endpointbackground: colors.base,
  },
};

const graph: GraphStyle = {
  background,
  pannel,
  arrow,
  text,
}

export default {
  name: "mint",
  page,
  header,
  search,
  directory,
  graph,
};