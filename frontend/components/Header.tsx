'use client'

import { logoutAction } from '@/actions/auth'
import { Result } from '@/lib/api'
import { User, UserStatus } from '@/models/User'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import {
  IconChevronDown,
  IconLogin2,
  IconLogout,
  IconMenu2,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './Button'

type NavLink = { name: string; location: string }

const statusInfo: Record<
  UserStatus,
  { tagStyle: string; description: string }
> = {
  'на модерации': {
    tagStyle: 'bg-purple-400/15 text-purple-400',
    description: 'Ожидайте статуса «Принято» для доступа к приватным страницам',
  },
  принято: {
    tagStyle: 'bg-green-400/15 text-green-400',
    description: 'У вас есть доступ к приватным страницам',
  },
  отклонено: {
    tagStyle: 'bg-red-400/15 text-red-400',
    description: 'Вам запретили доступ к приватным с страницам',
  },
}

export function Header() {
  const [user, setUser] = useState<User>()
  const [openPopup, setOpenPopup] = useState<null | 'profile' | 'menu'>(null)
  const [isLoading, setIsLoading] = useState(true)

  const pathname = usePathname()

  const navLinks: NavLink[] = useMemo(() => {
    return [
      { name: 'О нас', location: '/about' },
      { name: 'Новости', location: '/news' },
      { name: 'Контакты', location: '/contacts' },
      ...(user?.userStatus === 'принято'
        ? [
            {
              name: 'Календарь',
              location: '/schedule',
            },
          ]
        : []),
    ]
  }, [user?.userStatus])

  const logoutHandler = async () => {
    setOpenPopup(null)
    setUser(undefined)
    await logoutAction()
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch('/api/me')
        if (!res.ok) throw new Error('Не удалось получить пользователя')

        const data: Result<User> = await res.json()

        if (data.ok) {
          setUser(data.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openPopup === 'menu') {
        if (!(e.target as HTMLElement)?.closest('.menu')) {
          setOpenPopup(null)
        }
      }
      if (openPopup === 'profile') {
        if (!(e.target as HTMLElement)?.closest('.profile-info')) {
          setOpenPopup(null)
        }
      }
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [openPopup])

  return (
    <header className="fixed top-3 left-1 right-1 z-10">
      <div className="max-w-325 mx-auto md:grid grid-cols-[1fr_auto_1fr] flex gap-5 items-center justify-between bg-background/70 backdrop-blur-md border border-border shadow-lg shadow-black/20 py-2 px-5 rounded-full">
        <Link href={'/'} className="w-fit shrink-0">
          <Image
            className="w-full md:max-w-20 max-w-16 h-auto shrink-0"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            src={'/logo-white.png'}
            alt="Логотип"
          />
        </Link>
        <nav className="md:block hidden">
          <ul className="flex items-center lg:gap-12 gap-8">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`cursor-pointer text-nowrap hover:text-accent duration-200 ${pathname === link.location ? 'text-accent' : ''}`}
              >
                <Link href={link.location}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4 justify-end w-full">
          {user ? (
            <div className="relative ml-auto">
              <div
                onClick={() => setOpenPopup('profile')}
                className="flex items-center gap-2 hover:text-accent cursor-pointer duration-200"
              >
                <IconUserCircle className="size-6" />
                <div className="text-nowrap truncate max-w-47.5 lg:block hidden">
                  {user.name}
                </div>
                <IconChevronDown
                  className={`-ml-1.5 duration-200 lg:block hidden ${openPopup === 'profile' ? 'rotate-180' : ''}`}
                  size={20}
                />
              </div>
              {openPopup === 'profile' && (
                <div className="profile-info absolute top-[calc(100%+10px)] right-0 p-3 bg-surface border border-border rounded-xl shadow-xl shadow-black/30 w-60 space-y-4">
                  <div className="truncate font-medium text-lg lg:hidden block">
                    {user.name}
                  </div>
                  <div className="truncate">
                    Email: <span className="text-sm">{user.email}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 ">
                      Статус:{' '}
                      <div
                        className={`text-xs px-2 rounded-full ${statusInfo[user.userStatus].tagStyle}`}
                      >
                        {user.userStatus}
                      </div>
                    </div>

                    <p className="text-xs text-text-secondary mt-1">
                      {statusInfo[user.userStatus].description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={logoutHandler}
                    className="text-danger w-full flex items-center gap-2 justify-center py-1 rounded-xl bg-danger/10 hover:bg-danger/20 hover:text-danger disabled:opacity-50"
                  >
                    Выйти
                    <IconLogout size={20} />
                  </Button>
                </div>
              )}
            </div>
          ) : !isLoading ? (
            <Link
              className="items-center gap-1 md:flex hidden hover:border-accent hover:text-accent duration-200 group"
              href={'/login'}
            >
              Войти
              <IconLogin2
                size={18}
                className="group-hover:translate-x-1 duration-200"
              />
            </Link>
          ) : (
            <div className="bg-surface-raised animate-pulse rounded-lg h-6 w-16 lg:w-40 md:block hidden"></div>
          )}
          <div
            onClick={() =>
              setOpenPopup((prev) => (prev === null ? 'menu' : null))
            }
            className="md:hidden block"
          >
            {openPopup === 'menu' ? <IconX /> : <IconMenu2 />}
          </div>
        </div>
      </div>

      <nav
        className={`menu md:hidden block bg-surface/95 backdrop-blur-sm border border-border rounded-2xl absolute top-[calc(100%+10px)] left-1 right-1 shadow-sm space-y-7 p-4 duration-200 ${openPopup === 'menu' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="space-y-2">
          {navLinks.map((link) => (
            <Link
              onClick={() => setOpenPopup(null)}
              key={link.name}
              className={`block text-xl text-center py-3 font-medium ${pathname === link.location ? 'text-accent bg-primary/10 rounded-full' : ''}`}
              href={link.location}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {!user && (
          <Link
            onClick={() => setOpenPopup(null)}
            className="rounded-2xl bg-primary text-white w-full flex items-center gap-2 justify-center py-3 font-medium"
            href={'/login'}
          >
            Войти <IconLogin2 />
          </Link>
        )}
      </nav>
    </header>
  )
}
