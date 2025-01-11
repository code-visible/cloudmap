import data from "../../../data";
import { File } from "../../../resource/node";
import { InitialStateFile, StateFile } from "../../../state";

export interface StateFileLocal {
  hoverX: number;
  hoverY: number;
  activeFile?: File;
};

export interface GraphStateFile {
  state: StateFile;
  local: StateFileLocal;
};

export const stateFile: GraphStateFile = {
  state: InitialStateFile,
  local: {
    hoverX: 0,
    hoverY: 0,
    activeFile: undefined,
  },
};

export const updateFileState = (state: StateFile) => {
  stateFile.state = state;
  if (state.active === "") {
    stateFile.local.activeFile = undefined;
    return;
  }
  stateFile.local.activeFile = data.files.get(state.active);
};