"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  HiOutlineHome, 
  HiOutlineUserGroup, 
  HiOutlineInformationCircle, 
  HiOutlineMail, 
  HiOutlineViewGrid, 
  HiOutlineLogout, 
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSun,
  HiOutlineMoon
} from "react-icons/hi";
import { MdLocalHospital } from "react-icons/md";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [theme, setTheme] = useState("light");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  useEffect(() => {
    function handleClickOutside(event) {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const isActive = (path) => pathname === path;
  const userRole = user?.role;

  let dashboardPath = "/dashboard";
  if (userRole === "admin") {
    dashboardPath = "/dashboard/admin/ecosystem-analytics"; 
  } else if (userRole === "doctor") {
    dashboardPath = "/dashboard/doctor/overview"; 
  } else if (userRole === "patient") {
    dashboardPath = "/dashboard/patient/overview";
  } else if (user && !userRole) {
    dashboardPath = "/dashboard/patient/overview"; 
  }

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className={`text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 ${
            isActive("/") 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
              : "text-foreground/80 hover:bg-blue-500/10 hover:text-blue-600"
          }`}
        >
          <HiOutlineHome className="text-lg" /> Home
        </Link>
      </li>
      <li>
        <Link
          href="/find-doctors"
          onClick={() => setMobileMenuOpen(false)}
          className={`text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 ${
            isActive("/find-doctors") 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
              : "text-foreground/80 hover:bg-blue-500/10 hover:text-blue-600"
          }`}
        >
          <HiOutlineUserGroup className="text-lg" /> Find Doctors
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          onClick={() => setMobileMenuOpen(false)}
          className={`text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 ${
            isActive("/about") 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
              : "text-foreground/80 hover:bg-blue-500/10 hover:text-blue-600"
          }`}
        >
          <HiOutlineInformationCircle className="text-lg" /> About Us
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          onClick={() => setMobileMenuOpen(false)}
          className={`text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 ${
            isActive("/contact") 
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
              : "text-foreground/80 hover:bg-blue-500/10 hover:text-blue-600"
          }`}
        >
          <HiOutlineMail className="text-lg" /> Contact Us
        </Link>
      </li>
      {user && (
        <li>
          <Link
            href={dashboardPath}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 ${
              pathname.startsWith("/dashboard") 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105" 
                : "text-foreground/80 hover:bg-blue-500/10 hover:text-blue-600"
            }`}
          >
            <HiOutlineViewGrid className="text-lg" /> Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-background/80 backdrop-blur-md shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3.5 px-4 md:px-8">
        
        <div className="flex items-center gap-3" ref={mobileMenuRef}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-blue-500/10 text-foreground transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <HiOutlineX className="text-2xl text-blue-600" /> : <HiOutlineMenu className="text-2xl text-blue-600" />}
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white p-3 rounded-2xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform flex items-center justify-center font-bold text-xl">
              <MdLocalHospital className="text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-blue-600 transition-colors">
                MediCare <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Connect</span>
              </span>
              <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase hidden sm:block">
                Healthcare System
              </span>
            </div>
          </Link>

          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-3/4 sm:w-1/2 bg-background/95 backdrop-blur-2xl border-r border-b border-blue-500/20 shadow-2xl py-6 px-6 rounded-br-3xl animate-in fade-in slide-in-from-left duration-200">
              <ul className="flex flex-col gap-2">
                {navLinks}
              </ul>

              {!isPending && !user && (
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-blue-500/20">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-sm font-bold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-center shadow-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 text-center hover:opacity-95 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-1.5 bg-blue-500/5 p-1.5 rounded-2xl border border-blue-500/10 backdrop-blur-md shadow-inner">
            {navLinks}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition-transform hover:rotate-45 shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <HiOutlineMoon className="text-xl" />
            ) : (
              <HiOutlineSun className="text-xl text-amber-400" />
            )}
          </button>

          {isPending && (
            <div className="w-9 h-9 rounded-full bg-blue-500/20 animate-pulse" />
          )}

          {!isPending && !user && (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 text-xs font-bold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:opacity-95 transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {!isPending && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-600 ring-offset-2 hover:ring-indigo-600 shadow-lg overflow-hidden bg-blue-500/10 flex items-center justify-center font-bold text-blue-600">
                  {user.image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={user.image}
                      alt={user.name || "User Avatar"}
                    />
                  ) : (
                    <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                  )}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-background border border-blue-500/20 rounded-2xl shadow-2xl backdrop-blur-xl py-2 px-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2.5 bg-blue-500/10 rounded-xl mb-1.5 cursor-default">
                    <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">
                      Account
                    </p>
                    <p className="font-bold text-foreground text-sm mt-0.5 truncate">{user.name}</p>
                    <p className="text-[11px] text-foreground/60 truncate mt-0.5">{user.email}</p>
                  </div>

                  <Link
                    href={dashboardPath}
                    onClick={() => setDropdownOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-semibold text-foreground/80 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition cursor-pointer"
                  >
                    <HiOutlineViewGrid className="text-base text-blue-600 shrink-0" />
                    <span>Dashboard</span>
                  </Link>

                  <div className="h-[1px] bg-blue-500/20 my-1.5" />

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-semibold text-red-500 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                  >
                    <HiOutlineLogout className="text-base shrink-0 text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;