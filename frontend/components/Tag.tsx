import { twMerge } from 'tailwind-merge'

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={twMerge(
        `flex items-center gap-1.5 text-xs text-secondary border border-border rounded-full py-1.5 pr-2.5 pl-1.75`,
        className,
      )}
    >
      {children}
    </div>
  )
}
