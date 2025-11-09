import { useState } from "react";
import { Flame, Shield, Sword, Zap } from "lucide-react";

const CARDS = [
  { id: "knight", name: "Knight", icon: Sword, elixir: 3, color: "from-blue-500 to-indigo-500" },
  { id: "archers", name: "Archers", icon: Shield, elixir: 3, color: "from-emerald-500 to-teal-500" },
  { id: "fireball", name: "Fireball", icon: Flame, elixir: 4, color: "from-rose-500 to-pink-500" },
  { id: "zap", name: "Zap", icon: Zap, elixir: 2, color: "from-amber-500 to-orange-500" },
];

export default function CardPicker({ onSelect }) {
  const [active, setActive] = useState(CARDS[0].id);

  const handleSelect = (id) => {
    setActive(id);
    const card = CARDS.find((c) => c.id === id);
    onSelect?.(card);
  };

  return (
    <section id="cards" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">
        Your Deck
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CARDS.map((card) => {
          const Icon = card.icon;
          const selected = card.id === active;
          return (
            <button
              key={card.id}
              onClick={() => handleSelect(card.id)}
              className={`group relative rounded-xl p-3 border text-left transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                selected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow`}> 
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-slate-800">{card.name}</p>
                <p className="text-xs text-slate-500">{card.elixir} elixir</p>
              </div>
              {selected && (
                <span className="absolute top-2 right-2 inline-flex items-center rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-medium text-white">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
