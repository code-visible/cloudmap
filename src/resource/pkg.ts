export interface SourcePkg {
  id: string;
  name: string;
  path: string;
};

export interface Pkg {
  imports: Set<Pkg>,
  exports: Set<Pkg>,
  files: Set<File>,
  ref: SourcePkg,
};
