import { InitialStateFile, StateFile } from "../../../state";

export interface StateFileLocal {
    hoverX: number;
    hoverY: number;
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
    },
};