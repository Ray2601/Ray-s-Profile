'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { projects, type Project } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

function Interactive3DPreview({ onOpenVideo }: { onOpenVideo?: (src: string) => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)
  const [started, setStarted] = useState(false)
  const [compare, setCompare] = useState(50)
  const [dragging, setDragging] = useState(false)

  const play = () => {
    setStarted(true)
    setPhase(0)
    setCompare(50)
    window.setTimeout(() => setPhase(1), 800)
    window.setTimeout(() => setPhase(2), 2300)
    window.setTimeout(() => setPhase(3), 4100)
  }

  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) play()
    }, { threshold: 0.45 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  const setFromPointer = (x: number) => {
    const box = root.current?.getBoundingClientRect()
    if (box) setCompare(Math.max(12, Math.min(88, ((x - box.left) / box.width) * 100)))
  }

  const steps = [
    ['CLICK', 'SAM 分割', 'Interactive Instance Segmentation'],
    ['COMPLETE', 'QWEN 补全', 'Multimodal Completion'],
    ['3D', 'HY3D 生成', '2D → 3D Generation'],
  ]

  return (
    <div
      ref={root}
      data-preview-interactive
      className="relative h-full min-h-0 w-full overflow-hidden bg-[#f7f3ed] text-[#332f2b]"
      onPointerMove={(e) => {
        if (dragging) setFromPointer(e.clientX)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="absolute inset-x-0 top-0 bottom-20 flex">
        <div className="group relative h-full overflow-hidden transition-[width] duration-300" style={{ width: `${compare}%` }}>
          <svg viewBox="77 164 691 547" preserveAspectRatio="xMidYMid slice" className={`size-full transition duration-700 ${phase === 0 ? 'opacity-0' : 'opacity-100'}`}>
            <image href="/images/projects/xiniuniao/ref.png" width="1680" height="941" />
          </svg>
          <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold shadow">BEFORE · 原始图片</span>
          {phase === 1 && (
            <>
              <span className="absolute left-[55%] top-[48%] size-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-[#d86135]" />
              <span className="absolute left-[28%] top-[20%] h-[67%] w-[50%] rounded-[42%] border-2 border-dashed border-[#d86135] bg-[#d86135]/10 shadow-[0_0_40px_rgba(216,97,53,.25)]" />
            </>
          )}
        </div>
        <div className="group relative h-full flex-1 overflow-hidden bg-[#dedede] transition">
          <svg viewBox="904 164 695 547" preserveAspectRatio="xMidYMid slice" className={`size-full transition-all duration-1000 ${phase >= 3 ? 'scale-100 opacity-100' : 'scale-90 opacity-20 blur-sm'}`}>
            <image href="/images/projects/xiniuniao/ref.png" width="1680" height="941" />
          </svg>
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }}
          />
          <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#d86135] shadow">AFTER · 生成后的 3D 模型</span>
        </div>
        <button
          aria-label="拖动比较 Before 和 After"
          onPointerDown={(e) => {
            e.preventDefault()
            setDragging(true)
            setFromPointer(e.clientX)
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          className="absolute bottom-0 top-0 z-20 w-px -translate-x-1/2 cursor-ew-resize bg-white shadow-[0_0_0_1px_rgba(0,0,0,.12)]"
          style={{ left: `${compare}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-sm shadow-lg">↔</span>
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-20 items-center justify-between bg-white/90 px-4">
        <div className="flex flex-1 items-center justify-around">
          {steps.map((s, i) => (
            <div key={s[0]} className="group relative flex items-center gap-2">
              <span className={cn('grid size-7 place-items-center rounded-full text-xs font-bold', phase > i ? 'bg-[#292622] text-white' : phase === i ? 'bg-[#d86135] text-white' : 'bg-[#e7e1d9] text-[#9b938b]')}>
                {phase > i ? '✓' : i + 1}
              </span>
              <div>
                <b className="block text-xs">{s[0]}</b>
                <span className="text-[10px] opacity-60">{s[1]}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={play} className="ml-3 flex items-center gap-1 rounded-full border border-black/10 px-3 py-2 text-xs">
          <span className="inline-flex size-3 items-center justify-center"><Play className="size-3 fill-current" /></span>
          Replay
        </button>
      </div>
      {onOpenVideo && (
        <button onClick={() => onOpenVideo('/images/projects/xiniuniao/raw.mp4')} className="absolute right-4 bottom-24 rounded-full bg-[#292622] px-4 py-2 text-xs text-white shadow-lg">
          Watch Demo
        </button>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#292622]/80 p-5 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[24px] bg-[#fffaf2] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="关闭弹窗" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#292622] shadow">
          <X className="size-5" />
        </button>
        <div className="grid gap-0 md:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[280px] bg-[#f3eadf]">
            {project.video ? (
              <video src={project.video} autoPlay controls playsInline className="h-full w-full object-cover bg-black" />
            ) : (
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            )}
          </div>
          <div className="space-y-4 p-6 md:p-8">
            <p className="text-xs font-medium tracking-[.22em] text-[#b47a3b]">{project.displayType.toUpperCase()}</p>
            <h3 className="text-3xl font-medium tracking-[-.03em]">{project.title}</h3>
            <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#f4eadc] px-3 py-1 text-xs text-[#5e4e3a]">{tag}</span>
              ))}
            </div>
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-2xl font-medium text-[#c86f60]">{m.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  onOpen,
  compact = false,
}: {
  project: Project
  onOpen: (project: Project) => void
  compact?: boolean
}) {
  const content = (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_8px_28px_rgba(85,67,50,.07)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(85,67,50,.11)]',
        compact ? 'min-h-[150px] bg-[#fbf7ef]' : 'h-auto min-h-0 lg:h-[240px] lg:max-h-[250px] md:min-h-[280px]',
      )}
    >
      <div className={cn('grid h-full', compact ? 'md:grid-cols-[220px_1fr]' : 'md:grid-cols-[46%_54%]')}>
        <div className={cn('relative overflow-hidden bg-[#f7eee5]', compact ? 'min-h-[150px] md:min-h-0' : 'min-h-[220px] md:min-h-0')}>
          {project.id === 'xiniuniao' ? (
            <Interactive3DPreview onOpenVideo={project.video ? () => onOpen(project) : undefined} />
          ) : (
            <>
              <Image src={project.image} alt={`${project.title} 封面`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </>
          )}
        </div>

        <div className={cn('relative grid min-w-0 content-center gap-y-2', compact ? 'px-5 py-5' : 'px-5 py-5 md:px-6 md:py-5')}>
          <span className={cn('text-xs font-medium tracking-[.12em]', project.accent === 'primary' ? 'text-primary' : 'text-accent')}>
            {project.subtitle}
          </span>
          <h3 className={cn('font-medium leading-tight tracking-[-.035em]', compact ? 'text-xl' : 'text-[clamp(1.6rem,3vw,1.9rem)]')}>
            {project.href && !project.modalOnly ? (
              <Link href={project.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-primary">
                {project.title}
                {project.displayType !== 'side' && <span className="text-[.5em] font-normal tracking-normal text-muted-foreground">（详情页）</span>}
                <ArrowUpRight className="size-6 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <button type="button" onClick={() => onOpen(project)} className="inline-flex items-center gap-1.5 text-left transition-colors hover:text-primary">
                {project.title}
                {project.displayType !== 'side' && <span className="text-[.5em] font-normal tracking-normal text-muted-foreground">（详情页）</span>}
                <ArrowUpRight className="size-6 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            )}
            {!compact && project.tryHref && (
              <a
                href={project.tryHref}
                target="_blank"
                rel="noreferrer"
                className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#292622] px-3 py-1.5 align-middle text-xs font-medium text-white transition-colors hover:bg-[#c86f60]"
              >
                {project.id === '25-degree' ? '点击试试（Demo） 选择【香港科技大学（广州）】' : '点击试试 Demo'} <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </h3>
          <p className="line-clamp-2 max-w-prose text-[13px] leading-[1.55] text-muted-foreground">
            {project.description}
          </p>

          {compact && <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl bg-[#fffaf2] px-3 py-2">
                <p className="text-base font-medium leading-tight text-[#c86f60]">{metric.value}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>}

          {!compact && <div className="mt-1 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-[#f7f1ea] px-2.5 py-1 text-xs text-secondary-foreground">{tag}</span>
            ))}
          </div>}

          {!compact && <div className="mt-1 grid gap-2 sm:grid-cols-2 md:gap-3">
            {project.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-[#fffaf2] p-3">
                <p className="text-xl font-medium leading-tight text-[#c86f60]">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>}

        </div>
      </div>
    </article>
  )

  return content
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [video, setVideo] = useState<string | null>(null)

  const orderedProjects = ['25-degree', 'tencent-pcg', 'resume-agent', 'xiniuniao']
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
  const sideProjects = projects.filter((project) => project.id === 'zhijing')

  return (
    <section id="projects" className="home-section relative min-h-screen snap-start px-5 pb-12 pt-[calc(4rem+clamp(1rem,2.5vh,2rem))] md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="PROJECTS"
          title="一些我真的做出来的东西 ⚡"
          description="有些从一次聊天开始，有些来自一个不甘心的瞬间。比起只讲方法论，我更想把做过的东西和一路踩过的坑摊开给你看。"
          nowrap
        />

        <div className="mt-8 grid gap-5 md:gap-6">
          {orderedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={(p) => {
              if (p.video) setVideo(p.video)
              else setActiveProject(p)
            }} />
          ))}

          <div className="pt-1">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium tracking-[.24em] text-muted-foreground">MORE EXPERIMENTS</p>
              <p className="text-xs text-muted-foreground">点击项目 查看视频</p>
            </div>
            <div className="grid gap-3">
              {sideProjects.map((project) => (
                <ProjectCard key={project.id} project={project} compact onOpen={(p) => {
                  if (p.video) setVideo(p.video)
                  else setActiveProject(p)
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}

      {video && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#292622]/80 p-5 backdrop-blur-sm" onClick={() => setVideo(null)}>
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[24px] bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideo(null)} aria-label="关闭视频" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#292622] shadow">
              <X className="size-5" />
            </button>
            <video src={video} autoPlay controls playsInline className="max-h-[82vh] w-full bg-black">
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
      )}
    </section>
  )
}
