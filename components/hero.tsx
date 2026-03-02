"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Wifi, QrCode, ShieldCheck, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const textRevealVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1,
    },
  }),
}

function DashboardMockup() {
  const t = useTranslations("hero.dashboard")

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16">
      <div className="absolute inset-0 bg-blue-500/8 blur-3xl rounded-3xl" />
      <div className="relative rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/10">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <div className="ml-3 flex-1 h-6 rounded bg-slate-200 max-w-xs px-3 flex items-center">
            <span className="text-xs text-slate-400">presencekeeper.university.edu/dashboard</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {[
            { labelKey: "activeSessions", value: "12", color: "text-blue-600", dot: "bg-blue-500" },
            { labelKey: "studentsPresent", value: "847", color: "text-emerald-600", dot: "bg-emerald-500" },
            { labelKey: "attendanceRate", value: "94.2%", color: "text-indigo-600", dot: "bg-indigo-500" },
          ].map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="rounded-xl bg-slate-50 border border-slate-200 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${stat.dot} pulse-glow`} />
                <span className="text-xs text-slate-400">{t(stat.labelKey as "activeSessions" | "studentsPresent" | "attendanceRate")}</span>
              </div>
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            </motion.div>
          ))}

          {/* Live session list */}
          <div className="col-span-2 rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wide">{t("liveSessions")}</p>
            <div className="space-y-2">
              {[
                { room: "Hall A — CS301", lecturer: "Dr. Rahman", count: 112 },
                { room: "Lab 3 — EE205", lecturer: "Prof. Ali", count: 38 },
                { room: "Auditorium — MBA101", lecturer: "Dr. Noor", count: 210 },
              ].map((session) => (
                <div
                  key={session.room}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200 last:border-0"
                >
                  <span className="text-slate-700 font-medium">{session.room}</span>
                  <span className="text-slate-400">{session.lecturer}</span>
                  <span className="text-emerald-600 font-mono">{session.count} present</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance bar */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3">{t("todaysTrend")}</p>
            <div className="flex items-end gap-1 h-12">
              {[40, 65, 80, 72, 88, 94, 90, 97].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.4 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                  style={{ height: `${h}%`, originY: 1 }}
                  className={`flex-1 rounded-sm ${i === 7 ? "bg-blue-500" : "bg-slate-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const t = useTranslations("hero")

  const trustItems = [
    { icon: Wifi, key: "ble" as const },
    { icon: QrCode, key: "dual" as const },
    { icon: ShieldCheck, key: "fraud" as const },
    { icon: BarChart3, key: "analytics" as const },
  ]

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 pulse-glow" />
          <span className="text-sm text-blue-600 font-medium">{t("badge")}</span>
        </motion.div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
          style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={textRevealVariants} initial="hidden" animate="visible" custom={0}>
              {t("headlineLine1")}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent"
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {t("headlineLine2")}
            </motion.span>
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 text-base font-medium shadow-lg shadow-blue-600/40 transition-all duration-200"
            asChild
          >
            <a href="#request-demo">
              {t("ctaPrimary")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base font-medium border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400 bg-transparent"
            asChild
          >
            <a href="#how-it-works">
              {t("ctaSecondary")}
              <ChevronDown className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-4"
        >
          {trustItems.map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-2 text-sm text-slate-500">
              <Icon className="w-4 h-4 text-blue-500" />
              <span>{t(`trust.${key}`)}</span>
            </div>
          ))}
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
