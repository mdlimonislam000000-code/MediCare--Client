"use client";
import React, { useEffect, useState } from "react";

const ApproveDoctorPage = () => {
      const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts`);
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch approved doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedDoctors();
  }, []);

  if (loading) {
    return <div className="text-center p-6 text-xs text-gray-500">Loading approved doctors...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-md font-bold text-gray-900 dark:text-white">
        Approved Doctors List ({doctors.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white dark:bg-[#080c16] p-4 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={doc.imageUrl || "https://i.ibb.co/2YW62cVR/Whats-App-Image-2026-05-04-at-12-57-13.jpg"}
                  alt={doc.doctorName}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white">
                    {doc.doctorName}
                  </h3>
                  <p className="text-[11px] text-pink-500 capitalize">
                    {doc.specialty}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-gray-500 dark:text-slate-400 space-y-1">
                <p><span className="font-semibold">Hospital:</span> {doc.hospitalName}</p>
                <p><span className="font-semibold">Fee:</span> ${doc.consultationFee}</p>
                <p><span className="font-semibold">Chamber:</span> {doc.chamberAddress}</p>
              </div>

              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 capitalize">
                {doc.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500">No approved doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default ApproveDoctorPage;