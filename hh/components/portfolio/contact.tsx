'use client'

import { useState } from 'react'
import { Mail, MapPin, ArrowUpRight, QrCode, X } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

export function Contact() {
  const [wechatOpen, setWechatOpen] = useState(false)
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-white bg-[#f7e1dc] px-6 py-14 text-center shadow-[0_14px_40px_rgba(107,75,64,.08)] md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-accent/20 blur-3xl"
          />

          <p className="text-sm font-medium uppercase tracking-widest text-primary">Let&apos;s talk</p>
          <h2 className="mx-auto mt-4 max-w-xl text-balance font-serif text-3xl tracking-tight md:text-5xl">
            要不要一起做点有意思的事？
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            无论是聊产品、一起搭个 Agent，还是单纯交换最近发现的好玩东西，都欢迎来找我。邮件会认真看，也会认真回。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              {profile.email}
            </a>
            <button
              onClick={() => setWechatOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
            >
              <QrCode className="size-4" />
              微信
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {profile.location}
            </span>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. 用 Vibe Coding 搭建。
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
              GitHub <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </footer>
      </div>

      {wechatOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#292622]/80 p-5 backdrop-blur-sm" onClick={() => setWechatOpen(false)}>
          <div className="relative w-full max-w-sm overflow-hidden rounded-[24px] bg-white p-6 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setWechatOpen(false)} aria-label="关闭" className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-[#f7f1ea] text-[#292622] shadow"><X className="size-4" /></button>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">WECHAT</p>
            <img src="/images/wechat.png" alt="微信二维码" className="mx-auto mt-4 h-48 w-48 rounded-xl object-contain" />
            <p className="mt-4 text-sm text-muted-foreground">微信号</p>
            <p className="mt-1 font-mono text-base font-semibold text-foreground">wxid_iueq13si7m0d22</p>
            <p className="mt-3 text-xs text-muted-foreground">扫码或搜索微信号添加</p>
          </div>
        </div>
      )}
    </section>
  )
}
