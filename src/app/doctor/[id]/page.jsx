import DoctorsDetails from "@/components/DoctorsDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DoctorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  // console.log("Token:", token);

  let doctorData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor-posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const jsonResponse = await res.json();
      
      doctorData = jsonResponse.data || jsonResponse; 
      
      // console.log("Fetched Doctor Data:", doctorData);
    } else {
      // console.log("Failed to fetch, status:", res.status);
    }
  } catch (error) {
    console.error("Error fetching doctor data:", error);
  }

  return (
    <div>
      <DoctorsDetails doctorData={doctorData} />
    </div>
  );
};

export default DoctorDetailsPage;