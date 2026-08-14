import AdminManageUserPage from "@/components/AdminManageUserPage";

export const metadata = {
  title: "Manage user - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const ManageUser = () => {


  return (
    <div>
      <AdminManageUserPage></AdminManageUserPage>
    </div>
  );
};

export default ManageUser;