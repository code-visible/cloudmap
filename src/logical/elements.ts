import { Mesh } from "../physical/fragments/shape";
import { Text } from "../physical/fragments/text";

export interface Drawable {
  // bind shape
  ms: Mesh[];
  // bind text
  t: Text | undefined;
};

export interface Node {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  v: boolean;
  cs: Node[];
  d: Drawable;
};

export interface Pannel {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  d: Drawable;
}

export interface Arrow {
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  d: Drawable;
}