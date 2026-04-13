import Header from "../../sections/Header";
import Hero from "../../sections/Achievements";
import Services from "../../sections/Services";
import WorkDone from "../../sections/WorkDone";
import AreYouReady from "../../sections/AreYouReady";
import OurTeam from "../../sections/OurTeam";
import Testimonials from "../../sections/TestimonialSlider";
import Footer from "../../sections/Footer";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { getSiteImages } from "@/lib/site-images";
import PullToRefresh from "@/components/PullToRefresh";

// Always SSR so image changes from /admin are reflected immediately
export const dynamic = "force-dynamic";

export default function Home() {
  const images = getSiteImages();

  return (
    <>
      <PullToRefresh />
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
      <Hero images={images.hero} />
      <Services />
      <WorkDone projects={images.projects} />
      <AreYouReady ctaUrl={images.cta.url} />
      <OurTeam team={images.team} />
      <Testimonials />
      <Footer />
      <Toaster />
    </>
  );
}
