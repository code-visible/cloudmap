import { SourceAbstract } from "./abstract";
import { SourceCall } from "./call";
import { SourceCallable } from "./callable";
import { SourceDep } from "./dep";
import { SourceFile } from "./file";
import { SourcePkg } from "./pkg";

export interface Source {
  name: string;
  lang: string;
  parser: string;
  timestamp: string;
  repository: string;
  typ: string;
  version: string;
  pkgs: SourcePkg[];
  files: SourceFile[];
  abstracts: SourceAbstract[];
  callables: SourceCallable[];
  calls: SourceCall[];
  deps: SourceDep[];
};