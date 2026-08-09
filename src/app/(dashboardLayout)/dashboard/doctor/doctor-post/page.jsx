'use client'
import { authClient } from '@/lib/auth-client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DoctorPost = () => {
    const { data: session, isPending } = authClient.useSession();
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
        doctorName: user.name,
        email: user.email,
        imageUrl: user.image
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: tokenData } = await authClient.token();
    const token = typeof tokenData === 'string' ? tokenData : tokenData?.token;
    
    const response = await fetch('http://localhost:5000/api/doctor-posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData), 
    });
    
    const result = await response.json();
    
    if (result.insertedId) {
      toast.success('Doctor profile & post saved successfully!');

      const currentUserId = user?.id || user?._id;
      setFormData({
        userId: currentUserId,
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
    } else {
      toast.error('Failed to submit post.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-gray-900 shadow-2xl rounded-2xl border border-gray-800 text-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Doctor Details & Post Form</h2>
        <p className="text-sm text-gray-400 mt-2">Add professional info, schedule slots, and medical insights.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Doctor's Name (From Session)</label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              readOnly
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              placeholder="e.g. Cardiologist"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address (From Session)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g. +8801XXXXXXXXX"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
              placeholder="e.g. MBBS, FCPS"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="e.g. 5+ Years"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Consultation Fee</label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              required
              placeholder="e.g. 500"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Chamber Address</label>
            <input
              type="text"
              name="chamberAddress"
              value={formData.chamberAddress}
              onChange={handleChange}
              required
              placeholder="e.g. Dhaka Medical Center, Room 402"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Hospital Name</label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              required
              placeholder="e.g. Square Hospital / Dhaka Medical"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl space-y-4">
          <label className="block text-sm font-semibold text-gray-300">Available Slots (Time Range)</label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Session</label>
              <select
                name="sessionType"
                value={formData.sessionType}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon/Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">From Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">To Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Heart Care Tips"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="e.g. Cardiology, Mental Health"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Detailed Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Write your article or advice here..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-white hover:bg-gray-200 text-gray-900 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
        >
          Publish Information & Post
        </button>
      </form>
    </div>
  );
};

export default DoctorPost;