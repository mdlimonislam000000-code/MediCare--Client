import PatientFeedbackPage from "@/components/PatientFeedbackPage";
export const metadata = {
  title: "Paitent Feedback - MediCare Connect",
  description: "Manage your appointments, health history, and profile.",
};

const FeedbackReviews = () => {


  return (
    <div>
      <PatientFeedbackPage></PatientFeedbackPage>
    </div>
  );
};

export default FeedbackReviews;