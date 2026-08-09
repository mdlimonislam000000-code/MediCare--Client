"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>

        {!isDashboard && <Navbar />}

        {children}

        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}