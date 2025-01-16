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
  baby: "#BFD7ED",
  grotto: "#60A3D9",
  royal: "#0074B7",
  navy: "#003B73",
  comp1: "#EFFEFA",
  comp2: "#FAFBFF",
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
      color: "#0074B7",
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
    color: "#0074B7",
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
  palette,
  graph,
};