import DoctorPrescriptionPage from "@/components/DoctorPrescriptionPage";

export const metadata = {
  title: "Doctor Prescription - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const PrescriptionCabin = () => {


  return (
    <div>
      <DoctorPrescriptionPage></DoctorPrescriptionPage>
    </div>
  );
};

export default PrescriptionCabin;