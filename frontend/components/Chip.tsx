export function Chip({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className="inline-flex items-center gap-1.5 md:gap-2 border border-border backdrop-blur-sm px-2.5 py-1 rounded-full  text-text-secondary self-start">
      <div className={`md:size-2 size-1.5 rounded-full ${className}`} />
      <h4 className="md:text-[12px] text-[10px] uppercase">{text}</h4>
    </div>
  )
}
