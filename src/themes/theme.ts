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
}

export interface ArrowStyle {
  color: string;
  width: number;
  endpointStrokeColor: string,
  endpointBackgroundColor: string,
}

export interface TipStyle {
  backgroundColor: string;
  strokeWidth: number;
  strokeColor: string;
  shadowColor: string;
}

export interface GraphPannel {
  muted: PannelStyle;
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
  // tip: TipStyle;
};