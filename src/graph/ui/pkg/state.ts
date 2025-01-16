import { InitialStateGraphPkg, StateGraphPkg } from "../../../state";

export interface StatePkgLocal {
  hoverX: number;
  hoverY: number;
};

export interface GraphStatePkg {
  state: StateGraphPkg;
  local: StatePkgLocal;
};

export const statePkg: GraphStatePkg = {
  state: InitialStateGraphPkg,
  local: {
    hoverX: 0,
    hoverY: 0,
  },
};