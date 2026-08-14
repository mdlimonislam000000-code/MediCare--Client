'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar, FaRegCalendarCheck } from 'react-icons/fa';
import { Button } from '@heroui/react';

const MeetOurDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts`)
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <span className="text-primary font-bold uppercase tracking-wider text-xs px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            Professional Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-base-content">
            Meet Our Expert Doctors
          </h2>
          <p className="text-base-content/70 text-base leading-relaxed">
            Get professional medical consultations and personalized care from our verified top specialists.
          </p>
        </motion.div>

        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc, index) => {
              const displayRating = doc.rating || "5.0";

              return (
                <motion.div
                  key={doc._id || doc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-base-200/50 rounded-3xl border border-base-300 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-72 overflow-hidden bg-base-300">
                    <img 
                      src={doc.imageUrl } 
                      alt={doc.doctorName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <FaStar /> {displayRating} 
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-base-content">
                        {doc.doctorName}
                      </h3>
                      <p className="text-sm font-semibold text-primary">
                        {doc.specialty}
                      </p>
                      <p className="text-xs text-base-content/60 line-clamp-2">
                        {doc.content}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-base-300 flex items-center justify-between">
                      <span className="text-xs font-medium text-base-content/70">
                        {doc.experience || "Experience available"}
                      </span>
                      <Link href={`/doctor/${doc._id}`}>
                        <Button 
                          size="sm" 
                          className="bg-primary text-primary-foreground font-semibold rounded-full px-5 hover:bg-primary/90 transition-colors"
                        >
                          <FaRegCalendarCheck className="mr-1.5" /> Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-base-content/50 font-medium">
            No doctors found at the moment.
          </div>
        )}

      </div>
    </section>
  );
};

export default MeetOurDoctors;