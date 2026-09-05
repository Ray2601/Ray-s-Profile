'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Item = { org: string; role: string; meta?: string; period: string; tags: string[]; achievements: { title: string; body: string; metric?: string }[]; projectLink?: string }

const items: Item[] = [
  { org: '众安在线财产保险股份有限公司', role: '产品经理', meta: '数字生活 · 理赔', period: '2026.08 — 至今', tags: ['CLAIMS', 'AI QUALITY', 'UX'], achievements: [
    { title: '对内效率提升', body: '面向理赔审核、异常检测与流程质检，设计标准化规则抓手。', metric: '效率 +30% · 赔付率 −3–5pp' },
    { title: '对外用户体验', body: '推动理赔进度透明化、主动触达与 H5 页面体验升级。', metric: 'NPS +10–15pp · 咨询量 −20–30%' },
    { title: 'AI 能力质控', body: '为翻译、预派单和风险识别设计多模型一致性校验与人工兜底。', metric: '82% → 96% · 风险识别 98%' },
  ]},
  { org: '清华大学智能产业研究院 AIR', role: '算法实习生', period: '2025.09 — 2025.12', tags: ['3D VISION', 'DATASET', 'EVALUATION'], achievements: [
    { title: '项目方向', body: '从 RGB-D 图像重建手部与物体三维模型，定位手物合成穿模问题。' },
    { title: '评测数据集', body: '完成去畸变、时间轴对齐、21 个手部关键点、6D 位姿同步与坐标映射。', metric: '20 组标准数据 · 4 训练 / 16 测试' },
    { title: 'SOTA 模型评测', body: '以 ADD-S/AUC 统一评测 Amodal3R、HOT3D 与 TRELLIS，交付 6D 位姿和 GLB。' },
    { title: '关键发现', body: '验证手物重叠场景存在系统性泛化缺陷，支撑后续论文方向。', metric: 'ADD-S/AUC 0.85+ → 0.52' },
  ]},
  { org: '北京多度智造科技有限公司', role: '产品运营', meta: '25° 外卖配送平台', period: '2025.03 — 2025.06', tags: ['0→1', 'GROWTH', 'OPERATIONS'], achievements: [
    { title: '用户增长', body: '从 0 到 1 搭建并运营校园微信社群，以分层运营稳定转化。', metric: '900+ 人 · DAU 50+ · 转化 25%+' },
    { title: '供给建设', body: '独立拓展餐饮商户，完成菜单数字化、海报设计与平台上线。', metric: '70+ 商户 · 300+ SKU · <0.5 天/店' },
    { title: '履约体系', body: '自建配送团队，建立 3 公里 / 20 分钟标准并引入自动打单。', metric: '准时率 95% · 错误率 <1%' },
    { title: '数据驱动运营', body: '依据点单偏好与时段分布，持续优化推荐策略和配送路线。', metric: '日 GMV 峰值 ¥8,000+' },
  ], projectLink: '/projects/25-degree' },
  { org: 'Respulse Medical Technology Limited', role: '产品经理 & 项目经理', meta: 'AI 硬件', period: '2024.07 — 2025.03', tags: ['AI HARDWARE', '0→1', 'HEALTHCARE'], achievements: [
    { title: '用户调研与定义', body: '访谈北京东直门医院患者与医生，对标海外设备，定义远程居家诊断与呼吸贴。', metric: '10+ 深度访谈 · 2 款竞品' },
    { title: '团队与项目管理', body: '完成核心团队组建，覆盖硬件、算法与临床验证，推动 MVP 迭代。', metric: '20+ 候选人 · 3 人团队 · 4 个月 MVP' },
    { title: '产品结果', body: '推动产品实现五种慢性呼吸疾病识别。', metric: 'Precision 90%+ · F1 85%+' },
    { title: '融资推进', body: '参与多轮路演，推动政府意向投资与种子轮融资。', metric: '¥200 万意向 · ¥10 万种子轮' },
  ]},
]

export function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return <section id="experience" className="home-section h-dvh snap-start snap-always overflow-hidden bg-[#f4efe9] px-5 pb-[clamp(1rem,2.5vh,2rem)] pt-[calc(4rem+clamp(1rem,2.5vh,2rem))] md:px-8">
    <div className="mx-auto flex h-full max-w-6xl flex-col">
      <header className="grid items-end gap-3 md:grid-cols-[.72fr_1.28fr]">
        <div><p className="text-[11px] font-medium tracking-[.22em] text-[#9b6c59]">EXPERIENCE</p><h2 className="mt-1 text-[clamp(1.85rem,3vw,2.7rem)] font-medium leading-tight tracking-[-.035em]">我的实习经历</h2></div>
        <p className="max-w-xl text-sm leading-6 text-[#746b64] md:justify-self-end md:text-base">从 AI 产品、创业实践到算法研究，<br className="hidden sm:block" />在不同场景里理解「产品如何真正解决问题」。</p>
      </header>

      <div className="mt-[clamp(.75rem,2vh,1.5rem)] min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">{items.map((item, index) => {
        const open = openIndex === index
        const panelId = `experience-panel-${index}`
        return <article key={item.org} className={cn('group overflow-hidden rounded-[20px] border bg-[#fffdf9] transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-[#cdbeb1] hover:bg-white', open ? 'border-[#c9b2a5]' : 'border-[#e4dbd2]')}>
          <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)} className="grid min-h-[78px] w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-4 text-left md:grid-cols-[3.25rem_1fr_auto_2.5rem] md:gap-5 md:px-6">
            <span className="self-start pt-6 text-xs tracking-[.16em] text-[#a69b92]">{String(index + 1).padStart(2, '0')}</span>
            <span className="min-w-0 transition-transform duration-300 group-hover:translate-x-1"><strong className="block truncate text-[clamp(1rem,1.55vw,1.3rem)] font-medium text-[#403933]">{item.org}</strong><span className="mt-1 block text-sm text-[#756b63]">{item.role}{item.meta && <span className="text-[#a05f4e]"> · {item.meta}</span>}</span></span>
            <time className="self-start whitespace-nowrap pt-6 text-xs text-[#8f847b] md:self-auto md:pt-0 md:text-sm">{item.period}</time>
            <Plus className={cn('hidden size-5 text-[#8f7567] transition-transform duration-300 md:block', open ? 'rotate-45' : 'group-hover:rotate-90')} />
          </button>
          <div id={panelId} className={cn('grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)]', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}><div className="overflow-hidden">
            <div className={cn('grid gap-5 border-t border-[#eee5dc] px-5 pb-6 pt-5 transition-[transform,opacity] duration-300 md:grid-cols-[.3fr_.7fr] md:px-6', open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0')}>
              <aside className="md:border-r md:border-[#e8ded5] md:pr-6"><p className="text-[10px] tracking-[.2em] text-[#a69b92]">ROLE / KEYWORDS</p><p className="mt-2 font-medium">{item.role}</p>{item.meta && <p className="mt-1 text-sm text-[#756b63]">{item.meta}</p>}<div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">{item.tags.map(tag => <span key={tag} className="text-[10px] font-medium tracking-[.12em] text-[#9d6555]">{tag}</span>)}</div></aside>
              <div><p className="text-[10px] tracking-[.2em] text-[#a69b92]">IMPACT</p><div className="mt-3 grid gap-x-6 gap-y-4 md:grid-cols-2">{item.achievements.map((a, i) => <div key={a.title} className="grid grid-cols-[1.6rem_1fr] gap-2"><span className="pt-0.5 text-[10px] tracking-[.12em] text-[#b08b7a]">{String(i + 1).padStart(2, '0')}</span><div><h3 className="text-sm font-medium text-[#463e38]">{a.title}</h3><p className="mt-1 text-[13px] leading-5 text-[#776d65]">{a.body}</p>{a.metric && <p className="mt-1.5 text-sm font-semibold text-[#b45f4c]">{a.metric}</p>}</div></div>)}</div>{item.projectLink && <Link href={item.projectLink} className="mt-5 inline-flex items-center gap-1.5 border-b border-[#c88472] pb-1 text-sm font-medium text-[#9d5948]">查看 25° 外卖完整项目 <ArrowUpRight className="size-4" /></Link>}</div>
            </div>
          </div></div>
        </article>
      })}</div>
    </div>
  </section>
}
