import { graphlib, layout } from "@dagrejs/dagre";
import { Callable, File, FileCall, Pkg } from "../resource/node";
import data from "../data";

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
        if (!pkgs.has(target) || pkg === target) continue;
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

  static layoutFilesDagre(files: Set<File>, dx: number, dy: number): LayoutResult {
    const result: LayoutResult = {
      nodes: new Map(),
      edges: []
    };

    const dagre = new graphlib.Graph();
    dagre.setGraph({ rankdir: "LR" });
    dagre.setDefaultEdgeLabel(() => ({}));
    // build nodes
    for (const file of files) {
      dagre.setNode(file.ref.id, { label: file.ref.name, width: 90, height: 90 });
    }

    // build edges
    for (const file of files) {
      for (const target of file.imports) {
        if (!files.has(target) || file === target) continue;
        dagre.setEdge(file.ref.id, target.ref.id);
      }
    }

    // layout
    layout(dagre);

    for (const file of files) {
      const node = dagre.node(file.ref.id);
      if (node) {
        result.nodes.set(file.ref.id, {
          id: file.ref.id,
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

  static layoutFileCallsDagre(fileCalls: Set<FileCall>, dx: number, dy: number): LayoutResult {
    const result: LayoutResult = {
      nodes: new Map(),
      edges: []
    };

    const files = new Set<File>();
    for (const fc of fileCalls) {
      files.add(data.files.get(fc.file)!);
    }

    const dagre = new graphlib.Graph();
    dagre.setGraph({ rankdir: "LR" });
    dagre.setDefaultEdgeLabel(() => ({}));
    // build nodes
    for (const fc of fileCalls) {
      dagre.setNode(fc.file, { label: fc.file, width: 160, height: 56 + 22 * fc.callables.size });
    }

    // build edges
    for (const file of files) {
      for (const target of file.imports) {
        if (file === target || !files.has(target)) continue;
        dagre.setEdge(file.ref.id, target.ref.id);
      }
    }

    // layout
    layout(dagre);

    for (const fc of fileCalls) {
      const node = dagre.node(fc.file);
      if (node) {
        result.nodes.set(fc.file, {
          id: fc.file,
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