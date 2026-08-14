import DoctorSchedulesPage from "@/components/DoctorSchedulesPage";

export const metadata = {
  title: "Doctor Schedules - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const ManageSchedules = () => {


  return (
    <div>
      <DoctorSchedulesPage></DoctorSchedulesPage>
    </div>
  );
};

export default ManageSchedules;