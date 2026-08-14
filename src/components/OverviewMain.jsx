"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import { FaArrowRight, FaRegCalendarAlt, FaStethoscope } from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";
import { authClient } from "@/lib/auth-client"; 

const OverviewMain = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const doctorId = user?.id || user?._id;

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/doctor/${doctorId}`);
        const data = await res.json();
        
        setAppointments(data.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-[#080c16] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaRegCalendarAlt className="text-pink-500" /> Today's Schedule Queue
            </h2>
            <Link
              href="/dashboard/doctor/manage-schedueles"
              className="text-xs font-semibold text-pink-500 hover:underline flex items-center gap-1"
            >
              Manage <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          <div className="space-y-3">
            {isPending || loading ? (
              <p className="text-xs text-gray-500">Loading schedule...</p>
            ) : appointments.length > 0 ? (
              appointments.map((item, index) => (
                <div
                  key={item._id || index}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold text-xs">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-gray-900 dark:text-white">
                        {item.name || item.patientName || "Patient Name"}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">
                        {item.message || item.disease || "General Consultation"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                      {item.appointmentDate || "10:30 AM"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No pending appointments found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-[#080c16] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FaStethoscope className="text-pink-500" /> Quick Actions
          </h2>

          <div className="space-y-2">
            <Link
              href="/dashboard/doctor/appointments-inbox"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white transition"
            >
              <span className="flex items-center gap-2">
                <MdForwardToInbox className="text-pink-500 text-sm" /> Appointments Inbox
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-pink-500 text-white">
                3 New
              </span>
            </Link>

            <Link
              href="/dashboard/doctor/manage-schedueles"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white transition"
            >
              <span className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-blue-500 text-sm" /> Manage Schedules
              </span>
              <FaArrowRight className="text-[10px] text-gray-400" />
            </Link>

            <Link
              href="/dashboard/doctor/doctor-post"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white transition"
            >
              <span className="flex items-center gap-2">
                <BsPostcard className="text-purple-500 text-sm" /> Doctor Post
              </span>
              <FaArrowRight className="text-[10px] text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewMain;