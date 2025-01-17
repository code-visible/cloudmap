import { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";

const background: CSSProperties = {
  backgroundImage: "radial-gradient(#DBD9E7 2.5px, transparent 2.5px)",
  backgroundSize: "32px 32px",
  backgroundColor: "#EEEFFA",
};

const header: Header = {
  textNormal: "#858494",
  textFocus: "#59576A",
  opacity: .5,
  backgroundColor: "#EEEFFA",
  titleColor: "#59576A",
  titleSize: 20,
};

const page: Page = {
  brand: "#EEEFFA",
  seperator: "#ccc",
  scrollbarColor: "",
  scrollbarWidth: "",
};

const search: Search = {
  textColor: "#59576A",
  textSize: 18,
};

const directory: Directory = {
  backgroundColor: "#EEEFFA",
  dir: "#59576A",
  file: "#858494",
  unit: "#59576A",
  active: "#8476FA",
  muted: "#858494",
  icon: "#858494",
  hover: "#000B43",
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
  name: "khin",
  page,
  header,
  search,
  directory,
  graph,
};