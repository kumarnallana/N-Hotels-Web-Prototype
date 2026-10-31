import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ADDRESS_LINE, HOTEL, tariffSummary } from "@/lib/hotel";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { StayProvider } from "@/components/providers/StayProvider";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-stack",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vvsgrand.com"),
  title: {
    default: `${HOTEL.name} — ${HOTEL.tagline}, ${HOTEL.locality}, ${HOTEL.town}`,
    template: `%s · ${HOTEL.name}`,
  },
  description: `${HOTEL.name}, ${ADDRESS_LINE}. ${tariffSummary} on a 24-hour check-in cycle, 250 m from Sri Pada Sri Vallabha Temple.`,
  applicationName: HOTEL.name,
  openGraph: {
    title: HOTEL.name,
    description: `${HOTEL.tagline} at ${HOTEL.building}, ${HOTEL.locality}, ${HOTEL.town}. 24-hour check-in cycle, ${tariffSummary}.`,
    type: "website",
    images: [
      {
        url: "/media/room-king-01.jpg",
        width: 1600,
        height: 1066,
        alt: `${HOTEL.name} — Deluxe king bedroom`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOTEL.name,
    description: `${HOTEL.tagline}, ${HOTEL.town}`,
  },
  icons: { icon: "/media/brand-mark.png" },
};

/**
 * The page opens on ivory, so the browser chrome is ivory too — a dark address
 * bar over a light header reads as a broken theme on every Android device this
 * audience uses.
 */
export const viewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <ToastProvider>
          <StayProvider>
            <a
              href="#main"
              className="tap sr-only rounded-pill bg-night px-4 text-micro font-bold uppercase tracking-[0.1em] text-on-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200"
            >
              Skip to content
            </a>
            {children}
          </StayProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
