import { useEffect, useRef } from "react";

function Graph() {
  const graphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // get canvas reference
    const graph = graphRef.current;
    if (graph === null) return;

    const graphWidth = window.innerWidth * 2;
    const graphHeight = window.innerHeight * 2;

    // prevent canvas blur
    graph.setAttribute('width', graphWidth + 'px');
    graph.setAttribute('height', graphHeight + 'px');

    // nice fix from https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry to remove blurry drawing
    graph.style.height = (graphHeight / 2) + "px";
    graph.style.width = (graphWidth / 2) + "px";

    const ctx = graph.getContext('2d');
    if (ctx === null) return;

    ctx.scale(2, 2);
    ctx.translate(-0.5, -0.5);

    return () => {
      // TODO: clear
    };
  }, []);

  return (
    <canvas
      id="graph"
      ref={graphRef}
    >
    </canvas>
  )
};

export default Graph;
