import { IconBrandYoutubeFilled, IconMailFilled } from '@tabler/icons-react'
import Image from 'next/image'

export function Footer() {
  return (
    <div className="container">
      <div className="bg-primary text-white p-8 pb-4 mb-2.5 rounded-xl">
        <div className="flex items-start md:justify-between justify-center flex-wrap gap-5">
          <div className="flex flex-wrap md:flex-row flex-col justify-center md:gap-8 gap-3 items-start">
            <Image
              src={'/logo-white.png'}
              width={130}
              height={70}
              className="mx-auto"
              alt="Логотип"
            />
            <div className="max-w-100 md:pr-16 text-sm space-y-2 md:text-left text-center">
              <p>
                Благодать - это церковь миссии &quot;Благодать&quot; на севере
                Москвы.
              </p>
              <p className="text-[12px] text-white/70">
                * Религиозная группа &quot;Благодать&quot;, ведомственный
                регистрационный номер Р.Г. - 7718010198
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 xs:flex-nowrap flex-wrap">
              <a
                href="https://www.youtube.com/@grace.church.moscow"
                className="flex items-center gap-1 bg-secondary/50 p-3 rounded-full hover:rotate-15 duration-200"
              >
                <IconBrandYoutubeFilled size={25} />
              </a>
              <a
                href="https://vkvideo.ru/@grace.moscow"
                className="flex items-center gap-1 p-3 rounded-full bg-secondary/50 hover:rotate-15 duration-200"
              >
                <Image
                  width={25}
                  height={25}
                  src={'/vkvideo.svg'}
                  className="h-auto object-contain"
                  alt="VK Video"
                />
              </a>
              <a
                href="https://vk.com/grace.moscow"
                className="flex items-center gap-1 p-3 rounded-full bg-secondary/50 hover:rotate-15 duration-200"
              >
                <Image width={25} height={25} src={'/vk.svg'} alt="вконтакте" />
              </a>
              <a
                href="https://t.me/grace_church_msk"
                className="flex items-center gap-1 p-3 rounded-full bg-secondary/50 hover:rotate-15 duration-200"
              >
                <Image
                  width={25}
                  height={25}
                  src={'/telegram.svg'}
                  style={{ height: 'auto' }}
                  alt="Telegram"
                />
              </a>
              <a
                href="mailto:grace.church.msk@yandex.ru"
                className="flex items-center gap-1 bg-secondary/50 p-3 rounded-full hover:rotate-15 duration-200"
              >
                <IconMailFilled size={25} />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center md:text-sm text-xs border-t border-white/30 pt-4 mt-6 text-white/80">
          © 2026 Церковь Благодать Москва. Все права защищены.
        </p>
      </div>
    </div>
  )
}
