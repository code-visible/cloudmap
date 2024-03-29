// basic renderer
export class MinimalistRenderer {
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  };

  drawNode() {
    this.drawBasicNode();
  };

  private drawBasicNode() {
    this.debugDrawNode(10, 20, 200, 123, 10, "#ffe", "#677");
  };

  // test render a node
  // try to draw a rectangle with a border radius of given number.
  private debugDrawNode(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: any,
    backgroundColor: string,
    borderColor: string,
  ) {
    // radius = 5 or radius = {tl: 1, tr: 2, ...}
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (let side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }

    // set border color
    this.ctx.strokeStyle = borderColor;
    // draw border
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius.tl, y);
    this.ctx.lineTo(x + width - radius.tr, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    this.ctx.lineTo(x + width, y + height - radius.br);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height,
    );
    this.ctx.lineTo(x + radius.bl, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    this.ctx.lineTo(x, y + radius.tl);
    this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    this.ctx.closePath();

    // fill background
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fill();

    // TODO: whether should I stroke here or upper layer?
    this.ctx.stroke();
  };

  drawEdge() {
    this.drawStepEdge();
  };

  private drawStepEdge() {
    this.debugDrawEdge(1, 2, 200, 300);
  };

  // debug draw an edge
  // target should be a step line with an arrow
  private debugDrawEdge(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ) {
    // TODO: draw a step line
  };
}