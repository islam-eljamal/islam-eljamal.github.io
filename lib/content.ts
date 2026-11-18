// Every fact on the site lives here. Sources: CV, certificates, Personal Wallet fact sheet (18 Nov 2026).

export const site = {
  name: 'Islam El Jamal',
  role: 'Business operations, powered by AI',
  location: 'Berlin, Germany',
  email: 'islamjamal59@gmail.com',
  linkedin: 'https://www.linkedin.com/in/islam-hadi-el-jamal-36b3aa25a',
  github: 'https://github.com/islam-eljamal',
  cv: '/Islam-El-Jamal-CV.pdf',
  availability: 'Working Student · approx. 20 hrs/week · from November 2026',
};

export const stats = [
  { value: 110653, label: 'lines of Swift in my iPhone app, built by directing AI agents' },
  { value: 1993, label: 'automated tests passing in the latest release round' },
  { value: 5, label: 'roles in procurement, accounting, service and data since 2021' },
  { value: 6, label: 'certificates, including Google AI Essentials' },
];

export const walletSteps = [
  {
    title: 'Safe to spend',
    body: 'One clear number: how much of my money is actually free this month, after bills still due, savings not yet put aside and a buffer.',
    light: 'home-dashboard',
    dark: 'home-dashboard-dark',
  },
  {
    title: 'Quick add',
    body: 'An amount-first keypad, categories ranked by your own use, and "Again" chips that repeat a recent entry in one tap.',
    light: 'add-transaction',
  },
  {
    title: 'Can I afford it?',
    body: 'Type a price and a date and see the effect on your month before you buy. Nothing is saved or moved.',
    light: 'can-i-afford',
  },
  {
    title: 'Insights',
    body: 'A spending breakdown by category with Swift Charts. Touch a slice to focus on it.',
    light: 'insights-chart',
    dark: 'insights-chart-dark',
  },
  {
    title: 'Budgets and goals',
    body: 'Budgets per category, savings goals with a monthly pace, and Activity with search and filters.',
    light: 'budgets',
    dark: 'budgets-dark',
  },
] as const;

export const walletStack = ['SwiftUI · Swift 6', 'Swift Charts', 'WidgetKit', 'App Intents', 'CryptoKit', 'StoreKit 2', 'No server'];

export const walletNumbers = [
  { value: '110,653', label: 'lines of Swift' },
  { value: '1,993', label: 'tests passing' },
  { value: '187', label: 'commits in 4 weeks' },
  { value: '53', label: 'SwiftUI view files' },
];

export const agents = [
  {
    id: 'founder',
    name: 'Me',
    role: 'Founder',
    tone: 'ink',
    body: 'The only human. I decide. Anything public, paid, risky or irreversible needs my approval, and it is recorded.',
  },
  {
    id: 'claude',
    name: 'Claude',
    role: 'General manager',
    tone: 'claude',
    body: 'Plans the work, writes Codex’s briefs, checks what comes back, does research, product reviews and the marketing videos.',
  },
  {
    id: 'codex',
    name: 'Codex',
    role: 'Technical partner',
    tone: 'codex',
    body: 'Writes most of the app: features, money logic, tests and release checks, each round in its own Git worktree.',
  },
  {
    id: 'quinn',
    name: 'Quinn',
    role: 'Independent reviewer',
    tone: 'quinn',
    body: 'A separate Claude agent that reviews important work it did not make, and says plainly whether it passes.',
  },
] as const;

export const companyNumbers = [
  { value: '74', label: 'Codex runs logged' },
  { value: '48', label: 'approvals recorded' },
  { value: '12', label: 'custom skills written' },
  { value: '8 → 2', label: 'agents, simplified on purpose' },
];

export const skillsList = [
  ['pw-video-production', 'Marketing videos: script, narration, real app footage, captions, checks'],
  ['pw-codex-delegation', 'Hands a bounded technical task to Codex safely and checks the result'],
  ['pw-quality-check', 'Independent verification before work counts as done'],
  ['pw-product-analysis', 'Read-only product, UX and accessibility review of the app'],
  ['pw-appstore-launch', 'Store listing, screenshots, review notes, launch states'],
  ['pw-marketing-research', 'Evidence-based market, audience and competitor research'],
  ['pw-brand', 'Brand consistency for anything the public could see'],
  ['pw-storytelling', 'Short-form video scripts and storyboards'],
  ['pw-outreach-research', 'Partner and creator research, drafts only'],
  ['pw-community-replies', 'Classifies comments and drafts replies, drafts only'],
  ['pw-usage-efficiency', 'Keeps Claude and ChatGPT usage low'],
  ['pw-storage-cleanup', 'Disk checks and approval-based cleanup'],
] as const;

export const rules = [
  {
    title: 'A verified claims list',
    body: 'Every public line is checked against what is true today. Words like "AI" or "syncs with your bank" are forbidden for the app.',
  },
  {
    title: 'Real footage only',
    body: 'Videos and screenshots come from the real app with a fictional demo wallet. No invented reviews or statistics.',
  },
  {
    title: 'A human signs off',
    body: 'Anything public, paid, risky or irreversible waits for my approval in chat. 48 approvals are on record.',
  },
  {
    title: 'A guard before every command',
    body: 'A safety hook blocks destructive Git commands, paid API billing and writes to the app when they are switched off.',
  },
];

export const experience = [
  {
    title: 'Junior Data Analyst',
    org: 'AS Company',
    place: 'Koura, Lebanon',
    date: '2025 – 07/2026',
    note: '',
    bullets: [
      'Analyzed and prepared operational and business data using Excel and SQL to support management decision-making',
      'Created structured reports and data analyses to improve visibility into key company metrics',
    ],
  },
  {
    title: 'Purchasing Assistant Manager',
    org: 'Nini Hospital',
    place: 'Tripoli, Lebanon',
    date: '2024 – 2025',
    note: 'part-time, alongside studies',
    bullets: [
      'Supported procurement processes, including creating, processing, and tracking purchase orders',
      'Served as the main point of contact for suppliers; coordinated communication and tracked order status',
      'Monitored and maintained inventory levels to ensure stable stock availability',
    ],
  },
  {
    title: 'Accounting Assistant',
    org: 'Nini Hospital',
    place: 'Tripoli, Lebanon',
    date: '2023 – 2024',
    note: 'part-time, alongside studies',
    bullets: [
      'Supported ongoing accounting tasks, including data entry and processing of receipts/documents',
      'Reconciled and maintained financial records to ensure accuracy and completeness',
    ],
  },
  {
    title: 'Customer Service Representative',
    org: 'Kheir Home',
    place: 'Tripoli, Lebanon',
    date: '2022 – 2023',
    note: 'part-time, alongside studies',
    bullets: [
      'Handled customer inquiries directly to ensure high customer satisfaction',
      'Acted as first point of contact for customer concerns; resolved issues promptly and professionally',
    ],
  },
  {
    title: 'Data Entry Intern',
    org: 'Perla Company',
    place: 'Koura, Lebanon',
    date: '2021',
    note: '3 months',
    bullets: ['Recorded and maintained company data in internal systems during a three-month internship'],
  },
];

export const education = [
  {
    title: "Master's in International Business Management",
    org: 'UE University, Berlin',
    date: '2026 – ongoing',
  },
  {
    title: 'B.Sc. Management Information Systems',
    org: 'AUT (American University of Technology), Halat, Lebanon',
    date: '2023 – 06/2026',
  },
];

export const skillGroups = [
  {
    title: 'Business & Operations',
    items: ['Procurement', 'Supplier Communication', 'Order Processing', 'Inventory Management', 'Administrative Support', 'Customer Service', 'Data Entry & Data Management', 'Accounting Support', 'Process Support'],
  },
  {
    title: 'Digital',
    items: ['Microsoft Excel', 'Microsoft Office', 'SQL', 'Google Sheets', 'Google Drive', 'AI-powered productivity tools'],
  },
  {
    title: 'Building with AI',
    items: ['Claude Code', 'Codex', 'Custom agents', 'Custom skills', 'Git worktrees', 'Review and approval workflows'],
  },
];

export const languages = [
  { name: 'Arabic', level: 'Native', fill: 1 },
  { name: 'English', level: 'B2 · IELTS Academic 6.5', fill: 0.72 },
  { name: 'German', level: 'A2, progressing toward B1', fill: 0.38 },
];

export const certificates = [
  {
    title: 'Google AI Essentials',
    issuer: 'Google · Coursera',
    meta: 'Jun 2026 · 5 courses',
    image: '/media/certs/google-ai.webp',
    verify: 'https://coursera.org/verify/specialization/B57F8WMSCT46',
  },
  {
    title: 'Google Project Management',
    issuer: 'Google · Coursera',
    meta: 'Jun 2026 · 7 courses',
    image: '/media/certs/google-pm.webp',
    verify: 'https://coursera.org/verify/professional-cert/5FI7EQELGQ97',
  },
  {
    title: 'IELTS Academic',
    issuer: 'British Council · IDP · Cambridge',
    meta: 'Dec 2025 · Overall 6.5 · B2',
    image: '/media/certs/ielts.webp',
    verify: '',
  },
  {
    title: 'Microsoft Excel, Beginner to Advanced',
    issuer: 'Udemy',
    meta: 'Jun 2023 · 10 hours',
    image: '/media/certs/udemy-excel.webp',
    verify: 'https://ude.my/UC-ff313b51-3c13-4969-bea9-22600540238d',
  },
  {
    title: 'On-Premise Sales Virtual Experience',
    issuer: 'Red Bull · Forage',
    meta: 'May 2023 · Account data analysis',
    image: '/media/certs/redbull-forage.webp',
    verify: '',
  },
  {
    title: 'Data Entry Training',
    issuer: 'Perla',
    meta: '40 hours',
    image: '/media/certs/perla.webp',
    verify: '',
  },
];

export const story =
  'I grew up in Tripoli, Lebanon, and started working while studying: in procurement, accounting, customer service and data. Every job taught me the same lesson: businesses run on clean data and smooth processes. Then I discovered what AI can do. I now build with AI agents every day, from a personal finance app to a team of agents I coordinate and watch in real time. Today I’m in Berlin doing my Master’s in International Business Management, specializing in how AI can make operations faster, smarter and more human.';
