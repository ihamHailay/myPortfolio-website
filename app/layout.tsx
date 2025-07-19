import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

// Enhanced font configuration for better readability and aesthetics
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
})

export const metadata: Metadata = {
  title: "Mahder Hailay - Software Engineer & IT Specialist",
  description:
    "Building scalable web services & automations. Full-stack developer with 1+ years experience in React, Node.js, Python, and cloud technologies.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Python",
    "Web Development",
    "IT Specialist",
  ],
  authors: [{ name: "Mahder Hailay" }],
  creator: "Mahder Hailay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahderhailay.dev",
    title: "Mahder Hailay - Software Engineer & IT Specialist",
    description: "Building scalable web services & automations. Full-stack developer with 5+ years experience.",
    siteName: "Mahder Hailay Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahder Hailay - Software Engineer & IT Specialist",
    description: "Building scalable web services & automations. Full-stack developer with 5+ years experience.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Analytics />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
