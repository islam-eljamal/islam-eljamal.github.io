'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/content';

const links = [
  { href: '#ai-lab', label: 'AI Lab' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#about', label: 'About' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="wrap pt-3 md:pt-4">
        <nav
          aria-label="Main"
          className={`flex h-14 items-center justify-between rounded-full border pl-2 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500 md:pl-3 ${
            scrolled || open ? 'border-line bg-bg/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="group flex min-h-11 items-center gap-3 rounded-full pr-3" aria-label="Islam El Jamal, back to top">
            <span className="grid size-9 place-items-center rounded-full bg-ink text-[13px] font-semibold tracking-tight text-bg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-8deg]">
              IE
            </span>
            <span className="text-[15px] font-medium tracking-tight">Islam El Jamal</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-11 items-center rounded-full px-4 text-[14px] text-muted transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary hidden !min-h-10 !px-5 !text-[14px] md:inline-flex">
              Contact me
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 bg-bg/95 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        hidden={!open}
      >
        <div className="wrap flex h-full flex-col justify-between pb-10 pt-28">
          <ul className="flex flex-col gap-1">
            {[...links, { href: '#contact', label: 'Contact' }].map((l, i) => (
              <li key={l.href} style={{ transitionDelay: `${open ? 60 + i * 45 : 0}ms` }} className={`transition-all duration-700 ease-[var(--ease-out-expo)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center text-4xl font-semibold tracking-tight">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <a href={site.cv} download className="btn btn-ghost w-full">
              Download CV
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-primary w-full">
              Email me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
