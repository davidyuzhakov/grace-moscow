import type { Metadata } from 'next'
import Image from 'next/image'
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconHeart,
  IconSparkles,
} from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { services } from './contact-info'
import styles from './contacts.module.css'
import { YandexMap } from '@/components/YandexMap'
import { Tag } from '@/components/Tag'

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Расписание служений церкви «Благодать», адрес, способы связи и ссылки на социальные сети.',
}

const phone = '+7 (916) 599-81-03'
const phoneLink = 'tel:+79165998103'
const email = 'grace.church.msk@yandex.ru'
const emailLink = `mailto:${email}`
const socials = [
  { name: 'Telegram', href: 'https://t.me/grace_church_msk' },
  { name: 'YouTube', href: 'https://www.youtube.com/@grace.church.moscow' },
  { name: 'ВКонтакте', href: 'https://vk.com/grace.moscow' },
  { name: 'VK Видео', href: 'https://vkvideo.ru/@grace.moscow' },
]

const primaryButton = `${styles.primaryButton} inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-5 py-3 text-xs font-medium whitespace-nowrap`
const sectionTitle =
  'text-[clamp(2rem,10vw,2.5rem)] leading-[1.08] font-semibold tracking-[-.047em] md:text-5xl lg:text-6xl'

function Star({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M50 1c0 37-12 49-49 49 37 0 49 12 49 49 0-37 12-49 49-49C62 50 50 38 50 1Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Dove({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 37c9 2 15-1 19-8 6 0 10-4 12-8-5 1-9 0-12-2C27 15 24 9 23 5c-5 10-4 16 1 21-6-1-11-5-15-11 0 10 4 16 12 18-4 2-8 3-13 2m33-14 5-2-5-1M16 41c6 3 15 2 21-3"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SectionLabel({
  number,
  children,
}: {
  number: string
  children: ReactNode
}) {
  return (
    <p className="mb-5 flex items-center gap-3 text-[.625rem] font-semibold tracking-[.125em] text-muted uppercase sm:mb-6">
      <span className="grid size-5 place-items-center rounded-full border border-border-strong text-[0.625rem] tracking-normal text-text-secondary">
        {number}
      </span>
      {children}
    </p>
  )
}

export default function ContactsPage() {
  const sunday = services[0]

  return (
    <div
      className={`${styles.page} mx-auto max-w-296 px-3 pt-0 sm:px-6 md:px-8 md:pt-14 lg:px-4`}
    >
      <section
        className="relative isolate text-center"
        aria-labelledby="contacts-title"
      >
        <div
          className={`${styles.heroAtmosphere} absolute inset-y-0 left-1/2 -z-20 w-screen -translate-x-1/2`}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </div>
        <h1
          id="contacts-title"
          className="text-[clamp(2rem,12.6vw,4rem)] leading-none font-[650] sm:text-7xl md:text-[5rem] lg:text-[84px]"
        >
          Рады видеть
          <br />
          <span className={`${styles.gradientText} inline-block px-2`}>
            каждого
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm md:leading-7 leading-6 text-muted">
          Присоединяйтесь к нашим служениям <br className="hidden sm:block" />
          или свяжитесь с нами любым удобным способом.
        </p>
        <a className={`${primaryButton} mt-7`} href="#contact">
          Связаться с нами <IconArrowDownRight size={18} aria-hidden="true" />
        </a>

        <div className="relative mt-12 text-left sm:mx-4 sm:mt-14 md:mx-8 lg:mx-12">
          <div
            className={`${styles.sceneHalo} pointer-events-none absolute -inset-x-2 top-[10%] -bottom-3 -z-10`}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-4 -bottom-3 -z-10 -rotate-4 rounded-3xl border border-accent/15 sm:-inset-x-8 lg:-inset-x-12"
            aria-hidden="true"
          />
          <Star
            className={`${styles.sceneStar} absolute -top-4 -left-2 z-10 size-8 sm:-left-5 sm:size-10 lg:top-0 lg:-left-10 lg:size-13`}
          />
          <figure
            className={`${styles.photo} relative isolate h-88 overflow-hidden rounded-2xl border border-foreground/10 bg-surface sm:rounded-[1.25rem] lg:h-100`}
          >
            <Image
              src="/contacts-bg.jpg"
              alt="церковь"
              fill
              preload
              quality={90}
              sizes="(min-width: 1184px) 1056px, (min-width: 768px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 80px), (min-width: 552px) calc(100vw - 24px), 528px"
              className="object-cover object-[52%_47%] sm:object-[50%_65%]"
            />
            <div
              className={`${styles.photoShade} absolute inset-0`}
              aria-hidden="true"
            />
            <figcaption className="absolute bottom-7 left-6 text-2xl leading-tight font-[550] tracking-tight sm:bottom-8 sm:left-8 sm:text-3xl">
              <span className="block text-foreground/85">
                Где человек ставит точку,
              </span>
              <strong className="font-semibold">там Бог ставит запятую</strong>
            </figcaption>
          </figure>
          <div
            className={`${styles.invite} absolute lg:right-4 -right-2 lg:top-5 -top-2 z-10 border border-foreground/15 rounded-3xl md:size-28 size-24 flex items-center justify-center flex-col text-center`}
          >
            <div className="md:text-[11px] text-[10px] leading-3 mb-1">
              {sunday.frequency}
            </div>
            <div className="md:text-[26px] text-2xl font-medium">
              {sunday.time}
            </div>
          </div>
        </div>
      </section>

      <section
        id="gatherings"
        className="scroll-mt-24 pt-20 sm:pt-32"
        aria-labelledby="gatherings-title"
      >
        <div className="mb-7 md:mb-9 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <SectionLabel number="01">Наши служения</SectionLabel>
            <h2 id="gatherings-title" className={sectionTitle}>
              Встречаемся
              <br />
              <span className="text-muted">каждую неделю</span>
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr] lg:gap-5">
          {services.map((service) => {
            const Symbol = service.id === 'sunday' ? IconSparkles : IconHeart

            return (
              <article
                key={service.id}
                data-service={service.id}
                className={`${styles.serviceCard} group relative isolate sm:min-h-88 min-h-80 overflow-hidden rounded-3xl border border-foreground/6 p-4.5 sm:p-6 lg:min-h-92 lg:p-8 flex flex-col`}
              >
                {service.id === 'sunday' ? (
                  <div
                    className={`${styles.serviceArt} pointer-events-none absolute -right-28 bottom-om-40 -z-10 size-100`}
                    aria-hidden="true"
                  >
                    <span className="inset-0" />
                    <span className="inset-8" />
                    <span className="inset-16" />
                    <span className="inset-24" />
                    <span className="inset-32" />
                  </div>
                ) : (
                  <div
                    className={`${styles.prayerLight} pointer-events-none absolute -right-8 top-8 -z-10 h-108 w-56`}
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-between gap-3">
                  <p className="rounded-full border border-foreground/15 bg-foreground/2 px-2.5 py-1.5 text-[.625rem] tracking-widest text-[#c5d2ed] uppercase group-data-[service=friday]:text-[#dfcabb]">
                    {service.frequency}
                  </p>
                  <span className="text-[#a5b7df] group-data-[service=friday]:text-[#d9c0ae]">
                    <Symbol size={20} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-6 text-3xl leading-[1.14] font-[550] tracking-tight">
                  {service.title.replace(' служение', '')}
                  <br />
                  служение
                </h3>
                <p className="flex-1 mt-3 max-w-72 text-[.8125rem] leading-relaxed text-[#a6b2c9] group-data-[service=friday]:text-[#b7a9ab]">
                  {service.description}
                </p>

                <time
                  dateTime={service.time}
                  className="block text-6xl leading-[.95] font-[550] tracking-tighter tabular-nums sm:text-6xl lg:text-7xl"
                >
                  {service.time}
                </time>
              </article>
            )
          })}
        </div>
      </section>

      <section
        id="visit"
        className="grid scroll-mt-24 items-center gap-7 pt-16 sm:pt-20 md:grid-cols-[1fr_1.1fr] md:gap-10 lg:gap-16 lg:pt-28"
        aria-labelledby="visit-title"
      >
        <div>
          <SectionLabel number="02">Где мы находимся</SectionLabel>
          <h2 className={sectionTitle}>
            Мы здесь.
            <br />
            <span className="text-muted">Приходите!</span>
          </h2>
          <p className="my-5 text-sm leading-relaxed text-muted">
            Если вы пока не нашли свою церковь,
            <br />
            будем рады видеть вас у нас.
          </p>
          <Tag className="w-fit">
            <Image width={18} height={18} src="./metro.svg" alt="метро" />
            Коптево
          </Tag>
          <address className="mt-4 text-lg font-medium not-italic sm:text-xl">
            Коптевская улица, 30А · 2 этаж
          </address>
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              className={primaryButton}
              href={'https://yandex.ru/maps/org/blagodat/208449406853'}
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть в Яндекс Картах{' '}
              <IconArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div
          className={`${styles.location} relative isolate min-h-92 self-stretch overflow-hidden rounded-3xl border border-foreground/6 md:min-h-104 lg:min-h-110`}
        >
          <YandexMap />
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 pt-16 sm:pt-20 lg:pt-24"
        aria-labelledby="contact-title"
      >
        <div className="mb-7 md:mb-9 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <SectionLabel number="03">Наши контакты</SectionLabel>
            <h2 id="contact-title" className={sectionTitle}>
              Связь с нами
            </h2>
          </div>
          <p className="mt-5 text-sm leading-6 text-text-secondary md:mt-0 md:mb-1">
            Если у вас остались вопросы, мы на связи.
            <br />
            Выбирайте удобный способ.
            <br />
            <span className="text-muted">
              Следите за новостями в телеграм-канале.
            </span>
          </p>
        </div>
        <div
          className={`${styles.contactPanel} relative isolate overflow-hidden rounded-3xl border border-foreground/6 px-5 py-7 sm:p-8 lg:p-12`}
        >
          <div
            className={`${styles.contactOrb} pointer-events-none absolute -right-32 -bottom-40 -z-10 size-100 lg:-right-16`}
            aria-hidden="true"
          >
            <span className="inset-0" />
            <span className="inset-10" />
            <span className="inset-20" />
            <Dove className="absolute top-16 left-12 size-32 -rotate-12" />
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div>
              <p className="mb-2 text-[.625rem] tracking-widest text-muted uppercase">
                позвонить
              </p>
              <a
                href={phoneLink}
                className="block text-[clamp(1.25rem,6vw,1.625rem)] font-medium tracking-tight whitespace-nowrap transition-colors hover:text-accent sm:text-3xl lg:text-4xl"
              >
                {phone}
              </a>
            </div>
          </div>
          <div className="my-6 border-t border-foreground/5 sm:my-7 sm:ml-14" />
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div>
              <p className="mb-2 text-[.625rem] tracking-widest text-muted uppercase">
                написать письмо
              </p>
              <a
                href={emailLink}
                className="block text-sm tracking-tight wrap-anywhere text-text-secondary transition-colors hover:text-accent sm:text-lg lg:text-xl"
              >
                {email}
              </a>
            </div>
          </div>
          <div className="mt-7 border-t border-border pt-6 sm:mt-8">
            <h3
              id="socials-title"
              className="mb-4 text-sm font-medium text-text-secondary"
            >
              Жизнь церкви и проповеди
            </h3>
            <nav
              aria-labelledby="socials-title"
              className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3"
            >
              {socials.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialLink} flex min-h-11 items-center justify-between gap-2 rounded-full border px-3 text-xs sm:min-w-36 sm:gap-7 sm:px-4 sm:text-[.8125rem]`}
                >
                  {name}{' '}
                  <IconArrowUpRight
                    size={16}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
}
