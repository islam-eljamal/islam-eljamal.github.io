'use client';

import { useEffect, useRef, useState } from 'react';

type Line = { who: 'claude' | 'codex' | 'quinn' | 'founder'; text: string };

// A replay of the kind of work the Personal Wallet AI Company logs. Numbers are from the fact sheet.
const script: Line[] = [
  { who: 'founder', text: 'request: CSV import for new accounts' },
  { who: 'claude', text: 'brief written → codex, task 47' },
  { who: 'codex', text: 'worktree feature/csv-import ready' },
  { who: 'codex', text: '1,347 core tests passed ✓' },
  { who: 'codex', text: '646 native tests passed ✓' },
  { who: 'quinn', text: 'review: PASS WITH FIXES' },
  { who: 'claude', text: 'fixes applied, claims list checked' },
  { who: 'founder', text: 'approved → merge to main' },
];

const color: Record<Line['who'], string> = {
  claude: 'text-claude',
  codex: 'text-codex',
  quinn: 'text-quinn',
  founder: 'text-ink',
};

export default function AgentConsole({ className = '' }: { className?: string }) {
  const [shown, setShown] = useState<{ line: Line; typed: string; key: number }[]>([]);
  const idx = useRef(0);
  const keyRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(script.slice(-4).map((line, i) => ({ line, typed: line.text, key: i })));
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;

    const typeNext = () => {
      if (!alive) return;
      const line = script[idx.current % script.length];
      idx.current += 1;
      const key = ++keyRef.current;
      setShown((s) => [...s.slice(-3), { line, typed: '', key }]);
      let c = 0;
      const step = () => {
        if (!alive) return;
        c += 1 + Math.floor(Math.random() * 2);
        setShown((s) => s.map((x) => (x.key === key ? { ...x, typed: line.text.slice(0, c) } : x)));
        if (c < line.text.length) timer = setTimeout(step, 22 + Math.random() * 30);
        else timer = setTimeout(typeNext, 900);
      };
      timer = setTimeout(step, 180);
    };
    timer = setTimeout(typeNext, 1600);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`w-[min(100%,340px)] overflow-hidden rounded-2xl border border-line-2 bg-[#0d0d0c]/85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl ${className}`}
      aria-label="Replay of my AI agents working on the Personal Wallet app"
      role="img"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-dim">personal-wallet · agents</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="live-dot !size-1.5" /> live
        </span>
      </div>
      <div className="flex h-[132px] flex-col justify-end gap-1.5 px-4 py-3 font-mono text-[12px] leading-5" aria-hidden>
        {shown.map(({ line, typed, key }, i) => (
          <div key={key} className={`flex gap-2 transition-opacity duration-500 ${i < shown.length - 3 ? 'opacity-30' : ''}`}>
            <span className={`${color[line.who]} w-[58px] shrink-0`}>{line.who}</span>
            <span className={`truncate text-ink/85 ${i === shown.length - 1 && typed.length < line.text.length ? 'caret' : ''}`}>{typed}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
