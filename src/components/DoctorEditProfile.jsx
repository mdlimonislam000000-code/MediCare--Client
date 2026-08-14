"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const DoctorEditProfile = ({ doctorData, user, onUpdateSuccess }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',        
    email: '',        
    image: '',        
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
        image: doctorData?.image || user?.image || '',
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

    try {
      const responseData = await authClient.token();
      const token = responseData?.data?.token || responseData?.token || responseData;

      if (!token || typeof token !== 'string') {
        toast.error("Authentication token not found or invalid. Please login again.");
        setLoading(false);
        return;
      }

      const userInfoData = {
        name: formData.name,
        email: formData.email,
        image: formData.image,
      };

      const doctorPostData = {
        userId: userId,
        email: userEmail,
        doctorName: formData.name,
        specialty: formData.specialty,
        qualifications: formData.qualifications,
        hospitalName: formData.hospitalName,
        experience: formData.experience,
        consultationFee: formData.consultationFee,
        phone: formData.phone,
        chamberAddress: formData.chamberAddress,
        content: formData.content,
        imageUrl: formData.image,
      };

      const [userRes, postRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(userInfoData),
        }),
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts/${userId}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(doctorPostData),
        })
      ]);

      const userResult = await userRes.json();
      const postResult = await postRes.json();

      if (userRes.ok || postRes.ok || userResult.acknowledged || postResult.acknowledged) {
        toast.success("Profile updated successfully!");
        setIsOpen(false);
        
        router.refresh();

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
      <Button 
        onPress={() => setIsOpen(true)}
        className="bg-primary text-primary-foreground px-7 shadow-md hover:scale-105 transition-all cursor-pointer"
      >
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="center">
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-xl bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden">
              
              <Modal.Header className="border-b dark:border-zinc-800 px-6 py-4 flex flex-col gap-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Doctor Profile</h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Update your account info and professional details below.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
                <Surface variant="default" className="bg-transparent shadow-none p-0">
                  <form id="edit-doctor-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    <div className="border-b border-base-200 pb-3 mb-2">
                      <p className="text-sm font-bold text-primary mb-3">Basic Account Info</p>
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium">Full Name</label>
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

                  </form>
                </Surface>
              </Modal.Body>

              <Modal.Footer className="border-t dark:border-zinc-800 px-6 py-4 flex justify-end gap-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                <Button variant="secondary" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="edit-doctor-form" disabled={loading} className="bg-primary text-primary-foreground">
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DoctorEditProfile;