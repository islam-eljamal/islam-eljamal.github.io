'use client';

import { useEffect, useRef, useState } from 'react';
import Phone from './Phone';
import { walletSteps, walletStack, walletNumbers } from '@/lib/content';

type Mode = 'light' | 'dark';

function Screen({ step, mode, active, eager }: { step: (typeof walletSteps)[number]; mode: Mode; active: boolean; eager?: boolean }) {
  const name = mode === 'dark' && 'dark' in step ? step.dark : step.light;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/media/app/${name}.webp`}
      alt={`Personal Wallet, ${step.title} screen`}
      width={640}
      height={1391}
      loading={eager ? 'eager' : 'lazy'}
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
        active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
      }`}
    />
  );
}

function ModeSwitch({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div role="group" aria-label="App appearance" className="inline-flex rounded-full border border-line bg-ink/[0.03] p-1">
      {(['light', 'dark'] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
          className={`min-h-9 rounded-full px-4 text-[13px] capitalize transition-colors duration-300 ${
            mode === m ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
          }`}
        >
          {m} mode
        </button>
      ))}
    </div>
  );
}

export default function WalletCase() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>('light');
  const [playing, setPlaying] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      setPlaying(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && playing) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [playing]);

  const toggleVideo = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="mt-24 md:mt-32">
      <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">Case 01</span>
          <h3 data-reveal="heading" className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.035em]">
            Personal Wallet
          </h3>
          <p data-reveal="rise" className="mt-4 max-w-[36rem] text-[17px] leading-relaxed text-muted">
            A native iPhone app for everyday money. It answers one question clearly: how much of my money is actually free to spend
            this month? Pre-launch, running on my iPhone.
          </p>
        </div>
        <ModeSwitch mode={mode} setMode={setMode} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Sticky phone, desktop */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(50vh-320px)]">
            <div className="relative mx-auto w-[290px]">
              <div className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,122,69,0.18),transparent_65%)] blur-2xl" aria-hidden />
              <Phone>
                {walletSteps.map((s, i) => (
                  <Screen key={s.title} step={s} mode={mode} active={i === active} eager={i === 0} />
                ))}
              </Phone>
            </div>
            <div className="mx-auto mt-6 flex w-[290px] justify-center gap-2" aria-hidden>
              {walletSteps.map((s, i) => (
                <span key={s.title} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-accent' : 'w-3 bg-line-2'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {walletSteps.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                steps.current[i] = el;
              }}
              data-i={i}
              className="flex flex-col gap-8 border-b border-line py-10 last:border-b-0 sm:flex-row sm:items-center lg:min-h-[78vh] lg:py-0"
            >
              <div className={`transition-opacity duration-500 lg:max-w-[30rem] ${i === active ? 'lg:opacity-100' : 'lg:opacity-35'}`}>
                <span className="font-mono text-[13px] text-dim">0{i + 1} / 0{walletSteps.length}</span>
                <h4 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{s.title}</h4>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">{s.body}</p>
              </div>
              {/* Inline phone, phone and tablet */}
              <div className="mx-auto w-[220px] shrink-0 sm:mx-0 sm:ml-auto lg:hidden">
                <Phone>
                  <Screen step={s} mode={mode} active />
                </Phone>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Numbers + demo video */}
      <div className="mt-16 grid grid-cols-1 items-center gap-12 rounded-[28px] border border-line bg-bg-2 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
        <div className="lg:col-span-7">
          <h4 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            A real app, <span className="serif text-accent">built by directing AI agents.</span>
          </h4>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {walletNumbers.map((n) => (
              <div key={n.label} className="bg-bg-2 p-5 sm:p-6">
                <dt className="text-[14px] text-muted">{n.label}</dt>
                <dd className="mt-1 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-[-0.04em] tabular-nums">{n.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-2">
            {walletStack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-[34rem] text-[15px] leading-relaxed text-muted">
            <span className="text-ink">No AI inside the app, on purpose.</span> Every number comes from plain, tested arithmetic,
            the same inputs always give the same answer, and nothing leaves the phone. AI built the app; it does not run in it.
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 lg:col-span-5">
          <div className="w-[250px]">
            <Phone>
              <video
                ref={video}
                className="absolute inset-0 h-full w-full object-cover"
                src="/media/app/wallet-demo.mp4"
                poster="/media/app/wallet-demo-poster.webp"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="18-second demo: adding a €24.80 grocery expense in Personal Wallet"
              />
            </Phone>
          </div>
          <button type="button" onClick={toggleVideo} className="btn btn-ghost !min-h-11 !text-[14px]">
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M2 1l9 5-9 5z" fill="currentColor" />
              </svg>
            )}
            {playing ? 'Pause demo' : 'Play demo'}
          </button>
        </div>
      </div>
    </div>
  );
}
