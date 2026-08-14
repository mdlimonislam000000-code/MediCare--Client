'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
    FaUserShield, 
    FaEnvelope, 
    FaShieldAlt, 
    FaCheckCircle, 
    FaEdit,
    FaMapMarkerAlt,
    FaTimes
} from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import toast from 'react-hot-toast';

const AdminProfile = () => {
    const { data: session, isPending, refetch } = authClient.useSession();
    
    // লোকাল ইউজার স্টেট যা ব্যাকএন্ড বা সেশন থেকে ফেচ করে UI আপডেট করবে
    const [dbUser, setDbUser] = useState(null);
    const user = dbUser || session?.user;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    // ডাটাবেস থেকে ইউজারের লেটেস্ট ডেটা ফেচ করার ফাংশন
    const fetchUserData = async () => {
        try {
            const currentUserId = session?.user?.id || session?.user?._id;
            if (!currentUserId) return;

            const { data: tokenData } = await authClient.token();
            const response = await fetch(`http://localhost:5000/api/users/${currentUserId}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                }
            });
            const data = await response.json();
            if (response.ok && data) {
                setDbUser(data.user || data); // ব্যাকএন্ডের স্ট্রাকচার অনুযায়ী
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    // সেশন পেলে ডেটাবেস থেকে লেটেস্ট ডেটা ফেচ করে নেব
    useEffect(() => {
        if (session?.user) {
            fetchUserData();
        }
    }, [session]);

    // ফর্মের ইনপুট ফিল্ডগুলো সিঙ্ক করার জন্য
    useEffect(() => {
        if (user) {
            setName(user?.name || '');
            setEmail(user?.email || '');
            setImage(user?.image || '');
        }
    }, [user]);

    const handleOpenModal = () => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setImage(user?.image || '');
        setIsEditModalOpen(true);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = user?.id || user?._id;

            if (!userId) {
                toast.error("User ID not found!");
                setLoading(false);
                return;
            }

            const { data: tokenData } = await authClient.token();
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    image,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Profile updated successfully!");
                setIsEditModalOpen(false);
                
                // সেশন রিফ্রেশ এবং ডাটাবেস থেকে নতুন ডেটা ফেচ করে UI সাথে সাথে আপডেট করা
                if (typeof refetch === 'function') {
                    await refetch();
                }
                await fetchUserData(); 
            } else {
                toast.error(data.message || "Update failed!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-xs text-gray-500 dark:text-slate-400 animate-pulse">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#080c16] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MdOutlineAdminPanelSettings className="text-pink-500" /> Admin Profile
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                        Manage and view your administrator credentials and account status.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-xl shrink-0">
                        <FaShieldAlt />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">Access Role</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">{user?.role || "Admin"}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl shrink-0">
                        <FaCheckCircle />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">Account Status</p>
                        <p className="text-lg font-bold text-emerald-500">Active & Verified</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl shrink-0">
                        <FaUserShield />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">System Control</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">Full Access</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#080c16] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm text-center flex flex-col items-center justify-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-pink-500 shadow-md mb-4">
                        <Image
                            src={user?.image || "https://avatar.vercel.sh/placeholder"}
                            alt={user?.name || "Admin"}
                            width={112}
                            height={112}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{user?.name || "Admin User"}</h2>
                    <p className="text-xs text-pink-500 font-semibold mt-0.5 capitalize">{user?.role || "Administrator"}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 flex items-center gap-1.5 justify-center">
                        <FaMapMarkerAlt /> Bangladesh
                    </p>

                    <div className="w-full border-t border-gray-200 dark:border-white/10 my-6"></div>

                    <div className="w-full text-left space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-slate-400">Email Verified:</span>
                            <span className="font-semibold text-emerald-500">Yes</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-slate-400">Two-Factor Auth:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Enabled</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-[#080c16] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-md font-bold text-gray-900 dark:text-white mb-4">Account Information</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Full Name</label>
                                <div className="w-full px-4 py-3 rounded-xl text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium">
                                    {user?.name || "N/A"}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Email Address</label>
                                <div className="w-full px-4 py-3 rounded-xl text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium flex items-center justify-between">
                                    <span>{user?.email || "N/A"}</span>
                                    <FaEnvelope className="text-pink-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">User ID / Unique Token</label>
                                <div className="w-full px-4 py-3 rounded-xl text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-slate-400 font-mono truncate">
                                    {user?.id || user?._id || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-white/10 my-6"></div>

                    <div>
                        <h3 className="text-md font-bold text-gray-900 dark:text-white mb-2">Manage Profile</h3>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
                            Want to change your profile information like name, email, or profile picture? Click below.
                        </p>
                        <button 
                            onClick={handleOpenModal}
                            className="flex items-center gap-2 px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-md"
                        >
                            <FaEdit />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#080c16] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</h3>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 dark:text-slate-300 mb-1">Profile Image URL</label>
                                <input 
                                    type="url" 
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-pink-500"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-pink-500 hover:bg-pink-600 text-white cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;