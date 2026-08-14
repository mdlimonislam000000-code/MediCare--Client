import DashboardWrapper from "@/components/DashboardWrapper";


export const metadata = {
  title: "Dashboard - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};

const DashboardLayout = ({ children }) => {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
};

export default DashboardLayout;