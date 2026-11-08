'use client'
import Link from 'next/link'
import { loginAction } from '@/actions/auth'
import { Button } from '@/components/Button'
import { useActionState } from 'react'
export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {
    ok: false,
  })

  return (
    <section className="text-center max-w-120 mx-auto space-y-5 md:pt-0 pt-4">
      <div>
        <h2 className="text-3xl font-semibold">Войти в аккаунт</h2>
        <p className="text-black/50 text-sm">
          Введи ваши персональные данные для входа в аккаунт.
        </p>
      </div>
      {/* <Button
        variant="outline"
        className="rounded-lg w-full hover:bg-foreground/5 flex items-center justify-center gap-2"
        onClick={() =>
          window.location.assign(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/connect/vk`,
          )
        }
      >
        <Image
          width={25}
          height={25}
          src={'/vk-blue.svg'}
          className="rounded-md bg-primary"
          alt="ВКонтакте"
        />
        Войти через VK
      </Button> */}
      <form action={formAction} className="space-y-5">
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <label className="flex flex-col items-start gap-1">
          <span className="font-semibold">Email</span>
          <input
            required
            name="identifier"
            type="email"
            defaultValue={state.values?.identifier}
            className="border border-foreground/50 rounded-lg py-3 px-4 w-full"
            placeholder="Введите вашу почту"
          />
        </label>
        <label className="flex flex-col items-start gap-1">
          <span className="font-semibold">Пароль</span>
          <input
            minLength={6}
            required
            defaultValue={state.values?.password}
            name="password"
            type="password"
            className="border border-foreground/50 rounded-lg py-3 px-4 w-full"
            placeholder="Введите ваш пароль"
          />
        </label>
        <Button
          variant="secondary"
          className="rounded-lg w-full py-3"
          disabled={pending}
          type="submit"
        >
          Войти
        </Button>
      </form>
      <div className="mt-10 text-black/50">
        У вас нет аккаунта?{' '}
        <Link
          className="text-foreground font-semibold hover:underline"
          href={'/register'}
        >
          Зарегестрироваться
        </Link>
      </div>
    </section>
  )
}
