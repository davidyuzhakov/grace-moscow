'use client'

import { useGSAP } from '@gsap/react'
import {
  IconHeart,
  IconHeartHandshake,
  IconTargetArrow,
  IconWorldMap,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

const PURPOSES = [
  {
    title: 'Любить Бога',
    description: 'познавать Его благодать и отвечать Ему любовью.',
    icon: IconHeart,
    color:
      '[--purpose-color:var(--color-red-400)] [--purpose-text:var(--color-red-400)]',
    position: { x: 0.382683, y: -0.92388 },
  },
  {
    title: 'Быть ближним',
    description: 'являть Божью любовь другим.',
    icon: IconHeartHandshake,
    color:
      '[--purpose-color:var(--color-purple-400)] [--purpose-text:var(--color-purple-400)]',
    position: { x: 0.92388, y: -0.382683 },
  },
  {
    title: 'Жить с призванием',
    description: 'реализовывать дары и таланты для служения Богу и людям.',
    icon: IconTargetArrow,
    color:
      '[--purpose-color:var(--color-blue-400)] [--purpose-text:var(--color-blue-400)]',
    position: { x: 0.92388, y: 0.382683 },
  },
  {
    title: 'Изменить мир',
    description: 'оставить след Христов в своем поколении.',
    icon: IconWorldMap,
    color:
      '[--purpose-color:var(--color-emerald-400)] [--purpose-text:var(--color-emerald-400)]',
    position: { x: 0.382683, y: 0.92388 },
  },
]

export function PurposeBlock() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedPurpose = PURPOSES[selectedIndex]
  const description = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          'h3, p',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
          },
        )
      })

      return () => media.revert()
    },
    { scope: description, dependencies: [selectedIndex], revertOnUpdate: true },
  )

  return (
    <section>
      <h2 className="tracking-wider md:text-[40px] text-3xl font-extrabold text-muted/60 text-center uppercase">
        Для чего мы существуем
      </h2>
      <div className="flex md:flex-row flex-col gap-6 sm:mt-6 mt-0 items-center">
        <div
          role="group"
          aria-label="Выберите направление"
          className="relative sm:h-104 h-80 w-full max-w-110 mx-auto [--orbit-radius:112px] xs:[--orbit-radius:136px] sm:[--orbit-radius:168px] [--orbit-icon:48px] sm:[--orbit-icon:56px]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-(--orbit-radius) size-[calc(2*var(--orbit-radius))] rounded-full border border-foreground/10" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[calc(16px-var(--orbit-radius))] size-[calc(2*var(--orbit-radius)-32px)] rounded-full border border-foreground/5" />
          </div>
          {PURPOSES.map((purpose, index) => {
            const isSelected = selectedIndex === index
            const Icon = purpose.icon
            const left = `calc(var(--orbit-radius) * ${purpose.position.x} - var(--orbit-icon) / 2)`

            return (
              <button
                key={purpose.title}
                type="button"
                aria-pressed={isSelected}
                aria-controls="purpose-description"
                onClick={() => setSelectedIndex(index)}
                style={{
                  left,
                  top: `calc(50% + var(--orbit-radius) * ${purpose.position.y})`,
                  width: `calc(100% - (${left}))`,
                }}
                className={`absolute -translate-y-1/2 flex items-center sm:gap-4 gap-3 sm:text-base text-sm font-medium rounded-full cursor-pointer duration-200 group ${purpose.color} ${
                  isSelected
                    ? 'text-(--purpose-text)'
                    : 'text-foreground/65 hover:text-(--purpose-text)'
                }`}
              >
                <span
                  className={`relative size-(--orbit-icon) flex items-center justify-center rounded-full duration-200 ${
                    isSelected
                      ? 'bg-(--purpose-color) text-white ring-6 ring-(--purpose-color)/15'
                      : 'bg-(--purpose-color)/10 text-(--purpose-color)'
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className="sm:size-7 size-6"
                    stroke={1.6}
                  />
                </span>
                <span>{purpose.title}</span>
              </button>
            )
          })}
        </div>
        <div
          className={`w-full max-w-110 mx-auto md:py-6 ${selectedPurpose.color}`}
        >
          <div className="h-0.5 w-10 bg-(--purpose-color) md:mb-6 mb-3" />
          <div
            ref={description}
            id="purpose-description"
            aria-live="polite"
            aria-atomic="true"
            className="md:min-h-64 lg:min-h-55"
          >
            <h3 className="text-(--purpose-color) font-medium lg:text-3xl sm:text-2xl text-xl mb-4">
              {selectedPurpose.title}
            </h3>
            <p className="lg:text-xl sm:text-lg text-base leading-relaxed text-foreground/75">
              — {selectedPurpose.description}
            </p>
          </div>
          <div className="mt-6 pt-5 border-t border-foreground/10 flex justify-between items-center">
            <div className="text-sm tracking-widest text-muted tabular-nums">
              <span className="text-(--purpose-color) font-medium">
                {String(selectedIndex + 1).padStart(2, '0')}
              </span>{' '}
              / 04
            </div>
            <div className="flex items-center gap-1">
              {PURPOSES.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full duration-200 ${selectedIndex === index ? 'bg-(--purpose-color) h-1.5 w-5' : 'bg-foreground/10 size-1.5'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
