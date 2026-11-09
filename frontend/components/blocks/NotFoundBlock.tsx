interface NotFoundBlockProps {
  statusCode: number
  title: string
  description: string
  footer: React.ReactNode
}

export function NotFoundBlock({
  statusCode,
  description,
  footer,
  title,
}: NotFoundBlockProps) {
  return (
    <div className="text-center mx-auto pt-10">
      <div className="md:text-9xl text-8xl font-extrabold tracking-wider text-foreground/20">
        {statusCode}
      </div>
      <h2 className="md:text-3xl text-2xl font-bold tracking-wider">{title}</h2>
      <p className="text-muted md:mt-4 mt-2 mb-6 md:text-base text-sm">
        {description}
      </p>

      {footer}
    </div>
  )
}
