import { CSSProperties } from "react";
import { Directory, GraphArrow, GraphPannel, GraphStyle, GraphText, Header, Page, Search } from "./theme";

const colors = {
  baby: "#BFD7ED",
  grotto: "#60A3D9",
  royal: "#0074B7",
  navy: "#003B73",
  comp1: "#EFFEFA",
  comp2: "#FAFBFF",
};

const header: Header = {
  backgroundColor: "#fff",
  titleColor: colors.navy,
  titleSize: 20,
};

const page: Page = {
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
      color: colors.royal,
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
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: colors.grotto,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
  normal: {
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: colors.grotto,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
  focus: {
    backgroundColor: colors.comp2,
    strokeWidth: 1,
    strokeColor: colors.navy,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
  active: {
    backgroundColor: colors.comp1,
    strokeWidth: 1,
    strokeColor: colors.navy,
    shadowColor: "#fff",
    shadowBlur: 0,
  },
};

const arrow: GraphArrow = {
  muted: {
    color: colors.baby,
    width: 1,
    endpointStrokeColor: colors.baby,
    endpointBackgroundColor: "#fff",
  },
  active: {
    color: colors.royal,
    width: 1,
    endpointStrokeColor: colors.navy,
    endpointBackgroundColor: "#fff",
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