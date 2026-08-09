"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

const BookingDoctor = ({ doctor }) => {
  const [loading, setLoading] = useState(false);
  
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id || session?.user?._id;
  
  console.log("Full Doctor Object received:", doctor);
  console.log("Doctor ID:", doctor?._id || doctor?.id);
  console.log("Doctor User ID (if available):", doctor?.userId);
  console.log("User ID from session:", userId);

  const [formDataState, setFormDataState] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    appointmentDate: "", 
    message: "",
  });

  const handleChange = (name, value) => {
    setFormDataState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    
    e.preventDefault();

    const currentDoctorId = doctor?._id || doctor?.id;
    const doctorUserId = doctor?.userId || "";

    console.log("Submitting with Doctor ID:", currentDoctorId);
    console.log("Submitting with Doctor User ID:", doctorUserId);

    if (!currentDoctorId) {
      toast.error("Doctor ID is missing!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("price", doctor.consultationFee);
      formData.append("doctorName", doctor.doctorName);
      formData.append("doctorId", currentDoctorId);
      formData.append("doctorUserId", doctorUserId); 
      formData.append("userId", userId || ""); 
      formData.append("createdAt", new Date().toISOString());
      formData.append("patientName", formDataState.name);
      formData.append("patientEmail", formDataState.email);
      formData.append("patientPhone", formDataState.phone);
      formData.append("patientAge", formDataState.age);
      formData.append("appointmentDate", formDataState.appointmentDate);
      formData.append("message", formDataState.message);

      const stripeRes = await fetch("/api/payment", {
        method: "POST",
        body: formData,
      });

      const stripeData = await stripeRes.json();
      
      if (stripeData.url) {
        window.location.href = stripeData.url; 
      } else {
        toast.error(stripeData.error || "Failed to redirect to payment gateway.");
      }

    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal>
        <Button className="w-full py-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition-all duration-300">
          Book now with <span className="text-red-500 font-bold text-[1.1rem]">{doctor?.consultationFee}</span> taka
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="w-full max-w-md max-h-[85vh] flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl">
              <Modal.CloseTrigger />
              
              <Modal.Header className="p-6 pb-2 flex-shrink-0">
                <Modal.Heading>Doctor Appointment Booking</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Fill out the form below to book your appointment with the doctor.
                </p>
              </Modal.Header>

              <form onSubmit={handleBookingSubmit} className="flex flex-col flex-grow overflow-hidden">
                
                <div className="p-6 overflow-y-auto flex-grow">
                  <Surface variant="default" className="flex flex-col gap-4">
                    <TextField className="w-full" variant="secondary">
                      <Label>Name</Label>
                      <Input 
                        type="text"
                        value={formDataState.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name" 
                        required 
                      />
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label>Email</Label>
                      <Input 
                        type="email" 
                        value={formDataState.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email" 
                        required 
                      />
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label>Phone</Label>
                      <Input 
                        type="tel" 
                        value={formDataState.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter your phone number" 
                        required 
                      />
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label>Age</Label>
                      <Input 
                        type="text" 
                        value={formDataState.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        placeholder="Enter your age" 
                        required 
                      />
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label>Appointment Date</Label>
                      <Input 
                        type="date" 
                        value={formDataState.appointmentDate}
                        onChange={(e) => handleChange("appointmentDate", e.target.value)}
                        required 
                      />
                    </TextField>

                    <TextField className="w-full" variant="secondary">
                      <Label>Problem / Message</Label>
                      <Input 
                        type="text" 
                        value={formDataState.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Write your symptoms or message" 
                      />
                    </TextField>
                  </Surface>
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-3 flex-shrink-0 bg-inherit">
                  <Button slot="close" variant="secondary" type="button" className="w-1/2">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="w-1/2 bg-indigo-600 text-white font-semibold">
                    {loading ? "Processing..." : "Pay & Confirm"}
                  </Button>
                </div>

              </form>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default BookingDoctor;