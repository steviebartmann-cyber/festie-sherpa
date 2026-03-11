import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Festie Sherpa — Your Festival Guide',
    template: '%s | Festie Sherpa',
  },
  description: 'The world\'s premier music festival resource. Curated guides, insider tips, Sherpa Scores, and premium festival services.',
  keywords: ['music festival', 'festival guide', 'Jazz Fest', 'Summerfest', 'festival travel'],
  openGraph: {
    siteName: 'Festie Sherpa',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grain min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
