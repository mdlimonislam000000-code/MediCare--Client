import React from "react";
import { FaUsers, FaCalendarAlt, FaStar, FaCommentDots } from "react-icons/fa";

const DoctorOverviewCard = ({ 
  completedAppointments = 0, 
  totalAppointments = 0, 
  clinicianScore = "0.0", 
  totalFeedbacks = 0 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
          <FaUsers />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {completedAppointments}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
            Complete Appointment
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
          <FaCalendarAlt />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {totalAppointments}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
            Pending Paitent
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
          <FaStar />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {clinicianScore} / 5.0
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">
            Clinician Score
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
          <FaCommentDots />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {totalFeedbacks}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wider">
            FEEDBACKS
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverviewCard;