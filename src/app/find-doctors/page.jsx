"use client";

import AllDoctorsCard from "@/components/AllDoctorsCard";
import React, { useEffect, useState } from "react";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctor-posts")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
          Loading Doctors...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-[#030712] py-16 px-5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Find Your Doctor
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
            Search experienced specialists, explore schedules and choose the
            right doctor for your healthcare needs.
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-600 dark:text-gray-300">
              No Doctor Found
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc, index) => (
              <AllDoctorsCard key={doc._id || index} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindDoctors;
