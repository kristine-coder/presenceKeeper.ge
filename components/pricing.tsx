"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, CheckCircle2, AlertCircle, Building2, User, Mail, Users, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"

type FormState = "idle" | "submitting" | "success" | "error"

export function RequestDemo() {
  const t = useTranslations("requestDemo")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formState, setFormState] = useState<FormState>("idle")
  const [formData, setFormData] = useState({
    universityName: "",
    contactPerson: "",
    email: "",
    studentCount: "",
    message: "",
  })

  const studentRanges = [
    t("range0"), t("range1"), t("range2"),
    t("range3"), t("range4"), t("range5"),
  ]

  const infoSteps = [
    t("infoStep0"), t("infoStep2"),
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    try {
      let res: Response
      if (formspreeEndpoint) {
        // Formspree for static hosting (GitHub Pages, etc.)
        res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        // API route (works on Vercel, etc.)
        res = await fetch("/api/request-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }
      if (res.ok) {
        setFormState("success")
      } else {
        setFormState("error")
      }
    } catch {
      setFormState("error")
    }
  }

  return (
    <section id="request-demo" className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">{t("description")}</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Left info panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-slate-900 font-semibold mb-3">{t("infoPanelHeading")}</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                {infoSteps.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">{i + 1}</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-slate-900 font-semibold mb-2 text-sm">{t("pricingNote")}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t("pricingText")}</p>
            </div>

          </div>

          {/* Form panel */}
          <div className="lg:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-slate-50 p-8">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{t("successHeading")}</h3>
                <p className="text-slate-500 text-sm max-w-xs">{t("successDescription")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-slate-500 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      {t("uniName")}
                    </label>
                    <Input
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                      placeholder={t("uniPlaceholder")}
                      required
                      className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-slate-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {t("contactPerson")}
                    </label>
                    <Input
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder={t("contactPlaceholder")}
                      required
                      className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {t("emailLabel")}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    required
                    className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {t("studentCount")}
                  </label>
                  <select
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl h-11 px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none"
                  >
                    <option value="" className="text-slate-400 bg-white">
                      {t("studentPlaceholder")}
                    </option>
                    {studentRanges.map((range) => (
                      <option key={range} value={range} className="bg-white">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-slate-500 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {t("messageLabel")}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none"
                  />
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {t("errorMsg")}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={formState === "submitting"}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 text-base font-medium shadow-lg shadow-blue-600/30 transition-all duration-200 disabled:opacity-60"
                >
                  {formState === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("submitting")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t("submit")}
                    </span>
                  )}
                </Button>

                <p className="text-xs text-slate-400 text-center">{t("noCommitment")}</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
