import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Cases from "@/components/Cases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#f8f8f8]">
      <Header />
      <Hero />
      <Cases />
      <Contact />
      <Footer />
    </div>
  );
}
