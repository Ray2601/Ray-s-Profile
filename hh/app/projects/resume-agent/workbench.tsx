'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, CircleAlert, Database, Search, X } from 'lucide-react'

type Run = {
  id: string
  status: 'PASS' | 'BADCASE'
  score: number
  role: string
  company: string
  model: string
  rounds: number
  source: 'Seed Evaluation' | 'Live Run'
  timestamp: string
  issue?: string
}

const runs: Run[] = [
  { id: 'RUN-0047', status: 'PASS', score: 94, role: '产品经理', company: '腾讯', model: 'writer_v1.3', rounds: 3, source: 'Seed Evaluation', timestamp: '2026-09-07 22:18' },
  { id: 'RUN-0046', status: 'BADCASE', score: 78, role: 'AI 产品经理', company: '字节', model: 'writer_v1.3', rounds: 3, source: 'Seed Evaluation', timestamp: '2026-09-07 21:43', issue: '规则冲突 / 数据化不足' },
  { id: 'RUN-0045', status: 'PASS', score: 96, role: '产品经理', company: '美团', model: 'writer_v1.2', rounds: 2, source: 'Seed Evaluation', timestamp: '2026-09-07 20:56' },
  { id: 'RUN-0044', status: 'PASS', score: 91, role: '增长产品经理', company: '小红书', model: 'writer_v1.3', rounds: 3, source: 'Seed Evaluation', timestamp: '2026-09-07 19:12' },
  { id: 'RUN-0043', status: 'BADCASE', score: 69, role: '运营产品经理', company: '网易', model: 'writer_v1.2', rounds: 2, source: 'Seed Evaluation', timestamp: '2026-09-07 18:37', issue: 'JSON 解析失败' },
  { id: 'RUN-0042', status: 'PASS', score: 88, role: 'AI 产品经理', company: '阿里', model: 'writer_v1.2', rounds: 3, source: 'Seed Evaluation', timestamp: '2026-09-07 17:08' },
]

const badcases = [
  ['JSON 解析失败', 3, 'JSON_PARSE_FAILED'],
  ['数据不足', 2, 'INSUFFICIENT_DATA'],
  ['关键词缺失', 1, 'MISSING_KEYWORDS'],
  ['编造', 1, 'HALLUCINATION'],
  ['规则冲突', 1, 'RULE_CONFLICT'],
] as const

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-[#ded6ca] bg-white/70 px-4 py-3"><p className="text-2xl font-semibold tracking-tight text-[#292622]">{value}</p><p className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#8d8276]">{label}</p></div>
}

function Trace({ run }: { run: Run }) {
  const inconsistent = run.status === 'BADCASE'
  return <div className="space-y-5">
    <div className="flex items-start justify-between border-b border-[#e3dbd0] pb-5"><div><p className="text-xs tracking-[.18em] text-[#9a8065]">RUN / {run.id}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{run.role} · {run.company}</h2><p className="mt-1 text-xs text-[#8b8178]">{run.model} · DeepSeek · {run.timestamp}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${inconsistent ? 'bg-[#f5d6ca] text-[#9f4f43]' : 'bg-[#dbead8] text-[#41704b]'}`}>{run.status}</span></div>
    <div className="space-y-2">{['Position Classifier', 'JD Analyst', 'Experience Diagnosis'].map((step, i) => <div key={step} className="flex items-center justify-between rounded-xl bg-[#f7f3ed] px-3 py-2 text-sm"><span className="flex items-center gap-2"><Check className="size-4 text-[#4f8a5b]" />{step}</span><span className="font-mono text-xs text-[#8b8178]">{[0.4, 2.8, 3.1][i]}s</span></div>)}</div>
    <div className="rounded-2xl border border-[#e3dbd0] p-4"><div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold tracking-[.16em] text-[#8d8276]">ITERATION TRACE</p><span className="text-xs text-[#8b8178]">{run.rounds} rounds</span></div>{Array.from({ length: run.rounds }).map((_, i) => <div key={i} className="grid grid-cols-[5rem_1fr_auto] items-center gap-3 border-t border-[#eee8df] py-3 text-sm"><span className="text-xs text-[#9a8065]">ROUND {i + 1}</span><span><b>STAR Writer</b><span className="ml-3 text-xs text-[#8b8178]">✓ HR Reviewer</span></span><b className="font-mono">{[76, 81, run.score][i] ?? run.score} / 100</b></div>)}</div>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">{[['Matching', '22 / 25'], ['Data', inconsistent ? '14 / 25' : '23 / 25'], ['Impact', '21 / 25'], ['Conciseness', '21 / 25']].map(([label, value]) => <div key={label} className={`rounded-xl p-3 ${label === 'Data' && inconsistent ? 'bg-[#f8e0d7]' : 'bg-[#f7f3ed]'}`}><p className="text-xs text-[#8b8178]">{label}</p><p className="mt-1 font-mono font-semibold">{value}</p></div>)}</div>
    <div className={`rounded-2xl p-4 ${inconsistent ? 'bg-[#f8e0d7]' : 'bg-[#e7f0e3]'}`}><p className="text-xs tracking-[.16em] text-[#8d8276]">FINAL JUDGEMENT</p><div className="mt-3 grid grid-cols-2 gap-4 text-sm"><p><span className="block text-xs text-[#8b8178]">EXPECTED</span><b>PASS</b></p><p><span className="block text-xs text-[#8b8178]">ACTUAL</span><b>{inconsistent ? 'FAIL' : 'PASS'}</b></p></div><p className="mt-4 flex items-center gap-2 font-semibold">{inconsistent ? <CircleAlert className="size-4 text-[#b45244]" /> : <Check className="size-4 text-[#4f8a5b]" />}{inconsistent ? `INCONSISTENT · ${run.issue}` : 'CONSISTENT'}</p></div>
    {inconsistent && <div className="rounded-2xl border border-[#e3dbd0] p-4"><p className="text-xs tracking-[.16em] text-[#8d8276]">ROOT CAUSE → PROMPT PATCH → REGRESSION</p><div className="mt-3 space-y-2 text-sm text-[#5f564e]"><p>规则约束不足 <ChevronRight className="inline size-4" /> 数据化字段缺失</p><p className="rounded-xl bg-[#f7f3ed] p-3 font-mono text-xs">writer_v1.2 → writer_v1.3<br />增加 JSON schema、禁止 Markdown fence、缺失字段返回 null</p><p className="font-semibold text-[#4f8a5b]">Before 3 / 10 failed → After 0 / 10 failed · PROMOTED</p></div></div>}
  </div>
}

export function ResumeAgentWorkbench() {
  const [selectedId, setSelectedId] = useState(runs[0].id)
  const [query, setQuery] = useState('')
  const [badcaseFilter, setBadcaseFilter] = useState<string | null>(null)
  const selected = runs.find((run) => run.id === selectedId) ?? runs[0]
  const filteredRuns = useMemo(() => runs.filter((run) => `${run.id} ${run.role} ${run.company}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <main className="min-h-screen bg-[#f5f1ea] text-[#292622]"><header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#dfd6ca] bg-[#f5f1ea]/90 px-5 py-4 backdrop-blur-md md:px-10"><Link href="/#projects" className="flex items-center gap-2 text-sm text-[#75695f]"><ArrowLeft className="size-4" />Portfolio</Link><div className="hidden text-center md:block"><p className="text-xs font-semibold tracking-[.25em]">RESUME AGENT / HARNESS</p><p className="mt-1 text-[10px] uppercase tracking-[.18em] text-[#9a8065]">Multi-Agent Resume Optimization</p></div><span className="flex items-center gap-2 text-xs font-semibold text-[#47774f]"><span className="size-2 rounded-full bg-[#5b9a63]" />LIVE</span></header>
    <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-10 md:py-10"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs tracking-[.2em] text-[#9a8065]">OBSERVABILITY FIRST</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] md:text-5xl">Resume Agent Harness Console</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#75695f]">从一次 Run 追踪 Agent Trace、Badcase、Root Cause 到 Prompt Regression。这里的历史记录明确标注为 Seed Evaluation，真实运行将从 Render API 写入。</p></div><div className="flex items-center gap-2 rounded-full border border-[#ded6ca] bg-white/60 px-3 py-2 text-xs text-[#75695f]"><Database className="size-4" />DATA SOURCE <b>Seed Evaluation</b></div></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Metric value="47" label="Total Runs" /><Metric value="39" label="Consistent" /><Metric value="8" label="Badcases" /><Metric value="83%" label="Pass Rate" /></div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(340px,.82fr)_minmax(0,1.6fr)]"><section className="rounded-[24px] border border-[#ded6ca] bg-[#fffdf9] p-4 md:p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold tracking-[.18em]">RUN HISTORY</p><p className="mt-1 text-xs text-[#9a9086]">Seed Evaluation Runs</p></div><span className="font-mono text-xs text-[#9a9086]">36 seeded</span></div><label className="mt-4 flex items-center gap-2 rounded-xl border border-[#e5ddd3] bg-[#f8f5ef] px-3 py-2"><Search className="size-4 text-[#9a9086]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Run ID / role" className="w-full bg-transparent text-sm outline-none placeholder:text-[#aaa096]" /></label><div className="mt-3 space-y-2">{filteredRuns.map((run) => <button key={run.id} onClick={() => setSelectedId(run.id)} className={`w-full rounded-2xl border p-3 text-left transition ${selected.id === run.id ? 'border-[#c58e63] bg-[#fff5e4]' : 'border-transparent bg-[#f8f5ef] hover:border-[#e5d4c1]'}`}><div className="flex items-center justify-between"><span className="flex items-center gap-2 font-mono text-xs"><span className={`size-2 rounded-full ${run.status === 'PASS' ? 'bg-[#5b9a63]' : 'bg-[#d36b58]'}`} />#{run.id.replace('RUN-', '')}</span><span className={`text-xs font-semibold ${run.status === 'PASS' ? 'text-[#47774f]' : 'text-[#b45244]'}`}>{run.status}</span><b className="font-mono text-sm">{run.score}</b></div><p className="mt-2 text-sm font-medium">{run.role} · {run.company}</p><p className="mt-1 text-[11px] text-[#9a9086]">{run.model} · {run.rounds} rounds · {run.source}</p></button>)}</div></section>
        <section className="rounded-[24px] border border-[#ded6ca] bg-[#fffdf9] p-4 md:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.18em]">RUN TRACE</p><p className="mt-1 text-xs text-[#9a9086]">Select a run to inspect the full evaluation path</p></div><button className="rounded-full border border-[#d9d0c5] px-3 py-1.5 text-xs text-[#75695f]">Try it yourself <ArrowUpRight className="ml-1 inline size-3" /></button></div><div className="mt-4"><Trace run={selected} /></div></section></div>
      <section className="mt-5 rounded-[24px] border border-[#ded6ca] bg-[#fffdf9] p-4 md:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold tracking-[.18em]">BADCASE ANALYSIS</p><p className="mt-1 text-xs text-[#9a9086]">Click a category to filter matching runs</p></div>{badcaseFilter && <button onClick={() => setBadcaseFilter(null)} className="flex items-center gap-1 text-xs text-[#b45244]">Clear filter <X className="size-3" /></button>}</div><div className="mt-5 grid gap-3 md:grid-cols-5">{badcases.map(([label, count, code]) => <button key={code} onClick={() => setBadcaseFilter(code)} className={`rounded-2xl border p-3 text-left transition ${badcaseFilter === code ? 'border-[#c58e63] bg-[#fff5e4]' : 'border-[#eee7de] bg-[#f8f5ef] hover:border-[#d6c1ab]'}`}><p className="text-xs text-[#75695f]">{label}</p><div className="mt-3 flex items-end justify-between"><b className="text-2xl font-semibold">{count}</b><span className="h-1.5 w-16 rounded-full bg-[#c58e63]/50"><span className="block h-full rounded-full bg-[#c58e63]" style={{ width: `${count / 3 * 100}%` }} /></span></div></button>)}</div><p className="mt-4 text-xs text-[#9a9086]">{badcaseFilter ? `Filtering code: ${badcaseFilter}` : 'Expected Result = Actual Result is tracked as CONSISTENT; mismatches are INCONSISTENT.'}</p></section>
    </div></main>
}
