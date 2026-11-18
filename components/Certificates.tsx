'use client';

import { useEffect, useRef, useState } from 'react';
import { certificates } from '@/lib/content';

type Cert = (typeof certificates)[number];

export default function Certificates() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Cert | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      window.__lenis?.stop();
    }
    if (!open && d.open) d.close();
    if (!open) window.__lenis?.start();
  }, [open]);

  return (
    <section id="certificates" className="relative py-28 md:py-40">
      <div className="wrap">
        <span className="eyebrow">Certificates</span>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 data-reveal="heading" className="h2 max-w-[16ch]">
            Proof, <span className="serif text-accent">not promises.</span>
          </h2>
          <p data-reveal="rise" className="max-w-[26rem] text-[17px] leading-relaxed text-muted">
            Open any certificate in full, or check the Google and Udemy ones directly with the issuer.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <li key={c.title} className="card card-hover group flex flex-col overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(c)}
                className="relative block aspect-[4/3] overflow-hidden border-b border-line bg-[#e9e7e2]"
                aria-label={`Open the ${c.title} certificate`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  width={1400}
                  height={1050}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
              </button>
              <div className="flex flex-1 flex-col p-6">
                <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-dim">{c.issuer}</div>
                <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight">{c.title}</h3>
                <div className="mt-1 text-[14px] text-muted">{c.meta}</div>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  <button type="button" onClick={() => setOpen(c)} className="btn btn-ghost !min-h-11 !px-4 !text-[14px]">
                    View
                  </button>
                  {c.verify && (
                    <a href={c.verify} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !px-4 !text-[14px]">
                      Verify
                      <svg className="arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                        <path d="M2 9 9 2m0 0H3.5M9 2v5.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto max-h-[92vh] w-[min(94vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        aria-label={open ? `${open.title} certificate` : 'Certificate'}
      >
        {open && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.image} alt={`${open.title} certificate, ${open.issuer}`} className="mx-auto block max-h-[86vh] w-auto rounded-xl shadow-2xl" />
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -top-3 right-0 grid size-11 -translate-y-full place-items-center rounded-full bg-ink text-bg sm:right-[-12px]"
              aria-label="Close certificate"
              autoFocus
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
