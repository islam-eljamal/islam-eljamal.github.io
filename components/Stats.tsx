'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { stats } from '@/lib/content';

const tools = ['Claude Code', 'Codex', 'SwiftUI', 'Swift Charts', 'SQL', 'Microsoft Excel', 'Google Sheets', 'Git worktrees', 'Custom agents', 'Custom skills'];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>('[data-count]');
    const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const target = Number(n.dataset.count);
        const obj = { v: 0 };
        n.textContent = '0';
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'expo.out',
          onUpdate: () => (n.textContent = fmt(obj.v)),
          scrollTrigger: { trigger: n, start: 'top 90%', once: true },
        });
      });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="At a glance" className="relative border-y border-line bg-bg-2">
      <div className="overflow-hidden border-b border-line py-5" aria-hidden>
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.16em] text-dim">
          {[...tools, ...tools].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="size-1 rounded-full bg-accent/70" />
            </span>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-4 bg-bg-2 py-10 sm:px-8 lg:py-14 lg:first:pl-0">
              <span className="text-[clamp(2.75rem,4.6vw,4.25rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                <span data-count={s.value}>{s.value.toLocaleString('en-US')}</span>
              </span>
              <span className="max-w-[16rem] text-[15px] leading-snug text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
