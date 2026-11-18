'use client';

import { useState } from 'react';
import { site } from '@/lib/content';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <>
      {/* How this site was built */}
      <section aria-labelledby="built" className="border-t border-line bg-bg-2 py-20 md:py-28">
        <div className="wrap grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">This website</span>
            <h2 id="built" className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Built the way I work.
            </h2>
          </div>
          <p className="text-[18px] leading-relaxed text-muted lg:col-span-8">
            I set the brief and the direction, and reviewed the result. <span className="text-ink">Claude Code</span> wrote
            the code with Next.js, GSAP, Lenis and React Bits, using the design and animation skills I installed for it. Every number
            on this page comes from my CV, my certificates or the app’s own records.
          </p>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden border-t border-line py-28 md:py-40">
        <div className="pointer-events-none absolute -bottom-60 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,122,69,0.18),transparent_60%)] blur-2xl" aria-hidden />
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h2 data-reveal="heading" className="mt-6 text-[clamp(3rem,8.5vw,8rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
            Let’s make your
            <br />
            <span className="serif text-accent">operations smarter.</span>
          </h2>
          <p data-reveal="rise" className="mt-8 max-w-[36rem] text-[18px] leading-relaxed text-muted">
            Looking for a Working Student role in Berlin from November 2026, about 20 hours a week, in operations, procurement, data,
            project management or AI.
          </p>

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={`mailto:${site.email}`} className="link-draw break-all text-[clamp(1.4rem,3vw,2.4rem)] font-medium tracking-[-0.02em]">
                {site.email}
              </a>
              <button type="button" onClick={copy} className="btn btn-ghost !min-h-11 self-start !px-4 !text-[14px] sm:self-auto" aria-live="polite">
                {copied ? 'Copied ✓' : 'Copy email'}
              </button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                LinkedIn
                <svg className="arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M2 9 9 2m0 0H3.5M9 2v5.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                GitHub
                <svg className="arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M2 9 9 2m0 0H3.5M9 2v5.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
              <a href={site.cv} download className="btn btn-primary">
                Download CV
                <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 1v9m0 0 4-4m-4 4L3 6M1.5 13h11" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="wrap flex flex-col gap-4 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Islam El Jamal · Berlin, Germany</span>
          <a href="#top" className="link-draw flex min-h-11 items-center self-start sm:self-auto">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
