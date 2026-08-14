'use client'
import React, { useState, useEffect } from "react";
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
import toast from "react-hot-toast";

const PatientProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setImage(user.image || "");
    }
  }, [user]);

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

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          setIsEditOpen(false);
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to update profile.");
          setLoading(false);
        }
      });

      if (error) {
        toast.error(error.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong. Failed to update profile.");
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
        toast.error("Account deleted successfully.");
        window.location.href = "/login";
      } else {
        toast.error("Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Something went wrong during deletion.");
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
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full w-24 h-24 text-3xl font-bold uppercase overflow-hidden shadow-lg">
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
          
          <div className="badge bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-medium px-4 py-3 mb-4">
            Role : {user?.role || "Patient"}
          </div>
          
          <div className="flex flex-col gap-2.5 mt-2">
            <Button 
              onClick={() => {
                setName(user?.name || "");
                setEmail(user?.email || "");
                setImage(user?.image || "");
                setIsEditOpen(true);
              }} 
              className="w-full font-semibold py-2.5 px-4 rounded-xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-0"
            >
              <HiOutlinePencilAlt className="text-lg" /> Edit Profile
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteAccount} 
              className="w-full font-semibold py-2.5 px-4 rounded-xl text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <HiOutlineTrash className="text-lg" /> Delete Account
            </Button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 md:col-span-2">
          <h3 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
            <HiOutlineUser className="text-indigo-500 text-xl" /> Personal Information
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineUser className="text-indigo-400" /> Full Name
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">{user?.name || "N/A"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineMail className="text-indigo-400" /> Email Address
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">{user?.email || "N/A"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineShieldCheck className="text-indigo-400" /> Status
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0 capitalize">
                {user?.status || "Active"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between border-b border-base-200 pb-4">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineLocationMarker className="text-indigo-400" /> Address
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">{user?.address || "Dhaka, Bangladesh"}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pb-2">
              <span className="text-sm text-base-content/60 flex items-center gap-2">
                <HiOutlineCalendar className="text-indigo-400" /> Account Created
              </span>
              <span className="font-semibold text-base-content mt-1 sm:mt-0">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md p-6 relative space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <h3 className="text-lg font-bold text-white">Edit Profile</h3>
              <button 
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="btn btn-sm btn-ghost btn-circle text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <HiOutlineX className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="input input-bordered w-full text-sm bg-gray-800 text-white border-gray-600 focus:border-indigo-500" 
                  required 
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="input input-bordered w-full text-sm bg-gray-800 text-gray-400 border-gray-600 cursor-not-allowed" 
                  disabled 
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Profile Image URL</label>
                <input 
                  type="url" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  className="input input-bordered w-full text-sm bg-gray-800 text-white border-gray-600 focus:border-indigo-500" 
                  placeholder="Paste image link here" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-700">
                <button 
                  type="button" 
                  onClick={() => setIsEditOpen(false)} 
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-gray-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 shadow-md shadow-indigo-500/25 transition cursor-pointer" 
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