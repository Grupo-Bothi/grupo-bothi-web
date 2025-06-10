import Header from "../../pages/Header";
import Achievements  from "../../pages/Achievements";
import Services from "../../pages/Services";
import WorkDone from "../../pages/WorkDone";
import AreYouReady from "../../pages/AreYouReady";
import OurTeam from "../../pages/OurTeam";
import TestimonialSlider from "../../pages/TestimonialSlider";
import Footer from "../../pages/Footer";
import { Toaster } from "@/components/ui/toaster";


export default function Home() {
  return (
    <>
      <Header />
      <div className="flex min-h-[80vh] items-center justify-center bg-[#2547a0]">
        <div className="w-[90%] h-[70vh] mt-25">
          <Achievements />
        </div>
      </div>
      <Services />
      <WorkDone />
      <AreYouReady />
      <OurTeam />
      <TestimonialSlider />
      <Footer />
      <Toaster />
    </>
  );
}
