export function SectionHeading({
  eyebrow,
  title,
  description,
  nowrap,
}: {
  eyebrow: string
  title: string
  description?: string
  nowrap?: boolean
}) {
  return (
    <div className="max-w-3xl">
      <p className="inline-block -rotate-1 rounded-full bg-[#fff0bd] px-3 py-1 text-xs font-medium tracking-[.12em] text-[#8b6940]">{eyebrow}</p>
      <h2 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-[-.035em] md:text-[2.7rem]">{title}</h2>
      {description && (
        <p className={`mt-4 leading-relaxed text-muted-foreground ${nowrap ? 'md:whitespace-nowrap' : 'text-pretty'}`}>{description}</p>
      )}
    </div>
  )
}
