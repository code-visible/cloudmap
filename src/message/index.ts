export declare enum GraphMessageType {
  UPDATE_STATE = 1,
};

export interface Message {
  type: GraphMessageType;
  msg: any;
};