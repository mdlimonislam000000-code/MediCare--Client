'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const PatientReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 bg-base-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <span className="text-primary font-bold uppercase tracking-wider text-xs px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-base-content">
            Patient Success Stories
          </h2>
          <p className="text-base-content/70 text-base leading-relaxed">
            Hear what our patients have to say about their healthcare experiences and consultations with our specialists.
          </p>
        </motion.div>

        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : reviews.length > 0 ? (
          /* Reviews Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.slice(0, 6).map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
              >
                <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                  <FaQuoteLeft size={40} />
                </div>

                <div className="space-y-4 relative z-10">

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < (review.rating || 5) ? "text-amber-500" : "text-base-300"} 
                        size={16}
                      />
                    ))}
                  </div>

                  <p className="text-base-content/80 text-sm leading-relaxed italic">
                    "{review.comment || review.message || "Great experience and very helpful doctor consultation!"}"
                  </p>
                </div>

                <div className="pt-4 border-t border-base-200 flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg">
                    {review.patientName ? review.patientName.charAt(0).toUpperCase() : "P"}
                  </div>
                  <div>
                    <h4 className="font-bold text-base-content text-base">
                      {review.patientName}
                    </h4>
                    <p className="text-xs text-base-content/60">
                      Verified Patient
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-base-content/50 font-medium">
            No patient reviews found at the moment.
          </div>
        )}

      </div>
    </section>
  );
};

export default PatientReviews;