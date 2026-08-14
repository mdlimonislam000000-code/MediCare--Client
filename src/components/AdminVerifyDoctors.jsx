"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTrash, FaBan } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
const AdminVerifyDoctors = () => {
      const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/doctor-posts`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : data.result || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleApprove = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts/approve/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.ok && data.modifiedCount > 0) {
        toast.success("Post approved successfully!");
        fetchPosts(); 
      } else {
        toast.error(data.message || "Failed to approve post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const { data: tokenData } = await authClient.token();
        const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();

        if (res.ok && (data.deletedCount > 0 || data.success)) {
          toast.success("Post deleted successfully!");
          fetchPosts();
        } else {
          toast.error(data.message || "Failed to delete post");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    }
  };

  const handleSuspend = async (id) => {
    try {
      const { data: tokenData } = await authClient.token();
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts/suspend/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${tokenData?.token}`
        }
      });
      const data = await res.json();

      if (res.ok && data.modifiedCount > 0) {
        toast.error("Post suspended!");
        fetchPosts();
      } else {
        toast.error(data.message || "Failed to suspend post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712]">
        <h2 className="text-xl font-bold text-indigo-600 animate-pulse">Loading Posts...</h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-6 md:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Manage Doctor Posts
          </h1>
          <p className="text-slate-600 dark:text-gray-400 mt-1">
            Approve, suspend, or delete doctor profile posts from here.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-600 dark:text-gray-300">
              No Posts Available
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-gray-800 shadow-xl bg-white dark:bg-[#111827]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 text-sm uppercase tracking-wider">
                  <th className="py-4 px-6">Doctor Name</th>
                  <th className="py-4 px-6">Specialty</th>
                  <th className="py-4 px-6">Fee</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-gray-800 text-sm">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-gray-200 flex items-center gap-3">
                      <img
                        src={post.imageUrl || "https://via.placeholder.com/40"}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-gray-700"
                      />
                      {post.doctorName}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-gray-400">{post.specialty}</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">৳ {post.consultationFee}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase inline-flex items-center gap-1 ${
                          post.status === "approved"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : post.status === "suspended"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                        }`}
                      >
                        {post.status || "pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {post.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(post._id)}
                            title="Approve"
                            className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
                          >
                            <FaCheck size={14} />
                          </button>
                        )}

                        {post.status !== "suspended" && (
                          <button
                            onClick={() => handleSuspend(post._id)}
                            title="Suspend"
                            className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900 transition"
                          >
                            <FaBan size={14} />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(post._id)}
                          title="Delete"
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900 transition"
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

export default AdminVerifyDoctors;