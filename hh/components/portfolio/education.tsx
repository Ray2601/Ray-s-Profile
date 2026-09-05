'use client'

import { useState } from 'react'
import { SectionHeading } from './section-heading'

const timeline = [
  ['2020', 'SCAU · Civil Engineering'],
  ['2022', 'Finance · Second Degree'],
  ['2024', 'Entrepreneurship'],
  ['2025', 'Smart Manufacturing · Ongoing'],
]

export function Education() {
  const [active, setActive] = useState(2)

  return <section id="education" className="home-section h-dvh snap-start snap-always overflow-hidden bg-[#faf8f4] px-5 pb-[clamp(1rem,2.5vh,2rem)] pt-[calc(4rem+clamp(1rem,2.5vh,2rem))] md:px-8">
    <div className="mx-auto grid h-full max-w-6xl grid-rows-[auto_auto_1fr]">
      <SectionHeading eyebrow="EDUCATION · 2020—2027" title="我的学习路线，不只一条线 📚" description="从工程到金融，再到智能制造。这里先留下学历与成绩，研究故事放到后面的经历里慢慢讲。" />

      <div className="mt-[clamp(.75rem,1.8vh,1.25rem)] rounded-[20px] border border-[#e7ded3] bg-white/75 px-5 py-2.5 shadow-[0_8px_26px_rgba(78,62,48,.05)]">
        <div className="relative flex items-center justify-between"><div className="absolute left-3 right-3 top-3 h-px bg-[#c9bbaa]" />{timeline.map((item, i) => <button key={item[0]} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="relative z-10 text-center"><span className={`mx-auto block size-6 rounded-full border-4 border-white transition ${active === i ? 'scale-110 bg-[#d87968]' : 'bg-[#c9bbaa]'}`} /><b className="mt-2 block text-sm">{item[0]}</b></button>)}</div>
        <p className="mt-3 text-center text-sm font-medium text-[#d87968]">{timeline[active][1]}</p>
      </div>

      <div className="mt-[clamp(.75rem,1.8vh,1.25rem)] grid min-h-0 gap-4 lg:grid-cols-[.86fr_1.14fr]">
        <article className="relative min-h-0 overflow-hidden rounded-[24px] border border-[#d9e2ec] bg-[#e9f1f7] p-[clamp(1.25rem,2.5vh,2rem)] shadow-[0_12px_34px_rgba(57,89,112,.08)]">
          <div className="absolute -right-12 -top-12 size-44 rounded-full border-[28px] border-white/35" />
          <p className="text-sm tracking-[.16em] text-[#55758d]">01 · HKUST(GZ)</p><div className="mt-2 flex flex-wrap items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#45667e] text-[9px] font-bold leading-tight text-white">HKUST</span><h3 className="text-[clamp(1.35rem,2vw,1.8rem)] font-semibold tracking-tight">香港科技大学（广州）</h3><span className="-rotate-3 rounded-lg border-2 border-[#55758d] px-2.5 py-1 text-xs font-semibold tracking-[.12em] text-[#45667e]">QS 前 50</span></div><p className="mt-1.5 text-base font-medium">智能制造 · 硕士</p><p className="text-sm text-[#657783]">2024.09 — 2027.01 · Guangzhou</p>
          <div className="mt-[clamp(2rem,6vh,4rem)] grid gap-3 sm:grid-cols-2"><div className="-rotate-2 rounded-xl border-2 border-[#55758d] px-4 py-3 text-center text-[#45667e]"><b className="text-2xl">¥240K</b><p className="text-xs tracking-[.15em]">SCHOLARSHIP</p><p className="text-xs font-medium">全额奖学金</p></div><div className="relative rotate-2 rounded-xl border-2 border-[#d87968] px-4 py-3 text-center text-[#bd6658]"><span className="absolute -right-2 -top-7 -rotate-3 whitespace-nowrap bg-[#fff4cf] px-2.5 py-1 text-[10px] font-medium text-[#8c6253] shadow-sm">被央视网、光明日报等主流媒体报道</span><b className="whitespace-nowrap text-2xl">TOP 6 / 80</b><p className="text-xs tracking-[.08em]">OUTSTANDING RBM PROJECT</p></div></div>
        </article>

        <article className="min-h-0 overflow-hidden rounded-[24px] border border-[#eadfc9] bg-[#fffaf0] p-[clamp(1.25rem,2.5vh,2rem)] shadow-[0_12px_34px_rgba(96,73,40,.07)]">
          <p className="text-sm tracking-[.16em] text-[#9b7952]">02 · SCAU</p><div className="mt-3 flex flex-wrap items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#4a7c59] text-[10px] font-bold leading-tight text-white">SCAU</span><h3 className="text-3xl font-semibold tracking-tight">华南农业大学</h3><span className="rotate-3 rounded-lg border-2 border-[#d87968] px-3 py-1.5 text-sm font-semibold tracking-[.12em] text-[#bd6658]">双一流大学</span></div><p className="mt-1 text-sm text-[#806f5d]">SOUTH CHINA AGRICULTURAL UNIVERSITY · 2020.09 — 2024.07</p>
          <div className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-[#e5d7c1] bg-[#e5d7c1] sm:grid-cols-2"><div className="bg-white/80 p-3.5"><p className="text-[10px] tracking-[.15em]">01 / ENGINEERING</p><h4 className="mt-1.5 text-lg font-semibold">土木工程 · 第一学位</h4><div className="mt-2 flex justify-between"><b>GPA 4.00 / 5.0</b><b className="text-[#d87968]">#1 / 62</b></div></div><div className="bg-white/80 p-3.5"><p className="text-[10px] tracking-[.15em]">02 / FINANCE</p><h4 className="mt-1.5 text-lg font-semibold">金融学 · 第二学位</h4><div className="mt-2 flex justify-between"><b>GPA 3.83 / 5.0</b><b className="text-[#d87968]">TOP 10%</b></div></div></div>
          <p className="mt-3 text-[10px] tracking-[.16em] text-[#8b7a66]">SELECTED HONORS</p><div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">{[['🏆 国家奖学金', '1 / 414'], ['✦ 一等奖学金 ×4', 'TOP 1.2%'], ['★ 优秀学生标兵 ×4', 'TOP 1.5%'], ['✦ 华农之星提名奖', 'TOP 0.05%']].map(x => <div key={x[0]} className="rounded-xl bg-white/75 p-2.5"><b className="whitespace-nowrap">{x[0]}</b><p className="mt-1 text-[#d87968]">{x[1]}</p></div>)}</div>
        </article>
      </div>
    </div>
  </section>
}
