import { Text } from "../fragments/text";

export class TextWriter {
  ctx: CanvasRenderingContext2D;

  // don't control ctx it self.
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  };

  write(t: Text) {
    this.ctx.textBaseline = "top";
    this.ctx.font = `${t.size}px ${t.family}`;
    this.ctx.fillStyle = t.color;
    this.ctx.fillText(t.content, t.x, t.y, t.maxWidth);
  };
};
