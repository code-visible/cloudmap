import { FileCall } from "../resource/node";
import mayk from "../themes/mayk";
import { Palette } from "../themes/theme";

export const enum GraphType {
  PKG = 1,
  FILE = 2,
  CALL = 3,
}

export interface StatePkg {
  entrance: string;
  active: string;
  set: Set<string>;
}

export interface StateTheme {
  palette: Palette;
}

export interface StateFile {
  entrance: string;
  active: string;
  set: Set<string>;
}

export interface StateCall {
  entrance: string;
  active: string;
  set: Set<FileCall>;
}

export interface StatePannel {
  lock: boolean;
  // expand directories
  expand: Set<string>,
  hover: string;
  // current expanded file, only expand one file at a time
  file: string;
}

export const InitialStatePkg: StatePkg = {
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateFile: StateFile = {
  entrance: "",
  active: "",
};

export const InitialStateCall: StateCall = {
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateTheme: StateTheme = {
  palette: mayk,
};

export const InitialStatePannel: StatePannel = {
  lock: false,
  expand: new Set(),
  hover: "",
  file: "",
}

export const InitialStateGraph = GraphType.PKG;