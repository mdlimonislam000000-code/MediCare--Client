'use client'
import React, { useState } from "react";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineClock,
  HiOutlineSupport 
} from "react-icons/hi";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent successfully.");
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="badge badge-primary badge-outline mb-3 font-semibold px-4 py-2">
            Get in Touch
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
            We're Here to Help You
          </h1>
          <p className="text-base-content/70 text-sm mt-2">
            Have questions about doctors, appointments, or our services? Reach out to our 24/7 support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-1 space-y-6">
            
            <div className="card bg-base-100 shadow-xl border border-base-200 p-6 space-y-6">
              <h3 className="text-lg font-bold text-base-content border-b border-base-200 pb-3">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl text-xl">
                    <HiOutlineLocationMarker />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-base-content/60">Our Location</h4>
                    <p className="text-sm font-medium text-base-content mt-0.5">124/A, Green Road, Dhanmondi, Dhaka</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl text-xl">
                    <HiOutlinePhone />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-base-content/60">Phone Number</h4>
                    <p className="text-sm font-medium text-base-content mt-0.5">+880 1234 567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl text-xl">
                    <HiOutlineMail />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-base-content/60">Email Address</h4>
                    <p className="text-sm font-medium text-base-content mt-0.5">support@medicareconnect.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl text-xl">
                    <HiOutlineClock />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-base-content/60">Working Hours</h4>
                    <p className="text-sm font-medium text-base-content mt-0.5">Sat - Thu: 9:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-error/10 border border-error/20 shadow-lg p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-error text-error-content rounded-xl text-xl">
                  <HiOutlineSupport />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-error uppercase tracking-wider">Emergency Hotline</h4>
                  <p className="text-xl font-black text-error mt-0.5">16123 / 999</p>
                </div>
              </div>
              <p className="text-xs text-base-content/70">
                Available 24/7 for critical medical support, emergency appointments, and ambulance services.
              </p>
            </div>

          </div>

          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-base-200 p-8">
              <h3 className="text-xl font-bold text-base-content mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-base-content/70 block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="input input-bordered w-full text-sm focus:input-primary" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-base-content/70 block mb-1">Your Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="input input-bordered w-full text-sm focus:input-primary" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content/70 block mb-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help you?" 
                    className="input input-bordered w-full text-sm focus:input-primary" 
                    required 
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content/70 block mb-1">Your Message</label>
                  <textarea 
                    rows="5" 
                    placeholder="Write your message here..." 
                    className="textarea textarea-bordered w-full text-sm focus:textarea-primary" 
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="btn btn-primary w-full sm:w-auto px-8 font-medium"
                    disabled={loading}
                  >
                    {loading ? "Sending Message..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;