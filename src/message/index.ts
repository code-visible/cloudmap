export const enum GraphMessageType {
  UPDATE_THEME = 1,
  UPDATE_PKG = 2,
};

export interface Message {
  type: GraphMessageType;
  msg: any;
};