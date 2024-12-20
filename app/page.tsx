import { FeaturesSection } from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/Header";
import Hero from "@/components/LandingPage/Hero";
import MarqueeComponent from "@/components/LandingPage/MarqueeComponent";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Hero />
      <MarqueeComponent />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
