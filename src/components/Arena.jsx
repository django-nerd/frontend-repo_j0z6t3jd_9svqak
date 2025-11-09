import { useEffect, useRef } from "react";

// Simple canvas-based arena with two towers and falling confetti when you deploy a card
export default function Arena({ onDeploy }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = 300;
    };
    resize();

    const drawTower = (x) => {
      ctx.fillStyle = "#cbd5e1"; // slate-300
      ctx.fillRect(x - 20, 180, 40, 100);
      ctx.fillStyle = "#334155"; // slate-700
      ctx.fillRect(x - 28, 170, 56, 14);
      ctx.fillStyle = "#f59e0b"; // amber-500 crown
      ctx.beginPath();
      ctx.arc(x, 170, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grass
      ctx.fillStyle = "#22c55e"; // green-500
      ctx.fillRect(0, 260, canvas.width, 40);

      // River
      ctx.fillStyle = "#38bdf8"; // sky-400
      ctx.fillRect(0, 240, canvas.width, 20);

      // Bridges
      ctx.fillStyle = "#64748b";
      ctx.fillRect(canvas.width * 0.33 - 30, 240, 60, 20);
      ctx.fillRect(canvas.width * 0.66 - 30, 240, 60, 20);

      // Towers
      drawTower(60);
      drawTower(canvas.width - 60);

      // Update particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.05; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0 || p.y > canvas.height) particles.splice(i, 1);
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Burst of confetti-like particles
    const colors = ["#60a5fa", "#f472b6", "#facc15", "#34d399", "#c084fc"]; // tailwind palette
    const burst = Array.from({ length: 60 }, () => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 2.5,
      vy: Math.random() * -2.5 - 1,
      life: 60 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    particlesRef.current.push(...burst);
    onDeploy?.({ x, y });
  };

  return (
    <section id="arena" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">
        Arena
      </div>
      <div className="p-4">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="w-full rounded-lg border border-slate-200 cursor-crosshair"
          style={{ height: 300 }}
        />
        <p className="text-xs text-slate-500 mt-2">Click anywhere on the arena to deploy your selected card.</p>
      </div>
    </section>
  );
}
