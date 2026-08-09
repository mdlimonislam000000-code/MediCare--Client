'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUserMd, FaHeartbeat, FaRegCalendarCheck, FaStar } from 'react-icons/fa';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Button } from '@heroui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Banner = () => {
  const [doctorSlides, setDoctorSlides] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('http://localhost:5000/api/doctor-posts')
      .then(res => res.json())
      .then(data => {
        const formattedDoctors = data.map(doc => ({
          id: doc._id || doc.id,
          name: doc.doctorName,
          specialty: doc.specialty || doc.specialization,
          rating: doc.rating || "4.9",
          image: doc.imageUrl || doc.profileImage || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
          experience: doc.experience || "10+ Years Exp"
        }));
        setDoctorSlides(formattedDoctors);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching doctors for banner:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative bg-base-100 pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
           

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/25">
              <FaHeartbeat className="animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">Your Health, Our Priority</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-base-content">
              Modern Healthcare <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                At Your Fingertips
              </span>
            </h1>
            
            <p className="text-lg text-base-content/70 max-w-xl leading-relaxed">
              Connect with top certified doctors, book appointments seamlessly, and manage your health records in one secure platform. Experience healthcare made simple.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/find-doctors">
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 rounded-full h-14 shadow-lg shadow-primary/30 border-none transition-all duration-300"
                >
                  Book Appointment
                  <HiOutlineArrowRight className="ml-2 text-lg" />
                </Button>
              </Link>
            </div>
            

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-base-300 mt-8">
              <div>
                <h3 className="text-3xl font-black text-base-content">100+</h3>
                <p className="text-sm text-base-content/60 font-medium">Specialists</p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-base-content">24/7</h3>
                <p className="text-sm text-base-content/60 font-medium">Emergency Care</p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-base-content">50k+</h3>
                <p className="text-sm text-base-content/60 font-medium">Happy Patients</p>
              </div>
            </div>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block lg:ml-auto w-full max-w-md"
          >
            <div className="relative w-full aspect-square rounded-[3rem] bg-gradient-to-tr from-base-200 to-base-300 shadow-2xl border border-base-300 overflow-hidden">
              
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="loading loading-spinner text-primary loading-lg"></span>
                </div>
              ) : doctorSlides.length > 0 ? (
                <Swiper
                  modules={[Autoplay, EffectFade, Pagination]}
                  effect={'fade'}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop={true}
                  className="w-full h-full"
                >
                  {doctorSlides.map((doc) => (
                    <SwiperSlide key={doc.id} className="relative w-full h-full">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xl font-bold">{doc.name}</h4>
                            <p className="text-sm text-white/80">{doc.specialty} • {doc.experience}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-500/90 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                            <FaStar /> {doc.rating}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-base-content/50">
                  No Doctors Found
                </div>
              )}

            </div>

            <div className="absolute -left-12 top-20 bg-base-100 p-4 rounded-2xl shadow-xl shadow-base-content/5 border border-base-200 flex items-center gap-4 animate-bounce z-10" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                <FaRegCalendarCheck />
              </div>
              <div>
                <p className="text-sm font-bold text-base-content">Easy Booking</p>
                <p className="text-xs text-base-content/60">Available Today</p>
              </div>
            </div>

            <div className="absolute -right-8 bottom-24 bg-base-100 p-4 rounded-2xl shadow-xl shadow-base-content/5 border border-base-200 flex items-center gap-4 animate-bounce z-10" style={{ animationDuration: '4s' }}>
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl">
                <FaUserMd />
              </div>
              <div>
                <p className="text-sm font-bold text-base-content">Verified Doctors</p>
                <p className="text-xs text-base-content/60">Top Specialists</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;