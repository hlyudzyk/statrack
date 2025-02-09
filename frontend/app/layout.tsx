import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginModal from "@/app/components/modals/LoginModal";
import Navbar from "@/app/components/navbar/Navbar";
import CreateNewUserModal from "@/app/components/modals/CreateNewUserModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Statrack",
  description: "Track your activity",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div>
        <Navbar/>
        <div className="pt-32 mx-10">
          {children}
        </div>

        <LoginModal/>
        <CreateNewUserModal/>
      </div>

      </body>
      </html>
  );
}
