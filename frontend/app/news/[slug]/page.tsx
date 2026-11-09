import { newsService } from '@/services/news.service'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import {
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconPhoneCall,
} from '@tabler/icons-react'
import { notFound } from 'next/navigation'
import { ErrorState } from '@/components/ErrorState'
import { Button } from '@/components/Button'
import { Tag } from '@/components/Tag'

type NewsDetailsProps = {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailsPage({ params }: NewsDetailsProps) {
  const { slug } = await params
  const result = await newsService.getNewsBySlug(slug)

  if (!result.ok) {
    return <ErrorState error={result.error} />
  }

  if (!result.data) {
    notFound()
  }

  const { title, img, description, phone, telegramLink, address, date, time } =
    result.data

  return (
    <article>
      <div className="lg:flex">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.url}`}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="z-1 lg:w-1/2 w-full object-cover h-auto rounded-3xl text-foreground self-start"
        />
        <div className="space-y-2 md:p-4 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag>
              <IconCalendarEvent className="size-4" />
              {date}
            </Tag>
            <Tag>
              <IconClock className="size-4" />
              {time.slice(0, 5)}
            </Tag>
            <Tag>
              <IconMapPin className="size-4" />
              {address}
            </Tag>
          </div>
          <h2 className="md:text-3xl text-2xl font-bold">{title}</h2>
          <div className="prose max-w-full border-b-foreground/10 w-full leading-normal md:text-base text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
            >
              {description}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="divider md:my-5 my-2" />
      <div className="text-center">
        <h4 className="font-medium md:mb-5 mb-3 md:text-3xl text-2xl">
          Контакты для связи
        </h4>
        <div className="flex flex-wrap justify-center gap-2 items-center mx-auto w-fit">
          <Button
            className="md:px-6 px-4 md:text-base text-sm"
            variant="secondary"
          >
            <a
              href={`tel:${phone ?? '79165998103'}`}
              className="flex items-center justify-center gap-2"
            >
              Позвонить
              <IconPhoneCall className="md:size-5.75 size-5" />
            </a>
          </Button>

          <Button
            className="md:px-6 px-4 md:text-base text-sm"
            variant="secondary"
          >
            <a
              href={telegramLink ?? 'https://t.me/grace_church_msk23'}
              className="flex items-center justify-center gap-2"
            >
              Написать
              <svg
                className="md:size-5.75 size-5 duration-200"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M512 256C512 114.62 397.38 0 256 0S0 114.62 0 256s114.62 256 256 256 256-114.62 256-256zm-396.12-2.7c74.63-32.52 124.39-53.95 149.29-64.31 71.1-29.57 85.87-34.71 95.5-34.88 2.12-.03 6.85.49 9.92 2.98 2.59 2.1 3.3 4.94 3.64 6.93.34 2 .77 6.53.43 10.08-3.85 40.48-20.52 138.71-29 184.05-3.59 19.19-10.66 25.62-17.5 26.25-14.86 1.37-26.15-9.83-40.55-19.27-22.53-14.76-35.26-23.96-57.13-38.37-25.28-16.66-8.89-25.81 5.51-40.77 3.77-3.92 69.27-63.5 70.54-68.9.16-.68.31-3.2-1.19-4.53s-3.71-.87-5.3-.51c-2.26.51-38.25 24.3-107.98 71.37-10.22 7.02-19.48 10.43-27.77 10.26-9.14-.2-26.72-5.17-39.79-9.42-16.03-5.21-28.77-7.97-27.66-16.82.57-4.61 6.92-9.32 19.04-14.14z"
                />
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </article>
  )
}
