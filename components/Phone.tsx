import type { ReactNode } from 'react';

/** A drawn iPhone frame. Children fill the screen (1206 × 2622 screenshots). */
export default function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[3rem] bg-gradient-to-b from-[#3a3835] via-[#1c1b19] to-[#2c2a27] p-[7px] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="relative aspect-[1206/2622] overflow-hidden rounded-[2.6rem] bg-black">
        {children}
        <div className="pointer-events-none absolute left-1/2 top-[1.6%] h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      </div>
    </div>
  );
}
