'use client';

import { useEffect, useRef, useState } from 'react';
import { agents } from '@/lib/content';

const toneVar: Record<string, string> = {
  ink: '#f2efe9',
  claude: '#ff8a5c',
  codex: '#7db7ff',
  quinn: '#ff6b7d',
};

function Avatar({ id, tone }: { id: string; tone: string }) {
  if (id === 'founder') {
    return (
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-line-2 bg-[#2a1d16]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/portrait.webp" alt="" width={88} height={88} loading="lazy" className="absolute left-1/2 top-[-6%] w-[190%] max-w-none -translate-x-1/2" />
      </span>
    );
  }
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full font-mono text-[15px] font-semibold" style={{ background: `${tone}22`, color: tone, boxShadow: `inset 0 0 0 1px ${tone}55` }}>
      {id[0].toUpperCase()}
    </span>
  );
}

export default function OrgChart() {
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<string, HTMLDivElement | null>>({});
  const [paths, setPaths] = useState<{ d: string; tone: string }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const r = (id: string) => {
        const n = nodes.current[id]!.getBoundingClientRect();
        return { cx: n.left - b.left + n.width / 2, top: n.top - b.top, bottom: n.bottom - b.top };
      };
      const f = r('founder');
      const c = r('claude');
      const x = r('codex');
      const q = r('quinn');
      const elbow = (a: { cx: number; bottom: number }, z: { cx: number; top: number }) => {
        const mid = a.bottom + (z.top - a.bottom) / 2;
        if (Math.abs(a.cx - z.cx) < 2) return `M${a.cx} ${a.bottom} V${z.top}`;
        const s = Math.sign(z.cx - a.cx);
        const rad = Math.min(14, Math.abs(z.cx - a.cx) / 2, (z.top - a.bottom) / 2);
        return `M${a.cx} ${a.bottom} V${mid - rad} Q${a.cx} ${mid} ${a.cx + s * rad} ${mid} H${z.cx - s * rad} Q${z.cx} ${mid} ${z.cx} ${mid + rad} V${z.top}`;
      };
      setSize({ w: b.width, h: b.height });
      setPaths([
        { d: elbow(f, c), tone: toneVar.claude },
        { d: elbow(c, x), tone: toneVar.codex },
        { d: elbow(c, q), tone: toneVar.quinn },
      ]);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [founder, claude, codex, quinn] = agents;
  const card = (a: (typeof agents)[number]) => (
    <div
      ref={(el) => {
        nodes.current[a.id] = el;
      }}
      className="card card-hover relative z-10 bg-bg-2 p-5"
    >
      <div className="flex items-center gap-3">
        <Avatar id={a.id} tone={toneVar[a.tone]} />
        <div>
          <div className="text-[17px] font-semibold tracking-tight">{a.name}</div>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: toneVar[a.tone] }}>
            {a.role}
          </div>
        </div>
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-muted">{a.body}</p>
    </div>
  );

  return (
    <div ref={box} className="relative">
      <svg className="pointer-events-none absolute inset-0 hidden md:block" width={size.w} height={size.h} aria-hidden>
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="none" stroke="rgba(242,239,233,0.14)" strokeWidth="1.5" />
            <path d={p.d} fill="none" stroke={p.tone} strokeWidth="2" strokeLinecap="round" className="pulse-path" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
        <div className="md:col-span-2 md:mx-auto md:w-1/2">
          {card(founder)}
        </div>
        <div className="md:col-span-2 md:mx-auto md:w-1/2">
          {card(claude)}
        </div>
        {card(codex)}
        {card(quinn)}
      </div>
    </div>
  );
}
