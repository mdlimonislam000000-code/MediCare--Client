import ApproveDoctorPage from "@/components/ApproveDoctorPage";
export const metadata = {
  title: "Approve Doctor - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};

const ApprovedDoctorsList = () => {

  return (
    <div>
      <ApproveDoctorPage></ApproveDoctorPage>
    </div>
  );
};

export default ApprovedDoctorsList;