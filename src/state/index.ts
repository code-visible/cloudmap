export enum GraphType {
  PKG = 1,
  FILE = 2,
  CALL = 3,
}

export interface StatePkg {
  entrance: string;
  active: string;
}

export interface StateFile { }

export interface StateCall { }

export interface State {
  graph: GraphType;
  pkg: StatePkg;
  file: StateFile;
  call: StateCall;
};

export const InitialState = {
  graph: GraphType.PKG,
  pkg: {
    entrance: "",
    active: ""
  },
  file: {},
  call: {}
};