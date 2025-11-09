import { useState } from "react";
import Header from "./components/Header";
import Arena from "./components/Arena";
import CardPicker from "./components/CardPicker";
import ElixirBar from "./components/ElixirBar";

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [log, setLog] = useState([]);

  const handleDeploy = (pos) => {
    if (!selectedCard) return;
    const entry = `${selectedCard.name} deployed at (${Math.round(pos.x)}, ${Math.round(pos.y)})`;
    setLog((l) => [entry, ...l].slice(0, 6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Arena onDeploy={handleDeploy} />
          <section id="howto" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">Activity</div>
            <ul className="p-4 text-sm text-slate-700 space-y-2">
              {log.length === 0 ? (
                <li className="text-slate-500">Pick a card and click the arena to deploy.</li>
              ) : (
                log.map((item, idx) => <li key={idx}>• {item}</li>)
              )}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <CardPicker onSelect={setSelectedCard} />
          <ElixirBar />
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">About</div>
            <div className="p-4 text-sm text-slate-600">
              <p>
                A lighthearted fan-made experience inspired by the famous arena battler.
                Build a deck, deploy units, and watch colorful effects. Not affiliated with Supercell.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-slate-500">
        Built for fun – a tribute to the vibes of Clash Royale.
      </footer>
    </div>
  );
}
