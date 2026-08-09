"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaBan } from "react-icons/fa";

const ManageUser = () => {
  const [activeTab, setActiveTab] = useState("doctor"); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/users?role=${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const handleSuspend = (id) => {
    fetch(`http://localhost:5000/api/users/suspend/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.remove("Account suspended successfully!");
          fetchUsers();
        }
      })
      .catch((err) => console.error("Error suspending account:", err));
  };

  const handleUnsuspend = (id) => {
    fetch(`http://localhost:5000/api/users/unsuspend/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Account unsuspended successfully!");
          fetchUsers();
        }
      })
      .catch((err) => console.error("Error unsuspending account:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab} account?`)) {
      fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.dismiss("Account deleted successfully!");
            fetchUsers();
          }
        })
        .catch((err) => console.error("Error deleting account:", err));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-6 md:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Manage Accounts
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mt-1">
              Manage doctor and patient accounts, suspend or delete them as needed.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-200 dark:bg-gray-800 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("doctor")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "doctor"
                  ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab("patient")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "patient"
                  ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Patients
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-indigo-600 animate-pulse">Loading Accounts...</h2>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-600 dark:text-gray-300">
              No {activeTab} accounts found!
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-gray-800 shadow-xl bg-white dark:bg-[#111827]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-gray-800 text-sm">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-gray-200 flex items-center gap-3">
                      <img
                        src={user.photoURL || user.image || "https://via.placeholder.com/40"}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-gray-700"
                      />
                      {user.name || user.displayName || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-gray-400">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase inline-flex items-center gap-1 ${
                          user.status === "suspended"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {user.status === "suspended" ? (
                          <button
                            onClick={() => handleUnsuspend(user._id)}
                            title="Unsuspend Account"
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 hover:bg-emerald-100 transition text-xs font-semibold"
                          >
                            Unsuspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSuspend(user._id)}
                            title="Suspend Account"
                            className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 hover:bg-amber-100 transition"
                          >
                            <FaBan size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user._id)}
                          title="Delete Account"
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 transition"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;