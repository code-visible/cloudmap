import { Abstract, Call, Callable, Dep, File, Pkg } from "./def";

export interface Source {
  name: string;
  directory: string;
  pkgs: Pkg[];
  files: File[];
  abstracts: Abstract[];
  callables: Callable[];
  calls: Call[];
  deps: Dep[];
};