import { ShadowElement } from "@pattaya/depict/graph";
import { GraphLayout } from "./layout";
import { buildPkgCard } from "./ui/pkg/card";
import { buildArrow } from "./ui/pkg/arrow";
import { statePkg } from "./ui/pkg/state";
import { buildInfoCard } from "./ui/pkg/tip";
import { stateCall } from "./ui/call/state";
import { buildCallCard } from "./ui/call/card";
import { stateFile } from "./ui/file/state";
import { buildFileNode } from "./ui/file/file";
import { buildLineArrow } from "./ui/file/arrow";
import { buildCallArrow } from "./ui/call/arrow";
import { buildFileTip } from "./ui/file/tip";
import { buildCallTip } from "./ui/call/tip";
import { GraphCallable } from "../state";

export class GraphBuilder {
  constructor() { }

  buildPkgLayers(): ShadowElement[][] {
    const layer1: ShadowElement[] = [];
    const pkgs = statePkg.state.nodes;
    if (pkgs.size === 0) return [[], []];
    const layoutResult = GraphLayout.layoutPkgsDagre(pkgs, statePkg.state.edges, 60, 60);
    for (const pkg of pkgs.values()) {
      const node = layoutResult.nodes.get(pkg.id);
      if (node) {
        layer1.push(buildPkgCard(node.x - 80, node.y - 60, pkg));
      }
    }
    for (const edge of layoutResult.edges) {
      layer1.push(buildArrow(edge.startID, edge.endID, edge.points));
    }

    layer1.push(buildInfoCard());

    return [layer1];
  }

  buildFileLayers(): ShadowElement[][] {
    const layer1: ShadowElement[] = [];
    const files = stateFile.state.nodes;
    if (files.size === 0) return [[], []];
    const layoutResult = GraphLayout.layoutFilesDagre(files, stateFile.state.edges, 60, 60);

    for (const file of files.values()) {
      const node = layoutResult.nodes.get(file.id);
      if (node) {
        layer1.push(buildFileNode(node.x - 0, node.y - 0, 20, file, false));
      }
    }

    for (const edge of layoutResult.edges) {
      const start = layoutResult.nodes.get(edge.startID)!;
      const end = layoutResult.nodes.get(edge.endID)!;
      layer1.push(buildLineArrow(edge.startID, edge.endID, start.x, start.y, end.x, end.y));
    }

    layer1.push(buildFileTip());

    return [layer1];
  }

  buildCallLayers(): ShadowElement[][] {
    const layer1: ShadowElement[] = [];
    const fileCalls = stateCall.state.nodes;
    if (fileCalls.size === 0) return [[], []];
    const layoutResult = GraphLayout.layoutFileCallsDagre(fileCalls, stateCall.state.edges, 60, 60);
    for (const fc of fileCalls.values()) {
      const node = layoutResult.nodes.get(fc.file.id);
      if (node) {
        const callables: GraphCallable[] = [];
        for (const el of fc.callables.values()) {
          callables.push(el);
        }
        let enter = false;
        if (stateCall.state.entrance && (stateCall.state.entrance.pkg === fc.file.pkg)) {
          enter = true;
        }
        layer1.push(buildCallCard(node.x - node.w / 2, node.y - node.h / 2, node.w, node.h, fc.file, callables, enter));
      }
    }
    for (const edge of layoutResult.edges) {
      layer1.push(buildCallArrow(edge.startID, edge.endID, edge.points));
    }

    layer1.push(buildCallTip());

    return [layer1];
  }
};