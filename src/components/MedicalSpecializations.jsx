'use client'
import React from "react";
import { 
  FaHeartbeat, 
  FaBrain, 
  FaBone, 
  FaChild, 
  FaHandHoldingMedical 
} from "react-icons/fa";
import { motion } from "framer-motion";

const MedicalSpecializations = () => {
  const specializations = [
    {
      id: 1,
      title: "Cardiology",
      description: "Expert heart care, ECG, and cardiovascular disease management.",
      icon: <FaHeartbeat className="text-4xl text-indigo-500" />,
    },
    {
      id: 2,
      title: "Neurology",
      description: "Advanced diagnosis and treatment for brain and nervous system.",
      icon: <FaBrain className="text-4xl text-purple-500" />,
    },
    {
      id: 3,
      title: "Orthopedics",
      description: "Specialized care for bones, joints, ligaments, and muscles.",
      icon: <FaBone className="text-4xl text-blue-500" />,
    },
    {
      id: 4,
      title: "Pediatrics",
      description: "Comprehensive health and medical care for infants and children.",
      icon: <FaChild className="text-4xl text-emerald-500" />,
    },
    {
      id: 5,
      title: "Dermatology",
      description: "Skin, hair, and nail treatments by expert dermatologists.",
      icon: <FaHandHoldingMedical className="text-4xl text-rose-500" />,
    }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-3xl font-extrabold text-base-content tracking-tight">
          Medical Specializations
        </h2>
        <p className="text-base-content/60 text-sm mt-2">
          Explore our wide range of medical specialties and connect with experienced healthcare professionals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {specializations.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="card bg-base-100 border border-base-300 p-6 text-center shadow-md hover:shadow-xl hover:border-primary flex flex-col items-center justify-between cursor-pointer group transition-colors duration-300"
          >
            <div className="p-4 bg-base-200 group-hover:bg-primary/10 rounded-2xl mb-4 inline-flex items-center justify-center transition-colors duration-300">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg text-base-content mb-1 group-hover:text-primary transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-xs text-base-content/60 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MedicalSpecializations;