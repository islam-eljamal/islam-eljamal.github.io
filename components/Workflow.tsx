// Claude and Codex working side by side, without ever touching the same files.
// Drawn from the real setup: separate Git worktree, a lock in the delegation script, a guard hook, review, approval.

const C = '#ff8a5c';
const X = '#7db7ff';
const Q = '#ff6b7d';
const INK = '#f2efe9';

function Node({ x, y, w = 150, title, sub, tone }: { x: number; y: number; w?: number; title: string; sub?: string; tone: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="58" rx="14" fill="#141413" stroke={`${tone}66`} />
      <circle cx="16" cy="18" r="3.5" fill={tone} />
      <text x="28" y="22" fill={INK} fontSize="14" fontWeight="600" fontFamily="var(--font-geist-sans)">
        {title}
      </text>
      {sub && (
        <text x="16" y="43" fill="#a7a197" fontSize="11.5" fontFamily="var(--font-geist-mono)">
          {sub}
        </text>
      )}
    </g>
  );
}

function Wire({ d, tone, delay = 0 }: { d: string; tone: string; delay?: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(242,239,233,0.16)" strokeWidth="1.5" />
      <path d={d} fill="none" stroke={tone} strokeWidth="2.2" strokeLinecap="round" className="pulse-path" style={{ animationDelay: `${delay}s` }} />
    </g>
  );
}

function Desktop() {
  return (
    <svg viewBox="0 0 1180 430" className="hidden h-auto w-full md:block" role="img" aria-label="Diagram: my request goes to Claude, who plans and writes a brief. Codex builds and runs tests in its own Git worktree behind a lock and a guard hook. Quinn reviews, I approve, and only then is the work merged.">
      {/* lane labels */}
      <text x="230" y="40" fill={C} fontSize="12" letterSpacing="1.5" fontFamily="var(--font-geist-mono)">
        CLAUDE · GENERAL MANAGER
      </text>
      {/* worktree box */}
      <rect x="214" y="250" width="590" height="132" rx="20" fill="rgba(125,183,255,0.04)" stroke="rgba(125,183,255,0.35)" strokeDasharray="5 6" />
      <text x="230" y="410" fill={X} fontSize="12" letterSpacing="1.5" fontFamily="var(--font-geist-mono)">
        CODEX · OWN GIT WORKTREE, OWN BRANCH
      </text>
      {/* guard badge */}
      <g transform="translate(676 236)">
        <rect width="118" height="28" rx="14" fill="#0a0a09" stroke="rgba(242,239,233,0.2)" />
        <path d="M17 7l6 2.4v4.4c0 3.6-2.6 6-6 7-3.4-1-6-3.4-6-7V9.4z" fill="none" stroke={INK} strokeWidth="1.4" />
        <text x="30" y="18.5" fill={INK} fontSize="11.5" fontFamily="var(--font-geist-mono)">
          guard hook
        </text>
      </g>

      {/* wires */}
      <Wire d="M170 215 C 200 215, 200 87, 230 87" tone={C} />
      <Wire d="M170 215 C 200 215, 200 317, 230 317" tone={X} delay={0.4} />
      <Wire d="M380 87 H 420" tone={C} delay={0.2} />
      <Wire d="M570 87 H 610" tone={C} delay={0.6} />
      <Wire d="M380 317 H 420" tone={X} delay={0.3} />
      <Wire d="M570 317 H 610" tone={X} delay={0.7} />
      <Wire d="M305 116 V 288" tone={C} delay={1.1} />
      <Wire d="M760 87 C 800 87, 800 215, 840 215" tone={C} delay={0.9} />
      <Wire d="M760 317 C 800 317, 800 215, 840 215" tone={X} delay={1.2} />
      <Wire d="M990 215 H 1020" tone={Q} delay={1.5} />

      {/* lock on the hand-off */}
      <g transform="translate(305 202)">
        <rect x="-64" y="-15" width="128" height="30" rx="15" fill="#0a0a09" stroke="rgba(242,239,233,0.2)" />
        <rect x="-52" y="-4" width="11" height="9" rx="2" fill="none" stroke={INK} strokeWidth="1.4" />
        <path d="M-49.5 -4 v-3 a3 3 0 0 1 6 0 v3" fill="none" stroke={INK} strokeWidth="1.4" />
        <text x="-34" y="4.5" fill={INK} fontSize="11.5" fontFamily="var(--font-geist-mono)">
          lock: 1 job
        </text>
      </g>

      <Node x={20} y={186} title="My request" sub="logged in inbox/" tone={INK} />
      <Node x={230} y={58} title="Plan + brief" sub="short, specific" tone={C} />
      <Node x={420} y={58} title="Research" sub="scripts, videos" tone={C} />
      <Node x={610} y={58} title="Check result" sub="against the code" tone={C} />
      <Node x={230} y={288} title="Build" sub="features, logic" tone={X} />
      <Node x={420} y={288} title="Run tests" sub="1,347 + 646 ✓" tone={X} />
      <Node x={610} y={288} title="Report" sub="saved, logged" tone={X} />
      <Node x={840} y={186} title="Quinn reviews" sub="PASS / FIX / FAIL" tone={Q} />
      <Node x={1020} y={186} w={150} title="I approve" sub="then merge" tone={INK} />
    </svg>
  );
}

function Mobile() {
  const lane = (tone: string, label: string, items: [string, string][]) => (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: tone }}>
        {label}
      </span>
      {items.map(([t, s]) => (
        <div key={t} className="rounded-xl border bg-bg-2 p-3" style={{ borderColor: `${tone}55` }}>
          <div className="text-[14px] font-semibold">{t}</div>
          <div className="font-mono text-[11px] text-muted">{s}</div>
        </div>
      ))}
    </div>
  );
  const step = (t: string, s: string, tone: string) => (
    <div className="rounded-xl border bg-bg-2 p-3 text-center" style={{ borderColor: `${tone}55` }}>
      <div className="text-[14px] font-semibold">{t}</div>
      <div className="font-mono text-[11px] text-muted">{s}</div>
    </div>
  );
  const arrow = <div className="mx-auto h-6 w-px bg-gradient-to-b from-line-2 to-accent" aria-hidden />;
  return (
    <div className="flex flex-col md:hidden" aria-label="How Claude and Codex work side by side">
      {step('My request', 'logged in inbox/', INK)}
      {arrow}
      <div className="grid grid-cols-2 gap-3">
        {lane(C, 'Claude', [
          ['Plan + brief', 'short, specific'],
          ['Research', 'scripts, videos'],
          ['Check result', 'against the code'],
        ])}
        <div className="rounded-2xl border border-dashed border-codex/40 p-2">
          {lane(X, 'Codex · worktree', [
            ['Build', 'features, logic'],
            ['Run tests', '1,347 + 646 ✓'],
            ['Report', 'saved, logged'],
          ])}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2 font-mono text-[11px] text-ink">
        <span className="chip !min-h-7">lock: 1 job</span>
        <span className="chip !min-h-7">guard hook</span>
      </div>
      {arrow}
      {step('Quinn reviews', 'PASS / FIX / FAIL', Q)}
      {arrow}
      {step('I approve', 'then merge', INK)}
    </div>
  );
}

export default function Workflow() {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  );
}
