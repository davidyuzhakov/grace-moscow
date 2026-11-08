'use client'

import { registerAction } from '@/actions/auth'
import { Button } from '@/components/Button'

import Link from 'next/link'
import { useActionState } from 'react'

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, {
    ok: false,
  })

  return (
    <section className="text-center max-w-120 mx-auto space-y-5 md:pt-0 pt-4">
      <div>
        <h2 className="text-3xl font-semibold">Создать аккаунт</h2>
        <p className="text-black/50 text-sm">
          Создание аккаунта предназначено только для служителей церкви.
        </p>
      </div>
      {/* <Button
        variant="outline"
        className="rounded-lg w-full hover:bg-foreground/5 px-2 flex items-center justify-center gap-2 md:text-base text-sm"
        onClick={() =>
          window.location.assign(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/connect/vk`,
          )
        }
      >
        <Image width={25} height={25} src={'/vk-blue.svg'} alt="ВКонтакте" />
        Зарегистрироваться через VK
      </Button> */}
      <form action={formAction} className="space-y-5">
        {!pending && state.error && (
          <p className="text-red-500 text-sm">{state.error}</p>
        )}
        <div className="flex items-center gap-3">
          <label className="flex flex-col items-start gap-1 w-full">
            <span className="font-semibold">Фамилия Имя</span>
            <input
              required
              minLength={3}
              name="name"
              defaultValue={state.values?.name}
              type="text"
              className="border border-foreground/50 rounded-lg py-3 px-4 w-full"
              placeholder="Иванов Иван"
            />
          </label>
        </div>
        <label className="flex flex-col items-start gap-1">
          <span className="font-semibold">Email</span>
          <input
            required
            defaultValue={state.values?.email}
            name="email"
            type="email"
            className="border border-foreground/50 rounded-lg py-3 px-4 w-full"
            placeholder="Введите вашу почту"
          />
        </label>
        <label className="flex flex-col items-start gap-1">
          <span className="font-semibold">Пароль</span>
          <input
            required
            minLength={6}
            defaultValue={state.values?.password}
            name="password"
            type="password"
            className="border border-foreground/50 rounded-lg py-3 px-4 w-full"
            placeholder="Введите ваш пароль"
          />
        </label>
        <Button
          type="submit"
          variant="secondary"
          className="rounded-lg w-full py-3"
          disabled={pending}
        >
          Создать
        </Button>
      </form>
      <div className="mt-10 text-black/50">
        У вас уже есть аккаунт?{' '}
        <Link
          className="text-foreground font-semibold hover:underline"
          href={'/login'}
        >
          Войти
        </Link>
      </div>
    </section>
  )
}
