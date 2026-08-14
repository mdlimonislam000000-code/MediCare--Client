import DoctorAppointmentInbox from "@/components/DoctorAppointmentInbox";

export const metadata = {
  title: "Doctor inbox - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};

const AppointmentsInbox = () => {


  return (
   <div>
    <DoctorAppointmentInbox></DoctorAppointmentInbox>
   </div>
  );
};

export default AppointmentsInbox;