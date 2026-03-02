"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { CalendarPlus, Fingerprint, QrCode, MonitorCheck, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

const steps = [
  {
    key: "s1" as const,
    step: "01",
    icon: CalendarPlus,
    color: "from-blue-600 to-blue-700",
    glow: "shadow-blue-600/20",
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    gradient: "from-blue-600/10 to-transparent",
    fullWidth: false,
  },
  {
    key: "s2" as const,
    step: "02",
    icon: Fingerprint,
    color: "from-indigo-600 to-indigo-700",
    glow: "shadow-indigo-600/20",
    accent: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    gradient: "from-indigo-600/10 to-transparent",
    fullWidth: false,
  },
  {
    key: "s3" as const,
    step: "03",
    icon: QrCode,
    color: "from-violet-600 to-violet-700",
    glow: "shadow-violet-600/20",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    gradient: "from-violet-600/10 to-transparent",
    fullWidth: false,
  },
  {
    key: "s4" as const,
    step: "04",
    icon: MonitorCheck,
    color: "from-emerald-600 to-emerald-700",
    glow: "shadow-emerald-600/20",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    gradient: "from-emerald-600/10 to-transparent",
    fullWidth: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

export function HowItWorks() {
  const t = useTranslations("howItWorks")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 mb-5">
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">{t("badge")}</span>
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
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {steps.map((step) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className={`group relative p-7 rounded-2xl bg-white border ${step.border} hover:scale-[1.015] transition-transform duration-300 shadow-sm ${step.glow} hover:shadow-lg overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <span className="absolute top-4 right-6 text-6xl font-black text-slate-200 select-none leading-none">
                {step.step}
              </span>

              <div className={`relative p-3 rounded-xl ${step.bg} w-fit mb-5`}>
                <step.icon className={`w-5 h-5 ${step.accent}`} strokeWidth={1.5} />
              </div>

              <h3 className="relative text-lg font-semibold text-slate-900 mb-3 pr-12">{t(`${step.key}.title`)}</h3>
              <p className="relative text-sm text-slate-500 leading-relaxed mb-4">{t(`${step.key}.description`)}</p>

              <div className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${step.bg} ${step.accent} border ${step.border}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                {t(`${step.key}.detail`)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connector hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          {steps.map((step, i) => (
            <div key={step.step} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-xs font-bold shadow-lg ${step.glow}`}>
                {step.step}
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-px bg-gradient-to-r from-slate-300 to-slate-200" />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTA repeater */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#request-demo"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/30 transition-all duration-200"
          >
            See It in Action
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
