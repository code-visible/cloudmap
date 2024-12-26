export interface SourceFile {
  id: string;
  name: string;
  path: string;
  pkg: string;
  deps: string[];
};

export interface File {
  callees: Set<File>,
  callers: Set<File>,
  ref: SourceFile,
};
