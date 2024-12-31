import { CanvasEvent, Graph } from "@pattaya/depict/graph";
import { GraphType, StatePkg, StateTheme } from "../state";
import { GraphBuilder } from "./builder";
import { statePkg } from "./ui/pkg/state";
import { stateTheme } from "./ui/theme/state";

interface GraphDraggingState {
  x: number,
  y: number,
  dragging: boolean,
};

// draw graph according to the state
export class Painter {
  graphType: GraphType;
  graph: Graph;
  builder: GraphBuilder;
  draggingState: GraphDraggingState;

  constructor() {
    this.graphType = GraphType.PKG;
    this.graph = new Graph();
    this.builder = new GraphBuilder();
    this.draggingState = {
      x: 0,
      y: 0,
      dragging: false,
    };
  }

  updateStateTheme(theme: StateTheme) {
    stateTheme.palette = theme.palette;
    this.graph.renderAll();
  }

  updateStatePkg({ graph, data }: { graph: GraphType, data: StatePkg }) {
    // compare the new state with current state
    // and decide if the graph should be rebuild
    if (GraphType.PKG !== this.graphType || data.entrance !== statePkg.state.entrance) {
      statePkg.state = data;
      this.graphType = graph;
      this.buildLayers();
      this.graph.renderAll();
      return;
    }
    statePkg.state = data;
    this.graph.renderAll();
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

  buildLayers() {
    switch (this.graphType) {
      case GraphType.PKG:
        const layers = this.builder.buildPkgLayers();
        for (let i = 0; i < layers.length; i++) {
          this.graph.updateQueue(i, layers[i]);
          this.graph.dx = 0;
          this.graph.dy = 0;
        }
        return;
      case GraphType.FILE:
        // this.builder.buildFileLayers();
        return;
      case GraphType.CALL:
        // this.builder.buildCallLayers();
        return;
    }
  }
};