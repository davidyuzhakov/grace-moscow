'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type ReactNode } from 'react'
import styles from './contacts.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ContactsGatherings({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(section)

        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: select('[data-gatherings-heading]')[0],
              start: 'top 85%',
              once: true,
            },
          })
          .fromTo(
            select('[data-gatherings-title]'),
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
            },
          )
          .fromTo(
            select('[data-gatherings-emphasis]'),
            {
              autoAlpha: 0,
              y: 24,
              scale: 0.95,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              clearProps: 'all',
            },
            0.3,
          )

        const cards = select('[data-service]')
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 28, transition: 'none' },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.16,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: { trigger: cards[0], start: 'top 90%', once: true },
          },
        )
      })

      return () => media.revert()
    },
    { scope: section },
  )

  return (
    <section
      ref={section}
      id="gatherings"
      className={`${styles.ambientSection} scroll-mt-24 pt-20 sm:pt-32`}
      aria-labelledby="gatherings-title"
    >
      {children}
    </section>
  )
}
