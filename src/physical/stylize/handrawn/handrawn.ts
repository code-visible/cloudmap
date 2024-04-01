import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable, Options } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { Options as Opts } from "../../fragments/options";
import { Renderer } from "../renderer";

export function generateSeed(): number {
  return RoughGenerator.newSeed();
};

export class HandrawnRenderer extends Renderer {
  rc: RoughCanvas;
  gen: RoughGenerator;

  constructor(rc: RoughCanvas) {
    super();
    this.rc = rc;
    this.gen = new RoughGenerator();
  };

  mesh(path: string, opts?: Opts) {
    const genOpts: Options = {
      hachureAngle: 60, // angle of hachure,
      hachureGap: 8,
    };
    if (opts && opts.fill) {
      genOpts.fill = opts.fill;
    }
    if (opts && opts.stroke) {
      genOpts.stroke = opts.stroke;
    }
    if (opts && opts.seed) {
      genOpts.seed = opts.seed;
    }
    const shape: Drawable = this.gen.path(path, genOpts)
    this.rc.draw(shape);
  };
};