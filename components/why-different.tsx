"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { X, Check } from "lucide-react"
import { useTranslations } from "next-intl"

type Status = "yes" | "no" | "partial"

const featureKeys = ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"] as const

const columnData: {
  key: "traditional" | "qr" | "amas"
  highlight: boolean
  headerColor: string
  borderColor: string
  bgColor: string
  values: Status[]
}[] = [
  {
    key: "traditional",
    highlight: false,
    headerColor: "text-slate-700",
    borderColor: "border-slate-200",
    bgColor: "bg-white",
    values: ["no", "no", "no", "no", "no", "no", "no", "partial", "no", "partial", "no"],
  },
  {
    key: "qr",
    highlight: false,
    headerColor: "text-slate-700",
    borderColor: "border-slate-200",
    bgColor: "bg-white",
    values: ["no", "no", "partial", "partial", "partial", "no", "yes", "partial", "partial", "partial", "no"],
  },
  {
    key: "amas",
    highlight: true,
    headerColor: "text-blue-600",
    borderColor: "border-blue-300",
    bgColor: "bg-blue-50",
    values: ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"],
  },
]

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes")
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15">
        <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
      </span>
    )
  if (status === "no")
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10">
        <X className="w-3.5 h-3.5 text-red-400" strokeWidth={2.5} />
      </span>
    )
  return (
    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/10">
      <span className="text-yellow-400 text-xs font-bold leading-none">~</span>
    </span>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function WhyDifferent() {
  const t = useTranslations("whyDifferent")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="why-different" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-6xl mx-auto">
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

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15">
              <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
            </span>
            {t("legendFull")}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-500/10">
              <span className="text-yellow-400 text-xs font-bold">~</span>
            </span>
            {t("legendPartial")}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10">
              <X className="w-3 h-3 text-red-400" strokeWidth={2.5} />
            </span>
            {t("legendNone")}
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {columnData.map((col) => (
            <motion.div
              key={col.key}
              variants={itemVariants}
              className={`relative rounded-2xl border ${col.borderColor} ${col.bgColor} overflow-hidden${
                col.highlight
                  ? " md:-my-8 shadow-2xl shadow-blue-300/50 z-10"
                  : " shadow-sm"
              }`}
            >
              {col.highlight && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/8 to-transparent pointer-events-none" />
              )}

              <div className={`px-6 border-b ${col.borderColor}${col.highlight ? " pt-10 pb-7" : " pt-6 pb-5"}`}>
                <h3 className={`font-bold ${col.headerColor} mb-1${col.highlight ? " text-2xl" : " text-base"}`}>
                  {t(`${col.key}Label`)}
                </h3>
                <p className="text-xs text-slate-400">{t(`${col.key}Sub`)}</p>
              </div>

              <div className={`px-6 space-y-3.5${col.highlight ? " py-6" : " py-4"}`}>
                {featureKeys.map((fk, i) => (
                  <div key={fk} className="flex items-center justify-between gap-3">
                    <span className={`text-sm ${col.highlight ? "text-slate-700" : "text-slate-500"}`}>
                      {t(fk)}
                    </span>
                    <StatusIcon status={col.values[i]} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
