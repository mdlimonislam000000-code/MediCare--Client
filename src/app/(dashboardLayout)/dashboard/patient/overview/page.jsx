'use client'
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineCheckCircle, 
  HiOutlineUser,
  HiOutlineClipboardList
} from "react-icons/hi";

const PatientOverview = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [appointments, setAppointments] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      const userId = user?.id || user?._id;
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/appointments/patient/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setAppointments(data.appointments || []);
          setMedicalHistory(data.history || []);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPatientData();
    }
  }, [user]);


  const upcomingVisits = appointments.filter(app => {
    const status = (app.status || "").toLowerCase();
    return status === "upcoming" || status === "confirmed" || status === "pending" || !app.status;
  });


 
  const latestHistory = medicalHistory.slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight">
            Welcome back, {user?.name || "Patient"}! 👋
          </h1>
          <p className="text-base-content/60 text-sm mt-1">
            Here is a quick overview of your health dashboard and upcoming activities.
          </p>
        </div>
        <div className="badge badge-primary badge-lg p-4 font-semibold">
          Status: {user?.status || "Active"}
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card bg-base-100 shadow-xl border border-base-200 p-5 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
            <HiOutlineCalendar />
          </div>
          <div>
            <p className="text-xs text-base-content/60 font-medium">Total Appointments</p>
            <h3 className="text-xl font-bold text-base-content">{appointments.length}</h3>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 p-5 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center text-2xl">
            <HiOutlineClock />
          </div>
          <div>
            <p className="text-xs text-base-content/60 font-medium">Upcoming Visits</p>
            <h3 className="text-xl font-bold text-base-content">{upcomingVisits.length}</h3>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 p-5 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center text-2xl">
            <HiOutlineCheckCircle />
          </div>
          <div>
            <p className="text-xs text-base-content/60 font-medium">Completed</p>
            <h3 className="text-xl font-bold text-base-content">{medicalHistory.length}</h3>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 p-5 flex flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center text-2xl">
            <HiOutlineClipboardList />
          </div>
          <div>
            <p className="text-xs text-base-content/60 font-medium">Prescriptions</p>
            <h3 className="text-xl font-bold text-base-content">{medicalHistory.length}</h3>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 lg:col-span-1">
          <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
            <HiOutlineUser className="text-primary text-xl" /> Next Appointment
          </h3>
          
          {upcomingVisits.length > 0 ? (
            <div className="p-4 rounded-xl bg-base-200/50 border border-base-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary uppercase">
                  {upcomingVisits[0].status || "Pending"}
                </span>
                <span className="text-xs text-base-content/60">{upcomingVisits[0].date || upcomingVisits[0].appointmentDate }</span>
              </div>
              <div>
                <h4 className="font-bold text-base-content text-base">
                  {upcomingVisits[0].doctorName || upcomingVisits[0].doctor?.name }
                </h4>
                <p className="text-xs text-base-content/60">
                  {upcomingVisits[0].department || upcomingVisits[0].doctor?.specialty }
                </p>
              </div>
              <div className="pt-2 border-t border-base-300 flex justify-between items-center text-xs">
                <span className="text-base-content/65">Fee: ৳{upcomingVisits[0].fee || upcomingVisits[0].amount || 0}</span>
                <button className="btn btn-primary btn-xs">Join Call</button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-base-content/60 py-6 text-center">No upcoming appointments found.</p>
          )}
        </div>


        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-base-content flex items-center gap-2">
              <HiOutlineClipboardList className="text-primary text-xl" /> Recent Medical History
            </h3>
            <span className="text-xs badge badge-ghost font-medium">Total: {medicalHistory.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm w-full">
              <thead>
                <tr className="text-base-content/60 border-b border-base-200">
                  <th className="py-3">Doctor / Diagnosis</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-base-content">
                {latestHistory.length > 0 ? (
                  latestHistory.map((historyItem, index) => (
                    <tr key={index} className="border-b border-base-200">
                      <td className="font-semibold py-3">
                        {historyItem.doctorName || historyItem.diagnosis || "Consultation"}
                      </td>
                      <td className="py-3">
                        {historyItem.date || (historyItem.createdAt ? new Date(historyItem.createdAt).toLocaleDateString() : "N/A")}
                      </td>
                      <td className="py-3">
                        <span className="badge badge-success badge-xs">
                          {historyItem.status || "Completed"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-xs text-base-content/60 py-4">
                      {loading ? "Loading history..." : "No medical history available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;