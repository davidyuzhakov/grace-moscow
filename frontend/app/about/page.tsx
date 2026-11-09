import { AboutBlock } from '@/components/blocks/AboutBlock'
import { Chip } from '@/components/Chip'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'О нас',
  description:
    'Подробная информация о нашей церкви. Кто мы, для чего существуем и во что верим.',
}

export default function AboutPage() {
  return (
    <section className="md:space-y-16 space-y-10 -mt-24">
      <div className="lg:h-150 md:h-100 h-80 lg:pb-40 md:pb-20 pb-10">
        <Image
          width={1000000}
          height={1000000}
          className="absolute lg:h-150 md:h-100 h-80 -z-1 inset-0 w-full object-cover md:object-[0_60%] object-center brightness-75"
          src={'/about.jpg'}
          alt="церковь"
        />
        <h1 className="h-full flex justify-end flex-col font-bold text-white lg:text-8xl md:text-7xl text-5xl">
          О нас
        </h1>
      </div>
      <AboutBlock />
      <div className="space-y-5">
        <Chip text="во что мы верим" className="bg-accent" />
        <div className="bg-surface border-l-4 border-l-accent md:p-7 p-5 rounded-r-xl shadow-sm">
          <h3 className="text-accent md:mb-6 mb-4 font-bold md:text-base text-sm uppercase tracking-wider">
            Апостольский Символ Веры
          </h3>
          <blockquote className=" text-text-secondary leading-relaxed italic md:text-base text-sm">
            &ldquo;Верую в Бога, Отца Всемогущего, Творца неба и земли. Верую в
            Иисуса Христа, Единородного Сына Божьего и Господа нашего, Который
            был зачат от Святого Духа, рождён от Девы Марии и пострадал при
            Понтии Пилате. Был распят, умер и погребён, в третий день воскрес из
            мёртвых, вознесён на небеса, где Он сидит одесную Бога Своего
            Всемогущего Отца, откуда придёт судить живых и мёртвых. Верую в
            Святого Духа, единую Святую христианскую Церковь, общение святых,
            прощение грехов, воскресение тела и жизнь вечную. Аминь.&ldquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
