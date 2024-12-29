import { CanvasEvent, Graph } from "@pattaya/depict/graph";

const gw = new Graph();

onmessage = (ev: MessageEvent) => {
  gw.handleMessageEvent(ev);
};
