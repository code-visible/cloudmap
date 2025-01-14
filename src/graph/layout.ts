import { graphlib, layout } from "@dagrejs/dagre";
import { GraphEdge, GraphFile, GraphFileCall, GraphPkg } from "../state";

export interface Node {
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
};

export interface Edge {
  startID: string,
  endID: string,
  points: number[][],
};

export interface LayoutResult {
  nodes: Map<string, Node>;
  edges: Edge[];
};

export class GraphLayout {
  // layout pkgs
  static layoutPkgsDagre(pkgs: Map<string, GraphPkg>, edges: GraphEdge[], dx: number, dy: number): LayoutResult {
    const result: LayoutResult = {
      nodes: new Map(),
      edges: []
    };

    const dagre = new graphlib.Graph();
    dagre.setGraph({ rankdir: "LR" });
    dagre.setDefaultEdgeLabel(() => ({}));
    // build nodes
    for (const pkg of pkgs.values()) {
      dagre.setNode(pkg.id, { label: pkg.path, width: 160, height: 120 });
    }

    // build edges
    for (const edge of edges) {
      dagre.setEdge(edge.start, edge.end);
    }

    // layout
    layout(dagre);

    for (const pkg of pkgs.values()) {
      const node = dagre.node(pkg.id);
      if (node) {
        result.nodes.set(pkg.id, {
          id: pkg.id,
          x: node.x + dx,
          y: node.y + dy,
          w: 160,
          h: 120,
        });
      }
    }

    for (const id of dagre.edges()) {
      const edge = dagre.edge(id);
      result.edges.push({
        startID: id.v,
        endID: id.w,
        points: edge.points.map(({ x, y }) => ([x + dx, y + dy]))
      })
    }

    return result;
  }

  static layoutFilesDagre(files: Map<string, GraphFile>, edges: GraphEdge[], dx: number, dy: number): LayoutResult {
    const result: LayoutResult = {
      nodes: new Map(),
      edges: []
    };

    const dagre = new graphlib.Graph();
    dagre.setGraph({ rankdir: "LR" });
    dagre.setDefaultEdgeLabel(() => ({}));
    // build nodes
    for (const file of files.values()) {
      dagre.setNode(file.id, { label: file.name, width: 90, height: 90 });
    }

    // build edges
    for (const edge of edges) {
      dagre.setEdge(edge.start, edge.end);
    }

    // layout
    layout(dagre);

    for (const file of files.values()) {
      const node = dagre.node(file.id);
      if (node) {
        result.nodes.set(file.id, {
          id: file.id,
          x: node.x + dx,
          y: node.y + dy,
          w: 90,
          h: 90,
        });
      }
    }

    for (const id of dagre.edges()) {
      const edge = dagre.edge(id);
      result.edges.push({
        startID: id.v,
        endID: id.w,
        points: edge.points.map(({ x, y }) => ([x + dx, y + dy]))
      })
    }

    return result;
  }

  static layoutFileCallsDagre(fileCalls: Map<string, GraphFileCall>, edges: GraphEdge[], dx: number, dy: number): LayoutResult {
    const result: LayoutResult = {
      nodes: new Map(),
      edges: []
    };

    const dagre = new graphlib.Graph();
    dagre.setGraph({ rankdir: "LR" });
    dagre.setDefaultEdgeLabel(() => ({}));
    // build nodes
    for (const fc of fileCalls.values()) {
      dagre.setNode(fc.file.id, { label: fc.file.id, width: 160, height: 56 + 22 * fc.callables.size });
    }

    // build edges
    for (const edge of edges) {
      dagre.setEdge(edge.start, edge.end);
    }

    // layout
    layout(dagre);

    for (const fc of fileCalls.values()) {
      const node = dagre.node(fc.file.id);
      if (node) {
        result.nodes.set(fc.file.id, {
          id: fc.file.id,
          x: node.x + dx,
          y: node.y + dy,
          w: 160,
          h: 56 + fc.callables.size * 22,
        });
      }
    }

    for (const id of dagre.edges()) {
      const edge = dagre.edge(id);
      result.edges.push({
        startID: id.v,
        endID: id.w,
        points: edge.points.map(({ x, y }) => ([x + dx, y + dy]))
      })
    }

    return result;
  }
}