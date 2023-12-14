import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HeaderComponent from '@/components/Header/Header'
import FooterComponent from '@/components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Picky',
  description: 'Moviehub project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComponent />
          {children}
        <FooterComponent />
      </body>
    </html>
  )
}
