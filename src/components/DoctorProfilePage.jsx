"use client";
import React, { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaStethoscope,
  FaStar,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import {
  MdVerified,
  MdOutlinePayments,
  MdOutlineLocalHospital,
} from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import DoctorEditProfile from "@/components/DoctorEditProfile";

const DoctorProfilePage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;

  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorProfileData = useCallback(async () => {
    if (!user?.id && !user?._id) return;

    const doctorId = user.id || user._id;

    try {
      const [postsRes, bookingsRes, reviewsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/doctor/${doctorId}`, { cache: 'no-store' }),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews?doctorId=${doctorId}`, { cache: 'no-store' }),
      ]);

      const posts = await postsRes.json();
      const bookings = await bookingsRes.json();
      const reviews = await reviewsRes.json();

      const matchedBookings = Array.isArray(bookings) ? bookings.filter(
        (b) => b.doctorUserId === doctorId || b.doctorId === doctorId,
      ) : [];
      const totalPatientsCount = matchedBookings.length;

      const totalFeedbacks = Array.isArray(reviews) ? reviews.length : 0;
      const clinicianScore =
        totalFeedbacks > 0
          ? (
              reviews.reduce(
                (acc, curr) => acc + Number(curr.rating || 0),
                0,
              ) / totalFeedbacks
            ).toFixed(1)
          : "0.0";

      const matchedDoctor = Array.isArray(posts) ? posts.find(
        (post) => post.userId === doctorId || post.email === user.email,
      ) : null;

      if (matchedDoctor) {
        setDoctorData({
          name: matchedDoctor.doctorName || user?.name,
          email: user?.email,
          image: matchedDoctor.imageUrl || user?.image,
          specialty: matchedDoctor.specialty,
          degree: matchedDoctor.qualifications,
          hospital: matchedDoctor.hospitalName,
          experience: matchedDoctor.experience
            ? `${matchedDoctor.experience} Years`
            : "1+ Years",
          fees: matchedDoctor.consultationFee || "0",
          rating: clinicianScore, 
          reviewsCount: totalFeedbacks,
          patientsCount: totalPatientsCount > 0 ? totalPatientsCount : "0",
          phone: matchedDoctor.phone || "Not Provided",
          about: matchedDoctor.content || "Please complete your doctor profile.",
          chamber: matchedDoctor.chamberAddress || "Not Provided",
        });
      } else {
        setDoctorData({
          name: user?.name,
          email: user?.email,
          image: user?.image,
          specialty: "Not Provided",
          degree: "Not Provided",
          hospital: "Not Provided",
          experience: "0",
          fees: "0",
          rating: clinicianScore,
          reviewsCount: totalFeedbacks,
          patientsCount: totalPatientsCount > 0 ? totalPatientsCount : "0",
          phone: "Not Provided",
          about: "Please complete your doctor profile.",
          chamber: "Not Provided",
        });
      }
    } catch (error) {
      console.error("Error fetching doctor profile data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!sessionPending) {
      fetchDoctorProfileData();
    }
  }, [sessionPending, fetchDoctorProfileData]);

  if (sessionPending || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/60 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="bg-base-100 shadow-xl rounded-3xl overflow-hidden border border-base-300">
          <div className="h-16 bg-gradient-to-r from-primary via-primary/80 to-secondary relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="px-6 sm:px-10 pb-6 pt-2 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-2xl ring-4 ring-base-100 shadow-xl bg-base-100 overflow-hidden">
                    <img
                      src={doctorData?.image || user?.image}
                      alt={doctorData?.name || user?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="space-y-1 mb-1">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                      {doctorData?.name || user?.name}
                    </h1>
                    <MdVerified
                      className="text-primary text-2xl"
                      title="Verified Doctor"
                    />
                  </div>
                  <p className="text-primary font-semibold text-base capitalize">
                    {doctorData?.specialty}
                  </p>
                  <p className="text-xs sm:text-sm text-base-content/70 font-medium">
                    {doctorData?.degree}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto justify-center mb-1">
                <DoctorEditProfile
                  doctorData={doctorData}
                  user={user}
                  onUpdateSuccess={fetchDoctorProfileData}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-base-100 p-4 sm:p-5 rounded-2xl border border-base-300 shadow-sm flex items-center gap-4">
            <div className="p-3.5 sm:p-4 bg-primary/10 text-primary rounded-xl text-xl sm:text-2xl shrink-0">
              <FaStethoscope />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-base-content/60 font-medium">Experience</p>
              <h4 className="text-base sm:text-lg font-bold text-base-content truncate">
                {doctorData?.experience}
              </h4>
            </div>
          </div>

          <div className="bg-base-100 p-4 sm:p-5 rounded-2xl border border-base-300 shadow-sm flex items-center gap-4">
            <div className="p-3.5 sm:p-4 bg-warning/10 text-warning rounded-xl text-xl sm:text-2xl shrink-0">
              <FaStar />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-base-content/60 font-medium">Rating</p>
              <h4 className="text-base sm:text-lg font-bold text-base-content truncate">
                {doctorData?.rating}/5{" "}
                <span className="text-[11px] sm:text-xs text-base-content/50">
                  ({doctorData?.reviewsCount})
                </span>
              </h4>
            </div>
          </div>

          <div className="bg-base-100 p-4 sm:p-5 rounded-2xl border border-base-300 shadow-sm flex items-center gap-4">
            <div className="p-3.5 sm:p-4 bg-success/10 text-success rounded-xl text-xl sm:text-2xl shrink-0">
              <MdOutlinePayments />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-base-content/60 font-medium">Consultation Fee</p>
              <h4 className="text-base sm:text-lg font-bold text-success truncate">
                ৳ {doctorData?.fees}
              </h4>
            </div>
          </div>

          <div className="bg-base-100 p-4 sm:p-5 rounded-2xl border border-base-300 shadow-sm flex items-center gap-4">
            <div className="p-3.5 sm:p-4 bg-info/10 text-info rounded-xl text-xl sm:text-2xl shrink-0">
              <FaCalendarCheck />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-base-content/60 font-medium">Total Patients</p>
              <h4 className="text-base sm:text-lg font-bold text-base-content truncate">
                {doctorData?.patientsCount}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-base-content flex items-center gap-2 border-b border-base-200 pb-3">
                <HiOutlineDocumentText className="text-primary text-2xl" /> About Doctor
              </h3>
              <p className="text-base-content/75 leading-relaxed text-base">
                {doctorData?.about}
              </p>
            </div>

            <div className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-base-content flex items-center gap-2 border-b border-base-200 pb-3">
                <MdOutlineLocalHospital className="text-primary text-2xl" /> Workplace & Chamber
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-base-content/80">
                  <span className="p-2 bg-base-200 rounded-lg text-primary">
                    <MdOutlineLocalHospital />
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50">Hospital / Institution</p>
                    <p className="font-semibold text-base-content">
                      {doctorData?.hospital}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-base-content/80 pt-2">
                  <span className="p-2 bg-base-200 rounded-lg text-secondary">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50">Chamber Address</p>
                    <p className="font-semibold text-base-content capitalize">
                      {doctorData?.chamber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-base-content border-b border-base-200 pb-3">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-primary/10 text-primary rounded-xl mt-0.5">
                    <FaEnvelope />
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50">Email Address</p>
                    <p className="font-semibold text-base-content break-all">
                      {doctorData?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-success/10 text-success rounded-xl mt-0.5">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50">Phone Number</p>
                    <p className="font-semibold text-base-content">
                      {doctorData?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2.5 bg-secondary/10 text-secondary rounded-xl mt-0.5">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <p className="text-xs text-base-content/50">Location / Chamber</p>
                    <p className="font-semibold text-base-content capitalize">
                      {doctorData?.chamber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfilePage;