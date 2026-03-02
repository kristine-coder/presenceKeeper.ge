import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/logo-marquee"
import { HowItWorks } from "@/components/bento-grid"
import { WhyDifferent } from "@/components/why-different"
import { Features } from "@/components/features"
import { WhyUniversities } from "@/components/final-cta"
import { RequestDemo } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <WhyDifferent />
        <Features />
        <WhyUniversities />
        <RequestDemo />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
