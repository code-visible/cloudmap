import { edge, nodes } from "@pattaya/pattaya/components";
import type { CSSProperties } from "react";

export interface Page {
  brand: string;
  seperator: string;
  scrollbarColor: string;
  scrollbarWidth: string;
}

export interface Search {
  textColor: string;
  textSize: number;
};

export interface Header {
  backgroundColor: string;
  titleColor: string;
  titleSize: number;
  textNormal: string;
  textFocus: string;
  opacity: number;
}

export interface Directory {
  backgroundColor: string;
  active: string;
  muted: string;
  hover: string;
  dir: string;
  file: string;
  unit: string;
  icon: string;
};

export interface PannelStyle {
  backgroundColor: string;
  strokeWidth: number;
  strokeColor: string;
  shadowColor: string;
  shadowBlur: number;
};

export interface TextStyle {
  color: string;
  font: string;
}

export interface ArrowStyle {
  color: string;
  width: number;
  endpointStrokeColor: string,
  endpointBackgroundColor: string,
};

export interface TipStyle {
  backgroundColor: string;
  strokeWidth: number;
  strokeColor: string;
  shadowColor: string;
};

export interface GraphText {
  header: {
    normal: TextStyle;
    focus: TextStyle;
  },
  body: {
    normal: TextStyle;
    focus: TextStyle;
  },
};

export interface GraphPannel {
  muted: nodes.NodeStyles;
  normal: nodes.NodeStyles;
  focus: nodes.NodeStyles;
  active: nodes.NodeStyles;
};

export interface GraphArrow {
  muted: edge.EdgeStyles;
  active: edge.EdgeStyles;
};

export interface GraphStyle {
  background: CSSProperties;
  pannel: GraphPannel;
  arrow: GraphArrow;
  text: GraphText;
  // tip: TipStyle;
};