import { Options } from "../options/options";

// Shape is a series of meshes, meanningful for huamn.
export interface Shape {
  mesh: Mesh[];
};

// mesh is the basic render unit
export interface Mesh {
  path: string;
  opts: Options;
};