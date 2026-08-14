"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";

const AppointmentsInbox = () => {
  const [bookings, setBookings] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const doctorUserId = session?.user?.id || session?.user?._id;

  useEffect(() => {
    if (!doctorUserId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [bookingsRes, prescriptionsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/doctor/${doctorUserId}`),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions`)
        ]);

        const bookingsData = await bookingsRes.json();
        const prescriptionsData = await prescriptionsRes.json();

        if (Array.isArray(bookingsData)) {
          setBookings(bookingsData);
        }
        if (Array.isArray(prescriptionsData)) {
          setPrescriptions(prescriptionsData);
        }
      } catch (error) {
        console.error("Error fetching inbox data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorUserId]);

  if (loading) {
    return <div className="p-6 text-center text-zinc-500">Loading appointments...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">
        Patient Appointments Inbox ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
          No appointments found yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => {
            const queryParams = new URLSearchParams({
              bookingId: booking._id,
              patientId: booking.patientId || booking.userId || booking.patient || "",
              doctorId: doctorUserId || "",
              name: booking.name || "N/A",
              email: booking.email || booking.patientEmail || "N/A",
              phone: booking.phone || "N/A",
              age: booking.age || "N/A",
              message: booking.message || "N/A",
              date: booking.appointmentDate || "N/A",
            }).toString();

            const isConfirmed = prescriptions.some(
              (p) => p.bookingId === booking._id || p.patient?.phone === booking.phone
            );

            return (
              <div
                key={booking._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 gap-4"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    {booking.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-medium">Email:</span> {booking.email || booking.patientEmail} | <span className="font-medium">Phone:</span> {booking.phone}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-medium">Age:</span> {booking.age} | <span className="font-medium">Date:</span> {booking.appointmentDate}
                  </p>
                  {booking.message && (
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                      <span className="font-semibold">Problem:</span> {booking.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-600 rounded-full">
                    {booking.paymentStatus || "Paid"}
                  </span>

                  {isConfirmed ? (
                    <span className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <HiCheckCircle className="text-lg" /> Prescription Confirmed
                    </span>
                  ) : (
                    <Link
                      href={`/dashboard/doctor/prescription-cabin?${queryParams}`}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
                    >
                      Give Prescription
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsInbox;