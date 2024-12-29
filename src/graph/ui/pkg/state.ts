import { InitialStatePkg, StatePkg } from "../../../state";

export interface StatePkgLocal {
  hoverX: number;
  hoverY: number;
};

export interface GraphStatePkg {
  state: StatePkg;
  local: StatePkgLocal;
};

export const statePkg: GraphStatePkg = {
  state: InitialStatePkg,
  local: {
    hoverX: 0,
    hoverY: 0,
  },
};