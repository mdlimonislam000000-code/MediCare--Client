'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserMd, FaClock, FaHeadset } from 'react-icons/fa';

const features = [
  {
    id: 1,
    icon: <FaUserMd className="text-3xl text-primary" />,
    title: "Verified & Expert Doctors",
    description: "Connect with certified medical specialists who undergo rigorous background and credential checks."
  },
  {
    id: 2,
    icon: <FaClock className="text-3xl text-secondary" />,
    title: "24/7 Instant Booking",
    description: "Book appointments seamlessly at any time, reducing waiting hours and paperwork hassle."
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-3xl text-emerald-500" />,
    title: "Secure Health Records",
    description: "Your medical history, prescriptions, and payments are protected with advanced security protocols."
  },
  {
    id: 4,
    icon: <FaHeadset className="text-3xl text-amber-500" />,
    title: "Dedicated Support",
    description: "Our support team is always ready to assist you with emergency care queries and system navigation."
  }
];

const WhyChooseUs = () => {
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
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-base-content">
            Why Choose MediCare Connect
          </h2>
          <p className="text-base-content/70 text-base leading-relaxed">
            We bridge the gap between patients and healthcare providers with a reliable, digitized platform built for your convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-base-200/60 border border-base-300 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-base-100 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-base-content">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;