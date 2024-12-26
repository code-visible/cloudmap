import { Abstract, SourceAbstract } from "./abstract";
import { Call, SourceCall } from "./call";
import { Callable, SourceCallable } from "./callable";
import { Dep, SourceDep } from "./dep";
import { File, SourceFile } from "./file";
import { Pkg, SourcePkg } from "./pkg";

export interface Source {
  name: string;
  directory: string;
  pkgs: SourcePkg[];
  files: SourceFile[];
  abstracts: SourceAbstract[];
  callables: SourceCallable[];
  calls: SourceCall[];
  deps: SourceDep[];
};

export class SourceMap {
  name: string;
  directory: string;
  pkgs: Map<string, Pkg>;
  files: Map<string, File>;
  callables: Map<string, Callable>;
  abstracts: Map<string, Abstract>;
  calls: Map<string, Call>;
  deps: Map<string, Dep>;

  constructor(data: Source) {
    this.name = data.name;
    this.directory = data.directory;
    this.pkgs = new Map();
    this.files = new Map();
    this.callables = new Map();
    this.abstracts = new Map();
    this.calls = new Map();
    this.deps = new Map();
  }
};