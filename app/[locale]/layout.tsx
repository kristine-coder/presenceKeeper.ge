import type React from "react"
import type { Metadata } from "next"
import { Manrope, DM_Sans, Instrument_Sans, Noto_Sans_Georgian } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "../globals.css"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cal-sans",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-georgian",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PresenceKeeper - Smart Attendance & Student Monitoring System",
  description:
    "Eliminate attendance fraud with BLE + QR hybrid verification. Real-time tracking, admin analytics, and seamless campus integration for modern universities.",
  keywords: [
    "smart attendance",
    "BLE attendance",
    "university attendance system",
    "student monitoring",
    "QR attendance",
    "attendance analytics",
  ],
  openGraph: {
    title: "PresenceKeeper - Smart Attendance & Student Monitoring System",
    description:
      "Eliminate attendance fraud with BLE + QR hybrid verification. Built for universities that demand accuracy and transparency.",
    type: "website",
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} ${dmSans.variable} ${instrumentSans.variable} ${notoGeorgian.variable} font-sans antialiased`} suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
