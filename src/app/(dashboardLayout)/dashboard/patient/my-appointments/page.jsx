"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { FiTrash2, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import ViewPrescription from "@/components/ViewPrescription";
import toast from "react-hot-toast";

const AppointmentsContent = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");
  
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || session?.user?._id;

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    if (success === "true" && sessionId && !saved) {
      const saveBookingToDB = async () => {
        try {
          setSaving(true);
          const { data: tokenData } = await authClient.token();
          const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-payment?session_id=${sessionId}`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();

          if (data.success) {
            setSaved(true);
            toast.success("Payment Successful & Appointment Confirmed!");
            if (userId) fetchAppointments(userId);
          }
        } catch (error) {
          console.error("Failed to save booking:", error);
          toast.error("Failed to verify payment.");
        } finally {
          setSaving(false);
        }
      };

      saveBookingToDB();
    }
  }, [success, sessionId, saved, userId]);

  const fetchPrescriptions = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setPrescriptions(data);
      }
    } catch (error) {
      console.error("Failed to fetch prescriptions:", error);
    }
  };

  const fetchAppointments = async (currentUserId) => {
    try {
      setLoadingAppointments(true);
      const { data: tokenData } = await authClient.token();
      const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/user/${currentUserId}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setAppointments(data);
      } else if (data.result && Array.isArray(data.result)) {
        setAppointments(data.result);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAppointments(userId);
      fetchPrescriptions();
    }
  }, [userId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const { data: tokenData } = await authClient.token();
        const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.deletedCount > 0 || data.success) {
          setAppointments(appointments.filter((item) => (item._id || item.id) !== id));
          toast.success("Appointment deleted successfully!");
        } else {
          toast.error("Failed to delete appointment.");
        }
      } catch (error) {
        console.error("Failed to delete appointment:", error);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Patient Dashboard</h1>
        <p className="text-sm text-base-content/60 mt-1">Manage your medical appointments and view doctor's prescriptions seamlessly.</p>
      </div>
      
      {success === "true" && (
        <div className="mb-6 p-4 bg-success/10 border border-success/25 text-success rounded-2xl shadow-lg flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-semibold text-sm">
              {saving ? "Saving your appointment to database..." : "Payment Successful & Appointment Confirmed!"}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-base-content">My Appointments</h2>
        <span className="text-xs bg-base-200 text-base-content/70 px-3 py-1.5 rounded-full border border-base-300">
          Total: {appointments.length}
        </span>
      </div>
      
      <div className="grid gap-5">
        {loadingAppointments ? (
          <div className="p-12 text-center text-base-content/50 bg-base-200/50 rounded-2xl border border-base-300 animate-pulse">
            Loading appointments...
          </div>
        ) : appointments.length > 0 ? (
          appointments.map((item, index) => {
            const itemId = item._id ? item._id.toString() : (item.id ? item.id.toString() : index.toString());
            
            const matchedPrescription = prescriptions.find((p) => {
              const pBookingId = p.bookingId ? p.bookingId.toString() : "";
              return (
                pBookingId === itemId || 
                pBookingId === item._id?.toString() || 
                pBookingId === item.id?.toString()
              );
            });

            return (
              <div 
                key={itemId}
                className="bg-base-100 border border-base-200 hover:border-base-300 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-5 transition-all duration-300"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold rounded-full uppercase tracking-wider">
                      Confirmed
                    </span>
                    {matchedPrescription && (
                      <span className="px-3 py-1 bg-success/10 text-success border border-success/20 text-xs font-semibold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                        Prescription Issued
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                    <span className="text-primary font-normal text-base">Dr.</span> {item.doctorName || "Doctor"}
                  </h3>
                  
                  <p className="text-sm text-base-content/60 flex items-center gap-2">
                    <FiUser className="text-base-content/40" />
                    Patient: <span className="font-medium text-base-content">{item.name}</span> <span className="text-base-content/40">({item.phone})</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  {matchedPrescription ? (
                    <ViewPrescription prescriptionData={matchedPrescription} />
                  ) : (
                    <button 
                      onClick={() => handleDelete(item._id || item.id)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-error/10 text-error border border-error/20 rounded-xl hover:bg-error/20 transition-all shadow-sm cursor-pointer"
                    >
                      <FiTrash2 className="text-base" /> 
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-base-200/40 border border-dashed border-base-300 rounded-2xl text-base-content/50">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

const MyAppointments = () => {
  return (
    <Suspense fallback={<div className="text-center py-10 text-base-content/60">Loading dashboard...</div>}>
      <AppointmentsContent />
    </Suspense>
  );
};

export default MyAppointments;