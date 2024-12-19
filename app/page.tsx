import { FeaturesSection } from "@/components/HomePage/Features";
import Footer from "@/components/HomePage/Footer";
import Header from "@/components/HomePage/Header";
import Hero from "@/components/HomePage/Hero";
import MarqueeComponent from "@/components/HomePage/MarqueeComponent";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <MarqueeComponent />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
