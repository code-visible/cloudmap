import data from "../../../data";
import { Callable, File } from "../../../resource/node";
import { InitialStateCall, StateCall } from "../../../state";

export interface StateCallLocal {
  hoverX: number;
  hoverY: number;
  ativeCallable?: Callable;
  ativeFile?: File;
};

export interface GraphStateCall {
  state: StateCall;
  local: StateCallLocal;
};

export const stateCall: GraphStateCall = {
  state: InitialStateCall,
  local: {
    hoverX: 0,
    hoverY: 0,
    ativeCallable: undefined,
    ativeFile: undefined,
  },
};

export const updateCallState = (state: StateCall) => {
  stateCall.state = state;
  if (state.active === "") {
    stateCall.local.ativeCallable = undefined;
    stateCall.local.ativeFile = undefined;
    return;
  }
  const callable = data.callables.get(state.active);
  stateCall.local.ativeCallable = callable;
  stateCall.local.ativeFile = callable ? callable.file : undefined;
};