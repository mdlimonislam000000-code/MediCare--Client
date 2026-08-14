import PaitentAppoimentPage from "@/components/PaitentAppoimentPage";
import { Suspense } from "react";

export const metadata = {
  title: "My Appoiments - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const AppointmentsContent = () => {


  return (
   <div>
    <PaitentAppoimentPage></PaitentAppoimentPage>
   </div>
  );
};

const MyAppointments = () => {
  return (
    <Suspense fallback={<div className="text-center py-10 text-base-content/60">Loading dashboard...</div>}>
      <AppointmentsContent />
    </Suspense>
  );
};

export default MyAppointments;