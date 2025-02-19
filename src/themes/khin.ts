import { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";
import { khin } from "@pattaya/pattaya/themes";

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
      color: khin.text.normal.color,
      font: "14px/2 san-serf",
    },
    focus: {
      color: khin.text.focus.color,
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = khin.nodes;

const arrow: GraphArrow = khin.edge;

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