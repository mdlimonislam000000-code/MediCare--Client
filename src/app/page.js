import Banner from "@/components/Banner";
import MeetOurDoctors from "@/components/MeetOurDoctors";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <WhyChooseUs></WhyChooseUs>
     <MeetOurDoctors></MeetOurDoctors>
    </div>
  );
}
