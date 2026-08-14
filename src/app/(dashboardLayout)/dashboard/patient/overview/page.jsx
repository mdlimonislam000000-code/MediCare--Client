import PaitentOverviewPage from "@/components/PaitentOverviewPage";

export const metadata = {
  title: "Overview - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const PatientOverview = () => {


  return (
    <div>
      <PaitentOverviewPage></PaitentOverviewPage>
    </div>
  );
};

export default PatientOverview;