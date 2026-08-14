"use client";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { 
  FaUserInjured, FaUserMd, FaCalendarCheck, FaDollarSign 
} from "react-icons/fa";
import { 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#080c16] p-3 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">
        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{label}</p>
        <p className="text-xs font-bold text-emerald-500 mt-1">
          Score Rating : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomAreaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#080c16] p-3 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-bold text-emerald-500 mt-1">
          Daily Bookings : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};


const EcosystemAnalyticsPage = () => {
      const [analytics, setAnalytics] = useState({
    totalPatients: 0,
    totalBookings: 0,
    grossCoPays: 0,
  });
  const [verifiedClinicians, setVerifiedClinicians] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [specialtyData, setSpecialtyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        
        const {data:tokenData} = await authClient.token()
        const resAnalytics = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/ecosystem-analytics`,{
          headers: {
            'content-type' : 'application/json',
            authorization : `Bearer ${tokenData?.token}`
          }
        });
        const analyticsData = await resAnalytics.json();
        setAnalytics(analyticsData);

        const resDoctors = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts`);
        const doctorsData = await resDoctors.json();
        setVerifiedClinicians(doctorsData.length);

        const resPerf = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/clinician-performance`,{
          headers: {
            'content-type' : 'application/json',
            authorization : `Bearer ${tokenData?.token}`
          }
        });
        const perfData = await resPerf.json();
        setPerformanceData(perfData);

        
        const resTime = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/appointment-timeline`,{
          headers: {
            'content-type' : 'application/json',
            authorization : `Bearer ${tokenData?.token}`
          }
        });
        const timeData = await resTime.json();
        setTimelineData(timeData);

        const specialties = {};
        doctorsData.forEach(doc => {
          const spec = doc.specialty || doc.category || "General";
          specialties[spec] = (specialties[spec] || 0) + 1;
        });
        const pieFormatted = Object.keys(specialties).map(key => ({
          name: key,
          value: specialties[key]
        }));
        setSpecialtyData(pieFormatted.length > 0 ? pieFormatted : [
          { name: "Cardiology", value: 4 },
          { name: "Neurology", value: 3 },
          { name: "Pediatrics", value: 5 },
          { name: "Dental", value: 2 }
        ]);

      } catch (error) {
        console.error("Failed to fetch ecosystem analytics or charts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-sm font-semibold text-gray-500">Loading Analytics...</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Patients */}
        <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">
              Total Patients visits
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {analytics.totalPatients}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center text-lg">
            <FaUserInjured />
          </div>
        </div>

        <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">
              Verified Clinicians
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {verifiedClinicians}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-lg">
            <FaUserMd />
          </div>
        </div>

        <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">
              All Paitents Bookings
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              {analytics.totalBookings}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-lg">
            <FaCalendarCheck />
          </div>
        </div>

        <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase">
              Gross Co-Pays
            </p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
              ${analytics.grossCoPays}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-lg">
            <FaDollarSign />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Clinician Performance Index (Ratings)
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  fontSize={10}
                  interval={0}
                />
                <YAxis stroke="#9ca3af" fontSize={11} domain={[0, 5]} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="rating" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-500 font-semibold pt-1">
            <span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block"></span>{" "}
            Score Rating
          </div>
        </div>

        <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Appointment Timeline (Last 7 Days)
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#080c16] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Ecosystem Specialty Breakdown
        </h3>
        <div className="h-[240px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
              >
                {specialtyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EcosystemAnalyticsPage;
