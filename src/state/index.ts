import { FileCall } from "../resource/node";
import mayk from "../themes/mayk";
import { Palette } from "../themes/theme";

export const enum GraphType {
  PKG = 1,
  FILE = 2,
  CALL = 3,
  REF = 4,
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
  pkg: string;
  entrance: string;
  active: string;
  set: Set<string>;
}

export interface StateCall {
  pkg: string;
  entrance: string;
  active: string;
  set: Set<FileCall>;
}

export interface ResourceSet {
  pkgs: Set<string>;
  fs: Set<string>;
  fns: Set<string>;
  abs: Set<string>;
}

export interface StateSearch {
  keyword: string;
  match: ResourceSet;
  highlight: boolean;
}

export interface StateHover {
  typ: GraphType;
  id: string;
}

// expand directories and files
export interface StateExpand {
  pkgs: Set<string>;
  fs: Set<string>;
}

export interface StateShared {
  mutePannel: boolean;
  hide: ResourceSet,
}

export interface StatePannel {
  search: StateSearch;
  expand: StateExpand,
  hover: StateHover;
}

export const InitialStatePkg: StatePkg = {
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateFile: StateFile = {
  pkg: "",
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateCall: StateCall = {
  pkg: "",
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateTheme: StateTheme = {
  palette: mayk,
};

export const InitialStatePannel: StatePannel = {
  search: {
    keyword: "",
    match: {
      pkgs: new Set<string>(),
      fs: new Set<string>(),
      fns: new Set<string>(),
      abs: new Set<string>(),
    },
    highlight: true,
  },
  expand: {
    pkgs: new Set<string>(),
    fs: new Set<string>(),
  },
  hover: {
    typ: GraphType.PKG,
    id: "",
  },
}

export const InitialStateShared: StateShared = {
  mutePannel: false,
  hide: {
    pkgs: new Set<string>(),
    fs: new Set<string>(),
    fns: new Set<string>(),
    abs: new Set<string>(),
  }
}

export const InitialStateGraph = GraphType.PKG;