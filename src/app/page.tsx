import Header from "../../pages/Header";
import Achievements from "../../pages/Achievements";
import Services from "../../pages/Services";
import WorkDone from "../../pages/WorkDone";
import AreYouReady from "../../pages/AreYouReady";
import OurTeam from "../../pages/OurTeam";
import TestimonialSlider from "../../pages/TestimonialSlider";
import Footer from "../../pages/Footer";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script id="hotjar-tracking" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6444988,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
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
