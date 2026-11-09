import { twMerge } from 'tailwind-merge'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-foreground text-background hover:bg-foreground/80',
  outline:
    'border border-border-strong text-foreground hover:bg-surface-raised hover:border-accent',
  ghost: 'py-0 px-0 text-foreground hover:text-accent',
}

export function Button({
  children,
  className,
  variant = 'primary',
  ...arg
}: Readonly<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    className?: string
    variant?: 'secondary' | 'primary' | 'outline' | 'ghost'
  }
>) {
  return (
    <button
      className={twMerge(
        `py-2 px-6 ${variants[variant]} duration-200 cursor-pointer rounded-full group disabled:opacity-70 disabled:pointer-events-none`,
        className,
      )}
      type="button"
      {...arg}
    >
      {children}
    </button>
  )
}
