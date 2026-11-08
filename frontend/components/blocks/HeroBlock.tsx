'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, TextPlugin)

const HERO_TITLE = 'Добро\nпожаловать!'

export function HeroBlock() {
  const heading = useRef<HTMLHeadingElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  useGSAP(
    () => {
      if (!text.current) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(text.current, { text: HERO_TITLE })
        return
      }

      gsap.timeline().to(text.current, {
        duration: 1.6,
        ease: 'none',
        text: {
          delimiter: '',
          preserveSpaces: true,
          value: HERO_TITLE,
        },
      })
    },
    { scope: heading },
  )

  return (
    <div className="flex justify-center flex-col h-full">
      <h1
        ref={heading}
        aria-label="Добро пожаловать!"
        className="leading-none text-white lg:text-8xl md:text-7xl xs:text-6xl text-[48px] font-extrabold mb-4 min-h-[2em]"
      >
        <span className="sr-only">Добро пожаловать!</span>
        <span ref={text} aria-hidden="true" className="whitespace-pre-line" />
      </h1>
    </div>
  )
}
