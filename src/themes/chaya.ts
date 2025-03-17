import type { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";
import chaya from "@pattaya/pattaya/chaya";

const colors = chaya.palette;

const header: Header = {
  textNormal: "#7DA5BF",
  textFocus: "#A8CDE0",
  opacity: .75,
  backgroundColor: colors.black1,
  titleColor: "#A8CDE0",
  titleSize: 20,
};

const page: Page = {
  brand: colors.black1,
  seperator: colors.line,
  scrollbarColor: "",
  scrollbarWidth: "",
};

const search: Search = {
  textColor: "#A8CDE0",
  textSize: 18,
};

const directory: Directory = {
  backgroundColor: colors.black1,
  dir: "#A8CDE0",
  file: "#7DA5BF",
  unit: "#A8CDE0",
  active: colors.yellow,
  muted: colors.comment,
  icon: "#7DA5BF",
  hover: colors.purple,
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
      color: chaya.theme.text.normal.color,
      font: "14px/2 san-serf",
    },
    focus: {
      color: chaya.theme.text.focus.color,
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = chaya.theme.nodes;

const arrow: GraphArrow = chaya.theme.edge;

const graph: GraphStyle = {
  background,
  pannel,
  arrow,
  text,
}

export default {
  name: "chaya",
  page,
  header,
  search,
  directory,
  graph,
};