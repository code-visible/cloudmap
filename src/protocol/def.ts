export interface Pkg {
  id: string;
  name: string;
  path: string;
};

export interface File {
  id: string;
  name: string;
  path: string;
  pkg: string;
  deps: string[];
};

export interface Abstract {
  id: string;
  pos: string;
  name: string;
  file: string;
  pkg: string;
  comment: string;
  fields: string[];
};

export interface Callable {
  id: string;
  pos: string;
  name: string;
  abstract: string;
  file: string;
  pkg: string;
  comment: string;
  parameters: string[];
  results: string[];
  method: boolean;
  private: boolean;
  orphan: boolean;
};

export interface Call {
  id: string;
  pos: string;
  caller: string;
  callee: string;
  file: string;
  type: string;
  signature: string;
  dep: string;
};

export interface Dep {
  id: string;
  name: string;
  type: string;
  ref: string;
};