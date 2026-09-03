import { Boxes, Layers, Wand2 } from 'lucide-react'
import { skills, interests } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'

const groups = [
  { icon: Layers, title: '产品 & 洞察', items: skills.product },
  { icon: Wand2, title: 'AI & Agent', items: skills.ai },
  { icon: Boxes, title: 'Vibe Coding', items: skills.build },
]

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-[#fff8e7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="THINGS IN MY TOOLBOX"
          title="这些是我一路捡到的技能 🧰"
          description="会做产品判断，也愿意卷起袖子亲手实现。工具会变，但对真实问题的好奇心一直没变。"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {groups.map((g, i) => (
            <div key={g.title} className={`rounded-[24px] border border-white p-7 shadow-[0_8px_26px_rgba(93,75,52,.06)] ${['bg-white','bg-[#f8e7e3]','bg-[#e8f1f7]'][i]}`}>
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <g.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-medium">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 兴趣 / 个人感 */}
        <div className="mt-16">
          <h3 className="text-2xl font-medium tracking-tight">不工作的时候，我也在认真玩 🌱</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            一些让我保持好奇、也让我重新充电的小事。
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {interests.map((it, i) => (
              <div key={it.title} className={`rounded-[22px] p-6 ${['bg-[#f5ddd7]','bg-[#e3edf6]','bg-[#e9e0f1]'][i]}`}>
                <h4 className="font-medium">{it.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
