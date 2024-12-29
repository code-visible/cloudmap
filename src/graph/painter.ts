import { CanvasEvent, Graph } from "../depict/graph/index";
import { GraphType, StatePkg, StateTheme } from "../state";

interface GraphDraggingState {
  x: number,
  y: number,
  dragging: boolean,
};

// draw graph according to the state
export class Painter {
  graphType: GraphType;
  graph: Graph;
  draggingState: GraphDraggingState;

  constructor() {
    this.graphType = GraphType.PKG;
    this.graph = new Graph();
    this.draggingState = {
      x: 0,
      y: 0,
      dragging: false,
    };
  }

  updateStateTheme(theme: StateTheme) {
  }

  updateStatePkg({ graph, data }: { graph: GraphType, data: StatePkg }) {

  }

  disableDraggingGraph() {
    this.graph.preHandle = null;
    this.graph.postHandle = null;
  }

  enableDraggingGraph() {
    this.graph.preHandle = (typ: CanvasEvent, x: number, y: number): boolean => {
      if (typ === CanvasEvent.MOUSE_UP && this.draggingState.dragging) {
        this.draggingState.dragging = false;
        return true;
      }
      if (typ === CanvasEvent.MOUSE_MOVE && this.draggingState.dragging) {
        this.graph.dx += x - this.draggingState.x;
        this.graph.dy += y - this.draggingState.y;
        this.draggingState.x = x;
        this.draggingState.y = y;
        this.graph.renderAll();
        return true;
      }
      return false;
    }

    this.graph.postHandle = (triggered: boolean, typ: CanvasEvent, x: number, y: number): void => {
      if (!triggered && typ === CanvasEvent.MOUSE_DOWN) {
        this.draggingState.x = x;
        this.draggingState.y = y;
        this.draggingState.dragging = true;
      }
    }
  }
};