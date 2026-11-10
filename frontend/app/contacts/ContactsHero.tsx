'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type ReactNode } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function ContactsHero({ children }: { children: ReactNode }) {
  const hero = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const select = gsap.utils.selector(hero)

        const intro = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        intro
          .fromTo(
            select('[data-hero-welcome]'),
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.8, clearProps: 'all' },
            0.3,
          )
          .fromTo(
            select('[data-hero-letter]'),
            {
              autoAlpha: 0,
              yPercent: 80,
              rotation: 10,
              scale: 0.75,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotation: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'back.out(1.6)',
              clearProps: 'transform,opacity,visibility',
            },
            0.7,
          )
          .fromTo(
            select('[data-hero-intro]'),
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              clearProps: 'all',
            },
            1.3,
          )
          .fromTo(
            select('[data-hero-photo]'),
            { autoAlpha: 0, y: 24, scale: 0.98 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, clearProps: 'all' },
            1.8,
          )

        const scene = gsap.timeline({
          paused: true,
          defaults: { ease: 'power3.out' },
        })

        scene
          .fromTo(
            select('[data-hero-frame]'),
            { autoAlpha: 0, scale: 0.96 },
            { autoAlpha: 1, scale: 1, duration: 0.85, clearProps: 'all' },
            0,
          )
          .fromTo(
            select('[data-hero-caption]'),
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.16,
              clearProps: 'all',
            },
            0.4,
          )
          .fromTo(
            select('[data-hero-invite]'),
            { autoAlpha: 0, y: 12, scale: 0.9, rotation: -5 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: 'back.out(1.15)',
              clearProps: 'all',
            },
            1.05,
          )
          .fromTo(
            select('[data-hero-star]'),
            {
              autoAlpha: 0,
              scale: 0,
              rotation: -35,
              transformOrigin: '50% 50%',
            },
            { autoAlpha: 1, scale: 1.25, rotation: 8, duration: 0.3 },
            1.85,
          )
          .to(select('[data-hero-star]'), {
            scale: 1,
            rotation: 0,
            duration: 0.45,
            ease: 'power2.inOut',
            clearProps: 'all',
          })

        ScrollTrigger.create({
          trigger: select('[data-hero-scene]')[0],
          start: 'bottom 95%',
          once: true,
          onEnter: () => {
            if (intro.progress() < 1) {
              intro.eventCallback('onComplete', () => scene.play())
            } else {
              scene.play()
            }
          },
        })
      })

      return () => media.revert()
    },
    { scope: hero },
  )

  return (
    <section
      ref={hero}
      className="relative isolate text-center"
      aria-labelledby="contacts-title"
    >
      {children}
    </section>
  )
}
