'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

const names = ['THE RESULT', 'THE GAP', 'THE MVP', 'THE PRODUCT', 'THE SYSTEM', 'WHAT SURVIVED']
const archive = [
  ['发菜单', '/images/projects/25/02-mvp/manual-menu-note.png'],
  ['群公告', '/images/projects/25/02-mvp/wechat-group-announcement.jpg'],
  ['群运营', '/images/projects/25/02-mvp/wechat-group-operation.png'],
  ['群接龙', '/images/projects/25/02-mvp/wechat-order-relay.png'],
] as const
const orderNotes = [
  { title: '发菜单', code: 'MENU RELEASE', note: '微信笔记 = SKU CMS v0，把当天可售商品集中发给用户。' },
  { title: '群公告', code: 'TRAFFIC ENTRY', note: '群公告 = 首页，让新用户第一眼就能找到下单入口。' },
  { title: '群运营', code: 'GROUP OPS', note: '在群里答疑、催单和协调异常，人工维持交易秩序。' },
  { title: '群接龙', code: 'ORDER SYSTEM v0', note: '没有购物车，群接龙就是我们的 Order System v0。' },
] as const

function Frame({ n, act, title, tone = 'cream', children }: { n: number; act: string; title?: React.ReactNode; tone?: 'cream' | 'yellow' | 'blue'; children: React.ReactNode }) {
  const bg = tone === 'yellow' ? 'bg-[#f3dfa4]' : tone === 'blue' ? 'bg-[#dfeaf0]' : 'bg-[#f7f1e7]'
  return <section className={`h-full min-h-0 w-screen shrink-0 snap-start overflow-hidden px-20 py-4 md:px-40 ${bg}`}><div className="film-frame-content mx-auto h-full w-full max-w-[1600px]">
    <div className="mb-4 flex justify-between border-b border-black/15 pb-2 text-[10px] tracking-[.2em]"><span>{act}</span><span>FRAME {String(n).padStart(2, '0')} / 06 · ● REC</span></div>
    {title && <h2 className="max-w-5xl text-3xl font-semibold leading-[1.08] tracking-[-.04em] md:text-5xl">{title}</h2>}{children}
  </div></section>
}

function ResultStrip() {
  return <div className="grid grid-cols-6 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10">{[['70+', '合作商家'], ['300+', 'SKU 上线'], ['¥8,000', '单日 GMV 峰值'], ['95%', '配送准时率'], ['<1%', '打单错误率'], ['+¥0.5', '无补贴单均利润']].map(([v, l]) => <div key={l} className="bg-white/75 p-3"><p className="text-xl font-semibold md:text-2xl">{v}</p><p className="mt-1 text-[10px] opacity-60">{l}</p></div>)}</div>
}

function Lab({ active }: { active: boolean }) {
  const [peak, setPeak] = useState(false)
  const [loop, setLoop] = useState(0)
  useEffect(() => { if (!active) { setPeak(false); return }; const t = setTimeout(() => setPeak(true), 800); return () => clearTimeout(t) }, [active])
  const shops = peak ? [['黄焖鸡', '🍛', '0.88'], ['奶茶', '🧋', '0.68'], ['麻辣烫', '🍲', '0.56']] : [['麻辣烫', '🍲', '0.71'], ['黄焖鸡', '🍛', '0.66'], ['奶茶', '🧋', '0.62']]
  const loopInfo = [
    ['TRACK · 埋点', '页面加载 / 预订成功率 / 操作步数 / 满意度 · 5 steps → 2 steps（-60%）'],
    ['ANALYZE · SQL', '拆解点击、转化、点餐时段与客单价，定位真实问题。'],
    ['OPTIMIZE · 策略', '调整推荐排序、优惠券、梯度佣金和骑手排班。'],
    ['VALIDATE · 用户测试', '学生模拟下单；商家测试接单；骑手测试配送流程。'],
    ['REVIEW · AA复盘', '持续追踪 DAU / 复购率 / 准时率 · 自动打单错误率 <1%。'],
  ]
  return <div className="mt-3">
    <div className="grid gap-4 md:grid-cols-[.85fr_1.15fr]">
      <div className="rounded-2xl bg-white/75 p-4"><div className="flex items-center justify-between"><div><p className="text-xs tracking-[.14em]">{peak ? '11:37 · LUNCH PEAK' : '11:20 · NORMAL'}</p><p className="mt-1 text-sm font-medium">LIVE RANK</p></div><span className={`rounded-full px-3 py-1 text-xs text-white transition ${peak ? 'bg-[#d86135]' : 'bg-[#292622]'}`}>{peak ? 'TIME SIGNAL UPDATED' : 'LIVE'}</span></div><div className="mt-3 space-y-2">{shops.map((s, i) => <div key={s[0]} className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm transition-all duration-500"><b className="text-[#d86135]">0{i + 1}</b><span className="text-xl">{s[1]}</span><span className="flex-1 font-medium">{s[0]}</span><span className="font-mono">{s[2]}</span></div>)}</div><p className="mt-3 text-sm opacity-60">{peak ? '午餐时段信号更新，商品排序发生变化。' : '等待午餐高峰时段信号…'}</p></div>
      <div className={`rounded-2xl bg-[#fff9e8]/85 p-4 transition-shadow ${peak ? 'shadow-[0_0_0_2px_#d86135]' : ''}`}><div className="flex justify-between"><div><p className="text-xs tracking-[.14em]">RECOMMENDATION SCORE</p><p className="mt-1 text-sm font-medium">CONTRIBUTION BARS</p></div><b className="text-[#267052]">TOTAL 100% ✓</b></div><div className="mt-3 space-y-2">{[['α TIME', 40], ['β MARGIN', 25], ['γ CONVERSION', 25], ['δ FULFILLMENT', 10]].map(([x, v]) => <div key={x as string} className="grid grid-cols-[8.5rem_1fr_3rem] items-center gap-3 text-sm"><b>{x}</b><div className="h-3 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#d86135] transition-all duration-700" style={{ width: active ? `${v}%` : '0%' }} /></div><span className="text-right">{v}%</span></div>)}</div><p className="mt-3 border-t border-black/10 pt-3 text-xs leading-5">推荐分 = α × 时段适配度 + β × 利润贡献 + γ × 转化潜力 + δ × 履约效率</p></div>
    </div>
    <div className="mt-3 grid grid-cols-4 gap-3">{[['SEARCH & REC', '午 / 晚餐动态排序', 'CTR · 转化率'], ['PRODUCT', '阶梯定价 · 梯度佣金', '5% → 10%'], ['USER', '新客券 / 老客复购', 'DAU · 复购率'], ['FULFILLMENT', '按订单峰值排班', '准时率 · 履约时长']].map(x => <div key={x[0]} className="rounded-xl bg-white/65 p-4"><b>{x[0]}</b><p className="mt-2 text-sm">{x[1]}</p><p className="mt-1 text-xs text-[#d86135]">{x[2]}</p></div>)}</div>
    <div className="relative mt-3 rounded-xl border border-black/10 bg-white/45 px-4 py-3"><div className="flex items-center justify-between">{loopInfo.map((x, i) => <button key={x[0]} onMouseEnter={() => setLoop(i)} onFocus={() => setLoop(i)} className={`flex items-center gap-2 text-xs font-semibold ${loop === i ? 'text-[#d86135]' : 'opacity-55'}`}><span className={`size-2 rounded-full ${loop === i ? 'animate-pulse bg-[#d86135]' : 'bg-black/25'}`} />{x[0]}{i < 4 && <ArrowRight className="ml-3 size-3 opacity-40" />}</button>)}</div><p className="mt-2 text-sm text-[#6b635a]">{loopInfo[loop][1]}</p></div>
  </div>
}

type TabId = 'user' | 'merchant' | 'rider'

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: 'user', icon: '👤', label: '用户端' },
  { id: 'merchant', icon: '🏪', label: '商家端' },
  { id: 'rider', icon: '🛵', label: '骑手端' },
]

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[200px] shrink-0 md:w-[230px]">
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#292622] bg-white shadow-2xl">
        <div className="relative flex h-7 items-center justify-center bg-[#292622] text-[9px] font-medium text-white/90">
          <span className="absolute left-4">11:37</span>
          <span className="h-3 w-14 rounded-full bg-black ring-1 ring-white/10" />
          <span className="absolute right-4 tracking-[.2em]">5G</span>
        </div>
        <div className="h-[300px] overflow-y-auto bg-[#faf8f4] md:h-[40vh] md:max-h-[430px] md:min-h-[330px]">{children}</div>
      </div>
    </div>
  )
}

function CoverPhone({ crop, onClick }: { crop: { x: number; y: number; w: number; h: number }; onClick: () => void }) {
  return <button onClick={onClick} className="block h-[52vh] max-h-[500px] min-h-[380px] overflow-hidden transition hover:-translate-y-1" style={{ aspectRatio: `${crop.w}/${crop.h}` }} aria-label="点击推进真实产品流程">
    <svg viewBox={`${crop.x} ${crop.y} ${crop.w} ${crop.h}`} className="size-full" role="img" aria-label="从 25° 项目原始流程图中裁切的真实手机界面"><image href="/images/projects/25/cover.png" width="1024" height="1536" /></svg>
  </button>
}

function UserPhone({ step, next }: { step: number; next: () => void }) {
  if (step === 0) return (
    <div className="p-3">
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs text-[#9a9287] shadow-sm">🔍 搜索店铺 / 商品</div>
      <div className="mt-3 flex gap-2 text-xs">{[['全部', true], ['正餐', false], ['下午茶', false], ['奶茶', false]].map(([c, on]) => <span key={c as string} className={`shrink-0 rounded-full px-3 py-1 ${on ? 'bg-[#292622] text-white' : 'bg-white text-[#6b635a]'}`}>{c}</span>)}</div>
      <div className="mt-3 flex items-baseline justify-between"><p className="text-xs font-semibold">推荐 · 午餐时间</p><span className="text-[10px] text-[#d86135]">11:37</span></div>
      <button onClick={next} className="mt-2 w-full rounded-2xl bg-white p-3 text-left shadow-sm transition active:scale-[.98]">
        <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#f7e3d4] text-2xl">🍜</span><div className="flex-1"><p className="text-sm font-semibold">小吃街 · 校园店</p><p className="text-xs text-[#9a9287]">800m · 月售 3000+ · ¥15 起送</p></div><span className="text-[#d86135]">→</span></div>
      </button>
      <div className="mt-2 grid grid-cols-2 gap-2">{['🍛 黄焖鸡', '🍲 麻辣烫'].map(s => <div key={s} className="rounded-xl bg-white p-2.5 text-xs text-[#6b635a] shadow-sm">{s}</div>)}</div>
      <p className="mt-3 text-center text-[10px] text-[#9a9287]">↑ 点击「小吃街」进入店铺</p>
    </div>
  )
  if (step === 1) return (
    <div className="p-3">
      <div className="rounded-2xl bg-[#292622] p-3 text-white"><p className="text-sm font-semibold">小吃街 · 校园店</p><p className="text-[10px] text-white/60">月售 3000+ · 4.8 分 · 约 30 分钟</p></div>
      <p className="mt-3 text-xs font-semibold">招牌必点</p>
      <div className="mt-2 space-y-2">
        {[['黄焖鸡米饭', '¥18', '🔥 招牌', '🍛'], ['香辣麻辣烫', '¥16', '🌶️ 微辣', '🍲'], ['招牌奶茶', '¥9', '🧋 冰爽', '🧋']].map(([n, p, tag, e]) => (
          <button key={n} onClick={next} className="flex w-full items-center gap-3 rounded-xl bg-white p-2.5 text-left shadow-sm transition active:scale-[.98]"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#f7f1e7] text-xl">{e}</span><span className="flex-1"><span className="block text-sm font-medium">{n}</span><span className="text-[10px] text-[#d86135]">{tag}</span></span><span className="text-sm font-semibold">{p}</span><span className="grid size-6 place-items-center rounded-full bg-[#d86135] text-white">+</span></button>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-[#9a9287]">↑ 点击商品加入购物车</p>
    </div>
  )
  if (step === 2) return (
    <div className="p-3">
      <p className="text-xs font-semibold">确认订单</p>
      <div className="mt-2 rounded-xl bg-white p-3 shadow-sm"><div className="flex justify-between text-sm"><span>黄焖鸡米饭 ×1</span><b>¥18</b></div><div className="mt-1 flex justify-between text-sm"><span>配送费</span><b>¥2</b></div><div className="mt-2 flex justify-between border-t border-[#eee8df] pt-2 text-sm"><span className="font-semibold">合计</span><b className="text-[#d86135]">¥20</b></div></div>
      <div className="mt-2 rounded-xl bg-white p-3 text-xs text-[#6b635a] shadow-sm">📍 送至：南区 3 号宿舍楼 502 · 不要香菜</div>
      <button onClick={next} className="mt-3 w-full rounded-xl bg-[#d86135] py-2.5 text-sm font-semibold text-white shadow transition active:scale-[.98]">提交订单 · ¥20</button>
      <p className="mt-3 text-center text-[10px] text-[#9a9287]">↑ 「接龙 + 转账」两步，变成一次下单</p>
    </div>
  )
  return (
    <div className="p-3">
      <div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-full bg-[#d86135]/10 text-lg">🛵</span><div><p className="text-sm font-semibold">骑手正在赶来</p><p className="text-[10px] text-[#9a9287]">预计 18:25 送达 · 订单 #025</p></div></div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-[#6b635a]">{['已下单', '商家接单', '骑手配送', '送达'].map((s, i) => <div key={s} className="flex flex-1 flex-col items-center"><span className={`grid size-5 place-items-center rounded-full text-[9px] ${i < 3 ? 'bg-[#d86135] text-white' : 'bg-white text-[#d86135] ring-1 ring-[#d86135]'}`}>{i < 3 ? '✓' : i + 1}</span><span className="mt-1">{s}</span></div>)}</div>
      <div className="mt-4 rounded-xl bg-white p-3 text-xs leading-6 text-[#6b635a] shadow-sm">用户第一次能实时知道：<b className="text-[#292622]">我的外卖现在到哪了。</b>而不是在群里追问「送到了吗」。</div>
    </div>
  )
}

function MerchantPhone({ accept, acceptOrder }: { accept: boolean; acceptOrder: () => void }) {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between rounded-xl bg-[#292622] p-3 text-white"><div><p className="text-[10px] text-white/60">今日营业</p><p className="text-sm font-semibold">小吃街 · 校园店</p></div><div className="text-right"><p className="text-lg font-bold leading-none">¥1,240</p><p className="text-[10px] text-white/60">销售额</p></div></div>
      <p className="mt-3 text-xs font-semibold">新订单提醒</p>
      <div className="mt-2 rounded-xl bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><span className={`grid size-8 place-items-center rounded-full text-sm text-white ${accept ? 'bg-[#d86135]' : 'animate-pulse bg-[#d86135]'}`}>{accept ? '✓' : '1'}</span><div><p className="text-sm font-semibold">订单 #025</p><p className="text-[10px] text-[#9a9287]">黄焖鸡米饭 ×1 · ¥18</p></div></div>
          <span className={`rounded-full px-2 py-0.5 text-[10px] ${accept ? 'bg-[#f3dfa4] text-[#292622]' : 'bg-[#d86135] text-white'}`}>{accept ? '制作中' : '待接单'}</span>
        </div>
        {!accept ? <button onClick={acceptOrder} className="mt-2 w-full rounded-lg bg-[#d86135] py-2 text-xs font-semibold text-white transition active:scale-[.98]">接单</button> : <p className="mt-2 text-center text-[10px] text-[#9a9287]">已接单 · 请尽快出餐 · 超时自动提醒</p>}
      </div>
      <p className="mt-3 text-xs font-semibold">数据后台</p>
      <div className="mt-2 grid grid-cols-2 gap-2">{[['今日订单', '48'], ['待出餐', accept ? '1' : '2'], ['商品销量', 'Top 黄焖鸡'], ['对账', '已同步']].map(([k, v]) => <div key={k} className="rounded-xl bg-white p-2.5 shadow-sm"><p className="text-[10px] text-[#9a9287]">{k}</p><p className="text-sm font-semibold">{v}</p></div>)}</div>
      <p className="mt-3 text-center text-[10px] text-[#9a9287]">↑ 点击「接单」——订单主动找商家</p>
    </div>
  )
}

function RiderPhone({ step, next }: { step: number; next: () => void }) {
  if (step === 0) return (
    <div className="p-3">
      <div className="flex items-center justify-between"><p className="text-xs font-semibold">待取餐</p><span className="rounded-full bg-[#d86135]/10 px-2 py-0.5 text-[10px] text-[#d86135]">1 单</span></div>
      <div className="mt-2 rounded-xl bg-white p-3 shadow-sm"><p className="text-sm font-semibold">订单 #025 · 小吃街 → 南区宿舍</p><p className="mt-1 text-[10px] text-[#9a9287]">取餐：小吃街 · 校园店 · 配送费 ¥4</p><button onClick={next} className="mt-2 w-full rounded-lg bg-[#d86135] py-2 text-xs font-semibold text-white transition active:scale-[.98]">抢单 / 接单</button></div>
      <p className="mt-3 text-center text-[10px] text-[#9a9287]">↑ 一张任务清单，替代人工发消息派单</p>
    </div>
  )
  if (step === 1) return (
    <div className="p-3">
      <div className="rounded-xl bg-white p-3 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-semibold">配送中 · 订单 #025</p><span className="text-[10px] text-[#d86135]">已取餐 ✓</span></div><div className="mt-2 space-y-1.5 text-xs text-[#6b635a]"><p>🏪 取：小吃街 · 校园店</p><p>📍 送：南区 3 号宿舍楼 502</p></div><button onClick={next} className="mt-2 w-full rounded-lg bg-[#292622] py-2 text-xs font-semibold text-white transition active:scale-[.98]">开始配送</button></div>
      <div className="mt-2 rounded-xl bg-white p-3 text-[10px] text-[#9a9287] shadow-sm">路线：小吃街 → 东门 → 南区宿舍（约 1.2km）</div>
    </div>
  )
  return (
    <div className="p-3">
      <div className="grid place-items-center rounded-2xl bg-[#d86135] p-5 text-center text-white"><span className="text-3xl">🎉</span><p className="mt-2 text-sm font-semibold">已送达 ✓</p><p className="mt-1 text-[10px] text-white/70">订单 #025 · 用户已收餐</p></div>
      <div className="mt-2 rounded-xl bg-white p-3 text-xs leading-6 text-[#6b635a] shadow-sm">从「抢单 → 取餐 → 路线 → 送达」，骑手的每个动作都被状态化、可追踪。</div>
    </div>
  )
}

function ProductDemo() {
  const [tab, setTab] = useState<TabId>('user')
  const [userStep, setUserStep] = useState(0)
  const [merchantAccept, setMerchantAccept] = useState(false)
  const [riderStep, setRiderStep] = useState(0)

  const userDone = userStep >= 3
  const merchantDone = merchantAccept
  const riderDone = riderStep >= 2
  const completed = [userDone, merchantDone, riderDone].filter(Boolean).length
  const orderStage = riderDone ? 3 : merchantDone ? 2 : userDone ? 1 : 0
  const coverCrop = tab === 'user'
    ? [{ x: 38, y: 180, w: 210, h: 391 }, { x: 276, y: 180, w: 210, h: 391 }, { x: 758, y: 180, w: 210, h: 391 }, { x: 276, y: 646, w: 210, h: 364 }][userStep]
    : tab === 'merchant'
      ? (merchantAccept ? { x: 138, y: 1128, w: 103, h: 295 } : { x: 26, y: 1128, w: 103, h: 295 })
      : [{ x: 511, y: 1128, w: 103, h: 295 }, { x: 624, y: 1128, w: 103, h: 295 }, { x: 737, y: 1128, w: 103, h: 295 }][riderStep]
  const advanceCoverFlow = () => {
    if (tab === 'user') setUserStep(v => Math.min(3, v + 1))
    else if (tab === 'merchant') setMerchantAccept(true)
    else setRiderStep(v => Math.min(2, v + 1))
  }

  const side = (() => {
    if (tab === 'user') {
      const rows = [
        { tag: '01 / DISCOVERY', title: '把「群里翻菜单」变成结构化找店。', desc: '分类目 · 正餐 / 下午茶 · 搜索 · 推荐' },
        { tag: '01 / STORE', title: '进入店铺，商品卡片可点选。', desc: '群公告里的菜单笔记，变成结构化 SKU。' },
        { tag: '02 / ORDER', title: '把「接龙 + 转账」压缩成一次下单。', desc: '购物车 + 一键支付，替代接龙与逐笔转账。' },
        { tag: '03 / DELIVERY', title: '第一次让用户知道：外卖现在在哪。', desc: '下单后进入配送进度，状态实时更新。' },
      ][userStep]
      return { icon: '👤', en: 'USER SIDE', chips: ['分类找店', '商品选择', '下单', '配送进度'], ...rows }
    }
    if (tab === 'merchant') return { icon: '🏪', en: 'MERCHANT SIDE', tag: '02 / ACCEPT', title: '从「守群盯消息」到「订单主动找商家」。', desc: '01 强提醒：新订单播报，超时持续提醒。02 数据后台：今日订单 / 销售额 / 销量 / 对账。', chips: ['强提醒', '接单', '出餐', '销量与对账'] }
    const rows = [
      { tag: '03 / TASK', title: '从「人工发消息派单」到「一张任务清单」。', desc: '待取餐 → 配送中 → 已完成，状态自动流转。' },
      { tag: '03 / ROUTE', title: '取餐、路线、送达，全部状态化。', desc: '骑手每走一步，用户端同步看到进度。' },
      { tag: '03 / DONE', title: '送达——一条履约链闭环。', desc: '骑手动作可追踪，平台第一次「看见」每一单。' },
    ][riderStep]
    return { icon: '🛵', en: 'RIDER SIDE', chips: ['接单', '取餐', '路线', '送达'], ...rows }
  })()

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-white/70 p-1 shadow-sm">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === t.id ? 'bg-[#292622] text-white' : 'text-[#6b635a] hover:bg-white'}`}>
              <span>{t.icon}</span>{t.label}
              {((t.id === 'user' && userDone) || (t.id === 'merchant' && merchantDone) || (t.id === 'rider' && riderDone)) && <span className={tab === t.id ? 'text-[#f3dfa4]' : 'text-[#d86135]'}>✓</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {[['菜单难找', '👤 用户端'], ['漏单', '🏪 商家端'], ['人工派单', '🛵 骑手端']].map(([issue, target]) => (
            <span key={issue} className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5"><span className="text-[#d86135]">{issue}</span><ArrowRight className="size-3 opacity-40" /><b>{target}</b></span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid items-center gap-6 md:grid-cols-[auto_1fr]">
        <div className="mx-auto"><CoverPhone crop={coverCrop} onClick={advanceCoverFlow} /></div>

        <div>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-.04em] md:text-4xl">微信群证明了需求，<br /><span className="text-[#d86135]">但撑不起一个平台。</span></h2>
          <p className="mt-3 max-w-lg text-base font-medium leading-7 text-[#6b635a]">{completed === 3 ? '再把三个产品端，重新连成一条履约链。' : '于是，我把一条靠人工维持的交易链，拆成了用户、商家、骑手三个产品端。'}</p>

          <div className="mt-4 border-t border-black/10 pt-4">
            <p className="text-[10px] tracking-[.18em] text-[#d86135]">{side.en} · {side.tag}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug md:text-3xl">{side.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-[#6b635a]">{side.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">{side.chips.map(c => <span key={c} className="rounded-full bg-white/70 px-3 py-1 text-xs">{c}</span>)}</div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/70 p-4">
            <div className="flex items-center justify-between text-[10px] tracking-widest text-[#9a9287]"><span>ORDER #025</span><span>{completed === 3 ? '3 / 3 FLOWS COMPLETED ✓' : `${completed} / 3 FLOWS`}</span></div>
            <div className="mt-3 flex items-center gap-2">
              {['USER', 'MERCHANT', 'RIDER'].map((s, i) => {
                const done = orderStage > i
                const current = orderStage === i
                return (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <div className={`flex flex-1 flex-col items-center rounded-lg px-2 py-2 ${done ? 'bg-[#d86135] text-white' : current ? 'bg-[#292622] text-white' : 'bg-[#eee8df] text-[#9a9287]'}`}>
                      <span className="text-xs font-semibold">{done ? '✓ ' : ''}{s}</span>
                      <span className="text-[9px] opacity-70">{done ? 'DONE' : current ? 'NOW' : 'WAIT'}</span>
                    </div>
                    {i < 2 && <ArrowRight className="size-4 shrink-0 opacity-40" />}
                  </div>
                )
              })}
            </div>
            <p className="mt-3 text-center text-xs font-semibold">{orderStage === 3 ? 'DELIVERED ✓ · 用户收餐，履约链闭环' : orderStage === 2 ? '商家已接单 → 骑手配送中' : orderStage === 1 ? '用户已下单 → 商家待接单' : '从用户端下一单，让这条链路跑起来 →'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const productSides = [
  { id: 'USER', label: '用户端', crop: { x: 38, y: 180, w: 210, h: 391 }, title: '把「群里翻菜单」变成结构化找店。', skills: '分类找店 · 商品选择 · 下单 · 配送进度' },
  { id: 'MERCHANT', label: '商家端', crop: { x: 138, y: 1128, w: 103, h: 295 }, title: '让订单主动找到商家，而不是守着群消息。', skills: '新订单提醒 · 出餐管理 · 自动打单 · 营收数据' },
  { id: 'RIDER', label: '骑手端', crop: { x: 624, y: 1128, w: 103, h: 295 }, title: '把人工派单变成一条可追踪的配送任务。', skills: '接单 · 取餐 · 配送路线 · 状态更新' },
] as const

function ProductDemoV2() {
  const [stage, setStage] = useState(0)
  const [drag, setDrag] = useState(0)
  const start = useRef<number | null>(null)
  const sideIndex = Math.min(2, stage)
  const side = productSides[sideIndex]
  const end = () => { if (drag < -70) setStage(v => Math.min(3, v + 1)); if (drag > 70) setStage(v => Math.max(0, v - 1)); start.current = null; setDrag(0) }
  const state = stage === 0 ? ['● 用户已下单', '○ 商家制作', '○ 骑手配送'] : stage === 1 ? ['✓ 用户已下单', '● 商家制作', '○ 骑手配送'] : stage === 2 ? ['✓ 用户已下单', '✓ 商家出餐', '● 骑手配送'] : ['✓ 用户下单', '✓ 商家出餐', '✓ 配送完成']
  const prev = productSides[Math.max(0, sideIndex - 1)]
  const next = productSides[Math.min(2, sideIndex + 1)]
  return <div className="mt-2">
    <p className="text-lg leading-8">于是，我把人工交易链拆成了三个产品端。</p><p className="mt-1 text-center text-sm font-semibold tracking-[.14em] text-[#d86135]">{stage === 3 ? 'DELIVERED · 03 / 03' : `${side.id} SIDE · 0${sideIndex + 1} / 03`}</p>
    <div onPointerDown={e => { start.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) }} onPointerMove={e => { if (start.current !== null) setDrag(e.clientX - start.current) }} onPointerUp={end} onPointerCancel={end} className="mt-1 grid cursor-grab touch-none select-none grid-cols-[.55fr_1.2fr_.55fr] items-center gap-8 active:cursor-grabbing">
      <button onClick={() => setStage(Math.max(0, sideIndex - 1))} disabled={sideIndex === 0} className={`mx-auto ${sideIndex === 0 ? 'opacity-20' : 'opacity-55 hover:opacity-90'}`}><svg viewBox={`${prev.crop.x} ${prev.crop.y} ${prev.crop.w} ${prev.crop.h}`} className="h-[27vh] max-h-[280px]"><image href="/images/projects/25/cover.png" width="1024" height="1536" /></svg><p className="mt-1 text-sm font-semibold">{prev.label}</p></button>
      <div className="text-center transition-transform" style={{ transform: `translateX(${drag * .25}px) rotate(${drag / 80}deg)` }}><div className="mx-auto w-fit"><CoverPhone crop={stage === 3 ? { x: 737, y: 1128, w: 103, h: 295 } : side.crop} onClick={() => setStage(v => Math.min(3, v + 1))} /></div><h3 className="mt-1 text-2xl font-semibold">{stage === 3 ? '外卖到了 :)' : side.title}</h3><p className="mt-1 text-base text-[#6b635a]">{stage === 3 ? '用户、商家与骑手，终于在同一条履约链上。' : side.skills}</p></div>
      <button onClick={() => setStage(Math.min(2, sideIndex + 1))} disabled={sideIndex === 2} className={`mx-auto ${sideIndex === 2 ? 'opacity-20' : 'opacity-55 hover:opacity-90'}`}><svg viewBox={`${next.crop.x} ${next.crop.y} ${next.crop.w} ${next.crop.h}`} className="h-[27vh] max-h-[280px]"><image href="/images/projects/25/cover.png" width="1024" height="1536" /></svg><p className="mt-1 text-sm font-semibold">{next.label}</p></button>
    </div>
    <p className="text-center text-sm font-semibold tracking-[.12em] opacity-55">← DRAG TO EXPLORE →</p>
    <div className="mx-auto mt-2 max-w-3xl"><p className="text-center font-mono text-xs tracking-[.16em] opacity-50">ORDER #025</p><div className="mt-1 flex items-center justify-center text-sm">{state.map((x, i) => <div key={x} className="contents"><span className={`whitespace-nowrap ${stage === 3 || i < stage ? 'text-[#267052]' : i === stage ? 'text-[#d86135]' : 'opacity-45'}`}>{x}</span>{i < 2 && <span className="mx-5 h-px w-24 bg-black/20" />}</div>)}</div>{stage === 3 && <p className="mt-1 text-center text-xl font-semibold text-[#d86135]">外卖到了 :)</p>}</div>
  </div>
}

type InteractiveSideId = 'user' | 'merchant' | 'rider'

const interactiveSides: Record<InteractiveSideId, {
  label: string
  en: string
  title: string
  skills: string
  screens: { src: string; label: string }[]
}> = {
  user: {
    label: '用户端', en: 'USER SIDE',
    title: '把「群里翻菜单」变成一条完整的下单与售后链路。',
    skills: '找店 · 选餐 · 下单 · 配送 · 订单 · 个人中心 · 售后',
    screens: [
      ['01-user-home.png', '首页'], ['02-user-food-street.png', '小吃街'],
      ['03-user-search.png', '搜索'], ['04-user-store-detail.png', '商家详情'],
      ['05-user-confirm-order.png', '确认订单'], ['06-user-delivery-progress.png', '配送进度'],
      ['07-user-orders.png', '我的订单'], ['08-user-profile.png', '个人中心'],
      ['15-after-sales-chat.png', '售后服务群'],
    ].map(([file, label]) => ({ src: `/images/projects/25/prototypes/${file}`, label })),
  },
  merchant: {
    label: '商家端', en: 'MERCHANT SIDE',
    title: '让订单主动找到商家，并把制作与出餐状态同步出去。',
    skills: '经营看板 · 新订单提醒 · 接单 · 出餐管理',
    screens: [
      ['09-merchant-dashboard.png', '工作台'], ['10-merchant-new-order.png', '新订单'],
      ['11-merchant-fulfillment.png', '出餐管理'],
    ].map(([file, label]) => ({ src: `/images/projects/25/prototypes/${file}`, label })),
  },
  rider: {
    label: '骑手端', en: 'RIDER SIDE',
    title: '把人工派单变成一条可领取、可追踪、可确认送达的任务。',
    skills: '接单 · 取餐 · 路线 · 最后 100 米 · 确认送达',
    screens: [
      ['12-rider-dashboard.png', '骑手工作台'], ['13-rider-route.png', '配送路线'],
      ['14-rider-last-100m.png', '最后100米'],
    ].map(([file, label]) => ({ src: `/images/projects/25/prototypes/${file}`, label })),
  },
}

function InteractiveProductDemo() {
  const [active, setActive] = useState<InteractiveSideId>('user')
  const [screen, setScreen] = useState<Record<InteractiveSideId, number>>({ user: 0, merchant: 0, rider: 0 })
  const [drag, setDrag] = useState(0)
  const dragStart = useRef<number | null>(null)
  const side = interactiveSides[active]
  const visualOrder: InteractiveSideId[] = active === 'user'
    ? ['merchant', 'user', 'rider']
    : active === 'merchant' ? ['user', 'merchant', 'rider'] : ['user', 'rider', 'merchant']

  const selectSide = (id: InteractiveSideId) => { setActive(id); setDrag(0) }
  const moveScreen = (delta: number) => setScreen(current => {
    const length = interactiveSides[active].screens.length
    return { ...current, [active]: (current[active] + delta + length) % length }
  })
  const finishDrag = () => {
    if (drag < -65) moveScreen(1)
    if (drag > 65) moveScreen(-1)
    dragStart.current = null
    setDrag(0)
  }

  return <div className="mt-2">
    <p className="text-lg leading-8">于是，我把人工交易链拆成了三个产品端。点击任一端，它会滑到中间；点击手机或左右箭头，继续走真实页面。</p>
    <div className="mt-2 flex justify-center gap-2">
      {(Object.keys(interactiveSides) as InteractiveSideId[]).map(id => <button key={id} onClick={() => selectSide(id)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-500 ${active === id ? 'bg-[#292622] text-white shadow-md' : 'bg-white/70 text-[#6b635a] hover:bg-white'}`}>{interactiveSides[id].label}</button>)}
    </div>
    <div className="relative mt-1 grid h-[50vh] min-h-[380px] grid-cols-[.58fr_1.15fr_.58fr] items-center gap-7 overflow-hidden">
      {visualOrder.map(id => {
        const isActive = id === active
        const item = interactiveSides[id]
        const selected = item.screens[screen[id]]
        return <button key={id} onClick={() => isActive ? moveScreen(1) : selectSide(id)} onPointerDown={isActive ? e => { dragStart.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) } : undefined} onPointerMove={isActive ? e => { if (dragStart.current !== null) setDrag(e.clientX - dragStart.current) } : undefined} onPointerUp={isActive ? finishDrag : undefined} onPointerCancel={isActive ? finishDrag : undefined} className={`group mx-auto flex h-full min-w-0 touch-none select-none flex-col items-center justify-center transition-all duration-500 ${isActive ? 'z-10 cursor-grab opacity-100 active:cursor-grabbing' : 'cursor-pointer opacity-45 hover:opacity-75'}`}>
          <div className="relative transition-all duration-500" style={{ transform: isActive ? `translateX(${drag * .22}px) rotate(${drag / 100}deg)` : 'scale(.68)' }}>
            <img src={selected.src} alt={`${item.label} · ${selected.label}`} draggable={false} className={`${isActive ? 'h-[42vh] min-h-[335px]' : 'h-[36vh] min-h-[285px]'} w-auto object-contain drop-shadow-xl transition-all duration-500`} />
            {isActive && <><span className="absolute left-1 top-1/2 -translate-x-[115%] -translate-y-1/2 text-4xl opacity-35 transition group-hover:opacity-70">‹</span><span className="absolute right-1 top-1/2 translate-x-[115%] -translate-y-1/2 text-4xl opacity-35 transition group-hover:opacity-70">›</span></>}
          </div>
          <p className={`${isActive ? 'mt-0 text-base text-[#d86135]' : '-mt-8 text-sm'} font-semibold transition-all`}>{item.label}{isActive && ` · ${selected.label}`}</p>
        </button>
      })}
    </div>
    <div className="-mt-1 text-center">
      <p className="text-[10px] font-semibold tracking-[.16em] text-[#d86135]">{side.en} · {String(screen[active] + 1).padStart(2, '0')} / {String(side.screens.length).padStart(2, '0')}</p>
      <h3 className="mt-1 text-xl font-semibold">{side.title}</h3>
      <p className="mt-1 text-sm text-[#6b635a]">{side.skills}</p>
      <div className="mt-2 flex items-center justify-center gap-3"><button onClick={() => moveScreen(-1)} aria-label="上一界面" className="grid size-8 place-items-center rounded-full bg-white/80 transition hover:bg-white"><ArrowLeft className="size-4" /></button><div className="flex max-w-[600px] gap-1.5 overflow-hidden">{side.screens.map((item, i) => <button key={item.src} onClick={() => setScreen(v => ({ ...v, [active]: i }))} aria-label={item.label} title={item.label} className={`h-1.5 rounded-full transition-all ${i === screen[active] ? 'w-8 bg-[#d86135]' : 'w-3 bg-black/15 hover:bg-black/30'}`} />)}</div><button onClick={() => moveScreen(1)} aria-label="下一界面" className="grid size-8 place-items-center rounded-full bg-white/80 transition hover:bg-white"><ArrowRight className="size-4" /></button></div>
    </div>
  </div>
}

function ProductStageV3Legacy() {
  const [active, setActive] = useState<InteractiveSideId>('user')
  const [screen, setScreen] = useState<Record<InteractiveSideId, number>>({ user: 0, merchant: 0, rider: 0 })
  const [drag, setDrag] = useState(0)
  const swipeStart = useRef<number | null>(null)
  const wasDragged = useRef(false)
  const side = interactiveSides[active]
  const order: InteractiveSideId[] = active === 'merchant' ? ['user', 'merchant', 'rider'] : active === 'user' ? ['merchant', 'user', 'rider'] : ['user', 'rider', 'merchant']

  const selectSide = (id: InteractiveSideId) => { setActive(id); setDrag(0) }
  const moveScreen = (delta: number) => setScreen(current => {
    const total = interactiveSides[active].screens.length
    return { ...current, [active]: (current[active] + delta + total) % total }
  })
  const finishSwipe = () => {
    if (drag < -55) moveScreen(1)
    if (drag > 55) moveScreen(-1)
    swipeStart.current = null
    setDrag(0)
  }
  const stage = active === 'user' ? 0 : active === 'merchant' ? 1 : 2
  const progress = active === 'user' ? ['● 用户下单', '○ 商家制作', '○ 骑手配送'] : active === 'merchant' ? ['✓ 用户下单', '● 商家制作', '○ 骑手配送'] : ['✓ 用户下单', '✓ 商家出餐', '● 骑手配送']

  return <div className="relative z-20 mt-1 flex h-[calc(100%_-_7.25rem)] min-h-0 flex-col">
    <p className="text-[17px] leading-6 text-[#6b635a]">于是，我把人工交易链拆成了用户、商家、骑手三个产品端。</p>
    <div className="mt-1.5 flex justify-center gap-2">
      {(Object.keys(interactiveSides) as InteractiveSideId[]).map(id => <button key={id} onClick={() => selectSide(id)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-500 ${active === id ? 'bg-[#292622] text-white shadow-md' : 'bg-white/75 text-[#6b635a] hover:bg-white'}`}>{interactiveSides[id].label}</button>)}
    </div>
    <div className="relative z-30 mt-1 min-h-0 flex-1 overflow-visible">
      {order.map(id => {
        const selectedSide = interactiveSides[id]
        const selectedScreen = selectedSide.screens[screen[id]]
        const isActive = id === active
        const position = order.indexOf(id)
        return <button key={id} type="button" onClick={() => { if (wasDragged.current) { wasDragged.current = false; return }; isActive ? moveScreen(1) : selectSide(id) }} onPointerDown={isActive ? e => { wasDragged.current = false; swipeStart.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) } : undefined} onPointerMove={isActive ? e => { if (swipeStart.current !== null) { const distance = e.clientX - swipeStart.current; if (Math.abs(distance) > 8) wasDragged.current = true; setDrag(distance) } } : undefined} onPointerUp={isActive ? finishSwipe : undefined} onPointerCancel={isActive ? finishSwipe : undefined} style={{ left: position === 0 ? '17%' : position === 1 ? '50%' : '83%', transform: 'translate(-50%, -50%)' }} className={`group absolute top-1/2 flex min-w-0 touch-pan-y select-none flex-col items-center justify-center transition-all duration-500 ${isActive ? 'z-50 w-[clamp(370px,26vw,410px)] cursor-grab opacity-100 active:cursor-grabbing' : 'z-0 w-[clamp(150px,11vw,175px)] cursor-pointer opacity-40 hover:opacity-60'}`}>
          <div className={`relative w-full overflow-visible transition-transform duration-500 ${isActive ? '' : 'scale-[.88]'}`} style={{ transform: isActive ? `translateX(${drag * .2}px) rotate(${drag / 140}deg)` : undefined }}>
            <img src={selectedScreen.src} alt={`${selectedSide.label} · ${selectedScreen.label}`} draggable={false} className="block h-auto max-h-[62vh] w-full object-contain drop-shadow-[0_22px_24px_rgba(41,38,34,.2)]" style={{ clipPath: 'inset(1.8% 6.8% 1.4% 6.8% round 8%)' }} />
            {isActive && <><span aria-hidden className="pointer-events-none absolute left-[3%] top-1/2 -translate-x-full -translate-y-1/2 text-4xl opacity-30 transition-opacity group-hover:opacity-65">‹</span><span aria-hidden className="pointer-events-none absolute right-[3%] top-1/2 translate-x-full -translate-y-1/2 text-4xl opacity-30 transition-opacity group-hover:opacity-65">›</span></>}
          </div>
        </button>
      })}
    </div>
    <div className="-mt-1 text-center">
      <p className="text-sm font-semibold">{side.label} · {side.screens[screen[active]].label}</p>
      <p className="mt-0.5 text-sm text-[#6b635a]">{active === 'user' ? '找店 · 下单 · 配送 · 订单 · 售后' : active === 'merchant' ? '新订单提醒 · 接单 · 出餐 · 数据' : '任务 · 取餐 · 配送 · 完成交付'}</p>
      <div className="mt-1.5 flex items-center justify-center gap-3"><button onClick={() => moveScreen(-1)} aria-label="上一真实页面" className="grid size-7 place-items-center rounded-full bg-white/80 transition hover:bg-white"><ArrowLeft className="size-3.5" /></button><span className="text-[11px] font-medium tracking-[.1em] opacity-50">← 滑动 / 点击查看真实页面 →</span><button onClick={() => moveScreen(1)} aria-label="下一真实页面" className="grid size-7 place-items-center rounded-full bg-white/80 transition hover:bg-white"><ArrowRight className="size-3.5" /></button></div>
    </div>
    <div className="mx-auto mt-1.5 flex h-14 w-full max-w-3xl items-center rounded-xl border border-black/10 bg-white/55 px-5">
      <span className="mr-5 font-mono text-[10px] tracking-[.12em] opacity-50">ORDER #025</span>
      <div className="flex flex-1 items-center justify-center text-xs">{progress.map((item, i) => <div key={item} className="contents"><span className={`whitespace-nowrap font-medium ${i < stage ? 'text-[#267052]' : i === stage ? 'text-[#d86135]' : 'opacity-40'}`}>{item}</span>{i < 2 && <span className="mx-4 h-px min-w-12 flex-1 bg-black/15" />}</div>)}</div>
    </div>
  </div>
}

function ProductStageV3() {
  const productPhones = {
    user: {
      label: '用户端',
      screens: ['01-user-home.png', '02-user-food-street.png', '03-user-search.png', '04-user-store-detail.png', '05-user-confirm-order.png', '06-user-delivery-progress.png', '07-user-orders.png', '08-user-profile.png'],
    },
    merchant: {
      label: '商家端',
      screens: ['09-merchant-dashboard.png', '10-merchant-new-order.png', '11-merchant-fulfillment.png'],
    },
    rider: {
      label: '骑手端',
      screens: ['12-rider-dashboard.png', '13-rider-route.png', '14-rider-last-100m.png'],
    },
  } as const
  const [active, setActive] = useState<keyof typeof productPhones>('user')
  const [screen, setScreen] = useState({ user: 0, merchant: 0, rider: 0 })

  useEffect(() => {
    const interval = window.setInterval(() => {
      setScreen(current => ({
        ...current,
        [active]: (current[active] + 1) % productPhones[active].screens.length,
      }))
    }, 2200)
    return () => window.clearInterval(interval)
  }, [active])

  const positionOrder: Record<keyof typeof productPhones, (keyof typeof productPhones)[]> = {
    user: ['merchant', 'user', 'rider'],
    merchant: ['user', 'merchant', 'rider'],
    rider: ['user', 'rider', 'merchant'],
  }
  const order = positionOrder[active]

  return <div className="mt-1 flex h-[calc(100%_-_7rem)] min-h-0 flex-col">
    <p className="text-[17px] leading-6 text-[#6b635a]">于是，我把人工交易链拆成了用户、商家、骑手三个产品端。</p>
    <div className="relative mt-1 min-h-0 flex-1">
      {(Object.keys(productPhones) as (keyof typeof productPhones)[]).map(id => {
        const item = productPhones[id]
        const isActive = id === active
        const position = order.indexOf(id)
        const file = item.screens[screen[id]]
        return <button
          key={id}
          type="button"
          onClick={() => isActive
            ? setScreen(current => ({ ...current, [id]: (current[id] + 1) % item.screens.length }))
            : setActive(id)}
          aria-label={`切换到${item.label}`}
          className={`absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-all duration-700 ${isActive ? 'z-20 -mt-[60px] w-[clamp(166px,15.36vw,243px)] opacity-100' : 'z-10 mt-0 w-[clamp(115px,10vw,165px)] opacity-70 md:-mt-[32px] hover:opacity-100'}`}
          style={{ left: position === 0 ? '16.5%' : position === 1 ? '50%' : '83.5%' }}
        >
          <img
            src={`/images/projects/25/prototypes/ui/${file}`}
            alt={`${item.label} ${String(screen[id] + 1).padStart(2, '0')}`}
            className="block h-auto w-full object-contain drop-shadow-[0_20px_22px_rgba(41,38,34,.18)]"
          />
          <p className={`mt-3 font-semibold transition-all ${isActive ? 'text-xl text-[#d86135]' : 'text-sm text-[#6b635a]'}`}>{item.label}</p>
          {isActive && <p className="mt-1 text-[10px] tracking-[.14em] text-black/40">{String(screen[id] + 1).padStart(2, '0')} / {String(item.screens.length).padStart(2, '0')} · AUTO</p>}
        </button>
      })}
    </div>
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-4 border-t border-black/10 pt-3 text-sm text-[#6b635a]">
      <span>用户下单</span><ArrowRight className="size-4 text-[#d86135]" /><span>商家制作</span><ArrowRight className="size-4 text-[#d86135]" /><span>骑手配送</span>
    </div>
  </div>
}

export function DegreeShowcase() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [scene, setScene] = useState(0)
  const [photo, setPhoto] = useState(0), [modal, setModal] = useState(false), [dragX, setDragX] = useState(0)
  const [farewell, setFarewell] = useState(false), [farewellLeaving, setFarewellLeaving] = useState(false)
  const dragStart = useRef<number | null>(null)
  const go = (n: number) => ref.current?.scrollTo({ left: n * ref.current.clientWidth, behavior: 'smooth' })
  const peel = () => { if (photo < 4) { setPhoto(v => v + 1); setDragX(0) } }
  const beginPeel = (e: React.PointerEvent<HTMLElement>) => { dragStart.current = e.clientX; e.currentTarget.setPointerCapture(e.pointerId) }
  const movePeel = (e: React.PointerEvent<HTMLElement>) => { if (dragStart.current !== null) setDragX(Math.max(-260, Math.min(260, e.clientX - dragStart.current))) }
  const endPeel = () => { if (Math.abs(dragX) > 110) peel(); else setDragX(0); dragStart.current = null }
  const leaveCaseStudy = (e: React.MouseEvent<HTMLElement>) => {
    const link = (e.target as HTMLElement).closest('a')
    if (!link?.textContent?.includes('BACK TO PROJECTS')) return
    e.preventDefault()
    if (farewell) return
    setFarewell(true)
    setTimeout(() => setFarewellLeaving(true), 700)
    setTimeout(() => router.push('/#projects'), 1250)
  }
  useEffect(() => { if (timer.current) clearTimeout(timer.current); if (!modal && scene < 5 && scene !== 3) timer.current = setTimeout(() => go(scene + 1), 8000); return () => { if (timer.current) clearTimeout(timer.current) } }, [scene, modal])
  useEffect(() => { const el = ref.current; if (!el) return; const wheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { e.preventDefault(); el.scrollLeft += e.deltaY } }; const scroll = () => { const p = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth); setScene(Math.round(p * 5)) }; el.addEventListener('wheel', wheel, { passive: false }); el.addEventListener('scroll', scroll); return () => { el.removeEventListener('wheel', wheel); el.removeEventListener('scroll', scroll) } }, [])
  return <main onClickCapture={leaveCaseStudy} className="h-dvh overflow-hidden bg-[#f7f1e7] text-[#292622]">
    {farewell && <div className={`fixed inset-0 z-[80] grid place-items-center bg-[#f7f1e7]/90 backdrop-blur-sm transition-all duration-500 ${farewellLeaving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}><div className="text-center"><div className="mx-auto grid size-24 animate-bounce place-items-center rounded-[28px] bg-[#f3c64f] text-5xl shadow-xl">🛍️</div><p className="mt-6 text-3xl font-semibold tracking-tight text-[#d86135]">感谢您的陪伴</p><p className="mt-2 text-sm tracking-[.16em] opacity-55">YOUR 25° DELIVERY HAS ARRIVED</p></div></div>}
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-black/10 bg-[#f7f1e7]/95"><div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5"><Link href="/#projects" className="flex items-center gap-2 text-sm"><ArrowLeft className="size-4" />Portfolio</Link><b className="text-xs tracking-[.18em]">25° DELIVERY · ORDER #025</b><p className="hidden text-xs opacity-55 sm:block">{String(scene + 1).padStart(2, '0')} / 06 · {names[scene]}</p></div></header>
    <button aria-label="上一幕" disabled={!scene} onClick={() => go(scene - 1)} className="group fixed bottom-0 left-0 top-14 z-30 flex w-20 items-center justify-center bg-transparent text-white opacity-40 mix-blend-difference disabled:invisible md:w-32"><ArrowLeft className="size-16 transition group-hover:-translate-x-2 md:size-20" /></button>
    <button aria-label="下一幕" disabled={scene === 5} onClick={() => go(scene + 1)} className="group fixed bottom-0 right-0 top-14 z-30 flex w-20 items-center justify-center bg-transparent text-white opacity-40 mix-blend-difference disabled:invisible md:w-32"><ArrowRight className="size-16 transition group-hover:translate-x-2 md:size-20" /></button>

    <div ref={ref} className="mt-14 flex h-[calc(100dvh-3.5rem)] min-h-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Frame n={1} act="ACT 00 · BEFORE THE STORY" title={<>一座刚建好的校园，<br /><span className="text-[#d86135]">周边商业还没有跟上。</span></>}>
        <div className="mt-5 grid items-center gap-6 md:grid-cols-[.8fr_1.2fr]"><div><p className="text-lg leading-8">3,000+ 名学生住进新校区，最近的校外餐饮供给集中在约 1.5 km 外。主流外卖配送覆盖有限——能不能自己把这一公里接起来？</p><p className="mt-4 text-xl font-semibold">从微信群里的第一单，到一个真实运营的校园本地生活平台。</p></div><div className="relative mx-auto w-fit max-w-full"><img src="/images/projects/25/project-cover-v2.png" alt="25° 外卖项目封面" className="block h-auto max-h-[412px] max-w-full -rotate-1 rounded-xl border-[8px] border-white shadow-xl" /><span className="absolute -bottom-2 right-3 rotate-2 bg-[#efcb59] px-4 py-2 text-xs shadow">真实跑起来过的校园生意 ⚡</span></div></div><div className="mt-4"><ResultStrip /></div>
      </Frame>

      <Frame n={2} act="ACT 01 · FINDING THE GAP" tone="blue" title={<>不是没有供给，<br /><span className="text-[#d86135]">中间缺了一座桥。</span></>}>
        <p className="mt-2 text-sm opacity-60">所以在做产品之前，我先验证两件事：需求够不够大，这笔生意能不能跑通。</p>
        <div className="mt-3 grid gap-4 md:grid-cols-[.92fr_1.08fr]">
          <div className="rounded-2xl bg-[#f6e9c8] p-4">
            <p className="text-[10px] tracking-[.18em]">MARKET GAP</p>
            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-start text-center"><div><span className="text-4xl leading-none">🎓</span><b className="mt-1 block text-3xl">3,000</b><p className="mt-1 text-xs opacity-55">校园学生 · 想吃</p></div><div className="mt-7 w-44"><span className="text-sm font-medium text-[#d86135]">1.5 km</span><svg viewBox="0 0 120 35" className="mt-1 w-full"><path d="M3 22 C28 2 40 32 60 17 S94 5 117 22" fill="none" stroke="#d86135" strokeWidth="2.5" strokeDasharray="5 5"/><text x="56" y="29" fill="#292622" fontSize="18">×</text></svg><b className="text-sm">没有稳定配送</b></div><div><span className="text-4xl leading-none">🍜</span><b className="mt-1 block text-3xl">80+</b><p className="mt-1 text-xs opacity-55">小吃店 · 想卖</p></div></div>
            <div className="my-3 border-t border-black/10"/><p className="text-[10px] tracking-[.16em]">FERMI ESTIMATE</p><div className="mt-2 flex items-center justify-between text-center"><div><b>3,000</b><small className="block opacity-50">学生</small></div><span>×</span><div><b>30%</b><small className="block opacity-50">进群</small></div><span>×</span><div><b>25%</b><small className="block opacity-50">活跃</small></div><span>×</span><div><b>1</b><small className="block opacity-50">餐/天</small></div></div><div className="mt-3 flex items-end justify-between"><div><b className="text-3xl text-[#d86135]">≈ 225</b><p className="text-[10px] opacity-55">潜在订单 / 天</p></div><div className="text-right"><b className="text-xl">≈ 400 单</b><p className="text-[10px] opacity-55">午高峰理论供给</p></div></div><div className="mt-3 flex gap-2 text-[10px]"><span className="rounded-full bg-white/70 px-3 py-1">✓ Demand</span><span className="rounded-full bg-white/70 px-3 py-1">✓ Supply</span><span className="rounded-full bg-[#d86135]/10 px-3 py-1 text-[#d86135]">× Delivery</span></div>
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <div className="flex items-start justify-between"><div><p className="text-[10px] tracking-[.18em]">UNIT ECONOMICS</p><p className="mt-1 text-xs opacity-60">每送一单，我们到底赚不赚钱？</p></div><div className="flex gap-2 text-[9px]"><span className="rounded-full bg-[#f3dfa4] px-2 py-1">PRICE GAP · ¥1–2</span><span className="rounded-full bg-[#f3dfa4] px-2 py-1">COMMISSION · 5–10%</span><span className="rounded-full bg-[#f3dfa4] px-2 py-1">ADS · ¥800/3d</span></div></div>
            <div className="mt-3 grid grid-cols-[1fr_.72fr] gap-4"><div className="rounded-xl border border-dashed border-black/25 bg-[#fffdf7] p-4 font-mono shadow-sm"><p className="text-center text-xs font-bold">ONE ORDER · ¥20–25</p><div className="my-2 border-t border-dashed border-black/20"/><div className="space-y-1.5 text-xs"><p className="flex justify-between"><span>交易收入</span><b>¥4.0</b></p><p className="flex justify-between"><span>广告分摊*</span><b>¥2.5</b></p><p className="flex justify-between border-t border-black/10 pt-1"><span>REVENUE</span><b>+¥6.5</b></p><p className="flex justify-between"><span>骑手配送</span><b>−¥4.0</b></p><p className="flex justify-between"><span>平台维护</span><b>−¥2.0</b></p></div><div className="mt-3 border-t-2 border-black pt-2"><p className="flex justify-between text-lg font-bold"><span>PROFIT</span><span className="text-[#d86135]">+¥0.5</span></p></div></div><div className="flex flex-col justify-center text-center"><p className="text-4xl font-semibold text-[#d86135]">8.3%</p><p className="text-xs tracking-[.16em]">ROI ✓</p><p className="mt-4 text-[10px] leading-4 opacity-50">佣金由入驻时间 × 销量 × 好评率决定</p></div></div><p className="mt-2 text-[9px] opacity-45">* 广告收入按周期曝光收入 / 同期订单量折算至单均。</p>
            <div className="mt-3 rounded-xl bg-[#292622] px-4 py-3 text-white"><p className="text-[9px] tracking-[.16em] opacity-55">PEAK DAY</p><div className="mt-1 flex items-center justify-between text-center"><div><b>¥8,000</b><small className="block opacity-50">GMV</small></div><span>→</span><div><b>320–400</b><small className="block opacity-50">ORDERS</small></div><span>→</span><div><b>¥160–200</b><small className="block opacity-50">DAY PROFIT</small></div><span>→</span><div><b className="text-[#f3dfa4]">¥4.8k–6k</b><small className="block opacity-50">/ MONTH</small></div></div></div>
          </div>
        </div>
      </Frame>

      <Frame n={3} act="ACT 02 · THE VERY FIRST MVP" tone="yellow" title={<>我们先假装做了一场<br /><span className="text-[#d86135]">“社会学实验”。</span></>}>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/45 px-5 py-2.5 text-sm font-medium">{['250 PEOPLE', '发菜单', '群公告', '群运营', '群接龙'].map((x, i) => <div key={x} className="contents"><span className={i < photo + 1 ? 'text-[#267052]' : i === photo + 1 ? 'text-[#d86135]' : 'opacity-35'}>{i < photo + 1 ? '✓' : i === photo + 1 ? '●' : '○'} {x}</span>{i < 4 && <ArrowRight className="size-4 opacity-25" />}</div>)}</div>
        <div className="mt-4 grid items-center gap-10 md:grid-cols-2">
          <div className="mx-auto flex items-center justify-center gap-4">
            <figure className="relative w-fit max-w-full -rotate-1 bg-[#fffdf7] p-1.5 shadow-lg"><span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap bg-[#f2a900] px-5 py-2 text-sm font-semibold tracking-[.08em] shadow-sm">FIELD NOTE · 00</span><img src="/images/projects/25/02-mvp/posrter-campus.png" alt="校园小吃街招募海报" className="block h-[50dvh] w-auto max-w-full object-contain" /></figure>
            <div className="flex max-w-48 -rotate-1 flex-col items-start gap-3"><span className="bg-[#f2a900] px-4 py-2 text-base font-semibold shadow-sm">OFFLINE RECRUITMENT</span><span className="rotate-1 bg-[#f2a900] px-4 py-2 text-base font-semibold shadow-sm">社会学实验招募</span><span className="-rotate-2 bg-[#f2a900] px-4 py-2 text-base font-semibold shadow-sm">250 PEOPLE</span></div>
          </div>
          <div className="relative mx-auto h-[calc(50dvh+7rem)] w-full max-w-[620px]">
            {[3, 2, 1].map((i) => <div key={i} className="absolute left-[12%] top-[8%] h-[50dvh] w-[38%] bg-[#fffdf7] p-1.5 shadow-md" style={{ transform: `translate(${i * 5}px, ${i * 5}px) rotate(${i % 2 ? 1 : -1}deg)`, opacity: photo + i < 5 ? .65 : 0 }} />)}
            {photo < 4 ? <article onPointerDown={beginPeel} onPointerMove={movePeel} onPointerUp={endPeel} onPointerCancel={endPeel} className="absolute inset-0 flex cursor-grab touch-none select-none items-center justify-center gap-5 transition-[transform] active:cursor-grabbing" style={{ transform: `translateX(${dragX}px) rotate(${dragX / 35 + 1}deg)` }}>
              <figure className="relative shrink-0 bg-[#fffdf7] p-1.5 shadow-lg"><span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap bg-[#f2a900] px-5 py-2 text-sm font-semibold tracking-[.08em] shadow-sm">ORDER NOTE · 0{photo + 1}</span><button onPointerDown={e => e.stopPropagation()} onClick={() => setModal(true)} className="block bg-transparent"><img src={archive[photo][1]} alt={archive[photo][0]} draggable={false} className="block h-[50dvh] w-auto max-w-[280px] object-contain" /></button></figure>
              <div className="flex max-w-[280px] flex-col items-start gap-3"><span className="-rotate-1 bg-[#f2a900] px-4 py-2 text-sm font-semibold tracking-[.06em] shadow-sm">{orderNotes[photo].code}</span><h3 className="rotate-1 bg-[#f2a900] px-4 py-2 text-2xl font-semibold shadow-sm">{orderNotes[photo].title}</h3><p className="-rotate-1 bg-[#f2a900] px-4 py-3 text-base font-medium leading-7 shadow-sm">{orderNotes[photo].note}</p><button onPointerDown={e => e.stopPropagation()} onClick={peel} className="rotate-2 bg-[#d86135] px-5 py-3 text-sm font-semibold tracking-[.1em] text-white shadow-md transition hover:-translate-y-1">PEEL →</button></div>
            </article> : <div className="absolute inset-0 grid place-items-center rounded-xl bg-[#d86135] p-6 text-center text-white shadow-xl"><div><p className="text-base tracking-[.18em]">MVP VALIDATED</p><div className="mx-auto my-4 w-fit -rotate-3 border-4 border-white px-6 py-2 text-2xl font-bold">FIRST ORDER DELIVERED ✓</div><h3 className="text-3xl font-semibold leading-10">产品还不存在，<br />第一批真实交易已经发生了。</h3><p className="mt-4 text-sm tracking-[.1em]">250 PEOPLE · REAL ORDERS · MANUAL DELIVERY</p><div className="mt-4 flex justify-center gap-3 text-sm"><span className="rounded-full bg-white/15 px-4 py-1.5">菜单难找</span><span className="rounded-full bg-white/15 px-4 py-1.5">转账难对账</span><span className="rounded-full bg-white/15 px-4 py-1.5">消息容易漏单</span></div><button onClick={() => go(3)} className="mt-5 text-sm font-semibold tracking-[.1em]">NEXT ACT → BUILD THE PRODUCT</button></div></div>}
          </div>
        </div>
      </Frame>

      <Frame n={4} act="ACT 03 · MVP → PRODUCT" title={<>微信群证明了需求，<br /><span className="text-[#d86135]">但撑不起一个平台。</span></>}>
        <ProductStageV3 />
      </Frame>

      <Frame n={5} act="ACT 04 · 11:37 AM / LUNCH TIME" tone="yellow" title={<>不把 300 个 SKU 都给用户看。<br /><span className="text-[#d86135]">在他饿的时候，把想吃的放前面。</span></>}>
        <Lab active={scene === 4} />
      </Frame>

      <Frame n={6} act="FINAL ACT · WHAT SURVIVED" title={<>小吃街离开了 25°。<br /><span className="text-[#d86135]">但 25° 没有停下来。</span></>}>
        <div className="mt-5 rounded-2xl bg-white/60 p-4"><div className="flex items-center justify-between text-center text-xs">{['微信群 MVP', '小吃街外卖', '小程序平台', '精细化运营', '供给退出', '校园外卖 / 跑腿 / 广告'].map((x, i) => <div key={x} className="contents"><span className={i === 5 ? 'font-semibold text-[#d86135]' : ''}>{x}</span>{i < 5 && <ArrowRight className="size-4 opacity-35" />}</div>)}</div><p className="mt-3 text-center text-sm">业务发生变化，但产品和能力留了下来 · 25° STILL RUNNING</p></div><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-[#f3dfa4] p-5"><p className="text-xs tracking-[.16em]">WHAT WORKED</p><h3 className="mt-2 text-xl font-semibold">我们证明了一件事：</h3><p className="mt-2 leading-7">被主流平台忽略的小场景，也可以通过精细化运营跑通正向利润。</p><p className="mt-3 text-sm font-semibold">70+ 商户 / ¥8,000 峰值 GMV / 单均利润为正</p></div><div className="rounded-2xl bg-[#dfeaf0] p-5"><p className="text-xs tracking-[.16em]">WHAT I LEARNED</p><h3 className="mt-2 text-xl font-semibold">Single Point of Failure</h3><p className="mt-2 leading-7">“25度”项目最大的遗憾，是只解决了一个需求，没能把一所新学校的全场景痛点串联起来。回过头看，在一个基础设施几乎为零的新校区，学生需要的远不止外卖：二手交易、代取快递、教材流转、跑腿服务……如果当时把这些低频需求与外卖的微信社群入口整合，通过高频外卖带动低频交易，完全有机会形成校内本地生活平台的先发优势。</p></div></div><div className="mt-4 flex items-end justify-between"><div><p className="text-2xl font-semibold">我学会的不只是怎么把一个产品做起来，<br /><span className="text-[#d86135]">还有什么决定它能不能活下去。</span></p><p className="mt-1 text-sm">Supply matters before scale.</p></div><div className="text-right text-[10px] tracking-[.15em]"><Link href="/#projects" className="mb-2 inline-flex items-center gap-2 text-sm tracking-normal"><ArrowLeft className="size-4" />BACK TO PROJECTS</Link><p>THE END.<br />FROM ONE WECHAT GROUP<br />TO A REAL BUSINESS.</p></div></div>
      </Frame>
    </div>

    {modal && <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-6" onClick={() => setModal(false)}><div className="relative rounded-2xl bg-[#f7f1e7] p-6" onClick={e => e.stopPropagation()}><button onClick={() => setModal(false)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white"><X className="size-4" /></button><img src={archive[photo][1]} alt={archive[photo][0]} className="max-h-[72vh] max-w-[80vw] object-contain" /><div className="mt-3 flex justify-between"><b>{archive[photo][0]}</b><div className="flex gap-3"><button onClick={() => setPhoto((photo + 3) % 4)}><ArrowLeft /></button><button onClick={() => setPhoto((photo + 1) % 4)}><ArrowRight /></button></div></div></div></div>}
  </main>
}
