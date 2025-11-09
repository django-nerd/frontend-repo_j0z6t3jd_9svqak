import { useEffect, useState } from "react";

export default function ElixirBar() {
  const MAX = 10;
  const [elixir, setElixir] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setElixir((v) => Math.min(MAX, v + 0.25));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">
        Elixir
      </div>
      <div className="p-4">
        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500 transition-all"
            style={{ width: `${(elixir / MAX) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-slate-700">
          {elixir.toFixed(1)} / {MAX}
        </p>
      </div>
    </section>
  );
}
