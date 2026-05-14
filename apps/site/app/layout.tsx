import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Text, Dynalight } from "next/font/google";
import "./globals.css";
import { profileData } from "@/lib/data";

const redHatDisplay = Red_Hat_Display({ weight: ["300", "400", "600", "800"], subsets: ["latin"] });
const redHatText = Red_Hat_Text({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });
const dynalight = Dynalight({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profileData.fullName} – Portfolio`,
  keywords: [profileData.fullName, "Portfolio", "Product Designer"],
  authors: [{ name: profileData.fullName, url: profileData.contact.site }],
  creator: profileData.fullName,
  description: `${profileData.role} – ${profileData.summary}`,
  openGraph: {
    title: `${profileData.fullName} – Portfolio`,
    description: `${profileData.role} Portfolio`,
    url: profileData.contact.site,
    siteName: profileData.fullName,
    images: [{ url: `${profileData.contact.site}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className} antialiased`}>{children}</body>
    </html>
  );
}
