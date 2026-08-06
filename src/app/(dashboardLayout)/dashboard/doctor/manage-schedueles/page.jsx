'use client'
import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

const ManageSchedules = () => {

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTime, setSelectedTime] = useState("09:00 AM");
  const [workingDays, setWorkingDays] = useState(["Monday", "Tuesday", "Wednesday"]);
  const [timeSlots, setTimeSlots] = useState(["09:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM"]);

  
  const handleAddDay = () => {
    if (!workingDays.includes(selectedDay)) {
      setWorkingDays([...workingDays, selectedDay]);
    }
  };

  
  const handleAddTime = () => {
    if (!timeSlots.includes(selectedTime)) {
      setTimeSlots([...timeSlots, selectedTime]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight">
          Manage Clinical Schedule Slots
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">Working Weekdays</h3>
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-500 font-medium">Configure Days</span>
            </div>

            <div className="flex gap-3 items-center">
              <select 
                value={selectedDay} 
                onChange={(e) => setSelectedDay(e.target.value)}
                className="select select-bordered w-full bg-zinc-50 dark:bg-zinc-800"
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
                className="btn bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 px-5"
              >
                <HiOutlinePlus className="text-lg" /> Add
              </button>
            </div>


            <div className="flex flex-wrap gap-2 pt-2">
              {workingDays.map((day, idx) => (
                <span key={idx} className="badge badge-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 gap-2 p-3 font-medium">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100">Configured Appointment Hours</h3>

            <div className="flex gap-3 items-center">
              <select 
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="select select-bordered w-full bg-zinc-50 dark:bg-zinc-800"
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
                className="btn bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 px-5"
              >
                <HiOutlinePlus className="text-lg" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {timeSlots.map((time, idx) => (
                <span key={idx} className="badge badge-lg bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400 gap-2 p-3 font-medium">
                  {time}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ManageSchedules;