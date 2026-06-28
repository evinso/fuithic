import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import Categories from "@/app/components/sections/Categories";
import WeeklyArtwork from "@/app/components/sections/WeeklyArtwork";
import LiveChallenge from "@/app/components/sections/LiveChallenge";
import HowItWorks from "@/app/components/sections/HowItWorks";
import RecentArtworks from "@/app/components/sections/RecentArtworks";
import ArtistStories from "@/app/components/sections/ArtistStories";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <WeeklyArtwork />
      <LiveChallenge />
      <HowItWorks />
      <RecentArtworks />
      <ArtistStories />
      <Footer />
    </main>
  );
}
