import Navbar from '@/components/Navbar';
import Landing from '@/components/LandingSection';
import Stats from '@/components/Stats';
import HowToUse from '@/components/HowToUse';
import StartHere from '@/components/StartHere';
import CreatorSection from '@/components/CreatorSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="font-sans mx-4 my-4 p-4">
      <Navbar />
      <Landing />
      <Stats />
      <HowToUse />
      <StartHere />
      <CreatorSection />
      <Footer />
    </main>
  );
}
