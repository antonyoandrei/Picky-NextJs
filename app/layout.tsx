import type { Metadata } from 'next';
import localFont from 'next/font/local'
import './globals.css';
import HeaderComponent from '@/components/Header/Header';
import FooterComponent from '@/components/Footer/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserContextProvider } from '@/contexts/UserContext';
import AuthenticatedMovieProvider from '@/contexts/MovieContext';

const myFont = localFont({ src: './leaguespartan.woff2' })

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
    <html lang="en" >
      <link rel="icon" href="https://res.cloudinary.com/du94mex28/image/upload/v1699005189/Picky/icon_l7vpl9.png" sizes="any" />
        <UserProvider>
          <UserContextProvider>
            <AuthenticatedMovieProvider>
              <body className={myFont.className}>
                <HeaderComponent />
                  {children}
                <FooterComponent />
              </body>
            </AuthenticatedMovieProvider>
          </UserContextProvider>
        </UserProvider>
    </html>
  )
}
