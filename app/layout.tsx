import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { UserContextProvider } from "@/contexts/UserContext";
import AuthenticatedMovieProvider from "@/contexts/MovieContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ToasterComponent from "@/components/Toaster/ToasterComponent";

const myFont = localFont({ src: "./leaguespartan.woff2" });

export const metadata: Metadata = {
  title: "Picky",
  description: "Moviehub project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://res.cloudinary.com/du94mex28/image/upload/v1699005189/Picky/icon_l7vpl9.png"
        sizes="any"
      />
      <UserProvider>
        <UserContextProvider>
          <ThemeProvider>
            <AuthenticatedMovieProvider>
              <LanguageProvider>
                <body className={myFont.className}>
                  <ToasterComponent />
                  {children}
                </body>
              </LanguageProvider>
            </AuthenticatedMovieProvider>
          </ThemeProvider>
        </UserContextProvider>
      </UserProvider>
    </html>
  );
}
