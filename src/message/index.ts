export const enum GraphMessageType {
  UPDATE_THEME = 1,
  UPDATE_PKG = 2,
  UPDATE_FILE = 3,
  UPDATE_CALL = 4,
};

export interface Message {
  type: GraphMessageType;
  msg: any;
};