'use client'

import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

type Chapter = {
  id: string
  en: string
  cn: string
  caption: string
  image: string
  why: string
  how: string
  result: string
}

const chapters: Chapter[] = [
  { id: '01', en: 'UNDERSTAND', cn: '读懂剧情', caption: '剧情适配 · 广告贴片 · 剧情弹幕', image: '/images/projects/tencent-ad/02.gif', why: '广告与正在发生的剧情脱节，相关性很难建立。', how: '识别剧情时刻与商品意图，把广告放进用户正在理解的语境。', result: '从随机曝光，转向更自然的剧情触发。' },
  { id: '02', en: 'PLAY', cn: '让广告可玩', caption: '射击 · 点选 · 养成 · 探秘', image: '/images/projects/tencent-ad/01.gif', why: '用户会跳过不能参与的贴片广告。', how: '优先验证射击与点选，再扩展养成和探秘玩法。', result: '把“看完广告”变成一次主动操作。' },
  { id: '03', en: 'ENGAGE', cn: '让互动持续', caption: '背包 · 换装 · 积分', image: '/images/projects/tencent-ad/03.gif', why: '单次互动结束后，没有继续参与的理由。', how: '将广告商品转化为背包物品、装扮与积分奖励。', result: '让一次广告互动沉淀为长期关系。' },
  { id: '04', en: 'MEASURE', cn: '让效果可见', caption: '互动 · 深层行为 · CPM · ROI', image: '/images/projects/tencent-ad/05.gif', why: '只有曝光数据，无法证明互动真正创造了价值。', how: '建立从曝光、互动、点击到转化的广告主数据链路。', result: '让创意效果与商业结果可以被共同衡量。' },
  { id: '05', en: 'LISTEN', cn: '听见用户', caption: '表扬 · 投诉', image: '/images/projects/tencent-ad/04.gif', why: '广告效果指标不能代替用户体验。', how: '同时接收正向反馈与投诉，把体验纳入产品判断。', result: '增长之外，保留用户说“不”的通道。' },
  { id: '06', en: 'EVOLVE', cn: '走向下一步', caption: '互动 → 交易 · 观剧精灵', image: '/images/projects/tencent-ad/06.png', why: '互动不是终点，它应该自然连接交易与陪伴。', how: '探索互动付费，并让观剧精灵参与剧情预测和吐槽。', result: '从广告组件，走向陪伴式观看体验。' },
]

function Projection({ chapter }: { chapter: Chapter }) {
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="pointer-events-none fixed left-[50vw] top-[50vh] z-[60] m-0 -translate-x-1/2 -translate-y-1/2">
      <img data-projection-media src={projectionImages[chapter.id]} alt="" className="block h-auto max-h-[78vh] w-auto max-w-[78vw] object-contain" />
    </div>,
    document.body,
  )
}

const projectionImages: Record<string, string> = {
  '01': '/images/projects/tencent-ad/02.gif',
  '02': '/images/projects/tencent-ad/01.gif',
  '03': '/images/projects/tencent-ad/03.gif',
  '04': '/images/projects/tencent-ad/05.gif',
  '05': '/images/projects/tencent-ad/04.gif',
  '06': '/images/projects/tencent-ad/06.png',
}

function TencentAdShowcaseLegacy() {
  const hero = useRef<HTMLElement>(null)
  const wallpaper = useRef<HTMLDivElement>(null)
  const lightTarget = useRef({ x: 0, y: 0 })
  const lightCurrent = useRef({ x: 0, y: 0 })
  const poolCurrent = useRef({ x: 0, y: 0 })
  const lightReady = useRef(false)
  const [peeling, setPeeling] = useState(false)
  const [entered, setEntered] = useState(false)
  const [hovered, setHovered] = useState<Chapter | null>(null)
  const [detail, setDetail] = useState<Chapter | null>(null)
  const enter = () => {
    if (peeling) return
    setPeeling(true)
    setTimeout(() => setEntered(true), 650)
  }
  const moveHeroLight = (event: PointerEvent<HTMLElement>) => {
    const bounds = wallpaper.current?.getBoundingClientRect()
    if (!bounds) return
    lightTarget.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    if (!lightReady.current) {
      lightCurrent.current = lightTarget.current
      poolCurrent.current = lightTarget.current
      lightReady.current = true
    }
  }
  useEffect(() => {
    let frame = 0
    const animateLight = () => {
      const layer = wallpaper.current
      if (layer) {
        const bounds = layer.getBoundingClientRect()
        if (!lightReady.current) {
          lightTarget.current = { x: bounds.width * .62, y: bounds.height * .58 }
          lightCurrent.current = lightTarget.current
          poolCurrent.current = lightTarget.current
          lightReady.current = true
        }
        const current = lightCurrent.current
        const target = lightTarget.current
        current.x += (target.x - current.x) * .08
        current.y += (target.y - current.y) * .08
        const pool = poolCurrent.current
        pool.x += (target.x - pool.x) * .1
        pool.y += (target.y - pool.y) * .1
        const sourceX = -bounds.width * .1
        const sourceY = -bounds.height * .1
        const dx = current.x - sourceX
        const dy = current.y - sourceY
        layer.style.setProperty('--beam-source-x', `${sourceX}px`)
        layer.style.setProperty('--beam-source-y', `${sourceY}px`)
        layer.style.setProperty('--beam-length', `${Math.hypot(dx, dy)}px`)
        layer.style.setProperty('--beam-angle', `${Math.atan2(dy, dx) * 180 / Math.PI}deg`)
        layer.style.setProperty('--beam-end-x', `${pool.x}px`)
        layer.style.setProperty('--beam-end-y', `${pool.y}px`)
        layer.style.setProperty('--pool-angle', `${Math.atan2(pool.y - sourceY, pool.x - sourceX) * 180 / Math.PI}deg`)
      }
      frame = requestAnimationFrame(animateLight)
    }
    frame = requestAnimationFrame(animateLight)
    return () => cancelAnimationFrame(frame)
  }, [])
  return <main className="h-dvh overflow-hidden bg-[#d7d3ca] text-[#262521]">
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-black/10 bg-[#f5efdf]/80 px-6 backdrop-blur-md"><Link href="/#projects" className="flex items-center gap-2 text-sm"><ArrowLeft className="size-4" />Portfolio</Link><b className="text-xs tracking-[.18em]">TENCENT VIDEO · INTERACTIVE ADS</b><span className="text-xs opacity-45">2026</span></header>

    <section ref={hero} onPointerMove={moveHeroLight} className="wall relative mt-14 h-[calc(100dvh-3.5rem)] overflow-hidden bg-[#999b99]">
      <img src="/images/projects/tencent-ad/bg_2.png" alt="" className="concrete-wall absolute inset-0 size-full object-cover" />

      <div ref={wallpaper} className={`wallpaper-layer absolute inset-0 z-10 overflow-hidden bg-transparent shadow-[0_10px_28px_rgba(43,42,36,.3)] ${peeling ? 'pointer-events-none' : ''}`}>
        {[
          'polygon(0 0,34% 0,31% 38%,38% 64%,30% 100%,0 100%)',
          'polygon(31% 0,67% 0,63% 25%,70% 52%,61% 100%,30% 100%,38% 64%,31% 38%)',
          'polygon(64% 0,100% 0,100% 100%,61% 100%,70% 52%,63% 25%)',
        ].map((clipPath, index) => (
          <div
            key={clipPath}
            className={`absolute inset-0 bg-[#c7a36d] transition-[transform,opacity,filter] duration-[1100ms] ease-[cubic-bezier(.7,0,.2,1)] ${peeling ? ['translate-x-[112%] -translate-y-[5%] rotate-[4deg]', 'translate-x-[120%] -translate-y-[10%] rotate-[7deg]', 'translate-x-[108%] -translate-y-[2%] rotate-[2deg]'][index] + ' opacity-0' : ''}`}
            style={{ clipPath, backgroundImage: "url('/images/projects/tencent-ad/bg_1.png')", backgroundPosition: 'center', backgroundSize: 'cover' }}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[#302313]/30" />
        <div className="light-system pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-screen">
          <div className="beam absolute h-[clamp(270px,30vw,470px)] origin-left" style={{ left: 'var(--beam-source-x)', top: 'var(--beam-source-y)', width: 'var(--beam-length)', transform: 'translateY(-50%) rotate(var(--beam-angle))' }}>
            <div className="beam-outer absolute -inset-y-[18%] inset-x-0 rounded-[50%] opacity-[.16] blur-[58px]" style={{ background: 'radial-gradient(ellipse at 72% 50%,rgba(244,239,222,.34) 0%,rgba(239,231,208,.15) 38%,rgba(235,228,210,.05) 58%,transparent 78%)', maskImage: 'linear-gradient(90deg,transparent 0%,rgba(0,0,0,.12) 12%,rgba(0,0,0,.75) 62%,#000 100%)' }} />
            <div className="beam-middle absolute inset-y-[12%] inset-x-0 rounded-[50%] opacity-[.2] blur-[38px]" style={{ background: 'radial-gradient(ellipse at 76% 50%,rgba(250,245,229,.38) 0%,rgba(240,234,216,.16) 40%,transparent 75%)', maskImage: 'linear-gradient(90deg,transparent 0%,rgba(0,0,0,.2) 20%,#000 100%)' }} />
            <div className="beam-core absolute inset-y-[31%] inset-x-[2%] rounded-[50%] opacity-[.18] blur-[24px]" style={{ background: 'radial-gradient(ellipse at 80% 50%,rgba(255,250,237,.42) 0%,rgba(245,240,223,.14) 48%,transparent 78%)', maskImage: 'linear-gradient(90deg,transparent 0%,rgba(0,0,0,.3) 28%,#000 100%)' }} />
          </div>
          <div className="light-pool absolute h-[clamp(180px,21vw,260px)] w-[clamp(320px,32vw,450px)] rounded-[50%] opacity-[.28] blur-[38px]" style={{ left: 'var(--beam-end-x)', top: 'var(--beam-end-y)', transform: 'translate(-50%,-50%) rotate(var(--pool-angle))', background: 'radial-gradient(ellipse,rgba(252,247,231,.38) 0%,rgba(240,233,214,.16) 42%,rgba(235,228,211,.05) 62%,transparent 79%)' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[4] shadow-[inset_0_0_120px_rgba(45,30,14,.32)]" />

        <div className={`hero-content relative z-10 mx-auto grid h-full w-full grid-rows-[42%_58%] px-[clamp(1.5rem,5vw,5rem)] py-[clamp(1rem,2.6vh,2rem)] text-[#302d28] transition-opacity duration-300 ${peeling ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative min-h-0">
            <div className="absolute left-[1%] top-[18%] w-[clamp(9.5rem,14vw,13rem)] opacity-90">
              <p className="text-[clamp(1.08rem,1.55vw,1.45rem)] font-medium leading-[1.2]">看了，<br />但没在看</p>
              <p className="mt-[clamp(.45rem,1.15vh,.75rem)] text-[10px] tracking-[.28em] text-[#805b3d]/85">ATTENTION</p>
              <p className="mt-1 text-[clamp(.78rem,.95vw,.9rem)] leading-relaxed text-[#49433c]/80">强制曝光 ≠ 有效触达</p>
            </div>
            <div className="absolute left-[38%] top-[3%] w-[clamp(13rem,20vw,18rem)] opacity-95">
              <p className="text-[clamp(1.12rem,1.65vw,1.55rem)] font-medium leading-[1.18]">想增长，<br />但不能一直加广告</p>
              <p className="mt-[clamp(.55rem,1.4vh,.9rem)] text-[10px] tracking-[.3em] text-[#805b3d]/85">GROWTH</p>
              <p className="mt-1 text-[clamp(.8rem,1vw,.92rem)] leading-relaxed text-[#49433c]/82">收入增长 × 用户体验</p>
            </div>
            <div className="absolute left-[68%] top-[29%] w-[clamp(11rem,16vw,15rem)] opacity-85">
              <p className="text-[clamp(1.02rem,1.45vw,1.35rem)] font-medium leading-[1.22]">广告和“我”<br />没关系</p>
              <p className="mt-[clamp(.4rem,1vh,.7rem)] text-[10px] tracking-[.26em] text-[#805b3d]/80">RELEVANCE</p>
              <p className="mt-1 text-[clamp(.76rem,.9vw,.88rem)] leading-relaxed text-[#49433c]/76">不感兴趣 · 不够原生</p>
            </div>
          </div>
          <div className="flex min-h-0 flex-col items-center justify-center pb-[clamp(.25rem,1vh,.75rem)] text-center">
            <h1 className="text-balance text-[clamp(2rem,3.25vw,3.2rem)] font-semibold leading-[1.08] tracking-[-.035em]">如果不能让用户看更多广告，<br />能不能让用户更愿意参与广告？</h1>
            <p className="mt-[clamp(.65rem,1.7vh,1rem)] text-[clamp(1rem,1.35vw,1.25rem)] text-[#95533d]">→ 从「被动看」到「主动玩」</p>
            <button onClick={enter} className="mt-[clamp(.85rem,2.1vh,1.35rem)] inline-flex items-center gap-2 border-b border-[#312e29]/70 pb-1.5 text-[11px] font-medium tracking-[.24em] transition-transform hover:translate-x-1">CLICK TO ENTER <ArrowRight className="size-3.5" /></button>
            <p className="mt-[clamp(.35rem,1vh,.65rem)] text-[11px] italic tracking-wide text-[#575149]/55">What if ads were playable?</p>
          </div>
        </div>
      </div>

      <div className={`lighting-layer pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ${entered ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-30 w-full bg-gradient-to-r from-transparent via-[#fff8df]/65 to-transparent transition-transform duration-700 ${peeling ? 'translate-x-full' : '-translate-x-full'}`} />
      <div className={`project-menu-layer absolute inset-0 z-10 transition-opacity duration-500 ${entered ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="absolute -right-[12%] -top-[20%] h-[80%] w-[70%] rotate-[-18deg] bg-gradient-to-b from-[#fff6ce]/35 to-transparent blur-xl" />
        <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 text-center opacity-35"><p className="text-xs tracking-[.35em]">TENCENT VIDEO</p><h2 className="mt-2 text-6xl font-semibold tracking-[-.05em]">RETHINKING<br />ADS</h2><p className="mt-3 text-xs">HOVER TO WATCH · CLICK TO EXPLORE</p></div>
        {hovered && <Projection chapter={hovered} />}
        <div className="relative mx-auto h-full max-w-[1400px] px-8 md:px-24">
          {chapters.map((c, i) => { const positions = ['left-[17%] top-[14%]', 'left-[8%] top-[43%]', 'right-[8%] top-[31%]', 'left-[19%] bottom-[12%]', 'right-[17%] bottom-[17%]', 'right-[35%] top-[11%]']; return <button key={c.id} onMouseEnter={() => setHovered(c)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(c)} onBlur={() => setHovered(null)} onClick={() => setDetail(c)} className={`absolute text-left transition-all duration-500 ${positions[i]} ${hovered && hovered.id !== c.id ? 'opacity-20' : 'opacity-100'} ${hovered?.id === c.id ? 'scale-105 text-[#fff7d8] drop-shadow-[0_2px_8px_rgba(0,0,0,.5)]' : ''}`}><span className="text-xs tracking-[.2em] opacity-50">{c.id}</span><b className="mt-1 block text-xl tracking-[.05em]">{c.en}</b><span className="mt-1 block text-base">{c.cn}</span><small className="mt-2 block max-w-64 opacity-50">{c.caption}</small></button> })}
        </div>
      </div>
    </section>

    {detail && <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setDetail(null)}><article className="relative grid w-full max-w-5xl gap-6 rounded-2xl bg-[#e7e3da] p-7 shadow-2xl md:grid-cols-[1.15fr_.85fr]" onClick={e => e.stopPropagation()}><button onClick={() => setDetail(null)} aria-label="关闭详情" className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white"><X className="size-4" /></button><div className="aspect-video overflow-hidden rounded-xl bg-[#272825]"><img src={detail.image} alt={`${detail.en} 项目预览`} className="size-full object-cover opacity-80 mix-blend-screen" /></div><div className="pr-5"><p className="text-xs tracking-[.2em] opacity-45">{detail.id} · {detail.en}</p><h3 className="mt-2 text-3xl font-semibold">{detail.cn}</h3><p className="mt-2 text-sm text-[#73513e]">{detail.caption}</p>{[['WHY',detail.why],['HOW',detail.how],['RESULT',detail.result]].map(x => <div key={x[0]} className="mt-5 border-t border-black/10 pt-3"><b className="text-[10px] tracking-[.2em] opacity-45">{x[0]}</b><p className="mt-1 leading-7">{x[1]}</p></div>)}</div></article></div>}
  </main>
}

const painGroups = [
  {
    id: 'USER',
    position: 'left-[6%] top-[11%] w-[25%]',
    items: ['和「我」没关系', '不想看，也得等它播完', '我只是想好好看剧'],
  },
  {
    id: 'PLATFORM',
    position: 'left-[36%] top-[31%] w-[30%]',
    items: ['想试，但一次试错太贵', '问题发生了，T+1 才知道', '知道「他是谁」，不知道「他现在想要什么」', '广告在烧钱，却不能边跑边改', '转化了，却不知道是谁的功劳'],
  },
  {
    id: 'ADVERTISER',
    position: 'right-[5%] top-[13%] w-[25%]',
    items: ['看了，但没在看', '看到了，但离购买还很远', '知道他点了，不知道他喜欢什么', '有曝光数字，没有用户态度'],
  },
] as const

const requirementPositions = [
  'left-[10%] top-[13%]',
  'left-[23%] top-[43%]',
  'left-[31%] bottom-[12%]',
  'right-[31%] bottom-[12%]',
  'right-[8%] top-[40%]',
  'right-[11%] top-[13%]',
] as const

const fixedBeams = [
  { phase: 3, beam: 'left-[-7%] top-[-7%] w-[28vw] rotate-[39deg]', spot: 'left-[9%] top-[11%]' },
  { phase: 3, beam: 'left-[-7%] top-[-7%] w-[49vw] rotate-[48deg]', spot: 'left-[22%] top-[41%]' },
  { phase: 4, beam: 'left-[-7%] top-[-7%] w-[51vw] rotate-[56deg]', spot: 'left-[30%] bottom-[10%]' },
  { phase: 4, beam: 'left-[-7%] top-[-7%] w-[76vw] rotate-[50deg]', spot: 'right-[30%] bottom-[10%]' },
  { phase: 5, beam: 'left-[-7%] top-[-7%] w-[82vw] rotate-[31deg]', spot: 'right-[7%] top-[38%]' },
  { phase: 5, beam: 'left-[-7%] top-[-7%] w-[86vw] rotate-[18deg]', spot: 'right-[10%] top-[11%]' },
] as const

const painFadePhases = [
  [3, 4, 4],
  [5, 4, 3, 5, 4],
  [4, 4, 5, 4],
] as const

const stagedPains = [
  { text: '和「我」没关系', group: 0, scatter: 'left-[7%] top-[17%]', grouped: 'left-[8%] top-[24%]' },
  { text: '不想看，也得等它播完', group: 0, scatter: 'left-[27%] top-[11%]', grouped: 'left-[8%] top-[31%]' },
  { text: '我只是想好好看剧', group: 0, scatter: 'left-[16%] bottom-[15%]', grouped: 'left-[8%] top-[38%]' },
  { text: '想试，但一次试错太贵', group: 1, scatter: 'left-[39%] top-[8%]', grouped: 'left-[38%] top-[29%]' },
  { text: '问题发生了，T+1 才知道', group: 1, scatter: 'right-[23%] top-[26%]', grouped: 'left-[38%] top-[36%]' },
  { text: '知道「他是谁」，不知道「他现在想要什么」', group: 1, scatter: 'left-[32%] bottom-[18%]', grouped: 'left-[38%] top-[43%]' },
  { text: '广告在烧钱，却不能边跑边改', group: 1, scatter: 'left-[46%] top-[47%]', grouped: 'left-[38%] top-[50%]' },
  { text: '转化了，却不知道是谁的功劳', group: 1, scatter: 'right-[9%] bottom-[11%]', grouped: 'left-[38%] top-[57%]' },
  { text: '看了，但没在看', group: 2, scatter: 'right-[8%] top-[12%]', grouped: 'right-[8%] top-[25%]' },
  { text: '看到了，但离购买还很远', group: 2, scatter: 'right-[4%] top-[43%]', grouped: 'right-[8%] top-[32%]' },
  { text: '知道他点了，不知道他喜欢什么', group: 2, scatter: 'right-[18%] bottom-[25%]', grouped: 'right-[8%] top-[39%]' },
  { text: '有曝光数字，没有用户态度', group: 2, scatter: 'left-[58%] top-[21%]', grouped: 'right-[8%] top-[46%]' },
] as const

const floatingPainSeeds = [
  [7, 17], [27, 11], [16, 68], [39, 8], [68, 26], [32, 64],
  [46, 47], [74, 76], [82, 12], [78, 43], [64, 66], [58, 21],
] as const

export function TencentAdShowcase() {
  const scroller = useRef<HTMLElement>(null)
  const wall = useRef<HTMLDivElement>(null)
  const lightTarget = useRef({ x: 0, y: 0 })
  const lightCurrent = useRef({ x: 0, y: 0 })
  const lightReady = useRef(false)
  const revealTimers = useRef<number[]>([])
  const [floatingPains, setFloatingPains] = useState<Array<{ x: number; y: number }>>([])
  const [phase, setPhase] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [hovered, setHovered] = useState<Chapter | null>(null)
  const [detail, setDetail] = useState<Chapter | null>(null)

  const moveLight = (event: PointerEvent<HTMLElement>) => {
    if (phase !== 0) return
    const bounds = wall.current?.getBoundingClientRect()
    if (!bounds) return
    lightTarget.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    if (!lightReady.current) {
      lightCurrent.current = lightTarget.current
      lightReady.current = true
    }
  }

  useEffect(() => {
    let frame = 0
    const animate = () => {
      const layer = wall.current
      if (layer) {
        const bounds = layer.getBoundingClientRect()
        if (!lightReady.current) {
          lightTarget.current = { x: bounds.width * .22, y: bounds.height * .28 }
          lightCurrent.current = lightTarget.current
          lightReady.current = true
        }
        const current = lightCurrent.current
        current.x += (lightTarget.current.x - current.x) * .09
        current.y += (lightTarget.current.y - current.y) * .09
        const sourceX = -bounds.width * .08
        const sourceY = -bounds.height * .12
        const dx = current.x - sourceX
        const dy = current.y - sourceY
        layer.style.setProperty('--beam-source-x', `${sourceX}px`)
        layer.style.setProperty('--beam-source-y', `${sourceY}px`)
        layer.style.setProperty('--beam-length', `${Math.hypot(dx, dy)}px`)
        layer.style.setProperty('--beam-angle', `${Math.atan2(dy, dx) * 180 / Math.PI}deg`)
        layer.style.setProperty('--beam-end-x', `${current.x}px`)
        layer.style.setProperty('--beam-end-y', `${current.y}px`)
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (phase !== 0) return
    const layer = wall.current
    if (!layer) return

    const bounds = layer.getBoundingClientRect()
    const padding = 28
    const estimatedWidths = [160, 210, 170, 210, 215, 320, 230, 240, 150, 220, 265, 230]
    const positions = floatingPainSeeds.map(([x, y], index) => ({
      x: Math.min(bounds.width - estimatedWidths[index] - padding, Math.max(padding, bounds.width * x / 100)),
      y: Math.min(bounds.height - 42 - padding, Math.max(padding, bounds.height * y / 100)),
    }))
    const velocities = floatingPainSeeds.map((_, index) => ({
      x: (index % 2 === 0 ? 1 : -1) * (16 + (index * 7) % 14),
      y: (index % 3 === 0 ? -1 : 1) * (11 + (index * 5) % 12),
    }))
    let frame = 0
    let previous = performance.now()
    let lastPaint = 0

    setFloatingPains(positions)
    const float = (now: number) => {
      const delta = Math.min((now - previous) / 1000, .05)
      previous = now
      positions.forEach((position, index) => {
        const velocity = velocities[index]
        position.x += velocity.x * delta
        position.y += velocity.y * delta
        const maxX = Math.max(padding, bounds.width - estimatedWidths[index] - padding)
        const maxY = Math.max(padding, bounds.height - 42 - padding)
        if (position.x <= padding || position.x >= maxX) {
          position.x = Math.min(maxX, Math.max(padding, position.x))
          velocity.x *= -1
        }
        if (position.y <= padding || position.y >= maxY) {
          position.y = Math.min(maxY, Math.max(padding, position.y))
          velocity.y *= -1
        }
      })
      if (now - lastPaint > 32) {
        lastPaint = now
        setFloatingPains(positions.map(position => ({ ...position })))
      }
      frame = requestAnimationFrame(float)
    }
    frame = requestAnimationFrame(float)
    return () => cancelAnimationFrame(frame)
  }, [phase])

  useEffect(() => () => revealTimers.current.forEach(window.clearTimeout), [])

  const beginSynthesis = () => {
    if (phase !== 2 || transitioning) return
    setTransitioning(true)
    setPhase(3)
    revealTimers.current = [
      window.setTimeout(() => setPhase(4), 650),
      window.setTimeout(() => setPhase(5), 1300),
      window.setTimeout(() => setTransitioning(false), 1900),
    ]
  }

  const advanceScene = () => {
    if (transitioning) return
    if (phase === 0) setPhase(1)
    else if (phase === 1) setPhase(2)
    else if (phase === 2) beginSynthesis()
  }

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaY) < 8) return
    const firstPage = (scroller.current?.scrollTop ?? 0) < window.innerHeight * .45
    if (!firstPage || event.deltaY < 0) return
    if (phase < 2) {
      event.preventDefault()
      advanceScene()
      return
    }
    if (phase === 2 || phase < 5 || transitioning) {
      event.preventDefault()
      if (phase === 2) beginSynthesis()
      return
    }
    event.preventDefault()
  }

  return <main ref={scroller} onWheel={handleWheel} className="h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth bg-[#8f918f] text-[#262521] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-black/10 bg-[#f5efdf]/80 px-6 backdrop-blur-md"><Link href="/#projects" className="flex items-center gap-2 text-sm"><ArrowLeft className="size-4" />Portfolio</Link><b className="text-xs tracking-[.18em]">TENCENT VIDEO · INTERACTIVE ADS</b><span className="text-xs opacity-45">2026</span></header>

    <section onPointerMove={moveLight} onClick={advanceScene} className="relative h-dvh snap-start cursor-crosshair overflow-hidden">
      <img src="/images/projects/tencent-ad/bg_2.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 z-10">
        {['polygon(0 0,34% 0,31% 38%,38% 64%,30% 100%,0 100%)', 'polygon(31% 0,67% 0,63% 25%,70% 52%,61% 100%,30% 100%,38% 64%,31% 38%)', 'polygon(64% 0,100% 0,100% 100%,61% 100%,70% 52%,63% 25%)'].map((clipPath, index) => <div key={clipPath} className={`absolute inset-0 bg-cover bg-center transition-[transform,opacity] duration-[1000ms] ease-[cubic-bezier(.7,0,.2,1)] ${phase >= 2 ? ['translate-x-[112%] -translate-y-[5%] rotate-[4deg] opacity-0', 'translate-x-[120%] -translate-y-[10%] rotate-[7deg] opacity-0', 'translate-x-[108%] -translate-y-[2%] rotate-[2deg] opacity-0'][index] : ''}`} style={{ clipPath, backgroundImage: "url('/images/projects/tencent-ad/bg_1.png')" }} />)}
      </div>
      <div className={`absolute inset-0 z-20 bg-[#171817] transition-opacity duration-700 ${phase === 0 ? 'opacity-10' : phase === 1 ? 'opacity-35' : 'opacity-25'}`} />

      <div ref={wall} className="absolute inset-0 z-30">
        <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-screen transition-opacity duration-[400ms] ${phase === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute h-[clamp(280px,31vw,470px)] origin-left" style={{ left: 'var(--beam-source-x)', top: 'var(--beam-source-y)', width: 'var(--beam-length)', transform: 'translateY(-50%) rotate(var(--beam-angle))' }}>
            <div className="absolute -inset-y-[20%] inset-x-0 rounded-[50%] opacity-25 blur-[54px]" style={{ background: 'radial-gradient(ellipse at 78% 50%,rgba(255,248,222,.48),rgba(241,232,204,.12) 48%,transparent 76%)', maskImage: 'linear-gradient(90deg,transparent,rgba(0,0,0,.35) 30%,#000)' }} />
          </div>
          <div className="absolute h-64 w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#fff3c7]/25 blur-[42px]" style={{ left: 'var(--beam-end-x)', top: 'var(--beam-end-y)' }} />
        </div>

        <div className={`absolute inset-0 z-20 transition-opacity duration-700 ${phase >= 2 ? 'opacity-0' : 'opacity-100'}`}>
          {painGroups.map(group => <p key={group.id} className={`absolute text-[10px] font-semibold tracking-[.28em] text-[#d8b88b] transition-all duration-700 ${phase >= 1 ? 'opacity-100' : 'opacity-0'} ${group.id === 'USER' ? 'left-[8%] top-[17%]' : group.id === 'PLATFORM' ? 'left-[38%] top-[22%]' : 'right-[8%] top-[18%]'}`}>{group.id}</p>)}
          {stagedPains.map((pain, index) => <p key={pain.text} style={phase === 0 && floatingPains[index] ? { left: `${floatingPains[index].x}px`, top: `${floatingPains[index].y}px` } : undefined} className={`absolute max-w-[30vw] text-[clamp(.82rem,1.1vw,1.05rem)] leading-relaxed text-[#f2eee4] ${phase === 0 ? 'transition-none' : 'transition-all duration-[900ms] ease-out'} ${phase >= 1 ? pain.grouped : pain.scatter} ${phase >= painFadePhases[pain.group][index - (pain.group === 0 ? 0 : pain.group === 1 ? 3 : 8)] ? 'scale-95 opacity-0' : 'opacity-100'}`}>{pain.text}</p>)}
        </div>

        <div className={`pointer-events-none absolute inset-0 z-[21] transition-opacity duration-700 ${phase === 1 ? 'opacity-100' : 'opacity-0'}`}>
          {['left-[3%]', 'left-[34%]', 'right-[3%]'].map(position => <div key={position} className={`absolute -top-28 ${position} h-[68%] w-[32%] bg-[linear-gradient(180deg,rgba(255,244,207,.30),rgba(255,244,207,.08)_40%,transparent_82%)] [clip-path:polygon(36%_0,64%_0,100%_100%,0_100%)] blur-[12px]`} />)}
        </div>

        <div className={`absolute inset-0 z-40 grid place-items-center px-6 text-center transition-opacity duration-500 ${phase === 2 ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={event => event.stopPropagation()}>
          <div className="pt-14 text-[#f4eddd]">
            <h1 className="text-balance text-[clamp(2rem,3.25vw,3.2rem)] font-semibold leading-[1.08] tracking-[-.035em]">如果不能让用户看更多广告，<br />能不能让用户更愿意参与广告？</h1>
            <p className="mt-4 text-[clamp(1rem,1.35vw,1.25rem)] text-[#f0b195]">→ 从「被动看」到「主动玩」</p>
            <button onClick={beginSynthesis} className="mt-6 inline-flex items-center gap-2 border-b border-[#f4eddd]/70 pb-1.5 text-[11px] font-medium tracking-[.24em] transition-transform hover:translate-x-1">CLICK TO ENTER <ArrowRight className="size-3.5" /></button>
            <p className="mt-3 text-[11px] italic tracking-wide text-[#f4eddd]/60">What if ads were playable?</p>
          </div>
        </div>

        {/* A common, off-screen upper-left source keeps every answer in the same visual language as the search light. */}
        <div className="pointer-events-none absolute inset-0 z-[25] overflow-hidden">
          {fixedBeams.map((light, index) => <div key={index}>
            <div className={`absolute h-[clamp(28px,3.2vw,54px)] origin-left transition-[transform,opacity] duration-700 ease-out ${light.beam} ${phase >= light.phase ? `scale-x-100 ${phase === light.phase ? 'opacity-90' : 'opacity-25'}` : 'scale-x-0 opacity-0'}`}>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,244,204,.05)_16%,rgba(255,246,213,.22)_100%)] [clip-path:polygon(0_36%,100%_0,100%_100%,0_64%)]" />
            </div>
            <div className={`absolute size-[clamp(48px,5vw,72px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff2be]/15 blur-[20px] transition-opacity duration-500 ${light.spot} ${phase >= light.phase ? (phase === light.phase ? 'opacity-100' : 'opacity-25') : 'opacity-0'}`} />
          </div>)}
        </div>

        <div className="absolute inset-0 z-30">
          {chapters.map((chapter, index) => {
            const wave = index < 2 ? 3 : index < 4 ? 4 : 5
            const visible = phase >= wave
            const withinWave = index % 2
            return <button key={chapter.id} onMouseEnter={() => { if (phase >= 5) setHovered(chapter) }} onMouseLeave={() => setHovered(null)} onFocus={() => { if (phase >= 5) setHovered(chapter) }} onBlur={() => setHovered(null)} onClick={event => { event.stopPropagation(); if (phase >= 5) setDetail(chapter) }} className={`absolute text-left transition-all duration-500 ${requirementPositions[index]} ${visible ? 'translate-y-0 opacity-75' : 'pointer-events-none translate-y-3 opacity-0'} ${hovered && hovered.id !== chapter.id ? '!opacity-20' : ''} ${hovered?.id === chapter.id ? 'scale-105 text-[#fff7d8] drop-shadow-[0_2px_8px_rgba(0,0,0,.5)]' : ''}`} style={{ transitionDelay: visible ? `${withinWave * 160}ms` : '0ms' }}>
              <span className="text-[10px] tracking-[.22em] opacity-55">{chapter.id}</span>
              <b className="mt-1 block text-[clamp(1rem,1.45vw,1.35rem)] tracking-[.08em] text-[#fff5d8]">{chapter.en}</b>
              <span className="mt-1 block text-sm text-[#eee4ce]/75">{chapter.cn}</span>
              <small className={`mt-2 block max-w-64 text-sm leading-relaxed text-[#eee4ce]/55 transition-all duration-500 ${phase >= 5 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>{chapter.caption}</small>
            </button>
          })}
        </div>

        <div className={`pointer-events-none absolute left-1/2 top-[54%] z-40 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[10px] tracking-[.35em] text-[#f4eddd]/60">TENCENT VIDEO</p>
          <h1 className="mt-2 text-5xl font-semibold leading-none tracking-[-.05em] text-[#f4eddd]">RETHINKING<br />ADS</h1>
          <p className="mt-3 text-[11px] leading-relaxed text-[#f4eddd]/55">Six requirements<br />for a better ad experience.</p>
          <p className="mt-4 text-[10px] tracking-[.24em] text-[#f4eddd]/45">HOVER TO WATCH · CLICK TO EXPLORE</p>
        </div>
        {hovered && <Projection chapter={hovered} />}
        {phase === 0 && <div className="pointer-events-none absolute inset-x-0 bottom-7 z-40 text-center text-[10px] tracking-[.26em] text-[#f4eddd]/55">MOVE TO EXPLORE · CLICK TO ORGANIZE</div>}
        {phase === 1 && <div className="pointer-events-none absolute inset-x-0 bottom-7 z-40 text-center text-[10px] tracking-[.26em] text-[#f4eddd]/55">CLICK TO REVEAL THE QUESTION</div>}
      </div>
    </section>

    {detail && <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setDetail(null)}><article className="relative grid w-full max-w-5xl gap-6 rounded-2xl bg-[#e7e3da] p-7 shadow-2xl md:grid-cols-[1.15fr_.85fr]" onClick={event => event.stopPropagation()}><button onClick={() => setDetail(null)} aria-label="关闭详情" className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white"><X className="size-4" /></button><div className="aspect-video overflow-hidden rounded-xl bg-[#f5f0e8]"><img src={detail.image} alt={`${detail.en} 项目预览`} className="size-full object-contain" /></div><div className="pr-5"><p className="text-xs tracking-[.2em] opacity-45">{detail.id} · {detail.en}</p><h3 className="mt-2 text-3xl font-semibold">{detail.cn}</h3><p className="mt-2 text-sm text-[#73513e]">{detail.caption}</p>{[['WHY', detail.why], ['HOW', detail.how], ['RESULT', detail.result]].map(item => <div key={item[0]} className="mt-5 border-t border-black/10 pt-3"><b className="text-[10px] tracking-[.2em] opacity-45">{item[0]}</b><p className="mt-1 leading-7">{item[1]}</p></div>)}</div></article></div>}
  </main>
}
