"use client"

import { useState, useRef, useTransition } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { useLocale } from "next-intl"

const localeConfig = {
  en: { label: "English", flag: "🇬🇧" },
  ka: { label: "ქართული", flag: "🇬🇪" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  fr: { label: "Français", flag: "🇫🇷" },
  es: { label: "Español", flag: "🇪🇸" },
} as const

export function Navbar() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: t("problem"), href: "#problem" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("features"), href: "#features" },
    { label: t("whyUs"), href: "#why-universities" },
    { label: t("contact"), href: "#request-demo" },
  ]

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
    setLangOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
    >
      <nav
        ref={navRef}
        className="relative flex items-center gap-x-6 px-4 h-16 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mx-auto max-w-[1200px]"
      >
        {/* Logo — left */}
        <div className="flex items-center shrink-0 mr-auto">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Image src="/icon.png" alt="PresenceKeeper" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold text-slate-900 text-base hidden sm:block">PresenceKeeper</span>
          </a>
        </div>

        {/* Desktop Nav Items — fixed gap, no flex-grow */}
        <div className="hidden md:flex items-center gap-x-6 shrink-0">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-2.5 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 tracking-normal"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-slate-100 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Mobile centered name — only visible on mobile */}
        <a href="#" className="absolute left-1/2 -translate-x-1/2 md:hidden font-semibold text-slate-900 text-sm">
          PresenceKeeper
        </a>

        {/* Right side: Language switcher + CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0 ml-auto">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-medium uppercase text-sm">{locale}</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-44 rounded-xl bg-white border border-slate-200 shadow-xl shadow-black/10 overflow-hidden"
                >
                  {routing.locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{localeConfig[l].flag}</span>
                        <span>{localeConfig[l].label}</span>
                      </span>
                      {l === locale && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-5 shadow-lg shadow-blue-600/30 transition-all duration-200"
            asChild
          >
            <a href="#request-demo">{t("requestDemo")}</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center ml-auto shrink-0">
          <button
            className="p-2 text-slate-500 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-slate-200 my-2" />

              {/* Mobile Language Switcher */}
              <div className="px-1 mb-1">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 px-3">Language</p>
                <div className="grid grid-cols-2 gap-1">
                  {routing.locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        l === locale
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span>{localeConfig[l].flag}</span>
                      <span>{localeConfig[l].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-200 my-1" />
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full w-full"
                asChild
              >
                <a href="#request-demo" onClick={() => setMobileMenuOpen(false)}>
                  {t("requestDemo")}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
