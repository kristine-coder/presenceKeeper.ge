"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Network,
  FileDown,
  ArrowRight,
} from "lucide-react"
import { useTranslations } from "next-intl"

const featureData = [
  {
    key: "dashboard" as const,
    icon: LayoutDashboard,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "hover:shadow-blue-500/10",
    gradient: "from-blue-600/10 to-transparent",
    tagKeys: ["tag0", "tag1", "tag2"] as const,
  },
  {
    key: "analytics" as const,
    icon: BarChart3,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "hover:shadow-indigo-500/10",
    gradient: "from-indigo-600/10 to-transparent",
    tagKeys: ["tag0", "tag1", "tag2"] as const,
  },
  {
    key: "lecturer" as const,
    icon: BookOpen,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "hover:shadow-violet-500/10",
    gradient: "from-violet-600/10 to-transparent",
    tagKeys: ["tag0", "tag1", "tag2"] as const,
  },
  {
    key: "admin" as const,
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "hover:shadow-emerald-500/10",
    gradient: "from-emerald-600/10 to-transparent",
    tagKeys: ["tag0", "tag1", "tag2"] as const,
  },
  {
    key: "integration" as const,
    icon: Network,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "hover:shadow-cyan-500/10",
    gradient: "from-cyan-600/10 to-transparent",
    tagKeys: ["tag0", "tag1", "tag2"] as const,
  },
  {
    key: "export" as const,
    icon: FileDown,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "hover:shadow-amber-500/10",
    gradient: "from-amber-600/10 to-transparent",
    tagKeys: ["tag0", "tag1", "tag2"] as const,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

export function Features() {
  const t = useTranslations("features")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="features" className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />

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

        {/* Real-world classroom photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full rounded-2xl overflow-hidden mb-14 shadow-xl shadow-black/10 border border-slate-200"
          style={{ aspectRatio: "16/7" }}
        >
          <Image
            src="/classroom.png"
            alt="Students scanning a QR code for attendance in a lecture hall"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-7 py-5 flex items-end justify-between">
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Attendance in seconds, not minutes</p>
              <p className="text-slate-300 text-xs mt-0.5">Students check in via QR code or BLE — no paper, no friction</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-medium">Live session</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.key}
              variants={itemVariants}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative rounded-2xl border ${feature.border} bg-white p-6 cursor-default transition-transform duration-300 hover:scale-[1.02] shadow-sm ${feature.glow} hover:shadow-lg overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className={`relative p-3 rounded-xl ${feature.bg} w-fit mb-5`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} strokeWidth={1.5} />
              </div>

              <h3 className="relative text-base font-semibold text-slate-900 mb-2 leading-snug">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="relative text-sm text-slate-500 leading-relaxed mb-5">
                {t(`${feature.key}.description`)}
              </p>

              <div className="relative flex flex-wrap gap-2">
                {feature.tagKeys.map((tk) => (
                  <span
                    key={tk}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${feature.bg} ${feature.color} border ${feature.border}`}
                  >
                    {t(`${feature.key}.${tk}`)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA repeater */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-slate-500 text-sm">Ready to see PresenceKeeper at your university?</p>
          <a
            href="#request-demo"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-600/30 transition-all duration-200"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
