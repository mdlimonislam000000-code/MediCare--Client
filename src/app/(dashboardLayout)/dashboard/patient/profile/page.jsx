import PaitentProfilePage from "@/components/PaitentProfilePage";

export const metadata = {
  title: "My Profile - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const PatientProfile = () => {


  return (
    <div>
      <PaitentProfilePage></PaitentProfilePage>
    </div>
  );
};

export default PatientProfile;