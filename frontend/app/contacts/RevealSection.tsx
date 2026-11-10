'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type ComponentPropsWithoutRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function RevealSection(props: ComponentPropsWithoutRef<'section'>) {
  const section = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(section.current, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: section.current,
            start: 'top 85%',
            once: true,
          },
        })
      })

      return () => media.revert()
    },
    { scope: section },
  )

  return <section {...props} ref={section} />
}
