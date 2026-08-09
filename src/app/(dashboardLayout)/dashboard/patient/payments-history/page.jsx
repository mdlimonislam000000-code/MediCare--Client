'use client'
import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { MdOutlineMedicalServices } from "react-icons/md";

const PaymentsHistory = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || session?.user?._id;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/bookings/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">Payment History</h2>
        <p className="text-base-content/60 text-sm mt-1">List of all your successful appointments and payments</p>
      </div>
      
      {payments.length === 0 ? (
        <div className="card bg-base-100 shadow-xl border border-base-200 p-12 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl">
              <HiOutlineReceiptRefund />
            </div>
            <h3 className="text-lg font-semibold text-base-content">No Payment History Found</h3>
            <p className="text-sm text-base-content/60">You haven't booked any doctors or completed any payments yet.</p>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full text-left">
              <thead>
                <tr className="bg-base-200/60 text-base-content font-semibold text-sm">
                  <th className="py-4 px-6">Doctor Name</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Transaction ID</th>
                  <th className="py-4 px-6">Appointment Date</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item) => (
                  <tr key={item._id} className="hover:bg-base-200/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-base-content whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary p-2.5 rounded-lg text-lg shrink-0">
                          <MdOutlineMedicalServices />
                        </div>
                        <div>
                          <div className="font-bold">{item.doctorName || "N/A"}</div>
                          <div className="text-xs text-base-content/60">MediCare Specialist</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-primary whitespace-nowrap">৳{item.amount}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono text-xs bg-base-200 px-2.5 py-1.5 rounded-md border border-base-300 text-base-content/80">
                        {item.transactionId || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-base-content/85 whitespace-nowrap">{item.appointmentDate || "N/A"}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="badge bg-success/15 text-success border-success/30 font-semibold gap-1.5 py-3 px-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        {item.paymentStatus || "Paid"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsHistory;