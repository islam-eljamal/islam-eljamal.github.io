'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '@/lib/gsap';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth scroll (Lenis) synced with GSAP, plus the shared reveal for section headings.
 * Under reduced motion nothing is hidden and nothing moves.
 */
export default function Motion() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.remove('js-motion');
      return;
    }

    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchor links scroll through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!;
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: id === '#top' ? 0 : -72, duration: 1.4 });
      history.replaceState(null, '', id);
    };
    document.addEventListener('click', onClick);

    const ctx = gsap.context(() => {
      // Headings: lines rise out of a mask, once
      document.querySelectorAll<HTMLElement>('[data-reveal="heading"]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
        gsap.set(el, { visibility: 'visible' });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
      // Supporting copy under a heading: a short rise, once
      document.querySelectorAll<HTMLElement>('[data-reveal="rise"]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'expo.out',
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });
    });

    // Fonts change line breaks: re-measure once they are in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      ctx.revert();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
