import { CanvasEvent, Graph, ShadowElement } from "@pattaya/depict/graph";
import { GraphType, StateCall, StateFile, StatePkg, StateTheme } from "../state";
import { GraphBuilder } from "./builder";
import { statePkg } from "./ui/pkg/state";
import { stateTheme } from "./ui/theme/state";
import { stateCall, updateCallState } from "./ui/call/state";
import { stateFile, updateFileState } from "./ui/file/state";

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

  updateStateFile({ graph, data }: { graph: GraphType, data: StateFile }) {
    if (GraphType.FILE !== this.graphType || data.entrance !== stateFile.state.entrance || data.pkg !== stateFile.state.pkg) {
      updateFileState(data);
      this.graphType = graph;
      this.buildLayers();
      this.graph.renderAll();
      return;
    }
    updateFileState(data);
    this.graph.renderAll();
  }

  updateStateCall({ graph, data }: { graph: GraphType, data: StateCall }) {
    if (GraphType.CALL !== this.graphType || data.entrance !== stateCall.state.entrance || data.pkg !== stateCall.state.pkg) {
      updateCallState(data);
      this.graphType = graph;
      this.buildLayers();
      this.graph.renderAll();
      return;
    }
    updateCallState(data);
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
    let layers: ShadowElement[][] = [];
    switch (this.graphType) {
      case GraphType.PKG:
        layers = this.builder.buildPkgLayers();
        break;
      case GraphType.FILE:
        layers = this.builder.buildFileLayers();
        break;
      case GraphType.CALL:
        layers = this.builder.buildCallLayers();
        break;
    }

    for (let i = 0; i < layers.length; i++) {
      this.graph.resetGraph(layers);
    }
    this.graph.dx = 0;
    this.graph.dy = 0;
  }
};