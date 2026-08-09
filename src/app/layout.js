"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>

        {!isDashboard && <Navbar />}

        {children}

        {!isDashboard && <Footer />}
        <Toaster></Toaster>
      </body>
    </html>
  );
}