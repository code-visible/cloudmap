import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { Options } from "../../options/options";
import { Shape } from "../../fragments/shape";

export class HandrawnRenderer {
  rc: RoughCanvas;
  gen: RoughGenerator;
  constructor(rc: RoughCanvas) {
    this.rc = rc;
    this.gen = new RoughGenerator();
  };

  render(shape: Shape) {
    shape.mesh.forEach(e => {
      this.drawMesh(e.path, e.opts);
    });
  };

  private drawMesh(path: string, opts?: Options) {
    const genOpts: any = {
      hachureAngle: 60, // angle of hachure,
      hachureGap: 8,
    };
    if (opts && opts.fill) {
      genOpts.fill = opts.fill;
    }
    if (opts && opts.stroke) {
      genOpts.stroke = opts.stroke;
    }
    const shape: Drawable = this.gen.path(path, opts)
    this.rc.draw(shape);
  };
};