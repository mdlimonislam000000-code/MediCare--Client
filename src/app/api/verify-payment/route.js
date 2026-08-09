import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ success: false, error: "Session ID missing" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const paymentData = {
        name: session.metadata.patientName,
        email: session.metadata.patientEmail,
        patientEmail: session.metadata.patientEmail, 
        phone: session.metadata.patientPhone,
        age: session.metadata.patientAge,
        appointmentDate: session.metadata.appointmentDate,
        message: session.metadata.message,
        doctorId: session.metadata.doctorId,
        doctorUserId: session.metadata.doctorUserId || "", 
        doctorName: session.metadata.doctorName,
        amount: Number(session.metadata.amount),
        userId: session.metadata.userId || "",       
        createdAt: session.metadata.createdAt || "", 

        paymentStatus: "Paid",
        transactionId: session.payment_intent,
      };

       const { token } = await auth.api.getToken({
          headers: await headers(),
        });
      console.log(token, 'booking token')

      const backendRes = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      const backendResult = await backendRes.json();

      return NextResponse.json({ success: true, result: backendResult });
    }

    return NextResponse.json({ success: false, error: "Payment not completed" });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}