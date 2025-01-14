import { File } from "../../../resource/node";
import { InitialStateGraphFile, StateGraphFile } from "../../../state";

export interface StateFileLocal {
  hoverX: number;
  hoverY: number;
  activeFile?: File;
};

export interface GraphStateFile {
  state: StateGraphFile;
  local: StateFileLocal;
};

export const stateFile: GraphStateFile = {
  state: InitialStateGraphFile,
  local: {
    hoverX: 0,
    hoverY: 0,
    activeFile: undefined,
  },
};
