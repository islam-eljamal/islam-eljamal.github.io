'use client';

import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { experience, education, skillGroups, languages } from '@/lib/content';

export default function Experience() {
  const line = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const langs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } },
      );
      list.current?.querySelectorAll<HTMLElement>('[data-dot]').forEach((d) => {
        gsap.fromTo(
          d,
          { backgroundColor: '#2a2926', scale: 0.7 },
          { backgroundColor: '#ff7a45', scale: 1, duration: 0.4, scrollTrigger: { trigger: d, start: 'top 62%', toggleActions: 'play none none reverse' } },
        );
      });
      langs.current?.querySelectorAll<HTMLElement>('[data-fill]').forEach((bar) => {
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: Number(bar.dataset.fill), duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: bar, start: 'top 90%', once: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative border-t border-line bg-bg-2 py-28 md:py-40">
      <div className="wrap">
        <span className="eyebrow">Experience</span>
        <h2 data-reveal="heading" className="h2 mt-6 max-w-[18ch]">
          From Tripoli to Berlin, <span className="serif text-accent">one process at a time.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-7">
            <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden />
            <div ref={line} className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent" aria-hidden />
            <ol ref={list} className="flex flex-col gap-12">
              {experience.map((job) => (
                <li key={job.title} className="relative pl-10">
                  <span data-dot className="absolute left-0 top-[7px] size-[11px] rounded-full bg-accent ring-4 ring-bg-2" aria-hidden />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.1em] text-dim">
                    <span>{job.date}</span>
                    {job.note && <span className="normal-case tracking-normal">({job.note})</span>}
                  </div>
                  <h3 className="mt-2 text-[clamp(1.4rem,2.4vw,1.85rem)] font-semibold leading-tight tracking-[-0.025em]">{job.title}</h3>
                  <div className="mt-1 text-[15px] text-muted">
                    {job.org} · {job.place}
                  </div>
                  <ul className="mt-4 flex flex-col gap-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="relative pl-5 text-[15px] leading-relaxed text-ink/80 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-dim">
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Education</h3>
              <div className="mt-5 flex flex-col gap-3">
                {education.map((e) => (
                  <div key={e.title} className="card card-hover p-6">
                    <div className="font-mono text-[12px] text-dim">{e.date}</div>
                    <div className="mt-2 text-[18px] font-semibold leading-snug tracking-tight">{e.title}</div>
                    <div className="mt-1 text-[14px] text-muted">{e.org}</div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={langs}>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Languages</h3>
              <div className="mt-5 flex flex-col gap-5">
                {languages.map((l) => (
                  <div key={l.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[16px] font-medium">{l.name}</span>
                      <span className="text-right text-[13px] text-muted">{l.level}</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                      <div data-fill={l.fill} className="h-full origin-left rounded-full bg-ink" style={{ transform: `scaleX(${l.fill})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Skills</h3>
              <div className="mt-5 flex flex-col gap-6">
                {skillGroups.map((g) => (
                  <div key={g.title}>
                    <div className="text-[14px] text-ink">{g.title}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((i) => (
                        <span key={i} className="chip">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
