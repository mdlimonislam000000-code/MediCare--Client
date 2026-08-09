'use client'
import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePlus } from "react-icons/hi";

const ManageSchedules = () => {
  const { data: session } = useSession();

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [workingDays, setWorkingDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    if (session?.user) {
      setDoctorEmail(session.user.email || "");
      setDoctorId(session.user._id || session.user.id || "");
    }
  }, [session]);

  const fetchSchedule = (email, id) => {
    if (!email && !id) return;
    setFetching(true);
    
    const queryParam = email ? `email=${email}` : `userId=${id}`;
    
    fetch(`http://localhost:5000/api/doctor/schedule?${queryParam}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Schedule Data:", data);
        if (data) {
          setWorkingDays(data.availableDays || []);
          setTimeSlots(data.availableSlots || []);
        }
        setFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching schedule:", err);
        setFetching(false);
      });
  };

  useEffect(() => {
    if (doctorEmail || doctorId) {
      fetchSchedule(doctorEmail, doctorId);
    }
  }, [doctorEmail, doctorId]);

  const handleAddDay = () => {
    if (!workingDays.includes(selectedDay)) {
      setWorkingDays([...workingDays, selectedDay]);
    }
  };

  const handleRemoveDay = (dayToRemove) => {
    setWorkingDays(workingDays.filter((day) => day !== dayToRemove));
  };

  const handleAddTime = () => {
    if (!timeSlots.includes(selectedTime)) {
      setTimeSlots([...timeSlots, selectedTime]);
    }
  };

  const handleRemoveTime = (timeToRemove) => {
    setTimeSlots(timeSlots.filter((time) => time !== timeToRemove));
  };

  const handleSaveSchedule = () => {
    if (!doctorEmail && !doctorId) {
      toast.error("Doctor email or ID is missing!");
      return;
    }

    setLoading(true);
    const scheduleData = { 
      email: doctorEmail, 
      userId: doctorId,
      availableDays: workingDays, 
      availableSlots: timeSlots 
    };

    fetch('http://localhost:5000/api/doctor/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Save Response:", data);
        toast.success("Schedule saved successfully!");
        setLoading(false);
        fetchSchedule(doctorEmail, doctorId);
      })
      .catch((err) => {
        console.error("Save error:", err);
        toast.error("Failed to save schedule!");
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="space-y-6">
        
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-4">
          <label className="font-semibold text-sm text-zinc-700 dark:text-zinc-300 shrink-0">
            Doctor Email:
          </label>
          <input 
            type="email" 
            value={doctorEmail} 
            onChange={(e) => setDoctorEmail(e.target.value)}
            placeholder="Enter doctor email..." 
            className="input input-bordered w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm border-zinc-300 dark:border-zinc-700"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Manage Clinical Schedule Slots
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Configure your weekly working days and available consultation hours.
            </p>
          </div>
          
          <button 
            onClick={handleSaveSchedule}
            disabled={loading}
            className="btn bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 border-none px-6 shadow-md cursor-pointer transition-all disabled:bg-zinc-400 dark:disabled:bg-zinc-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {fetching ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <h2 className="text-lg font-semibold animate-pulse text-indigo-600 dark:text-indigo-400">Loading Schedule...</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">Working Weekdays</h3>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-400 font-medium">Configure Days</span>
              </div>

              <div className="flex gap-3 items-center">
                <select 
                  value={selectedDay} 
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="select select-bordered w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 text-sm"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>

                <button 
                  onClick={handleAddDay}
                  className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none flex items-center gap-1 px-5 shrink-0 cursor-pointer"
                >
                  <HiOutlinePlus className="text-lg" /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {workingDays.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">No working days added yet.</p>
                ) : (
                  workingDays.map((day, idx) => (
                    <span key={idx} className="badge badge-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 gap-2 p-3 font-medium">
                      {day}
                      <button 
                        onClick={() => handleRemoveDay(day)} 
                        className="hover:text-red-500 transition-colors ml-1 font-bold cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">Configured Appointment Hours</h3>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-400 font-medium">Configure Slots</span>
              </div>

              <div className="flex gap-3 items-center">
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="select select-bordered w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 text-sm"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>

                <button 
                  onClick={handleAddTime}
                  className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none flex items-center gap-1 px-5 shrink-0 cursor-pointer"
                >
                  <HiOutlinePlus className="text-lg" /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {timeSlots.length === 0 ? (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">No time slots added yet.</p>
                ) : (
                  timeSlots.map((time, idx) => (
                    <span key={idx} className="badge badge-lg bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 gap-2 p-3 font-medium">
                      {time}
                      <button 
                        onClick={() => handleRemoveTime(time)} 
                        className="hover:text-red-500 transition-colors ml-1 font-bold cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSchedules;