import { graphlib, layout } from "@dagrejs/dagre";
import { Pkg } from "../resource/node";

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
  static layoutPkgsDagre(pkgs: Set<Pkg>, dx: number, dy: number): LayoutResult {
    const result: LayoutResult = {
      nodes: new Map(),
      edges: []
    };

    const dagre = new graphlib.Graph();
    dagre.setGraph({ rankdir: "LR" });
    dagre.setDefaultEdgeLabel(() => ({}));
    // build nodes
    for (const pkg of pkgs) {
      dagre.setNode(pkg.ref.id, { label: pkg.path, width: 160, height: 120 });
    }

    // build edges
    for (const pkg of pkgs) {
      for (const target of pkg.imports) {
        if (!pkgs.has(target)) continue;
        dagre.setEdge(pkg.ref.id, target.ref.id);
      }
    }

    // layout
    layout(dagre);

    for (const pkg of pkgs) {
      const node = dagre.node(pkg.ref.id);
      if (node) {
        result.nodes.set(pkg.ref.id, {
          id: pkg.ref.id,
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
}