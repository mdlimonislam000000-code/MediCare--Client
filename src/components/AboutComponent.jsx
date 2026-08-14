'use client'
import React from 'react';
import { 
  HiOutlineShieldCheck, 
  HiOutlineUserGroup, 
  HiOutlineClock, 
  HiOutlineHeart, 
  HiOutlineCheckCircle 
} from "react-icons/hi";
import { Button } from "@heroui/react";
import Link from "next/link";

const AboutComponent = () => {
  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="badge badge-primary badge-outline font-semibold px-4 py-2">
            About MediCare Connect
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-base-content tracking-tight">
            Dedicated to Your Better Health & Seamless Care
          </h1>
          <p className="text-base-content/70 text-base leading-relaxed">
            MediCare Connect is a modern healthcare management platform designed to bridge the gap between patients, doctors, and hospitals through a centralized, secure online system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="card bg-base-100 shadow-xl border border-base-200 p-8 space-y-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit text-2xl">
              <HiOutlineHeart />
            </div>
            <h3 className="text-2xl font-bold text-base-content">Our Mission</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              To digitize appointment booking, reduce patient waiting times, improve doctor schedule management, and maintain healthcare records securely. We strive to provide a seamless, stress-free healthcare experience for everyone.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-200 p-8 space-y-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit text-2xl">
              <HiOutlineShieldCheck />
            </div>
            <h3 className="text-2xl font-bold text-base-content">Our Vision</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">
              To become the most reliable and efficient healthcare ecosystem platform, empowering hospitals and medical professionals with cutting-edge management tools while ensuring patients receive instant, quality care.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content">Why Choose MediCare Connect?</h2>
            <p className="text-base-content/60 text-sm mt-2">Discover the key features and advantages that set our platform apart.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="card bg-base-100 shadow-md border border-base-200 p-6 space-y-3">
              <div className="text-primary text-3xl">
                <HiOutlineCheckCircle />
              </div>
              <h4 className="text-lg font-bold text-base-content">Digitized Appointments</h4>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Say goodbye to long waiting times and manual paperwork. Book appointments with top specialists instantly.
              </p>
            </div>

            <div className="card bg-base-100 shadow-md border border-base-200 p-6 space-y-3">
              <div className="text-primary text-3xl">
                <HiOutlineUserGroup />
              </div>
              <h4 className="text-lg font-bold text-base-content">Verified Doctors</h4>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Access a diverse network of professional doctors with detailed qualifications, experience, and patient reviews.
              </p>
            </div>

            <div className="card bg-base-100 shadow-md border border-base-200 p-6 space-y-3">
              <div className="text-primary text-3xl">
                <HiOutlineClock />
              </div>
              <h4 className="text-lg font-bold text-base-content">24/7 Support & Care</h4>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Our platform ensures round-the-clock connectivity, emergency hotlines, and secure medical recordkeeping.
              </p>
            </div>

          </div>
        </div>

        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Ready to Experience Better Healthcare?</h2>
          <p className="text-primary-content/90 text-sm max-w-xl mx-auto">
            Find your preferred specialist, book an appointment, and manage your health records all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/find-doctors">
              <Button className="btn bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold px-8 shadow-lg shadow-orange-500/30 border-none transition-all duration-300">
                Find Doctors
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="btn bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold px-8 shadow-lg shadow-teal-500/30 border-none transition-all duration-300">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutComponent;