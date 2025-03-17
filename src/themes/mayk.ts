import type { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";
import mayk from "@pattaya/pattaya/mayk";

const colors = mayk.palette;

const header: Header = {
  textNormal: colors.royal,
  textFocus: colors.navy,
  opacity: .35,
  backgroundColor: "#fff",
  titleColor: colors.navy,
  titleSize: 20,
};

const page: Page = {
  brand: "#fff",
  seperator: colors.baby,
  scrollbarColor: "",
  scrollbarWidth: "",
};


const search: Search = {
  textColor: colors.navy,
  textSize: 18,
};

const directory: Directory = {
  backgroundColor: "#fff",
  dir: colors.navy,
  file: colors.royal,
  unit: colors.navy,
  active: colors.navy,
  muted: colors.baby,
  icon: colors.royal,
  hover: "#000B43",
};

const background: CSSProperties = {
  backgroundImage: "linear-gradient(#fff2f9 1px, transparent 1px), linear-gradient(to right, #fff2f9 1px, transparent 1px)",
  backgroundSize: "22px 22px",
  backgroundColor: "#ffffff",
};

const text: GraphText = {
  header: {
    normal: {
      color: colors.navy,
      font: "bold 14px san-serf",
    },
    focus: {
      color: colors.navy,
      font: "bold 14px san-serf",
    },
  },
  body: {
    normal: {
      color: mayk.theme.text.normal.color,
      font: "14px/2 san-serf",
    },
    focus: {
      color: mayk.theme.text.focus.color,
      font: "14px/2 san-serf",
    },
  },
};

const pannel: GraphPannel = mayk.theme.nodes;

const arrow: GraphArrow = mayk.theme.edge;

const graph: GraphStyle = {
  background,
  pannel,
  arrow,
  text,
}

export default {
  name: "mayk",
  page,
  header,
  search,
  directory,
  graph,
};