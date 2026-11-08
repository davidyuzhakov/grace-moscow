import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Благодать север',
  description:
    'Христианская церковь Благодать на севере Москвы. Благодать - это церковь миссии "Благодать" на севере Москвы. Расписание служений, новости церкви, график дежурств.',
  keywords: [
    'цекровь москва',
    'церковь благодать',
    'благодать север',
    'христианская церковь',
    'протестантская церковь',
    'церковь на севере москвы',
    'благодать',
  ],
  openGraph: {
    title: 'Церковь Благодать | Москва, Север',
    description:
      'Добро пожаловать на сайт церкви Благодать. Узнайте о нашей церкви, расписание служений и актуальные новости.',
    siteName: 'Церковь Благодать',
    url: 'https://grace.moscow',
    locale: 'ru_RU',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 container md:pt-24 pt-20 md:pb-20 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
