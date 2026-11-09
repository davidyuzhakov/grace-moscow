'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Fragment, useRef } from 'react'
import { Chip } from '../Chip'
import { PurposeBlock } from './PurposeBlock'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ABOUT_TEXT =
  'Мы - люди, которые любят Бога, ближнего и свою страну. Хотим, чтобы в нашем обществе было больше библейских ценностей и Христианского мировоззрения.'
const ABOUT_WORDS = ABOUT_TEXT.split(' ')

export function AboutBlock() {
  const heading = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      const palette = getComputedStyle(document.documentElement)

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-about-word]',
          { color: 'rgba(140, 144, 159, 0.5)' },
          {
            color: palette.getPropertyValue('--foreground').trim(),
            duration: 1,
            stagger: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: heading.current,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: 0.4,
            },
          },
        )
      })

      return () => media.revert()
    },
    { scope: heading },
  )

  return (
    <>
      <div className="md:space-y-3 space-y-2 text-center max-w-200 mx-auto md:mb-22 mb-16">
        <Chip text="кто мы" className="bg-accent" />
        <h2
          ref={heading}
          className="lg:text-3xl sm:text-2xl text-xl text-foreground"
        >
          {ABOUT_WORDS.map((word, index) => (
            <Fragment key={index}>
              {index > 0 && ' '}
              <span data-about-word>{word}</span>
            </Fragment>
          ))}
        </h2>
      </div>
      <PurposeBlock />
    </>
  )
}
