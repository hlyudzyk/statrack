import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import CreateNewUserModal from "@/app/components/modals/CreateNewUserModal";
import FooterComponent from "@/app/components/navbar/FooterComponent";
import {UserProvider} from "@/app/lib/context/UserContext";
import {getCurrentUser} from "@/app/lib/userActions";

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
  description: "Інформаційна дошка",
};

export default async function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser();

  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <UserProvider initialUser={user}>
        <div className="flex flex-col min-h-screen">
          <Navbar/>

          {/* Main content area that grows */}
          <div className="flex-1 pt-32 2xl:pt-48 3xl:pt-64 px-4 sm:px-10 flex justify-center">
            <div className="w-full h-full max-w-[3600px] shadow-2xl">
              {children}
            </div>
          </div>

          {/* Modals should go here if positioned fixed */}
          <CreateNewUserModal/>

          {/* Footer must be inside the flex layout */}
          <FooterComponent/>
        </div>
      </UserProvider>
      </body>
      </html>

  );
}
