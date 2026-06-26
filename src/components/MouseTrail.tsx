import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  opacity: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    const DOT_COUNT = 6;
    dotsRef.current = Array.from({ length: DOT_COUNT }, () => ({
      x: -100,
      y: -100,
      opacity: 0,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const prev = i === 0 ? mouse : dots[i - 1];

        dot.x += (prev.x - dot.x) * 0.25;
        dot.y += (prev.y - dot.y) * 0.25;
        dot.opacity = Math.max(0, 1 - i / dots.length);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 4 - i * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 111, 71, ${dot.opacity * 0.6})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
