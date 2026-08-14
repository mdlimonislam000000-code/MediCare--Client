"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import DoctorOverviewCard from "@/components/DoctorOverviewCard";
import OverviewMain from "@/components/OverviewMain";

const DoctorOverviewPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.id || user?._id) {
      const doctorId = user.id || user._id;

      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/doctor/${doctorId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setBookings(data);
        })
        .catch((err) => console.error("Error fetching bookings:", err));

      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setPrescriptions(data);
        })
        .catch((err) => console.error("Error fetching prescriptions:", err));

      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews?doctorId=${doctorId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setReviews(data);
        })
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [user]);

  const doctorId = user?.id || user?._id;

  const completedAppointments = bookings.filter((booking) => {
    return prescriptions.some(
      (prescription) =>
        prescription.bookingId === booking._id &&
        booking.doctorUserId === doctorId,
    );
  }).length;

  const totalAppointments = bookings.length - completedAppointments;

  const totalFeedbacks = reviews.length;
  const clinicianScore =
    totalFeedbacks > 0
      ? (
          reviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0) /
          totalFeedbacks
        ).toFixed(1)
      : "0.0";

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xs text-gray-500 dark:text-slate-400 animate-pulse">
          Loading dashboard overview...
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#080c16] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500 relative shrink-0 shadow-md">
            <Image
              src={user?.image}
              alt={user?.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Welcome back, {user?.name || "Specialist"}!{" "}
              <span className="text-lg">👋</span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <span>{user?.email}</span>
              <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                <MdOutlineVerified /> Verified Doctor
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <Link
            href="/dashboard/doctor/prescription-cabin"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm"
          >
            <LuFileSpreadsheet className="text-sm" />
            <span>Prescription Cabin</span>
          </Link>

          <Link
            href="/dashboard/doctor/doctor-post"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm"
          >
            <FaPlusCircle className="text-pink-500 text-sm" />
            <span>Doctor Post</span>
          </Link>
        </div>
      </div>

      <DoctorOverviewCard
        completedAppointments={completedAppointments}
        totalAppointments={totalAppointments}
        clinicianScore={clinicianScore}
        totalFeedbacks={totalFeedbacks}
      />

      <OverviewMain></OverviewMain>
    </div>
  );
};

export default DoctorOverviewPage;
