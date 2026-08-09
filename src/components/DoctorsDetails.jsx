"use client";

import React from "react";
import {
  FaStethoscope,
  FaGraduationCap,
  FaHospital,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import Image from "next/image";
import BookingDoctor from "@/components/BookingDoctor";

const DoctorsDetails = ({ doctorData }) => {
  const doctor = doctorData;
  console.log(doctor , 'doctor')

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">Doctor not found!</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <div className="p-2 md:p-4">
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-start justify-between max-w-4xl border border-indigo-100 dark:border-gray-800 p-6 md:p-8 rounded-3xl shadow-2xl gap-8 bg-white/90 dark:bg-gray-900 backdrop-blur-md">
          
          {/* Left Side: Image & Status */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            {doctor?.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                <Image
                  src={doctor.imageUrl}
                  className="object-cover transform hover:scale-105 transition duration-500"
                  alt="doctor image"
                  width={260}
                  height={260}
                />
              </div>
            )}
            {doctor?.status && (
              <span className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md shadow-emerald-500/20 uppercase tracking-wider">
                ● {doctor.status}
              </span>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-indigo-50/50 dark:bg-gray-800/40 p-4 rounded-2xl border border-indigo-100/50 dark:border-gray-800 w-full">
              <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
                <FaStethoscope className="text-indigo-500 text-lg flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Speciality</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {doctor?.specialty || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
                <FaGraduationCap className="text-cyan-500 text-xl flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Qualifications</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {doctor?.qualifications || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Details & Info */}
          <div className="w-full flex flex-col justify-center space-y-5">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                {doctor?.title || "Doctor"}
              </p>

              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {doctor?.doctorName || "Unnamed Doctor"}
                </h1>
                {doctor?.experience && (
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 rounded-full">
                    ⭐ {doctor.experience} Years Experience
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-xl font-semibold border border-emerald-100 dark:border-emerald-900/30">
                <FaCalendarAlt /> Session: {doctor?.sessionType || "General"}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 rounded-xl font-semibold border border-cyan-100 dark:border-cyan-900/30">
                <FaClock /> Time: {doctor?.startTime || "00:00"} - {doctor?.endTime || "00:00"}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <FaHospital className="text-rose-500 flex-shrink-0" />
                <p>
                  <span className="font-medium text-gray-400 text-xs block">Hospital</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {doctor?.hospitalName || "N/A"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-500 flex-shrink-0" />
                <p>
                  <span className="font-medium text-gray-400 text-xs block">Chamber</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {doctor?.chamberAddress || "N/A"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-4 rounded-2xl border border-indigo-100 dark:border-gray-800 gap-4">
              <div>
                <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1.5">
                  <FaPhoneAlt size={12} /> Contact Me :
                </h3>
                <div className="space-y-0.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <p className="flex items-center gap-1">
                    <FaPhoneAlt size={10} className="text-emerald-500" /> {doctor?.phone || "N/A"}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaEnvelope size={10} className="text-cyan-500" /> {doctor?.email || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-col text-center">
                <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow">
                  {doctor?.category || "Doctor"}
                </span>
                <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow">
                  Visit Fee : {doctor?.consultationFee || 0} taka
                </span>
              </div>
            </div>

            {doctor?.content && (
              <p className="text-sm text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-gray-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-gray-800 italic">
                &quot;{doctor.content}&quot;
              </p>
            )}

            <div className="pt-2">
              <BookingDoctor doctor={doctor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsDetails;