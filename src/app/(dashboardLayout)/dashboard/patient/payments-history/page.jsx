import PaitentPaymentPage from "@/components/PaitentPaymentPage";

export const metadata = {
  title: "My Payment History - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};
const PaymentsHistory = () => {


  return (
   <div>
    <PaitentPaymentPage></PaitentPaymentPage>
   </div>
  );
};

export default PaymentsHistory;