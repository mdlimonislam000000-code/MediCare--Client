'use client'
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineLocationMarker, 
  HiOutlineCalendar,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineShieldCheck,
  HiOutlineX
} from "react-icons/hi";
import { Button } from "@heroui/react";

const PatientProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;


  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState(user?.name );
  const [email, setEmail] = useState(user?.email );
  const [image, setImage] = useState(user?.image );
  const [loading, setLoading] = useState(false);


  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-base-content/60 animate-pulse">Loading profile...</p>
      </div>
    );
  }


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = user?.id || user?._id;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, image }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditOpen(false);
        window.location.reload(); 
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong. Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    const userId = user?.id || user?._id;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        window.location.href = "/login";
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong during deletion.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto relative">

      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-base-content tracking-tight">Patient Profile</h2>
        <p className="text-base-content/60 text-sm mt-1">Manage your personal information and account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 text-center h-fit">
          <div className="avatar placeholder mb-4 mx-auto">
            <div className="bg-primary text-primary-content rounded-full w-24 h-24 text-3xl font-bold uppercase overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt={user?.name || "Patient"} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name ? user.name.charAt(0) : "P"}</span>
              )}
            </div>
          </div>
          <h3 className="text-xl font-bold text-base-content">{user?.name || "Patient Name"}</h3>
          <p className="text-sm text-base-content/60 mt-1">{user?.email || "patient@example.com"}</p>
          <div className="divider my-4"></div>
          
          <div className="badge badge-primary badge-outline font-medium px-4 py-3 mb-4">
            Role : {user?.role || "Patient"}
          </div>

          
          <div className="flex flex-col gap-2.5 mt-2">
            <Button 
              onClick={() => {
                setName(user?.name );
                setEmail(user?.email );
                setImage(user?.image );
                setIsEditOpen(true);
              }} 
              className="btn btn-primary btn-sm w-full font-medium flex items-center justify-center gap-2"
            >
              <HiOutlinePencilAlt className="text-lg" /> Edit Profile
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteAccount} 
              className="btn btn-outline btn-sm w-full font-medium flex items-center justify-center gap-2 text-error border-error hover:bg-error hover:text-error-content"
            >
              <HiOutlineTrash className="text-lg" /> Delete Account
            </Button>
          </div>
        </div>

        {/* Detailed Information Card (Address is visible here) */}
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
            <HiOutlineUser className="text-primary text-xl" /> Personal Information
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineUser /> Full Name
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">{user?.name || "N/A"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineMail /> Email Address
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">{user?.email || "N/A"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineShieldCheck /> Status
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0 capitalize">
                {user?.status || "Active"}
              </span>
            </div>


            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineLocationMarker /> Address
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">{user?.address || "Dhaka, Bangladesh"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pb-2">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineCalendar /> Account Created
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>


      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-200 w-full max-w-md p-6 relative space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-base-200 pb-3">
              <h3 className="text-lg font-bold text-base-content">Edit Profile</h3>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="btn btn-sm btn-ghost btn-circle text-base-content/60 hover:text-base-content"
              >
                <HiOutlineX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-base-content/70 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="input input-bordered w-full text-sm" 
                  required 
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-base-content/70 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="input input-bordered w-full text-sm" 
                  required 
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-base-content/70 block mb-1">Profile Image URL</label>
                <input 
                  type="url" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  className="input input-bordered w-full text-sm" 
                  placeholder="Paste image link here" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-base-200">
                <button 
                  type="button" 
                  onClick={() => setIsEditOpen(false)} 
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm" 
                  disabled={loading}
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

export default PatientProfile;