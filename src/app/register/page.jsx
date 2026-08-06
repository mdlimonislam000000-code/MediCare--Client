"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff,
  HiOutlineFolderOpen
} from "react-icons/hi";
import { MdLocalHospital } from "react-icons/md";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { signUp, authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/imageUpload";


const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "patient",
      image: null,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      let imageUrl = "";

      if (data.image) {
        imageUrl = await uploadImageToImgBB(data.image);
        if (!imageUrl) {
          throw new Error("Failed to upload profile picture!");
        }
      }

      const { data: resData, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: imageUrl,
        role: data.role,
        callbackURL: "/dashboard",
        fetchOptions: {
          onResponse: () => {
            setLoading(false);
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed!");
        setLoading(false);
        return;
      }

      console.log("Registration Successful:", resData);
      router.push("/");
    } catch (err) {
      console.error("Error during registration:", err);
      setErrorMessage(err.message || "Something went wrong!");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 mt-10">
      <div className="max-w-md w-full bg-background/85 backdrop-blur-2xl border border-blue-500/20 rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white p-3.5 rounded-2xl shadow-lg shadow-blue-500/30 mb-3 items-center justify-center">
            <MdLocalHospital className="text-3xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Join <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MediCare</span>
          </h1>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
            Create an account to manage your health & appointments
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs text-center relative z-10">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                <HiOutlineUser className="text-lg" />
              </span>
              <input
                type="text"
                {...register("name", { required: "Full name is required" })}
                placeholder="Limon Ahmed"
                className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
            {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                <HiOutlineMail className="text-lg" />
              </span>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="limon@example.com"
                className="w-full pl-10 pr-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
            </div>
            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                <HiOutlineLockClosed className="text-lg" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-foreground/60 hover:text-blue-600 transition cursor-pointer"
              >
                {showPassword ? <HiOutlineEyeOff className="text-lg" /> : <HiOutlineEye className="text-lg" />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
              Profile Picture
            </label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <HiOutlineFolderOpen className="text-2xl text-blue-600" />
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                />
                <label
                  htmlFor="profile-image"
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm text-foreground/70 hover:bg-blue-500/10 transition cursor-pointer"
                >
                  <span className="truncate max-w-[180px] sm:max-w-[220px]">{fileName}</span>
                  <span className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-blue-500/20 shrink-0">
                    <HiOutlineFolderOpen className="text-base" /> Browse
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5">
              Select Role
            </label>
            <select
              {...register("role")}
              className="w-full px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 transition cursor-pointer"
            >
              <option value="patient" className="bg-background text-foreground">Patient</option>
              <option value="doctor" className="bg-background text-foreground">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        
        </form>

        <div className="flex items-center my-5 relative z-10">
          <div className="flex-grow border-t border-blue-500/20"></div>
          <span className="px-3 text-xs uppercase tracking-wider text-foreground/50 font-semibold">Or</span>
          <div className="flex-grow border-t border-blue-500/20"></div>
        </div>

        <div className="relative z-10">
          <Button
            variant="bordered"
            onPress={handleGoogleLogin}
            className="w-full rounded-xl py-6 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-foreground font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </Button>
        </div>

        <p className="text-center text-xs sm:text-sm text-foreground/70 mt-6 relative z-10">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;