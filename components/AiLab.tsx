'use client';

import { useCallback, useState } from 'react';
import WalletCase from './WalletCase';
import OrgChart from './OrgChart';
import Workflow from './Workflow';
import PixelOffice from './PixelOffice';
import { companyNumbers, rules, skillsList } from '@/lib/content';

type Ev = { id: number; who: string; text: string; tone: string };

function CaseHead({ n, title, children }: { n: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-8">
      <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">Case {n}</span>
      <h3 data-reveal="heading" className="mt-3 max-w-[22ch] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
        {title}
      </h3>
      <p data-reveal="rise" className="mt-4 max-w-[38rem] text-[17px] leading-relaxed text-muted">
        {children}
      </p>
    </div>
  );
}

export default function AiLab() {
  const [feed, setFeed] = useState<Ev[]>([]);
  const onEvent = useCallback((who: string, text: string, tone: string) => {
    setFeed((f) => [{ id: Date.now() + Math.random(), who, text, tone }, ...f].slice(0, 5));
  }, []);

  return (
    <section id="ai-lab" className="relative py-28 md:py-40">
      <div className="wrap">
        <span className="eyebrow">AI Lab</span>
        <h2 data-reveal="heading" className="h2 mt-6 max-w-[16ch]">
          I don’t just use AI. <span className="serif text-accent">I run a small company of it.</span>
        </h2>
        <p data-reveal="rise" className="mt-8 max-w-[40rem] text-[18px] leading-relaxed text-muted">
          One founder, three AI agents and a native iPhone app, with rules that keep every claim honest. Here is what we built and
          how the team works.
        </p>

        <WalletCase />

        {/* Case 02: the company */}
        <div className="mt-28 md:mt-40">
          <CaseHead n="02" title={<>The Personal Wallet AI Company</>}>
            A folder that works like a small company, with me as the only human. Each agent has one job, written down as its own
            agent file and skills.
          </CaseHead>
          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <OrgChart />
            </div>
            <div className="flex flex-col gap-6 lg:col-span-4">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {companyNumbers.map((n) => (
                  <div key={n.label} className="bg-bg p-5">
                    <dd className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em] tabular-nums">{n.value}</dd>
                    <dt className="mt-1 text-[13px] leading-snug text-muted">{n.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="text-[15px] leading-relaxed text-muted">
                It started with eight agents. After two days I retired six specialists and moved their knowledge into skills and memory.{' '}
                <span className="text-ink">Fewer agents, clearer rules, better work.</span>
              </p>
              <div className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/agents/folder-structure.webp"
                  alt="Folder structure of the company: CLAUDE.md, two agents, a guard hook, 24 skills, ops scripts, memory"
                  width={1400}
                  height={1453}
                  loading="lazy"
                  className="block w-full transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Case 03: side by side */}
        <div className="mt-28 md:mt-40">
          <CaseHead n="03" title={<>Two AI coders, one codebase, zero collisions</>}>
            Codex builds in its own Git worktree while Claude researches, writes and checks. A lock allows one Codex job at a time, a
            guard hook blocks risky commands, and nothing reaches the main app before Quinn’s review and my approval.
          </CaseHead>
          <div className="mt-14 rounded-[28px] border border-line bg-bg-2 p-5 sm:p-8 lg:p-10">
            <Workflow />
          </div>
        </div>

        {/* Pixel office */}
        <div className="mt-28 md:mt-40">
          <CaseHead n="04" title={<>Watching my agents work, live</>}>
            I set up the open-source Pixel Agents extension in VS Code to see every agent as a character at its desk. This office is
            my own pixel-art version of it, running right here.
          </CaseHead>
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <PixelOffice onEvent={onEvent} />
            </div>
            <div className="card flex flex-col p-5 lg:col-span-3" aria-live="off">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="live-dot !size-1.5" /> Office feed
              </div>
              <ul className="mt-4 flex min-h-[180px] flex-col gap-3">
                {feed.map((e, i) => (
                  <li
                    key={e.id}
                    className="animate-[feedin_0.6s_var(--ease-out-expo)] border-b border-line pb-3 font-mono text-[12px] leading-5 last:border-0"
                    style={{ opacity: 1 - i * 0.16 }}
                  >
                    <span style={{ color: e.tone }}>{e.who}</span>
                    <span className="text-dim"> › </span>
                    <span className="text-ink/85">{e.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Skills + agent file */}
        <div className="mt-28 md:mt-40">
          <CaseHead n="05" title={<>Twelve skills I wrote for my agents</>}>
            Skills are written playbooks an agent loads when it needs them. The company runs on 24, and these 12 are mine.
          </CaseHead>
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <ul className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {skillsList.map(([name, body]) => (
                <li key={name} className="group bg-bg p-5 transition-colors duration-300 hover:bg-bg-2">
                  <div className="font-mono text-[13px] text-accent">{name}</div>
                  <p className="mt-2 text-[14px] leading-snug text-muted">{body}</p>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-5">
              <div className="card sticky top-28 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/agents/quinn-agent.webp"
                  alt="The agent file for Quinn, the independent reviewer: its tools, model, skills and how it works"
                  width={1600}
                  height={1512}
                  loading="lazy"
                  className="block w-full transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="mt-28 md:mt-40">
          <CaseHead n="06" title={<>Rules that keep AI honest</>}>
            AI tends to promise features. So the company runs on rules, and the agents follow them on every piece of work.
          </CaseHead>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rules.map((r, i) => (
              <div key={r.title} className="card card-hover flex flex-col p-6">
                <span className="font-mono text-[12px] text-dim">0{i + 1}</span>
                <h4 className="mt-6 text-[19px] font-semibold leading-tight tracking-tight">{r.title}</h4>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
