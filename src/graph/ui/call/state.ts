import { InitialStateCall, StateCall } from "../../../state";

export interface StateCallLocal {
  hoverX: number;
  hoverY: number;
};

export interface GraphStatePkg {
  state: StateCall;
  local: StateCallLocal;
};

export const stateCall: GraphStatePkg = {
  state: InitialStateCall,
  local: {
    hoverX: 0,
    hoverY: 0,
  },
};