"use client";
import React, { useEffect, useState } from "react";


const CashFlows = () => {
  const [cashFlows, setCashFlows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCashFlows = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/cash-flows");
        const data = await res.json();
        setCashFlows(data);
      } catch (error) {
        console.error("Failed to fetch cash flows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCashFlows();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[250px]">
        <p className="text-sm font-semibold text-gray-500">
          Loading Cash Flows...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Stripe Cash Flows
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Track all patient transactions and doctor payments
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#080c16] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-400 uppercase bg-gray-50 dark:bg-white/[0.02]">
                <th className="p-4">Patient Info</th>
                <th className="p-4">Doctor Name</th>
                <th className="p-4">Payer Account (Email)</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10 text-xs">
              {cashFlows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No transaction records found.
                  </td>
                </tr>
              ) : (
                cashFlows.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {item.name || "N/A"}
                      </p>
                      <p className="text-gray-400 text-[11px]">
                        {item.patientEmail}
                      </p>
                    </td>

                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                      {item.doctorName}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {item.email}
                    </td>

                    <td className="p-4 font-bold text-emerald-500 text-sm">
                      ${item.amount}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          item.paymentStatus === "Paid"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {item.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-400 text-[11px]">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashFlows;