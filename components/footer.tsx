"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const footerLinks = {
    [t("sectionProduct")]: [
      { label: t("productProblem"), href: "#problem" },
      { label: t("productHowItWorks"), href: "#how-it-works" },
      { label: t("productFeatures"), href: "#features" },
      { label: t("productWhyDiff"), href: "#why-different" },
      { label: t("productRequestDemo"), href: "#request-demo" },
    ],
    [t("sectionSystem")]: [
      { label: t("sysBle"), href: "#how-it-works" },
      { label: t("sysQr"), href: "#how-it-works" },
      { label: t("sysAdmin"), href: "#features" },
      { label: t("sysAnalytics"), href: "#features" },
      { label: t("sysIntegrations"), href: "#features" },
    ],
    [t("sectionCompany")]: [
      { label: t("compAbout"), href: "#" },
      { label: t("compContact"), href: "#request-demo" },
      { label: t("compPrivacy"), href: "#" },
      { label: t("compTerms"), href: "#" },
    ],
  }

  return (
    <footer ref={ref} className="border-t border-slate-200 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Image src="/icon.png" alt="PresenceKeeper" width={32} height={32} className="rounded-lg" />
              <span className="font-semibold text-slate-100">PresenceKeeper</span>
            </a>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">{t("description")}</p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span className="text-xs text-slate-400">{t("systemStatus")}</span>
            </div>

          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-slate-100 mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#request-demo" className="text-sm text-blue-500 hover:text-blue-400 transition-colors font-medium">
              {t("requestDemo")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
