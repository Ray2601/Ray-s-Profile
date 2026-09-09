'use client'

import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
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
  { id: '01', en: 'UNDERSTAND', cn: '读懂剧情', caption: '剧情适配 · 广告贴片 · 剧情弹幕', image: '/images/projects/tencent-ad/03-solution.svg', why: '广告与正在发生的剧情脱节，相关性很难建立。', how: '识别剧情时刻与商品意图，把广告放进用户正在理解的语境。', result: '从随机曝光，转向更自然的剧情触发。' },
  { id: '02', en: 'PLAY', cn: '让广告可玩', caption: '射击 · 点选 · 养成 · 探秘', image: '/images/projects/tencent-ad/04-gameplay-1.svg', why: '用户会跳过不能参与的贴片广告。', how: '优先验证射击与点选，再扩展养成和探秘玩法。', result: '把“看完广告”变成一次主动操作。' },
  { id: '03', en: 'ENGAGE', cn: '让互动持续', caption: '背包 · 换装 · 积分', image: '/images/projects/tencent-ad/08-reward.svg', why: '单次互动结束后，没有继续参与的理由。', how: '将广告商品转化为背包物品、装扮与积分奖励。', result: '让一次广告互动沉淀为长期关系。' },
  { id: '04', en: 'MEASURE', cn: '让效果可见', caption: '互动 · 深层行为 · CPM · ROI', image: '/images/projects/tencent-ad/09-dashboard.svg', why: '只有曝光数据，无法证明互动真正创造了价值。', how: '建立从曝光、互动、点击到转化的广告主数据链路。', result: '让创意效果与商业结果可以被共同衡量。' },
  { id: '05', en: 'LISTEN', cn: '听见用户', caption: '表扬 · 投诉', image: '/images/projects/tencent-ad/02-problem.svg', why: '广告效果指标不能代替用户体验。', how: '同时接收正向反馈与投诉，把体验纳入产品判断。', result: '增长之外，保留用户说“不”的通道。' },
  { id: '06', en: 'EVOLVE', cn: '走向下一步', caption: '互动 → 交易 · 观剧精灵', image: '/images/projects/tencent-ad/10-tech.svg', why: '互动不是终点，它应该自然连接交易与陪伴。', how: '探索互动付费，并让观剧精灵参与剧情预测和吐槽。', result: '从广告组件，走向陪伴式观看体验。' },
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

export function TencentAdShowcase() {
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
