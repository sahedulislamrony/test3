import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { DemoSection } from '@/components/landing/demo-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { GettingStartedSection } from '@/components/landing/getting-started-section';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <GettingStartedSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}