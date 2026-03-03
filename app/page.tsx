import { redirect } from "next/navigation"
import { routing } from "@/i18n/routing"

// Root redirect for static export (middleware doesn't run on GitHub Pages)
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`)
}
