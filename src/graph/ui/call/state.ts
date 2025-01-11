import data from "../../../data";
import { Callable, File } from "../../../resource/node";
import { InitialStateCall, StateCall } from "../../../state";

export interface StateCallLocal {
  hoverX: number;
  hoverY: number;
  ativeCallable?: Callable;
  ativeFiles: Set<string>;
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
    ativeFiles: new Set(),
  },
};

export const updateCallState = (state: StateCall) => {
  stateCall.state = state;
  stateCall.local.ativeFiles.clear();
  if (state.active === "") {
    stateCall.local.ativeCallable = undefined;
    return;
  }
  const callable = data.callables.get(state.active);
  stateCall.local.ativeCallable = callable;
  if (callable) {
    for (const el of callable.callees) {
      stateCall.local.ativeFiles.add(el.file.ref.id);
    }
    for (const el of callable.callers) {
      stateCall.local.ativeFiles.add(el.file.ref.id);
    }
  }
};