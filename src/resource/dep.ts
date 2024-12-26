export interface SourceDep {
  id: string;
  name: string;
  type: string;
  ref: string;
};

export interface Dep {
  ref: SourceDep,
};