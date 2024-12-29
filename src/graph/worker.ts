import { GraphMessageType } from "../message";
import { Painter } from "./painter";

const painter = new Painter();
painter.enableDraggingGraph();

onmessage = (ev: MessageEvent) => {
  if (painter.graph.handleMessageEvent(ev)) return;

  switch (ev.data.type) {
    case GraphMessageType.UPDATE_THEME:
      painter.updateStateTheme(ev.data.msg);
      break;
    case GraphMessageType.UPDATE_PKG:
      painter.updateStatePkg(ev.data.msg);
      break;
  }
};
