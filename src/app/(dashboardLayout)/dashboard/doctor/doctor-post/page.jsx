'use client'
import CreateDoctorPost from '@/components/CreateDoctorPost';
import DoctorEdtiPost from '@/components/DoctorEditPost';

import { authClient } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const DoctorPost = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [doctorPosts, setDoctorPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // এডিট মডালের জন্য স্টেটগুলো যুক্ত করা হলো
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const fetchDoctorPosts = async (currentUserId) => {
        try {
            const response = await fetch('http://localhost:5000/api/doctor-posts');
            const data = await response.json();

            if (Array.isArray(data)) {
                const matchedPosts = data.filter(
                    (post) => post.userId === currentUserId || post.doctorId === currentUserId
                );
                setDoctorPosts(matchedPosts);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to load posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            const currentUserId = user.id || user._id; 
            fetchDoctorPosts(currentUserId);
        } else if (!isPending) {
            setLoading(false);
        }
    }, [user, isPending]);

    const handleDelete = async (postId) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const { data: tokenData } = await authClient.token();
            const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;

            const response = await fetch(`http://localhost:5000/api/doctor-posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (response.ok || result.success) {
                toast.success("Post deleted successfully!");
                setDoctorPosts(doctorPosts.filter(post => (post._id || post.id) !== postId));
            } else {
                toast.error("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Something went wrong.");
        }
    };

    const handlePostSuccess = () => {
        setIsModalOpen(false);
        if (user) {
            fetchDoctorPosts(user.id || user._id);
        }
    };

    const handleUpdateSuccess = () => {
        setIsEditModalOpen(false);
        setEditingPost(null);
        if (user) {
            fetchDoctorPosts(user.id || user._id);
        }
    };

    if (isPending || loading) {
        return (
            <div className="max-w-6xl mx-auto my-12 p-8 text-center text-gray-400">
                Loading your posts...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-12 p-8 bg-gray-900 shadow-2xl rounded-2xl border border-gray-800 text-gray-100">
            {/* Top Header with Add Post Button */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">My Doctor Posts</h2>
                    <p className="text-sm text-gray-400 mt-1">View and manage your submitted medical posts.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-md text-sm cursor-pointer"
                >
                    <FaPlus size={14} /> Add Post
                </button>
            </div>

            {doctorPosts.length === 0 ? (
                <div className="text-center py-16 bg-gray-800/40 rounded-xl border border-gray-800">
                    <p className="text-gray-400">You haven't posted anything yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctorPosts.map((post) => {
                        const postId = post._id || post.id;
                        return (
                            <div key={postId} className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.imageUrl || user?.image || "https://via.placeholder.com/60"}
                                                alt="Doctor"
                                                className="w-12 h-12 rounded-full object-cover border border-gray-600"
                                            />
                                            <div>
                                                <h3 className="text-base font-bold text-white line-clamp-1">{post.doctorName || user?.name}</h3>
                                                <p className="text-indigo-400 text-xs font-medium">{post.specialty}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                            post.status === 'approved' 
                                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                                        }`}>
                                            {post.status || 'pending'}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 text-xs text-gray-300 my-4 py-3 border-y border-gray-700">
                                        <div><span className="text-gray-500">Fee:</span> ৳ {post.consultationFee}</div>
                                        <div><span className="text-gray-500">Hospital:</span> {post.hospitalName}</div>
                                        <div><span className="text-gray-500">Chamber:</span> {post.chamberAddress}</div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-bold text-white line-clamp-1 mb-1">{post.title}</h4>
                                        <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900 inline-block mb-1">
                                            {post.category}
                                        </span>
                                        <p className="text-xs text-gray-400 line-clamp-2">{post.content}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-gray-700 mt-auto">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingPost(post);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                                    >
                                        <FaEdit size={12} /> Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(postId)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-900/50 rounded-xl text-xs font-semibold transition cursor-pointer"
                                    >
                                        <FaTrash size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal for Adding Post */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="relative w-full max-w-3xl my-8 p-8 bg-gray-900 shadow-2xl rounded-2xl border border-gray-800 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white p-2 rounded-lg bg-gray-800/80 border border-gray-700 cursor-pointer transition"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>
                        
                        <CreateDoctorPost onPostSuccess={handlePostSuccess} />
                    </div>
                </div>
            )}

            {/* Modal for Editing Post */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="relative w-full max-w-3xl my-8 p-8 bg-gray-900 shadow-2xl rounded-2xl border border-gray-800 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingPost(null);
                                }}
                                className="text-gray-400 hover:text-white p-2 rounded-lg bg-gray-800/80 border border-gray-700 cursor-pointer transition"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>
                        
                        <DoctorEdtiPost 
                            postData={editingPost} 
                            onUpdateSuccess={handleUpdateSuccess} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPost;