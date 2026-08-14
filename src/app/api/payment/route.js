import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const price = formData.get("price");
    const doctorName = formData.get("doctorName");
    const doctorId = formData.get("doctorId");
    
    const userId = formData.get("userId");
    const doctorUserId = formData.get("doctorUserId");
    const createdAt = formData.get("createdAt");
    
    const patientName = formData.get("patientName");
    const patientEmail = formData.get("patientEmail");
    const patientPhone = formData.get("patientPhone");
    const patientAge = formData.get("patientAge");
    const appointmentDate = formData.get("appointmentDate");
    const message = formData.get("message");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt", 
            product_data: {
              name: `Appointment with Dr. ${doctorName}`,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BETTER_AUTH_URL}/dashboard/patient/my-appointments?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/doctor/${doctorId}?canceled=true`,
      
      metadata: {
        userId: userId || "",          
        doctorUserId: doctorUserId || "", 
        createdAt: createdAt || "",   
        doctorId: doctorId || "",
        doctorName: doctorName || "",
        patientName: patientName || "",
        patientEmail: patientEmail || "",
        patientPhone: patientPhone || "",
        patientAge: patientAge || "",
        appointmentDate: appointmentDate || "",
        message: message || "",
        amount: price || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}