import DoctorsDetails from "@/components/DoctorsDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DoctorDetailsPage = async ({ params }) => {

  const { id } = await params;

  const {token} = await auth.api.getToken({
    headers: await headers(),
  });


  console.log("Token:", token);

  let doctorData = null;
  try {
    const res = await fetch(`http://localhost:5000/api/doctor-posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      doctorData = await res.json();
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