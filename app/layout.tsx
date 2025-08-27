import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
})

export const metadata: Metadata = {
  title: "HAPPY BIRTHDAY CODY 2025",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-mono ${GeistMono.variable} ${pixelFont.variable} crt-effect`}>{children}</body>
    </html>
  )
}
