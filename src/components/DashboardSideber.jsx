"use client";

import { useSession, authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHistory,
  FaUserShield,
  FaUserCircle,
  FaTicketAlt,
  FaRegStar,
  FaArrowLeft,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TfiStatsUp } from "react-icons/tfi";
import { GrSchedule } from "react-icons/gr";
import { MdForwardToInbox, MdOutlineVerified } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { RiArrowRightCircleLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import Logo from "./Logo";

const DashboardSideber = ({ isOpen, setIsOpen }) => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const adminMenu = [
    {
      key: "ecosystem-analytics",
      label: "Ecosystem Analytics",
      href: "/dashboard/admin/ecosystem-analytics",
      icon: <RiArrowRightCircleLine />,
    },
    {
      key: "manage-user",
      label: "Manage User Account",
      href: "/dashboard/admin/manage-user",
      icon: <FaUserShield />,
    },
    {
      key: "verify-doctor",
      label: "Verify Doctors",
      href: "/dashboard/admin/verify-doctor",
      icon: <MdOutlineVerified />,
    },
    {
      key: "clinical-registry",
      label: "Clinical Appts Registry",
      href: "/dashboard/admin/clinical-registry",
      icon: <MdOutlineVerified />,
    },
    {
      key: "cash-flows",
      label: "Stripe Cash Flows",
      href: "/dashboard/admin/cash-flows",
      icon: <FaHistory />,
    },
    {
      key: "profile",
      label: "My Profile",
      href: "/dashboard/admin/admin-profile",
      icon: <CgProfile />
    },
  ];

  const patientMenu = [
    {
      key: "overview",
      label: "Overview",
      href: "/dashboard/patient/overview",
      icon: <FaUserCircle />,
    },
    {
      key: "my-appointments",
      label: "My Appointments",
      href: "/dashboard/patient/my-appointments",
      icon: <FaTicketAlt />,
    },
    {
      key: "payments-history",
      label: "Payments History",
      href: "/dashboard/patient/payments-history",
      icon: <FaHistory />,
    },
    {
      key: "feedback-reviews",
      label: "Feedback Reviews",
      href: "/dashboard/patient/feedback-reviews",
      icon: <FaRegStar />,
    },
    {
      key: "profile",
      label: "my-profile",
      href: "/dashboard/patient/profile",
      icon: <CgProfile />
    },
  ];

  const doctorMenu = [
    {
      key: "overview",
      label: "Dashboard Overview",
      href: "/dashboard/doctor/overview",
      icon: <TfiStatsUp />,
    },
    {
      key: "manage-schedueles",
      label: "Schedueles",
      href: "/dashboard/doctor/manage-schedueles",
      icon: <GrSchedule />,
    },
    {
      key: "doctor-post",
      label: "Doctor Post",
      href: "/dashboard/doctor/doctor-post",
      icon: <FaPlusCircle />,
    },
    {
      key: "appointments-inbox",
      label: "Appointments Inbox",
      href: "/dashboard/doctor/appointments-inbox",
      icon: <MdForwardToInbox />,
    },
    {
      key: "prescription-cabin",
      label: "Prescription Cabin",
      href: "/dashboard/doctor/prescription-cabin",
      icon: <LuFileSpreadsheet />,
    },
    {
      key: "doctor-profile",
      label: " My Profile",
      href: "/dashboard/doctor/doctor-profile",
      icon: <CgProfile />,
    },
  ];

  const role = user?.role;
  const menuItems =
    role === "doctor"
      ? doctorMenu
      : role === "patient"
        ? patientMenu
        : role === "admin"
          ? adminMenu
          : [];

  return (
    <>
    
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside className={`w-64 h-screen border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#080c16] text-gray-900 dark:text-white flex flex-col justify-between fixed md:sticky top-0 z-50 shadow-xl md:shadow-sm transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
            <Logo />

            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
            >
              <IoClose className="text-xl" />
            </button>
          </div>

          <div className="p-6">
            {isPending && <p className="text-xs text-gray-400">Loading...</p>}
            {!isPending && user && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-pink-500 relative shrink-0">
                  <Image
                    src={user.image || "https://avatar.vercel.sh/placeholder"}
                    alt="user image"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 truncate capitalize">
                    {user.role || "User"}
                  </p>
                </div>
              </div>
            )}
          </div>

          
          <div className="px-4 pb-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition w-full border border-gray-200 dark:border-white/10"
            >
              <FaArrowLeft className="text-sm shrink-0 text-pink-500" />
              <span>Back to Site</span>
            </Link>
          </div>

          <nav className="px-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-330px)]">
            {menuItems?.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-pink-500/10 text-pink-500 border border-pink-500/20"
                      : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="text-sm shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/5 transition w-full cursor-pointer"
          >
            <FaSignOutAlt className="text-sm shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSideber;