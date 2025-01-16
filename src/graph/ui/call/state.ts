import { Callable } from "../../../resource/node";
import { InitialStateGraphCall, StateGraphCall } from "../../../state";

export interface StateCallLocal {
  hoverX: number;
  hoverY: number;
  ativeCallable?: Callable;
  ativeFiles: Set<string>;
};

export interface GraphStateCall {
  state: StateGraphCall;
  local: StateCallLocal;
};

export const stateCall: GraphStateCall = {
  state: InitialStateGraphCall,
  local: {
    hoverX: 0,
    hoverY: 0,
    ativeFiles: new Set(),
  },
};

export const updateCallState = (state: StateGraphCall) => {
  stateCall.state = state;
  stateCall.local.ativeFiles.clear();
  if (state.active) {
    // for (const el of state.active.callees) {
    //   stateCall.local.ativeFiles.add(el.file.ref.id);
    // }
    // for (const el of state.active.callers) {
    //   stateCall.local.ativeFiles.add(el.file.ref.id);
    // }
  }
};