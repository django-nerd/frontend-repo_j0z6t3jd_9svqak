import { Crown } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-md">
            <Crown className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Royale Arena</h1>
            <p className="text-xs text-slate-500 -mt-0.5">A playful Clash Royale tribute</p>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <a href="#arena" className="hover:text-slate-900 transition-colors">Arena</a>
          <a href="#cards" className="hover:text-slate-900 transition-colors">Cards</a>
          <a href="#howto" className="hover:text-slate-900 transition-colors">How it works</a>
        </nav>
      </div>
    </header>
  );
}
