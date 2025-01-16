import { CSSProperties } from "react";

export interface Palette {
  highlight: string;
  focus: string;
  muted1: string;
  muted2: string;
  muted3: string;
  arrow: string;
  card: string;
  seperator: string;
  cardShadow: string;
  hover: string;
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
  muted: PannelStyle;
  normal: PannelStyle;
  focus: PannelStyle;
  active: PannelStyle;
};

export interface GraphArrow {
  muted: ArrowStyle;
  active: ArrowStyle;
};

export interface GraphStyle {
  background: CSSProperties;
  pannel: GraphPannel;
  arrow: GraphArrow;
  text: GraphText;
  // tip: TipStyle;
};