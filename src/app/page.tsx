import Header from "../../pages/Header";
import { Achievements } from "../../pages/Achievements";
import Services from "../../pages/Services";
import WorkDone from "../../pages/WorkDone";
import AreYouReady from "../../pages/AreYouReady";
import OurTeam from "../../pages/OurTeam";
import TestimonialSlider from "../../pages/TestimonialSlider";
import Footer from "../../pages/Footer";


export default function Home() {
  return (
    <>
      <Header />
      <div className="flex min-h-[80vh] items-center justify-center bg-[#2547a0]">
        <div className="w-[80%] h-[60vh] mt-10">
          <Achievements />
        </div>
      </div>
      <Services />
      <WorkDone />
      <AreYouReady />
      <OurTeam />
      <TestimonialSlider />
      <Footer />
    </>
  );
}
