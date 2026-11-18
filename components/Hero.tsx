'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/gsap';
import AgentConsole from './AgentConsole';
import { site } from '@/lib/content';

const DotGrid = dynamic(() => import('./bits/DotGrid'), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const name = SplitText.create('[data-hero-name]', { type: 'chars,lines', mask: 'lines' });
      const tag = SplitText.create('[data-hero-tag]', { type: 'words', mask: 'words' });
      gsap.set('[data-hero]', { visibility: 'visible' });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
      tl.from('[data-hero-pill]', { y: 14, autoAlpha: 0, duration: 0.9 })
        .from(name.chars, { yPercent: 115, duration: 1.3, stagger: 0.035 }, 0.1)
        .from(tag.words, { yPercent: 110, duration: 1.1, stagger: 0.06 }, 0.55)
        .from('[data-hero-copy]', { y: 18, autoAlpha: 0, duration: 1 }, 0.8)
        .from('[data-hero-cta] > *', { y: 18, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.9)
        .fromTo(
          '[data-hero-photo]',
          { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.6, ease: 'expo.inOut' },
          0.2,
        )
        .from('[data-hero-photo] img', { scale: 1.18, yPercent: 6, duration: 1.9, ease: 'expo.out' }, 0.5)
        .from('[data-hero-console]', { y: 40, autoAlpha: 0, duration: 1.2 }, 1.2)
        .from('[data-hero-facts] > *', { y: 12, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, 1.1);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28">
      {/* Interactive dot field */}
      <div
        className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000_20%,transparent_75%)]"
        aria-hidden
      >
        <DotGrid dotSize={2.5} gap={26} baseColor="#2e2b27" activeColor="#ff7a45" proximity={150} glow={0.6} />
      </div>
      <div
        className="pointer-events-none absolute -right-40 top-10 -z-10 size-[720px] rounded-full bg-[radial-gradient(circle,rgba(255,122,69,0.16),transparent_62%)] blur-2xl"
        aria-hidden
      />

      <div className="wrap grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div data-hero data-hero-pill className="mb-8 inline-flex min-h-9 items-center gap-3 rounded-full border border-line bg-ink/[0.03] px-4 text-[13px] text-muted backdrop-blur">
            <span className="live-dot" />
            <span>Open to Working Student roles<span className="hidden sm:inline"> in Berlin · from Nov 2026</span></span>
          </div>

          <h1 className="sr-only">Islam El Jamal, business operations powered by AI</h1>
          <p
            data-hero
            data-hero-name
            aria-hidden
            className="text-[clamp(3.6rem,10.5vw,9.25rem)] font-semibold leading-[0.88] tracking-[-0.055em]"
          >
            Islam
            <br />
            El Jamal
          </p>

          <p data-hero data-hero-tag aria-hidden className="mt-6 text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-ink/90">
            Business operations,<br className="sm:hidden" /> <span className="serif text-accent">powered by AI.</span>
          </p>

          <p data-hero data-hero-copy className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted">
            Business Information Systems graduate and Master’s student in Berlin. Roles in procurement, accounting, customer
            service and data since 2021, and a native iPhone app I built by directing a small team of AI agents.
          </p>

          <div data-hero data-hero-cta className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#ai-lab" className="btn btn-primary w-full sm:w-auto">
                See my AI work
                <svg className="arrow arrow-down" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 1v12m0 0 5-5m-5 5L2 8" stroke="currentColor" strokeWidth="1.6" />
                </svg>
            </a>
            <a href={site.cv} download className="btn btn-ghost w-full sm:w-auto">
              Download CV
              <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 1v9m0 0 4-4m-4 4L3 6M1.5 13h11" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none">
          <div
            data-hero
            data-hero-photo
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(120%_80%_at_50%_100%,#3a2216_0%,#1a1513_45%,#121110_100%)]"
          >
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_60%_at_50%_70%,rgba(255,122,69,0.35),transparent_70%)]" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/portrait.webp"
              alt="Portrait of Islam El Jamal"
              width={1000}
              height={1000}
              fetchPriority="high"
              className="absolute bottom-0 left-1/2 w-[118%] max-w-none -translate-x-1/2 select-none"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121110] to-transparent" aria-hidden />
            <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70">
              <span className="size-1.5 rounded-full bg-accent" /> Berlin, Germany
            </div>
          </div>
          <div data-hero data-hero-console className="relative -mt-16 ml-4 sm:-ml-10 lg:absolute lg:-bottom-8 lg:-left-16 lg:mt-0">
            <AgentConsole />
          </div>
        </div>
      </div>

      <div className="wrap mt-16 pb-8 lg:mt-10">
        <div data-hero-facts className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-dim">
          <span data-hero>B.Sc. Management Information Systems</span>
          <span data-hero>Master’s · UE University Berlin</span>
          <span data-hero>Arabic · English B2 · German A2</span>
          <span data-hero className="ml-auto hidden items-center gap-2 md:flex">
            Scroll
            <span className="relative block h-6 w-px overflow-hidden bg-line-2">
              <span className="absolute inset-x-0 top-0 h-2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-ink" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
