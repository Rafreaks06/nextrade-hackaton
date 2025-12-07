import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ValueProposition from "@/components/value/ValueProposition";
import Features from "@/components/features/Features";
import ToolsShowcase from "@/components/showcase/ToolsShowcase";
import FAQ from "@/components/faq/FAQ";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="bg-black relative">
      <Navbar />
      <Hero />
      <ValueProposition />
      <Features />
      <ToolsShowcase />
      <FAQ />
      <Footer />
    </main>
  );
}
