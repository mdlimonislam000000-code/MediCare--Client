import Banner from "@/components/Banner";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import MeetOurDoctors from "@/components/MeetOurDoctors";
import PatientReviews from "@/components/PatientReviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export const metadata = {
  title: "Home - MediCare Connect",
  description: "Learn more about MediCare Connect and our healthcare services.",
};

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <WhyChooseUs></WhyChooseUs>
     <MeetOurDoctors></MeetOurDoctors>
     <PatientReviews></PatientReviews>
     <MedicalSpecializations></MedicalSpecializations>
    </div>
  );
}
