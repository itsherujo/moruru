import Footer from "@/components/Footer";
import ComingSoon from "@/components/home/ComingSoon";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Hero />
      <ComingSoon />
      <Footer />
    </main>
  );
}
