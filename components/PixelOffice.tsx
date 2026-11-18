'use client';

import { useEffect, useRef, useState } from 'react';

/*
 * An original pixel-art office, drawn in code. Inspired by the Pixel Agents view I use in VS Code
 * to watch my agents work. 256 × 144 logical pixels, scaled up crisp.
 */

const W = 256;
const H = 144;
const CORRIDOR = 98;

type Pt = [number, number];
type Dir = 'up' | 'down' | 'left' | 'right';
type Task = { to: Pt | 'seat'; act: 'type' | 'idle'; dur: number; say?: string; face?: Dir };
type Look = { skin: string; hair: string; shirt: string; pants: string; curly?: boolean; collar?: string };
type Person = {
  id: string;
  label: string;
  tone: string;
  look: Look;
  seat?: Pt;
  tasks: Task[];
  // runtime
  x: number;
  y: number;
  path: Pt[];
  ti: number;
  wait: number;
  dir: Dir;
  walking: boolean;
  sitting: boolean;
  typing: boolean;
  say: string;
  sayT: number;
};

const SPOT = {
  board: [85, 52] as Pt,
  window: [171, 52] as Pt,
  coffee: [243, 66] as Pt,
  byCodex: [150, 88] as Pt,
  byClaude: [66, 88] as Pt,
  rug: [128, 116] as Pt,
  rugL: [92, 120] as Pt,
  rugR: [176, 112] as Pt,
};

function makePeople(): Person[] {
  const base = { x: 0, y: 0, path: [] as Pt[], ti: 0, wait: 0, dir: 'up' as Dir, walking: false, sitting: false, typing: false, say: '', sayT: 0 };
  return [
    {
      ...base,
      id: 'claude',
      label: 'Claude',
      tone: '#ff8a5c',
      look: { skin: '#f1c7a0', hair: '#3a2a20', shirt: '#e8743f', pants: '#2f3340' },
      seat: [42, 81],
      tasks: [
        { to: 'seat', act: 'type', dur: 6, say: 'planning task 47' },
        { to: SPOT.board, act: 'idle', dur: 3, say: 'sprint plan', face: 'up' },
        { to: SPOT.byCodex, act: 'idle', dur: 2.6, say: 'brief → codex', face: 'left' },
        { to: 'seat', act: 'type', dur: 7, say: 'editing the video' },
        { to: SPOT.coffee, act: 'idle', dur: 2.5, face: 'up' },
      ],
    },
    {
      ...base,
      id: 'codex',
      label: 'Codex',
      tone: '#7db7ff',
      look: { skin: '#d9a27a', hair: '#1c1714', shirt: '#3f7fd9', pants: '#2a2d36' },
      seat: [128, 81],
      tasks: [
        { to: 'seat', act: 'type', dur: 8, say: 'building in worktree' },
        { to: 'seat', act: 'type', dur: 5, say: '1,347 tests ✓' },
        { to: SPOT.coffee, act: 'idle', dur: 3, face: 'up' },
        { to: 'seat', act: 'type', dur: 6, say: 'report saved' },
      ],
    },
    {
      ...base,
      id: 'quinn',
      label: 'Quinn',
      tone: '#ff6b7d',
      look: { skin: '#f3cfb0', hair: '#c99a45', shirt: '#cf4156', pants: '#33303a' },
      seat: [214, 81],
      tasks: [
        { to: 'seat', act: 'type', dur: 9, say: 'reading the diff' },
        { to: SPOT.byCodex, act: 'idle', dur: 2.8, say: 'review: PASS', face: 'left' },
        { to: 'seat', act: 'type', dur: 6 },
        { to: SPOT.window, act: 'idle', dur: 3, face: 'up' },
      ],
    },
    {
      ...base,
      id: 'you',
      label: 'You',
      tone: '#f2efe9',
      look: { skin: '#e8b996', hair: '#5b3b22', shirt: '#1b1d22', pants: '#1b1d22', curly: true, collar: '#f4f4f0' },
      tasks: [
        { to: SPOT.rug, act: 'idle', dur: 2.5, face: 'up' },
        { to: SPOT.window, act: 'idle', dur: 3.5, face: 'up' },
        { to: SPOT.byClaude, act: 'idle', dur: 2.6, say: 'approved ✓', face: 'left' },
        { to: SPOT.board, act: 'idle', dur: 3, say: 'next: launch', face: 'up' },
        { to: SPOT.rugR, act: 'idle', dur: 2, face: 'down' },
        { to: SPOT.coffee, act: 'idle', dur: 2.5, face: 'up' },
        { to: SPOT.rugL, act: 'idle', dur: 2, face: 'down' },
      ],
    },
  ];
}

const desks = [
  { x: 20, owner: 'claude' },
  { x: 106, owner: 'codex' },
  { x: 192, owner: 'quinn' },
];

function rect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, col: string) {
  c.fillStyle = col;
  c.fillRect(Math.round(x), Math.round(y), w, h);
}

function drawRoom(c: CanvasRenderingContext2D) {
  // wall
  rect(c, 0, 0, W, 42, '#27303b');
  for (let x = 0; x < W; x += 16) rect(c, x, 0, 1, 40, '#232b35');
  rect(c, 0, 38, W, 4, '#1b2129');
  // floor planks
  rect(c, 0, 42, W, H - 42, '#9c6538');
  for (let y = 42; y < H; y += 7) {
    rect(c, 0, y, W, 1, '#875630');
    const off = ((y / 7) % 2) * 24;
    for (let x = off; x < W; x += 48) rect(c, x, y, 1, 7, '#875630');
  }
  for (let y = 45; y < H; y += 14) for (let x = 6; x < W; x += 37) rect(c, x, y, 2, 1, '#a9703f');
  // rug
  rect(c, 68, 100, 120, 34, '#2c4a63');
  rect(c, 70, 102, 116, 30, '#355a78');
  for (let x = 74; x < 184; x += 8) rect(c, x, 116, 4, 1, '#4b7495');
  // bookshelf
  rect(c, 2, 8, 18, 40, '#6d4423');
  rect(c, 3, 9, 16, 38, '#55331a');
  const books = ['#c94f4f', '#e3b341', '#4f8fc9', '#6dbb73', '#e8e1d3', '#b86ad0'.replace('b86ad0', 'd07a4f')];
  [12, 24, 36].forEach((sy, r) => {
    rect(c, 3, sy + 8, 16, 2, '#6d4423');
    for (let i = 0; i < 5; i++) rect(c, 4 + i * 3, sy + (i % 2), 2, 8 - (i % 2), books[(i + r) % books.length]);
  });
  // whiteboard
  rect(c, 66, 8, 38, 24, '#cfd6dd');
  rect(c, 67, 9, 36, 22, '#f4f6f8');
  rect(c, 70, 12, 14, 1, '#e8743f');
  rect(c, 70, 15, 22, 1, '#3f7fd9');
  rect(c, 70, 18, 18, 1, '#3f7fd9');
  rect(c, 70, 21, 10, 1, '#cf4156');
  rect(c, 92, 21, 7, 7, '#e3b341');
  rect(c, 70, 25, 16, 1, '#6dbb73');
  rect(c, 66, 32, 38, 2, '#9aa4ae');
  // clock
  rect(c, 118, 10, 8, 8, '#e8e1d3');
  rect(c, 121, 11, 1, 4, '#1b2129');
  rect(c, 121, 14, 3, 1, '#1b2129');
  // window
  rect(c, 152, 6, 40, 28, '#55331a');
  rect(c, 154, 8, 36, 24, '#7fb2e0');
  rect(c, 154, 22, 36, 10, '#a7cdee');
  rect(c, 158, 24, 10, 3, '#f4f6f8');
  rect(c, 174, 14, 9, 3, '#f4f6f8');
  rect(c, 171, 8, 2, 24, '#55331a');
  rect(c, 154, 19, 36, 2, '#55331a');
  // coffee machine
  rect(c, 234, 28, 16, 30, '#3a3f47');
  rect(c, 235, 29, 14, 9, '#252a31');
  rect(c, 237, 31, 4, 2, '#ff6b4a');
  rect(c, 239, 44, 6, 5, '#e8e1d3');
  rect(c, 234, 56, 16, 3, '#2a2e35');
}

function drawPlant(c: CanvasRenderingContext2D, x: number, y: number) {
  rect(c, x + 2, y + 10, 8, 7, '#b5643a');
  rect(c, x + 2, y + 10, 8, 1, '#c97a4d');
  rect(c, x + 5, y + 2, 2, 8, '#3f8a4f');
  rect(c, x + 1, y + 3, 4, 3, '#4fa862');
  rect(c, x + 7, y + 1, 4, 3, '#4fa862');
  rect(c, x + 3, y, 3, 3, '#5cbc70');
  rect(c, x + 6, y + 5, 4, 3, '#3f8a4f');
}

function drawDesk(c: CanvasRenderingContext2D, x: number, active: boolean, t: number) {
  // monitor
  rect(c, x + 14, 40, 18, 12, '#15181d');
  rect(c, x + 15, 41, 16, 10, active ? '#14202c' : '#0e1217');
  if (active) {
    for (let i = 0; i < 4; i++) {
      const w = 3 + ((Math.floor(t * 3) + i * 5 + x) % 9);
      rect(c, x + 16 + (i % 2) * 2, 42 + i * 2, w, 1, ['#7db7ff', '#e8e1d3', '#ff8a5c', '#6dbb73'][(i + Math.floor(t * 2)) % 4]);
    }
  }
  rect(c, x + 21, 52, 4, 2, '#15181d');
  // desk top + front
  rect(c, x, 53, 44, 6, '#c08a55');
  rect(c, x, 53, 44, 1, '#d29d68');
  rect(c, x, 59, 44, 9, '#8a5a32');
  rect(c, x + 2, 68, 3, 3, '#6d4423');
  rect(c, x + 39, 68, 3, 3, '#6d4423');
  // mug + keyboard
  rect(c, x + 36, 50, 3, 3, '#e8e1d3');
  rect(c, x + 15, 55, 14, 2, '#2a2e35');
}

function drawChair(c: CanvasRenderingContext2D, sx: number, sy: number) {
  rect(c, sx - 5, sy - 9, 10, 3, '#3a3f47');
  rect(c, sx - 1, sy - 6, 2, 4, '#2a2e35');
  rect(c, sx - 4, sy - 2, 8, 1, '#2a2e35');
}

function drawPerson(c: CanvasRenderingContext2D, p: Person, t: number) {
  const { look } = p;
  const sit = p.sitting;
  const x0 = Math.round(p.x - 4);
  const top = Math.round(p.y - 15 + (sit ? 3 : 0));
  const step = p.walking ? Math.floor(t * 8) % 4 : 0;
  const bob = p.walking && step % 2 === 1 ? -1 : 0;

  // shadow
  c.fillStyle = 'rgba(0,0,0,0.28)';
  c.fillRect(x0, Math.round(p.y) - 1, 8, 2);

  // legs
  if (!sit) {
    const l = step === 1 ? -1 : 0;
    const r = step === 3 ? -1 : 0;
    rect(c, x0 + 2, p.y - 4 + l, 2, 3, look.pants);
    rect(c, x0 + 4, p.y - 4 + r, 2, 3, look.pants);
    rect(c, x0 + 2, p.y - 1 + l, 2, 1, '#111');
    rect(c, x0 + 4, p.y - 1 + r, 2, 1, '#111');
  }
  const ty = top + bob;
  // body + arms
  rect(c, x0 + 1, ty + 7, 6, 5, look.shirt);
  if (look.collar) {
    if (p.dir === 'down') {
      rect(c, x0 + 3, ty + 7, 2, 3, look.collar);
    } else if (p.dir !== 'up') rect(c, x0 + (p.dir === 'left' ? 2 : 4), ty + 7, 2, 1, look.collar);
  }
  const typeBob = p.typing && Math.floor(t * 10) % 2 === 0 ? -1 : 0;
  rect(c, x0, ty + 8, 1, 4, look.shirt);
  rect(c, x0 + 7, ty + 8, 1, 4, look.shirt);
  rect(c, x0, ty + 11 + (p.typing ? typeBob : 0), 1, 1, look.skin);
  rect(c, x0 + 7, ty + 11 + (p.typing ? -1 - typeBob : 0), 1, 1, look.skin);
  // head
  rect(c, x0 + 1, ty + 1, 6, 6, look.skin);
  // hair
  if (p.dir === 'up') {
    rect(c, x0 + 1, ty, 6, 6, look.hair);
  } else {
    rect(c, x0 + 1, ty, 6, 2, look.hair);
    if (p.dir === 'down') {
      rect(c, x0 + 1, ty + 2, 1, 2, look.hair);
      rect(c, x0 + 6, ty + 2, 1, 2, look.hair);
      rect(c, x0 + 2, ty + 4, 1, 1, '#1a1410');
      rect(c, x0 + 5, ty + 4, 1, 1, '#1a1410');
    } else {
      const back = p.dir === 'left' ? x0 + 5 : x0 + 1;
      rect(c, back, ty + 2, 2, 3, look.hair);
      rect(c, p.dir === 'left' ? x0 + 2 : x0 + 5, ty + 4, 1, 1, '#1a1410');
    }
  }
  if (look.curly) {
    rect(c, x0, ty, 8, 2, look.hair);
    rect(c, x0 + 1, ty - 1, 2, 1, look.hair);
    rect(c, x0 + 4, ty - 1, 3, 1, look.hair);
    rect(c, x0 + 2, ty, 1, 1, '#7a5233');
    rect(c, x0 + 5, ty - 1, 1, 1, '#7a5233');
  }
}

function routeTo(p: Person, target: Pt): Pt[] {
  const pts: Pt[] = [];
  if (Math.abs(p.y - target[1]) > 0.5 || Math.abs(p.x - target[0]) > 0.5) {
    if (Math.abs(p.x - target[0]) > 0.5) {
      pts.push([p.x, CORRIDOR + (p.id === 'you' ? 10 : p.id === 'quinn' ? 4 : 0)]);
      pts.push([target[0], pts[0][1]]);
    }
    pts.push(target);
  }
  return pts;
}

export default function PixelOffice({ onEvent }: { onEvent?: (who: string, text: string, tone: string) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const tagRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const eventRef = useRef(onEvent);
  eventRef.current = onEvent;

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const c = cv.getContext('2d');
    if (!c) return;
    c.imageSmoothingEnabled = false;
    const people = makePeople();
    people.forEach((p, i) => {
      const start = p.seat ?? SPOT.rug;
      p.x = start[0];
      p.y = start[1];
      p.wait = 0.4 + i * 0.7;
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let t = 0;

    const startTask = (p: Person) => {
      const task = p.tasks[p.ti % p.tasks.length];
      const target = task.to === 'seat' ? p.seat! : task.to;
      p.path = routeTo(p, target);
      p.sitting = false;
      p.typing = false;
      p.walking = p.path.length > 0;
      if (!p.walking) arrive(p);
    };
    const arrive = (p: Person) => {
      const task = p.tasks[p.ti % p.tasks.length];
      p.walking = false;
      p.sitting = task.to === 'seat';
      p.typing = task.act === 'type';
      p.dir = task.to === 'seat' ? 'up' : (task.face ?? 'down');
      p.wait = task.dur;
      if (task.say) {
        p.say = task.say;
        p.sayT = Math.min(task.dur, 3.2);
        eventRef.current?.(p.label, task.say, p.tone);
      }
    };

    const update = (dt: number) => {
      t += dt;
      for (const p of people) {
        if (p.sayT > 0) p.sayT -= dt;
        if (p.walking) {
          const [tx, ty] = p.path[0];
          const dx = tx - p.x;
          const dy = ty - p.y;
          const d = Math.hypot(dx, dy);
          const sp = 26 * dt;
          if (d <= sp) {
            p.x = tx;
            p.y = ty;
            p.path.shift();
            if (!p.path.length) arrive(p);
          } else {
            p.x += (dx / d) * sp;
            p.y += (dy / d) * sp;
            p.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up';
          }
        } else {
          p.wait -= dt;
          if (p.wait <= 0) {
            p.ti += 1;
            startTask(p);
          }
        }
      }
    };

    const draw = () => {
      c.clearRect(0, 0, W, H);
      drawRoom(c);
      for (const d of desks) {
        const owner = people.find((p) => p.id === d.owner)!;
        drawDesk(c, d.x, owner.typing, t);
        drawChair(c, d.x + 22, 83);
      }
      [...people].sort((a, b) => a.y - b.y).forEach((p) => drawPerson(c, p, t));
      drawPlant(c, 3, 122);
      drawPlant(c, 241, 122);
      // tags
      for (const p of people) {
        const el = tagRefs.current[p.id];
        if (!el) continue;
        const headY = p.y - 15 + (p.sitting ? 3 : 0);
        el.style.transform = `translate(-50%, -100%) translate(${(p.x / W) * cv.clientWidth}px, ${((headY - 2) / H) * cv.clientHeight}px)`;
        const bubble = el.querySelector<HTMLElement>('[data-say]');
        if (bubble) {
          const show = p.sayT > 0 && !!p.say;
          bubble.textContent = p.say;
          bubble.style.opacity = show ? '1' : '0';
          bubble.style.transform = show ? 'translateY(0)' : 'translateY(4px)';
        }
      }
    };

    // first task
    people.forEach((p) => {
      p.ti = 0;
      if (p.seat) {
        p.sitting = true;
        p.dir = 'up';
      }
    });

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current && visible) {
        update(dt);
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      people.forEach((p) => p.ti === 0 && p.seat && (p.typing = true));
      draw();
      return;
    }

    people.forEach((p) => {
      p.wait = 0.2;
      p.ti = -1;
    });
    draw();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      last = performance.now();
    });
    io.observe(cv);
    raf = requestAnimationFrame(loop);
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const tags = [
    { id: 'claude', label: 'Claude', tone: '#ff8a5c' },
    { id: 'codex', label: 'Codex', tone: '#7db7ff' },
    { id: 'quinn', label: 'Quinn', tone: '#ff6b7d' },
    { id: 'you', label: 'You', tone: '#f2efe9' },
  ];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-line-2 bg-[#1b2129]">
        <canvas
          ref={canvas}
          width={W}
          height={H}
          className="block aspect-[16/9] w-full [image-rendering:pixelated]"
          role="img"
          aria-label="Animated pixel-art office: Claude, Codex and Quinn work at their desks while I walk around, approve work and plan at the whiteboard"
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {tags.map((tag) => (
            <div
              key={tag.id}
              ref={(el) => {
                tagRefs.current[tag.id] = el;
              }}
              className="absolute left-0 top-0 flex flex-col items-center gap-1 will-change-transform"
            >
              <span
                data-say
                className="hidden whitespace-nowrap rounded-md bg-[#f4f1ea] px-1.5 sm:block py-0.5 font-mono text-[10px] text-[#141310] opacity-0 shadow-lg transition-[opacity,transform] duration-300 sm:text-[11px]"
              />
              <span
                className="whitespace-nowrap rounded px-1 font-mono text-[9px] font-medium uppercase tracking-wider sm:text-[10px]"
                style={{ color: tag.tone, background: 'rgba(10,10,9,0.72)' }}
              >
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full border border-line-2 bg-bg/80 text-ink backdrop-blur transition-colors hover:bg-bg"
        aria-label={paused ? 'Play the office animation' : 'Pause the office animation'}
      >
        {paused ? (
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M2 1l9 5-9 5z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
