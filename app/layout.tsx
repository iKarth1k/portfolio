import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Fira_Code, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "AI Engineer specializing in Large Language Models, RAG systems, and designing production-ready AI platforms.",
  keywords: ["AI Engineer", "Machine Learning", "Python", "LLMs", "RAG", "PyTorch", "FastAPI", "LangChain", "Qdrant", "NLP"],
  authors: [{ name: "Karthik" }],
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-void text-mist overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
