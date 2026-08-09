'use client'

import React from 'react';
import Link from 'next/link';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineSupport 
} from "react-icons/hi";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10 text-base-content relative pt-16 overflow-hidden border-t border-base-300">
      
      {/* ফুটারের টপ বর্ডারে আকর্ষণীয় শাইনিং / গ্রেডিয়েন্ট অ্যানিমেশন */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-base-300">
          
          {/* ব্র্যান্ড ইনফো ও সোশ্যাল লিংক */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MediCare Connect
              </span>
            </Link>
            <p className="text-xs text-base-content/70 leading-relaxed">
              A modern healthcare management platform connecting patients, doctors, and hospitals through a centralized, secure online system.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="p-2.5 bg-base-100 hover:bg-primary hover:text-primary-content rounded-full shadow-sm transition-all duration-300"
              >
                <FaFacebookF size={14} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter"
                className="p-2.5 bg-base-100 hover:bg-primary hover:text-primary-content rounded-full shadow-sm transition-all duration-300"
              >
                <FaTwitter size={14} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="p-2.5 bg-base-100 hover:bg-primary hover:text-primary-content rounded-full shadow-sm transition-all duration-300"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="p-2.5 bg-base-100 hover:bg-primary hover:text-primary-content rounded-full shadow-sm transition-all duration-300"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* কুইক লিংকস */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content">Quick Links</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="text-base-content/70 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/find-doctors" className="text-base-content/70 hover:text-primary transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link href="/about" className="text-base-content/70 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-base-content/70 hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-base-content/70 hover:text-primary transition-colors">Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* কন্টাক্ট ইনফো */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content">Contact Info</h3>
            <ul className="space-y-3 text-xs text-base-content/70">
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="text-primary text-base shrink-0 mt-0.5" />
                <span>124/A, Green Road, Dhanmondi, Dhaka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="text-primary text-base shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineMail className="text-primary text-base shrink-0" />
                <span>support@medicareconnect.com</span>
              </li>
            </ul>
          </div>

          {/* ইমারজেন্সি কেয়ার */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content">Emergency Care</h3>
            <div className="card bg-error/10 border border-error/20 p-4 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-error">
                <HiOutlineSupport className="text-xl shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">24/7 Hotline</span>
              </div>
              <p className="text-lg font-black text-error">16123 / 999</p>
              <p className="text-[11px] text-base-content/70 leading-relaxed">
                Available round-the-clock for critical support and emergency ambulance service.
              </p>
            </div>
          </div>

        </div>

        {/* কপিরাইট ও পলিসি সেকশন */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-content/60 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} MediCare Connect. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;