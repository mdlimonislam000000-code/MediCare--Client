'use client'
import { authClient } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CreateDoctorPost = ({ onPostSuccess }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [formData, setFormData] = useState({
        userId: '', 
        doctorName: '',
        email: '',
        phone: '',
        imageUrl: '', 
        specialty: '',
        qualifications: '',
        experience: '',
        consultationFee: '',
        chamberAddress: '',
        hospitalName: '',
        sessionType: 'Morning',
        startTime: '',
        endTime: '',
        title: '',
        category: '',
        content: ''
    });

    useEffect(() => {
        if (user) {
            const currentUserId = user.id || user._id; 
            setFormData((prev) => ({
                ...prev,
                userId: currentUserId,
                doctorName: user.name || '',
                email: user.email || '',
                imageUrl: user.image || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data: tokenData } = await authClient.token();
            const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData), 
            });
            
            const result = await response.json();
            
            if (response.ok || result.insertedId || result.success) {
                toast.success('Doctor profile & post saved successfully!');
                
                const currentUserId = user?.id || user?._id;
                setFormData({
                    userId: currentUserId || '',
                    doctorName: user?.name || '',
                    email: user?.email || '',
                    imageUrl: user?.image || '',
                    phone: '',
                    specialty: '',
                    qualifications: '',
                    experience: '',
                    consultationFee: '',
                    chamberAddress: '',
                    hospitalName: '',
                    sessionType: 'Morning',
                    startTime: '',
                    endTime: '',
                    title: '',
                    category: '',
                    content: ''
                });

                if (onPostSuccess) {
                    onPostSuccess();
                }
            } else {
                toast.error('Failed to submit post.');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="text-base-content bg-base-100 p-2">
            <div className="mb-6 pb-4 border-b border-base-300">
                <h2 className="text-2xl font-extrabold tracking-tight text-base-content">Doctor Details & Post Form</h2>
                <p className="text-xs text-base-content font-medium opacity-80 mt-1">Add professional info, schedule slots, and medical insights.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Doctor's Name (From Session)</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={formData.doctorName}
                            readOnly
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content opacity-70 cursor-not-allowed focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Specialty</label>
                        <input
                            type="text"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Cardiologist"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Email Address (From Session)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content opacity-70 cursor-not-allowed focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="e.g. +8801XXXXXXXXX"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Qualifications</label>
                        <input
                            type="text"
                            name="qualifications"
                            value={formData.qualifications}
                            onChange={handleChange}
                            required
                            placeholder="e.g. MBBS, FCPS"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Experience</label>
                        <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 5+ Years"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Consultation Fee</label>
                        <input
                            type="number"
                            name="consultationFee"
                            value={formData.consultationFee}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 500"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Chamber Address</label>
                        <input
                            type="text"
                            name="chamberAddress"
                            value={formData.chamberAddress}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Dhaka Medical Center, Room 402"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Square Hospital / Dhaka Medical"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>
                </div>

                <div className="p-4 bg-base-200/80 border border-base-300 rounded-xl space-y-4">
                    <label className="block text-sm font-semibold text-base-content">Available Slots (Time Range)</label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-base-content opacity-80 mb-1">Session</label>
                            <select
                                name="sessionType"
                                value={formData.sessionType}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-base-100 border border-base-300 rounded-lg text-base-content"
                            >
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon/Evening</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-base-content opacity-80 mb-1">From Time</label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-base-100 border border-base-300 rounded-lg text-base-content"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-base-content opacity-80 mb-1">To Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-base-100 border border-base-300 rounded-lg text-base-content"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Post Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Heart Care Tips"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-base-content mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Cardiology, Mental Health"
                            className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">Detailed Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Write your article or advice here..."
                        className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-base-content placeholder:opacity-40"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-primary text-primary-content hover:opacity-90 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
                >
                    Publish Information & Post
                </button>
            </form>
        </div>
    );
};

export default CreateDoctorPost;