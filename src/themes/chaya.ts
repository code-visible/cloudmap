import { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";

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
  name: "chaya",
  page,
  header,
  search,
  directory,
  graph,
};