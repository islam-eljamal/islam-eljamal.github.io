'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { story } from '@/lib/content';

export default function About() {
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = text.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-w]'),
        { opacity: 0.16 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 55%', scrub: 0.5 } },
      );
    });
    return () => ctx.revert();
  }, []);

  const words = story.split(' ');
  const highlight = new Set(['Tripoli,', 'Lebanon,', 'clean', 'data', 'AI', 'agents', 'Berlin', 'faster,', 'smarter', 'human.']);

  return (
    <section id="about" className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,122,69,0.1),transparent_62%)] blur-2xl" aria-hidden />
      <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <span className="eyebrow">About</span>
          <h2 className="mt-6 text-[clamp(1.5rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.02em]">My story</h2>
          <div className="mt-8 hidden w-40 overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_80%_at_50%_100%,#3a2216_0%,#151312_70%)] lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/portrait.webp" alt="" width={1000} height={1000} loading="lazy" className="block w-full" />
          </div>
        </div>
        <p ref={text} className="text-[clamp(1.6rem,3.1vw,2.75rem)] font-medium leading-[1.22] tracking-[-0.025em] lg:col-span-9">
          {words.map((w, i) => (
            <span key={i} data-w className={highlight.has(w) ? 'serif text-accent' : ''}>
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
