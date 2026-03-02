"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Scaling, Settings2, TrendingUp, Eye, ShieldOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const reasonData = [
  { key: "scalable" as const, icon: Scaling, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { key: "deployment" as const, icon: Settings2, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { key: "transparency" as const, icon: Eye, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { key: "fraudPrev" as const, icon: ShieldOff, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { key: "cost" as const, icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { key: "infra" as const, icon: Settings2, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function WhyUniversities() {
  const t = useTranslations("whyUniversities")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="why-universities" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 mb-5">
            <span className="text-xs text-indigo-600 font-medium uppercase tracking-wider">{t("badge")}</span>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14"
        >
          {reasonData.map((reason) => (
            <motion.div
              key={reason.key}
              variants={itemVariants}
              className={`group p-6 rounded-2xl bg-white border ${reason.border} hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-lg`}
            >
              <div className={`p-3 rounded-xl ${reason.bg} w-fit mb-5`}>
                <reason.icon className={`w-5 h-5 ${reason.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">{t(`${reason.key}.title`)}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t(`${reason.key}.description`)}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 p-10 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/5 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h3
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "var(--font-cal-sans), sans-serif" }}
            >
              {t("ctaHeading")}
            </h3>
            <p className="text-slate-500 mb-7 max-w-xl mx-auto">{t("ctaDescription")}</p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-12 text-base font-medium shadow-lg shadow-blue-600/40 transition-all duration-200"
              asChild
            >
              <a href="#request-demo">
                {t("ctaButton")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
