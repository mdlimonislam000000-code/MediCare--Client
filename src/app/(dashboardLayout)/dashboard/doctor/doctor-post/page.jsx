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
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const fetchDoctorPosts = async (currentUserId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts`);
            const data = await response.json();

            if (Array.isArray(data)) {
                const matchedPosts = data.filter((post) => {
                    const postUserId = post.userId || post.doctorId;
                    return String(postUserId) === String(currentUserId) || post.email === user?.email;
                });
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts/${postId}`, {
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
            <div className="max-w-6xl mx-auto my-12 p-8 text-center text-base-content/60">
                Loading your posts...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-12 p-8 bg-base-100 shadow-2xl rounded-2xl border border-base-200 text-base-content">
            {/* Top Header with Add Post Button */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-200">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">My Doctor Posts</h2>
                    <p className="text-sm text-base-content/60 mt-1">View and manage your submitted medical posts.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-content font-medium rounded-xl transition shadow-md text-sm cursor-pointer hover:opacity-90"
                >
                    <FaPlus size={14} /> Add Post
                </button>
            </div>

            {doctorPosts.length === 0 ? (
                <div className="text-center py-16 bg-base-200/40 rounded-xl border border-base-200">
                    <p className="text-base-content/60">You haven't posted anything yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctorPosts.map((post) => {
                        const postId = post._id || post.id;
                        return (
                            <div key={postId} className="bg-base-200/60 border border-base-300 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post.imageUrl || user?.image || "https://via.placeholder.com/60"}
                                                alt="Doctor"
                                                className="w-12 h-12 rounded-full object-cover border border-base-300"
                                            />
                                            <div>
                                                <h3 className="text-base font-bold line-clamp-1">{post.doctorName || user?.name}</h3>
                                                <p className="text-primary text-xs font-medium">{post.specialty}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                            post.status === 'approved' 
                                                ? 'bg-success/10 text-success border border-success/20' 
                                                : 'bg-warning/10 text-warning border border-warning/20'
                                        }`}>
                                            {post.status || 'pending'}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 text-xs text-base-content/80 my-4 py-3 border-y border-base-300">
                                        <div><span className="text-base-content/60">Fee:</span> ৳ {post.consultationFee}</div>
                                        <div><span className="text-base-content/60">Hospital:</span> {post.hospitalName}</div>
                                        <div><span className="text-base-content/60">Chamber:</span> {post.chamberAddress}</div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-bold line-clamp-1 mb-1">{post.title}</h4>
                                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 inline-block mb-1">
                                            {post.category}
                                        </span>
                                        <p className="text-xs text-base-content/70 line-clamp-2">{post.content}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-base-300 mt-auto">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingPost(post);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-base-300 hover:bg-base-content/20 text-base-content rounded-xl text-xs font-semibold transition cursor-pointer"
                                    >
                                        <FaEdit size={12} /> Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(postId)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-xl text-xs font-semibold transition cursor-pointer"
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
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
                    <div className="relative w-full max-w-3xl my-8 p-6 md:p-8 bg-gray-900 text-white shadow-2xl rounded-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-end mb-2 sticky top-0 bg-gray-900 z-10 py-1">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="text-white hover:text-primary p-2 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer transition"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>
                        
                        <div className="text-white [&_*]:text-white">
                            <CreateDoctorPost onPostSuccess={handlePostSuccess} />
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Editing Post */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
                    <div className="relative w-full max-w-3xl my-8 p-6 md:p-8 bg-gray-900 text-white shadow-2xl rounded-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-end mb-2 sticky top-0 bg-gray-900 z-10 py-1">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingPost(null);
                                }}
                                className="text-white hover:text-primary p-2 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer transition"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>
                        
                        <div className="text-white [&_*]:text-white">
                            <DoctorEdtiPost 
                                postData={editingPost} 
                                onUpdateSuccess={handleUpdateSuccess} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPost;