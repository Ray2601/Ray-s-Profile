import { Compass, Cpu, PenTool } from 'lucide-react'
import { SectionHeading } from './section-heading'

const pillars = [
  {
    icon: Compass,
    title: '懂用户，也懂业务',
    desc: '从用户访谈到商家拓展，我习惯先把问题想清楚，再决定要做什么。',
  },
  {
    icon: Cpu,
    title: '会搭 Agent，会看数据',
    desc: '不只是画原型：Prompt 设计、Badcase 迭代、效果验证都能自己上手。',
  },
  {
    icon: PenTool,
    title: '想到就能做出来',
    desc: 'Vibe Coding 把想法快速变成可用的 Demo，用作品验证判断。',
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#eef5f8] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="A LITTLE ABOUT ME"
          title="我不太擅长只坐着想，喜欢把想法真的做出来"
          description="我是王雯睿，一个对人和新东西都很好奇的产品经理。我会认真听用户说话，也会为了验证一个想法，自己画原型、搭 Agent、写代码到半夜。"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-[24px] border border-white/80 p-7 shadow-[0_8px_28px_rgba(70,86,94,.06)] transition-transform hover:-translate-y-1 ${['bg-white','bg-[#fff7da]','bg-[#f4eaf3]'][i]}`}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
