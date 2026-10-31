import { PromiseBar } from "@/components/sections/PromiseBar";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { BookingPanel } from "@/components/sections/BookingPanel";
import { Rooms } from "@/components/sections/Rooms";
import { Amenities } from "@/components/sections/Amenities";
import { Nearby } from "@/components/sections/Nearby";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Enquiry } from "@/components/sections/Enquiry";
import { LocationSection } from "@/components/sections/LocationSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MobileCallBar } from "@/components/sections/MobileCallBar";

/**
 * Section order follows one decision path: what the room is → what it costs →
 * what is in it → where it is → proof by photographs → then the ask. Reviews sit
 * after the gallery because they are placeholders and must not lead.
 */
export default function HomePage() {
  return (
    <>
      <PromiseBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <BookingPanel />
        <Rooms />
        <Amenities />
        <Nearby />
        <Gallery />
        <Reviews />
        <Enquiry />
        <LocationSection />
      </main>
      <SiteFooter />
      <MobileCallBar />
    </>
  );
}
