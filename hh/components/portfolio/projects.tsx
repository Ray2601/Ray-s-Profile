'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, RotateCcw, X } from 'lucide-react'
import { projects } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

function Interactive3DPreview() {
  const root = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)
  const [started, setStarted] = useState(false)
  const [compare, setCompare] = useState(50)
  const [dragging, setDragging] = useState(false)
  const play = () => { setStarted(true); setPhase(0); setCompare(50); setTimeout(() => setPhase(1), 800); setTimeout(() => setPhase(2), 2300); setTimeout(() => setPhase(3), 4100) }
  useEffect(() => { const el = root.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !started) play() }, { threshold: .45 }); observer.observe(el); return () => observer.disconnect() }, [started])
  const setFromPointer = (x: number) => { const box = root.current?.getBoundingClientRect(); if (box) setCompare(Math.max(12, Math.min(88, (x - box.left) / box.width * 100))) }
  const steps = [['CLICK', 'SAM 分割', 'Interactive Instance Segmentation'], ['COMPLETE', 'QWEN 补全', 'Multimodal Completion'], ['3D', 'HY3D 生成', '2D → 3D Generation']]
  return <div ref={root} data-preview-interactive onClick={e => e.preventDefault()} className="relative aspect-video w-full overflow-hidden bg-[#f7f3ed] text-[#332f2b]" onPointerMove={e => { if (dragging) setFromPointer(e.clientX) }} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}>
    <div className="absolute inset-x-0 top-0 bottom-20 flex">
      <div className="group relative h-full overflow-hidden transition-[width] duration-300" style={{ width: `${compare}%` }}><svg viewBox="77 164 691 547" preserveAspectRatio="xMidYMid slice" className={`size-full transition duration-700 ${phase === 0 ? 'opacity-0' : 'opacity-100'}`}><image href="/images/projects/xiniuniao/ref.png" width="1680" height="941" /></svg><span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold shadow">BEFORE · 原始图片</span><span className="absolute bottom-4 left-4 translate-y-2 rounded-full bg-[#292622]/80 px-3 py-1 text-xs text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">2D INPUT</span>{phase === 1 && <><span className="absolute left-[55%] top-[48%] size-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-[#d86135]" /><span className="absolute left-[28%] top-[20%] h-[67%] w-[50%] rounded-[42%] border-2 border-dashed border-[#d86135] bg-[#d86135]/10 shadow-[0_0_40px_rgba(216,97,53,.25)]" /></>}</div>
      <div className="group relative h-full flex-1 overflow-hidden bg-[#dedede] transition"><svg viewBox="904 164 695 547" preserveAspectRatio="xMidYMid slice" className={`size-full transition-all duration-1000 ${phase >= 3 ? 'scale-100 opacity-100' : 'scale-90 opacity-20 blur-sm'}`}><image href="/images/projects/xiniuniao/ref.png" width="1680" height="941" /></svg><div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} /><span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#d86135] shadow">AFTER · 生成后的 3D 模型</span><span className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-[#292622]/80 px-3 py-1 text-xs text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">3D OUTPUT</span>{phase === 2 && <div className="absolute inset-0 grid place-items-center"><div className="size-36 animate-pulse rounded-[40%] border-2 border-dashed border-white/80 bg-white/10 shadow-[0_0_50px_rgba(255,255,255,.35)]" /><p className="absolute bottom-5 text-xs text-white">Completing unseen regions…</p></div>}</div>
      <button aria-label="拖动比较 Before 和 After" onPointerDown={e => { e.preventDefault(); setDragging(true); setFromPointer(e.clientX); e.currentTarget.setPointerCapture(e.pointerId) }} className="absolute bottom-0 top-0 z-20 w-px -translate-x-1/2 cursor-ew-resize bg-white shadow-[0_0_0_1px_rgba(0,0,0,.12)]" style={{ left: `${compare}%` }}><span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-sm shadow-lg">↔</span><span className="absolute left-1/2 top-[60%] -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-2 py-1 text-[10px] text-white opacity-0 transition hover:opacity-100">Drag to compare</span></button>
    </div>
    <div className="absolute inset-x-0 bottom-0 flex h-20 items-center justify-between bg-white/90 px-4"><div className="flex flex-1 items-center justify-around">{steps.map((s, i) => <div key={s[0]} className="group relative flex items-center gap-2"><span className={`grid size-7 place-items-center rounded-full text-xs font-bold ${phase > i ? 'bg-[#292622] text-white' : phase === i ? 'bg-[#d86135] text-white' : 'bg-[#e7e1d9] text-[#9b938b]'}`}>{phase > i ? '✓' : i + 1}</span><div><b className="block text-xs">{s[0]}</b><span className="text-[10px] opacity-60">{s[1]}</span></div><span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#292622] px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">{s[2]}</span>{i < 2 && <span className="ml-5 opacity-25">→</span>}</div>)}</div><button onClick={play} className="ml-3 flex items-center gap-1 rounded-full border border-black/10 px-3 py-2 text-xs"><RotateCcw className="size-3" />Replay</button></div>
  </div>
}

export function Projects() {
  const [video, setVideo] = useState<string | null>(null)
  const orderedProjects = [...projects].sort((a, b) => {
    const order = ['25-degree', 'resume-agent', 'xiniuniao', 'zhijing']
    return order.indexOf(a.id) - order.indexOf(b.id)
  })
  return (
    <section id="projects" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="MY LITTLE LAB"
          title="一些我真的做出来的东西 ⚡"
          description="有些从一次聊天开始，有些来自一个不甘心的瞬间。比起只讲方法论，我更想把做过的东西和一路踩过的坑摊开给你看。"
          nowrap
        />

        <div className="mt-14 grid gap-8 md:gap-10">
          {orderedProjects.map((p, i) => {
            const reversed = i % 2 === 1
            return (
            <article
              key={p.id}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_12px_40px_rgba(85,67,50,.08)] transition-all hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(85,67,50,.12)] md:flex-row',
                i % 2 === 0 ? 'md:rotate-[.25deg]' : 'md:-rotate-[.25deg]',
              )}
            >
              {p.id === '25-degree' && (
                <span className="absolute right-5 top-5 z-20 rotate-2 rounded-sm bg-[#f3c64f] px-4 py-2 text-xs font-medium leading-5 text-[#51422e] shadow-md">
                  微信小程序搜「25度」<br />目前仍在部分运营中
                </span>
              )}
              <Link href={p.href || '#'} onClick={e => { if (p.video && !(e.target as HTMLElement).closest('[data-preview-interactive]')) { e.preventDefault(); setVideo(p.video) } }} className="contents" aria-label={`查看 ${p.title} 项目`}>
              <div
                className={cn(
                  'relative aspect-[16/10] w-full overflow-hidden bg-[#f7eee5] md:aspect-auto md:w-1/2',
                  reversed && 'md:order-2',
                )}
              >
                {p.id === 'xiniuniao' ? <Interactive3DPreview /> : <Image
                  src={p.image || '/placeholder.svg'}
                  alt={`${p.title} 界面截图`}
                  fill
                  className={cn(
                    'transition-transform duration-500 group-hover:scale-[1.02]',
                    p.id === '25-degree' ? 'object-cover' : 'object-cover group-hover:scale-105',
                  )}
                />}
              </div>

              <div className={cn('relative flex flex-1 flex-col p-7 md:p-10', reversed && 'md:order-1')}>
                {p.id !== '25-degree' && <span className="absolute right-7 top-5 text-xl text-[#efb94c]" aria-hidden>✦</span>}
                <span
                  className={cn(
                    'text-xs font-medium',
                    p.accent === 'primary' ? 'text-primary' : 'text-accent',
                  )}
                >
                  {p.subtitle}
                </span>
                <h3 className="mt-3 flex items-center gap-1.5 text-2xl font-medium tracking-[-.025em] md:text-3xl">
                  {p.title}
                  <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-4 text-[15px] font-normal leading-7 text-muted-foreground">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#f7f1ea] px-3 py-1.5 text-xs font-normal text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-8 pt-6">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-2xl font-medium text-[#c86f60]">{m.value}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              </Link>
            </article>
            )
          })}
        </div>
      </div>
      {video && <div className="fixed inset-0 z-[100] grid place-items-center bg-[#292622]/80 p-5 backdrop-blur-sm" onClick={() => setVideo(null)}><div className="relative w-full max-w-5xl overflow-hidden rounded-[24px] bg-black shadow-2xl" onClick={e => e.stopPropagation()}><button onClick={() => setVideo(null)} aria-label="关闭视频" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#292622] shadow"><X className="size-5" /></button><video src={video} autoPlay controls playsInline className="max-h-[82vh] w-full bg-black">您的浏览器不支持视频播放。</video></div></div>}
    </section>
  )
}
