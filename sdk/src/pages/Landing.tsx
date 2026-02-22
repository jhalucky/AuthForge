import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}