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
}

export interface StateTheme {
  palette: Palette;
}

export interface StateFile { }

export interface StateCall { }

export const InitialStatePkg: StatePkg = {
  entrance: "",
  active: ""
};

export const InitialStateTheme: StateTheme = {
  palette: mayk,
};

export const InitialStateGraph = GraphType.PKG;