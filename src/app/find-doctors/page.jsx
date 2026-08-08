"use client";

import AllDoctorsCard from "@/components/AllDoctorsCard";
import React, { useEffect, useState } from "react";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [sortBy, setSortBy] = useState("");

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


  const filteredDoctors = doctors.filter((doc) => {
    const matchesName = doc.doctorName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || doc.specialty?.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesName && matchesSpecialty;
  });


  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "fee-low") {
      return (Number(a.consultationFee) ) - (Number(b.consultationFee) );
    } else if (sortBy === "fee-high") {
      return (Number(b.consultationFee) ) - (Number(a.consultationFee) );
    } else if (sortBy === "experience") {
      const expA = parseInt(a.experience) ;
      const expB = parseInt(b.experience) ;
      return expB - expA;
    } else if (sortBy === "rating") {
      const ratingA = Number(a.rating) ;
      const ratingB = Number(b.rating) ;
      return ratingB - ratingA;
    }
    return 0;
  });

  const specialties = [...new Set(doctors.map((doc) => doc.specialty).filter(Boolean))];

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
      <div className="max-w-7xl mx-auto space-y-10">
        

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Find Your Doctor
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-gray-400">
            Search experienced specialists, explore schedules and choose the right doctor for your healthcare needs.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-1/3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by doctor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-gray-800 border-none text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all"
            />
          </div>

          <div className="w-full md:w-1/3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-gray-800 border-none text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all cursor-pointer"
            >
              <option value="">All Specializations</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3 flex items-center gap-2">
            <span className="text-slate-400 text-sm hidden lg:block"><FaSortAmountDown /></span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-gray-800 border-none text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all cursor-pointer"
            >
              <option value="">Sort By (Default)</option>
              <option value="rating">Highest Rating</option>
              <option value="experience">Experience (High to Low)</option>
              <option value="fee-low">Consultation Fee (Low to High)</option>
              <option value="fee-high">Consultation Fee (High to Low)</option>
            </select>
          </div>

        </div>

        {sortedDoctors.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-600 dark:text-gray-300">
              No Doctor Found Matching Your Criteria
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDoctors.map((doc, index) => (
              <AllDoctorsCard key={doc._id || index} doc={doc} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FindDoctors;