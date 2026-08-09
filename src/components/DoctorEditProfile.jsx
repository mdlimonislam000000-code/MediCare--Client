"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import toast from "react-hot-toast";

const DoctorEditProfile = ({ doctorData, user, onUpdateSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',         
    email: '',         
    image: '',         
    doctorName: '',    
    specialty: '',
    qualifications: '',
    hospitalName: '',
    experience: '',
    consultationFee: '',
    phone: '',
    chamberAddress: '',
    content: ''
  });

  useEffect(() => {
    if (doctorData || user) {
      setFormData({
        name: user?.name || doctorData?.name || '',
        email: user?.email || doctorData?.email || '',
        image: user?.image || doctorData?.image || '',
        doctorName: doctorData?.name || user?.name || '',
        specialty: doctorData?.specialty === 'Specialist' || doctorData?.specialty === 'Not Provided' ? '' : doctorData?.specialty || '',
        qualifications: doctorData?.degree === 'MBBS' || doctorData?.degree === 'Not Provided' ? '' : doctorData?.degree || '',
        hospitalName: doctorData?.hospital === 'Hospital Name' || doctorData?.hospital === 'Not Provided' ? '' : doctorData?.hospital || '',
        experience: doctorData?.experience && doctorData.experience !== '0' ? doctorData.experience.replace(' Years', '').replace('1+ Years', '') : '',
        consultationFee: doctorData?.fees === '0' ? '' : doctorData?.fees || '',
        phone: doctorData?.phone === '+880 1XXXXXXXXX' || doctorData?.phone === 'Not Provided' ? '' : doctorData?.phone || '',
        chamberAddress: doctorData?.chamber === 'Chamber Address not specified' || doctorData?.chamber === 'Not Provided' ? '' : doctorData?.chamber || '',
        content: doctorData?.about === 'No description provided yet.' || doctorData?.about === 'Please complete your doctor profile.' ? '' : doctorData?.about || ''
      });
    }
  }, [doctorData, user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const userId = user?.id || user?._id;
    const userEmail = user?.email;

    const userInfoData = {
      name: formData.name,
      email: formData.email,
      image: formData.image,
    };

    const doctorPostData = {
      userId: userId,
      email: userEmail,
      doctorName: formData.doctorName || formData.name,
      specialty: formData.specialty,
      qualifications: formData.qualifications,
      hospitalName: formData.hospitalName,
      experience: formData.experience,
      consultationFee: formData.consultationFee,
      phone: formData.phone,
      chamberAddress: formData.chamberAddress,
      content: formData.content,
      image: formData.image,
    };

    try {
      const [userRes, postRes] = await Promise.all([
        fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userInfoData),
        }),
        fetch(`http://localhost:5000/api/doctor-posts/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(doctorPostData),
        })
      ]);

      const userResult = await userRes.json();
      const postResult = await postRes.json();

      if (userRes.ok || postRes.ok || userResult.acknowledged || postResult.acknowledged) {
        toast.success("Profile updated successfully!");
        setIsOpen(false);
        if (onUpdateSuccess) {
          onUpdateSuccess();
        } else {
          window.location.reload();
        }
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <button 
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn btn-primary px-7 btn-sm sm:btn-md shadow-md hover:scale-105 transition-all"
        >
          Edit Profile
        </button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Edit Doctor Profile</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Update your account info and professional details below.
                </p>
              </Modal.Header>
              <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
                <Surface variant="default">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    <div className="border-b border-base-200 pb-3 mb-2">
                      <p className="text-sm font-bold text-primary mb-3">Basic Account Info</p>
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">User Name</label>
                          <input 
                            type="text"
                            name="name"
                            placeholder="Enter your name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Email</label>
                          <input 
                            type="text"
                            name="email"
                            placeholder="Enter your email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Profile Image URL</label>
                          <input 
                            type="text"
                            name="image"
                            placeholder="Enter image URL" 
                            value={formData.image}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-primary mb-3">Professional & Chamber Info</p>
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Doctor Display Name</label>
                          <input 
                            type="text"
                            name="doctorName"
                            placeholder="Enter doctor display name" 
                            value={formData.doctorName}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Specialty</label>
                          <input 
                            type="text"
                            name="specialty"
                            placeholder="e.g. Cardiology, Pediatrics" 
                            value={formData.specialty}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Qualifications / Degree</label>
                          <input 
                            type="text"
                            name="qualifications"
                            placeholder="e.g. MBBS, FCPS" 
                            value={formData.qualifications}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Hospital Name</label>
                          <input 
                            type="text"
                            name="hospitalName"
                            placeholder="Enter hospital name" 
                            value={formData.hospitalName}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Experience (Years)</label>
                          <input 
                            type="text"
                            name="experience"
                            placeholder="e.g. 5" 
                            value={formData.experience}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Consultation Fee (৳)</label>
                          <input 
                            type="text"
                            name="consultationFee"
                            placeholder="e.g. 500" 
                            value={formData.consultationFee}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Phone</label>
                          <input 
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Chamber Address</label>
                          <input 
                            type="text"
                            name="chamberAddress"
                            placeholder="Enter chamber address" 
                            value={formData.chamberAddress}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">About Doctor</label>
                          <input 
                            type="text"
                            name="content"
                            placeholder="Write something about yourself" 
                            value={formData.content}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                      <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>

                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DoctorEditProfile;