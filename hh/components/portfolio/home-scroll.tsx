'use client'

import { useRef, type ReactNode, type WheelEvent } from 'react'

export function HomeScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  const locked = useRef(false)

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    if (locked.current || Math.abs(event.deltaY) < 18) return
    const scroller = root.current
    if (!scroller) return
    event.preventDefault()
    const sections = Array.from(scroller.querySelectorAll<HTMLElement>(':scope > section'))
    const current = sections.reduce((best, section, index) => Math.abs(section.offsetTop - scroller.scrollTop) < Math.abs(sections[best].offsetTop - scroller.scrollTop) ? index : best, 0)
    const target = Math.max(0, Math.min(sections.length - 1, current + (event.deltaY > 0 ? 1 : -1)))
    locked.current = true
    sections[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => { locked.current = false }, 760)
  }

  return <main ref={root} onWheel={onWheel} className="h-dvh min-h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-auto overscroll-none bg-background text-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</main>
}
