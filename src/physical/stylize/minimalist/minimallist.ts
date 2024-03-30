import { Shape } from "../../fragments/shape";
import { Options } from "../../options/options";

// basic renderer
export class MinimalistRenderer {
  ctx: CanvasRenderingContext2D;

  // don't control ctx it self.
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  };

  render(shape: Shape) {
    shape.mesh.forEach(e => {
      this.drawMesh(e.path, e.opts);
    });
  };

  private drawMesh(path: string, opts?: Options) {
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
  };

  // private drawBezierPath(
  //   path: number[],
  //   color: string,
  // ) {
  //   if (path.length != 4) return;

  //   // const dX = (path[2] - path[0]) * 0;
  //   const dX = (path[2] - path[0]) * 0;
  //   // const dY = (path[3] - path[1]) * (-0.75);
  //   const dY = (path[3] - path[1]) * (-0.75);

  //   const controlPoints = [
  //     {
  //       x: path[0] + dX,
  //       y: path[1] - dY
  //     },
  //     {
  //       x: path[2] - dX,
  //       y: path[3] + dY
  //     }
  //   ];

  //   this.ctx.strokeStyle = color;
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(path[0], path[1]);
  //   this.ctx.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, path[2], path[3]);

  //   this.ctx.stroke();
  // }
} 