export interface SourcePkg {
  id: string;
  name: string;
  path: string;
};

export interface Pkg {
  path: string,
  imports: Set<Pkg>,
  exports: Set<Pkg>,
  files: Set<File>,
  ref: SourcePkg,
};
