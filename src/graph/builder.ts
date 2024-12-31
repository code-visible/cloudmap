import { ShadowElement } from "@pattaya/depict/graph";
import { GraphLayout } from "./layout";
import { buildPkgCard } from "./ui/pkg/card";
import { buildArrow } from "./ui/pkg/arrow";
import { statePkg } from "./ui/pkg/state";
import data from "../data";
import { buildInfoCard } from "./ui/pkg/info";
import { Pkg } from "../resource/node";

export class GraphBuilder {
  constructor() { }

  buildPkgLayers(): ShadowElement[][] {
    const layer0: ShadowElement[] = [];
    const pkgs = statePkg.state.set;
    if (pkgs.size === 0) return [];
    const pkgSet = new Set<Pkg>();
    for (const el of pkgs) {
      pkgSet.add(data.pkgs.get(el)!);
    }
    const layoutResult = GraphLayout.layoutPkgsDagre(pkgSet, 60, 60);
    for (const pkg of pkgSet) {
      const node = layoutResult.nodes.get(pkg.ref.id);
      if (node) {
        layer0.push(buildPkgCard(node.x - 80, node.y - 60, pkg.ref.id, pkg.path, pkg.files.size, pkg.callables.size, pkg.abstracts.size));
      }
    }
    for (const edge of layoutResult.edges) {
      layer0.push(buildArrow(edge.startID, edge.endID, edge.points));
    }

    const layer1: ShadowElement[] = [buildInfoCard()];

    return [layer0, layer1];
  }

  buildFileLayers(): ShadowElement[][] {
    let layers: ShadowElement[][] = [];

    return layers;
  }

  buildCallLayers(): ShadowElement[][] {
    let layers: ShadowElement[][] = [];

    return layers;
  }
};