import NewsCard from '@/components/NewsCard'
import Link from 'next/link'
import { AboutBlock } from '@/components/blocks/AboutBlock'
import { newsService } from '@/services/news.service'
import { ErrorState } from '@/components/ErrorState'
import { ContactsBlock } from '@/components/blocks/ContactsBlock'
import { HeroBlock } from '@/components/blocks/HeroBlock'
import { IconNews } from '@tabler/icons-react'

export default async function HomePage() {
  const result = await newsService.getAllNews()
  const news = result.ok ? result.data : []

  return (
    <div className="-mt-24">
      <section className="h-170">
        <div className="pointer-events-none absolute inset-0 -z-1 h-170 w-full">
          <video
            src={'/intro-optimized.mp4'}
            loop
            autoPlay
            muted
            playsInline
            controls={false}
            className="h-full object-cover md:object-[0_65%] object-[40%_0] w-full brightness-75"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 md:h-48"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                color-mix(in srgb, var(--background) 0%, transparent) 0%,
                color-mix(in srgb, var(--background) 2%, transparent) 15%,
                color-mix(in srgb, var(--background) 8%, transparent) 30%,
                color-mix(in srgb, var(--background) 22%, transparent) 45%,
                color-mix(in srgb, var(--background) 45%, transparent) 60%,
                color-mix(in srgb, var(--background) 70%, transparent) 75%,
                color-mix(in srgb, var(--background) 90%, transparent) 87%,
                color-mix(in srgb, var(--background) 98%, transparent) 95%,
                var(--background) 100%
              )`,
            }}
          />
        </div>
        <HeroBlock />
      </section>
      <section className="md:pb-16 pb-10 pt-8 relative">
        <AboutBlock />
        <div className="md:mt-5 mt-8 flex justify-center">
          <Link
            href={'/about'}
            className="text-center ml-auto border-foreground/10 border px-3 py-2 rounded-full text-sm text-foreground/75 duration-200 hover:border-primary hover:text-primary"
          >
            Подробнее о нас
          </Link>
        </div>
      </section>
      <section className="space-y-6 md:pt-0 pt-5">
        <div className="flex items-center gap-2">
          <div className="bg-white shadow-sm rounded-full md:size-10 size-8 flex items-center justify-center">
            <IconNews className="md:size-6 size-5" />
          </div>
          <h3 className="md:text-2xl text-xl font-medium">Новости церкви</h3>
        </div>
        {!result.ok ? (
          <ErrorState error={result.error} />
        ) : (
          <>
            <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-1">
              {news.length === 0 && <p>Новостей нет</p>}
              {news.slice(0, 3).map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
            {news.length > 3 && (
              <div className="flex justify-center">
                <Link
                  href={'/news'}
                  className="text-center border-foreground/10 border px-3 py-2 rounded-full text-sm text-foreground/75 duration-200 hover:border-primary hover:text-primary"
                >
                  Больше новостей
                </Link>
              </div>
            )}
          </>
        )}
      </section>
      <section className="pt-10 space-y-4">
        <ContactsBlock />
      </section>
    </div>
  )
}
