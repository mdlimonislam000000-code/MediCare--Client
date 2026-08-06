import { Button } from "@heroui/react";
import Link from "next/link"; 
import React from "react";
import {
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaWallet,
} from "react-icons/fa";

const AllDoctorsCard = ({ doc }) => {
  return (
    <div>
      <div
        key={doc._id}
        className="group overflow-hidden rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
      >
        <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-gray-800">
          <img
            src={
              doc.imageUrl || "https://via.placeholder.com/500x500?text=Doctor"
            }
            alt={doc.doctorName}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          <div className="absolute bottom-5 left-5 right-5">
            <h2 className="text-2xl font-bold text-white">{doc.doctorName}</h2>

            <p className="text-indigo-300 text-sm font-medium mt-0.5">
              {doc.specialty}
            </p>
          </div>

          <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
            {doc.hospitalName || "General Hospital"}
          </span>
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="space-y-4 flex justify-around">
              <div>
                <div className="mb-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-wider bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50 inline-block">
                    "{doc.title}"
                  </span>
                </div>

                <div className="mb-2 flex gap-3.5 items-center">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 flex-shrink-0">
                    <FaUserGraduate size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-gray-400 font-medium">
                      Qualification
                    </p>
                    <p className="text-slate-800 dark:text-gray-200 text-sm font-semibold">
                      {doc.qualifications}
                    </p>
                  </div>
                </div>

                <div className="mb-2 flex gap-3.5 items-center">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex-shrink-0">
                    <FaBriefcase size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-gray-400 font-medium">
                      Experience
                    </p>
                    <p className="text-slate-800 dark:text-gray-200 text-sm font-semibold">
                      {doc.experience}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex gap-3.5 items-center">
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex-shrink-0">
                    <FaWallet size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-gray-400 font-medium">
                      Consultation Fee
                    </p>
                    <p className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                      ৳ {doc.consultationFee}
                    </p>
                  </div>
                </div>

                <div className="flex mb-2 gap-3.5 items-center">
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex-shrink-0">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-gray-400 font-medium">
                      Chamber
                    </p>
                    <p className="text-slate-800 dark:text-gray-200 text-sm">
                      {doc.chamberAddress}
                    </p>
                  </div>
                </div>

                <div className="flex mb-2 gap-3.5 items-center">
                  <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-500 flex-shrink-0">
                    <FaClock size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-gray-400 font-medium">
                      Schedule ({doc.sessionType})
                    </p>
                    <p className="text-slate-800 dark:text-gray-200 text-sm font-semibold">
                      {doc.startTime} - {doc.endTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href={`/doctor/${doc._id}`} className="w-full block">
            <Button
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20"
              radius="lg"
              size="md"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllDoctorsCard;
