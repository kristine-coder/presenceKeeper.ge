"use client"

import { motion } from "framer-motion"
import { ClipboardX, QrCode, Clock, BarChart2 } from "lucide-react"
import { useTranslations } from "next-intl"

const viewport = { once: true, margin: "-60px", amount: 0.1 }

const problems = [
  {
    key: "manual" as const,
    icon: ClipboardX,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    glow: "group-hover:shadow-red-500/10",
    gradient: "from-red-600/10 to-transparent",
  },
  {
    key: "qr" as const,
    icon: QrCode,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "group-hover:shadow-orange-500/10",
    gradient: "from-orange-600/10 to-transparent",
  },
  {
    key: "visibility" as const,
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    glow: "group-hover:shadow-yellow-500/10",
    gradient: "from-yellow-600/10 to-transparent",
  },
  {
    key: "analytics" as const,
    icon: BarChart2,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
    glow: "group-hover:shadow-zinc-500/10",
    gradient: "from-zinc-600/10 to-transparent",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export function ProblemSection() {
  const t = useTranslations("problem")

  return (
    <section id="problem" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 mb-5">
            <span className="text-xs text-red-600 font-medium uppercase tracking-wider">{t("badge")}</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
          >
            {t("heading")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.key}
              variants={itemVariants}
              className={`group relative p-6 rounded-2xl bg-white border ${problem.border} hover:scale-[1.02] transition-transform duration-300 shadow-sm ${problem.glow} hover:shadow-lg cursor-default overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              <div className={`relative p-3 rounded-xl ${problem.bg} w-fit mb-5`}>
                <problem.icon className={`w-5 h-5 ${problem.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="relative text-base font-semibold text-slate-900 mb-3 leading-snug">
                {t(`${problem.key}.title`)}
              </h3>
              <p className="relative text-sm text-slate-500 leading-relaxed">
                {t(`${problem.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 text-sm">
            {t("teaser")}{" "}
            <a href="#how-it-works" className="text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors">
              {t("teaserLink")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
