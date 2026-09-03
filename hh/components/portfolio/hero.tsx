'use client'

import Image from 'next/image'
import { ArrowDown, Sparkles, Star } from 'lucide-react'
import { profile, stats } from '@/lib/portfolio-data'

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 -z-10 size-96 rounded-full bg-[#f5d9d3]/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-40 -z-10 size-80 rounded-full bg-[#dceaf4]/70 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="relative">
          <Star className="soft-float absolute -left-8 -top-7 size-5 fill-[#f5cf68] text-[#f5cf68]" aria-hidden />
          <span className="inline-flex -rotate-1 items-center gap-1.5 rounded-full border border-[#eadfd5] bg-white px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="size-3.5 text-primary" />
            {profile.role}
          </span>

          <h1 className="mt-7 text-balance text-[2.65rem] font-medium leading-[1.16] tracking-[-.045em] md:text-[4.6rem]">
            <span className="block">{profile.tagline.split('\n')[0]}</span>
            <span className="mt-3 block text-[1.325rem] leading-[1.5] tracking-[-.02em] md:text-[2.3rem]">
              {profile.tagline.split('\n').slice(1).map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-[15px] font-normal leading-8 text-muted-foreground md:text-[17px]">
            {profile.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#eadfce] bg-[#fff9e9] px-3 py-1.5 text-sm font-normal text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => go('projects')}
              className="inline-flex items-center gap-2 rounded-full bg-[#d87968] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(216,121,104,.2)] transition-transform hover:-translate-y-0.5"
            >
              看看我的作品
              <ArrowDown className="size-4" />
            </button>
            <button
              onClick={() => go('contact')}
              className="rounded-full border border-border bg-white px-6 py-3 text-sm font-medium transition-colors hover:bg-[#f8eecf]"
            >
              联系我
            </button>
          </div>
        </div>

        <div className="soft-float relative mx-auto w-full max-w-sm [--tilt:2deg]">
          <div className="absolute -inset-3 -z-10 rotate-[-5deg] rounded-[1.75rem] bg-[#dfeaf6]" />
          <div className="rotate-2 overflow-hidden rounded-[1.5rem] border-[10px] border-white bg-white shadow-[0_18px_50px_rgba(93,75,60,.14)]">
            <Image
              src={profile.avatar || '/placeholder.svg'}
              alt={`${profile.name} 的头像`}
              width={520}
              height={560}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 -rotate-3 rounded-sm bg-[#fff0a9] px-5 py-4 shadow-md">
            <span className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 bg-white/60" />
            <p className="text-xs text-muted-foreground">📍 现在在这里生活</p>
            <p className="text-sm font-medium">{profile.location}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 px-5 md:mt-28 md:grid-cols-4 md:px-8">
        {stats.map((s, i) => (
          <div key={s.label} className={`rounded-[1.35rem] px-5 py-6 text-center ${['bg-[#f8ddd8]','bg-[#fff0bd]','bg-[#dfeef7]','bg-[#e8e0f2]'][i]}`}>
            <p className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
