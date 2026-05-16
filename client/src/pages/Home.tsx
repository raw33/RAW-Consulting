import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WebAppSamples from "@/components/WebAppSamples";
import Industries from "@/components/Industries";
import Results from "@/components/Results";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation onContactClick={scrollToContact} />
      <Hero onContactClick={scrollToContact} />
      <Services />
      <WebAppSamples />
      <Results />
      <Industries />
      <ContactForm />
      <Footer />
    </div>
  );
}
