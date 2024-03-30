import { Options } from "../options/options";

// Shape 是一组线条组成的图形。
export interface Shape {
  mesh: Mesh[];
};

export interface Mesh {
  path: string;
  opts: Options;
};