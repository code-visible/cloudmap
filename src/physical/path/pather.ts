export class Pather {
  Node(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: any,
  ): string {
    // radius = 5 or radius = {tl: 1, tr: 2, ...}
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (let side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }

    const path = `
      M ${x + radius.tl} ${y} 
      L ${x + width - radius.tr} ${y} 
      Q ${x + width} ${y}, ${x + width} ${y + radius.tr} 
      L ${x + width} ${y + height - radius.br}
      Q ${x + width} ${y + height}, ${x + width - radius.br} ${y + height}
      L ${x + radius.bl} ${y + height}
      Q ${x} ${y + height}, ${x} ${y + height - radius.bl}
      L ${x} ${y + radius.tl}
      Q ${x} ${y}, ${x + radius.tl} ${y}
      Z
    `;

    return path;
  };

  Arrow(
    x: number,
    y: number,
  ): string {
    const path = `
      M ${x - 4} ${y}
      L ${x + 4} ${y}
      L ${x} ${y + 8}
      Z
    `;
    return path;
  };

  Circle(
    x: number,
    y: number,
    r: number,
  ): string {
    const path = `
      M ${x} ${y}
      m ${r}, 0
      a ${r}, ${r} 0 1, 0 ${-2 * r}, 0
      a ${r}, ${r} 0 1, 0 ${2 * r}, 0
    `;
    return path;
  }

  StepLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  ): string {
    const ym = (y0 + y1) / 2;
    const path = `
      M ${x0} ${y0} 
      L ${x0} ${ym}
      L ${x1} ${ym}
      L ${x1} ${y1}
    `;
    return path;
  }
};