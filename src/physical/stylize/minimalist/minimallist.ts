import { Options } from "../../fragments/options";
import { Renderer } from "../renderer";

// basic renderer
export class MinimalistRenderer extends Renderer {
  ctx: CanvasRenderingContext2D;

  // don't control ctx it self.
  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.ctx = ctx;
  };

  mesh(path: string, opts?: Options) {
    this.ctx.save();
    const p2d = new Path2D(path);

    if (opts && opts.stroke) {
      this.ctx.strokeStyle = opts.stroke;
    } else {
      this.ctx.strokeStyle = "#000";
    }

    this.ctx.stroke(p2d);

    if (opts && opts.fill) {
      this.ctx.fillStyle = opts.fill;
      this.ctx.fill(p2d);
    }
    this.ctx.restore();
  };
} 