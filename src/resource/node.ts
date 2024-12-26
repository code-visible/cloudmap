import { SourceAbstract } from "../protocol/abstract";
import { SourceCall } from "../protocol/call";
import { SourceCallable } from "../protocol/callable";
import { SourceDep } from "../protocol/dep";
import { SourceFile } from "../protocol/file";
import { SourcePkg } from "../protocol/pkg";

export interface Pkg {
  path: string,
  imports: Set<Pkg>,
  exports: Set<Pkg>,
  files: Set<File>,
  callables: Set<Callable>,
  abstracts: Set<Abstract>,
  ref: SourcePkg,
};

export interface File {
  pkg: Pkg,
  imports: Set<File>,
  exports: Set<File>,
  callables: Set<Callable>,
  abstracts: Set<Abstract>,
  ref: SourceFile,
};

export interface Abstract {
  pkg: Pkg,
  file: File,
  ref: SourceAbstract,
};

export interface Callable {
  pkg: Pkg,
  file: File,
  ref: SourceCallable,
};

export interface Call {
  pkg: Pkg,
  file: File,
  ref: SourceCall,
};

export interface Dep {
  pkgPtr?: Pkg,
  filePtr?: File,
  ref: SourceDep,
};