import { InitialStateCall, StateCall } from "../../../state";

export interface StateCallLocal {
  hoverX: number;
  hoverY: number;
};

export interface GraphStateFile {
  state: StateCall;
  local: StateCallLocal;
};

export const stateCall: GraphStateFile = {
  state: InitialStateCall,
  local: {
    hoverX: 0,
    hoverY: 0,
  },
};