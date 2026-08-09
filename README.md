# 🏥 MediCare Connect – Hospital Appointment & Healthcare Management System

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" />

  <p><b>A modern, full-stack healthcare platform connecting patients, doctors, and administrators seamlessly.</b></p>
  
  <p>
    <a href="#-live-site--repositories"><b>Live Demo & Links</b></a> •
    <a href="#-project-overview"><b>Overview</b></a> •
    <a href="#-core-features--roles"><b>Features</b></a> •
    <a href="#-database-collections"><b>Database Schema</b></a> •
    <a href="#-tech-stack"><b>Tech Stack</b></a>
  </p>
</div>

---

## 📌 Project Overview
**MediCare Connect** is a comprehensive hospital appointment and healthcare management platform designed to eliminate long waiting times, manual paperwork, and poor communication. It offers dedicated portals for **Patients**, **Doctors**, and **Administrators** with robust security, role-based authorization, and seamless online payments via Stripe.

---

## 🚀 Core Features & Roles

### 🧑‍⚕️ 1. Patient Portal
* **Account System:** Secure registration and login with strong password rules, photo upload, and Google sign-in.
* **Advanced Doctor Search & Filtering:** Search doctors by name or specialization with pagination support.
* **Sorting Options:** Sort doctors by Consultation Fee, Experience, and Highest Rating.
* **Appointments & Payments:** Book time slots, pay consultation fees securely via **Stripe Gateway** before confirmation, and manage appointments (View, Reschedule, Cancel).
* **Medical Records & Reviews:** Track payment history, access digital prescriptions, and add, update, or delete doctor reviews.

### 🩺 2. Doctor Portal
* **Schedule Management:** Add, update, and remove working days and available slots.
* **Appointment Handling:** Accept or reject incoming patient appointment requests.
* **Prescription Workflow:** Mark appointments as completed and instantly navigate to create/update digital prescriptions.
* **Profile Management:** Update professional qualifications, experience, consultation fees, and available slots.

### 🛡️ 3. Admin Portal
* **User & Doctor Management:** View, delete, or suspend users; verify or reject newly registered doctors, and control verification status.
* **System Oversight:** Monitor all appointments, view payment records, and analyze platform performance using interactive **Recharts** (Doctor performance, total patients, doctors, and appointments).

---

## 🗄️ Database Collections Schema

* **Users Collection:** `name`, `email`, `role`, `Photo`, `phone`, `gender`, `createdAt`, `status`
* **Doctors Collection:** `doctorName`, `specialization`, `qualifications`, `experience`, `consultationFee`, `hospitalName`, `profileImage`, `availableDays`, `availableSlots`, `verificationStatus`
* **Appointments Collection:** `patientId`, `doctorId`, `appointmentDate`, `appointmentTime`, `appointmentStatus`, `symptoms`, `paymentStatus`
* **Reviews Collection:** `patientId`, `doctorId`, `rating`, `reviewText`, `createdAt`
* **Payments Collection:** `appointmentId`, `patientId`, `doctorId`, `amount`, `transactionId`, `paymentDate`
* **Prescriptions Collection:** `doctorId`, `patientId`, `appointmentId`, `diagnosis`, `medications`, `notes`, `createdAt`

---

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, HeroUI / DaisyUI, Framer Motion, Recharts
* **Backend:** Node.js, Express.js, JWT Token Verification & Role-Based Authorization
* **Database:** MongoDB
* **Authentication:** Better Auth & Firebase integration
* **Payment Gateway:** Stripe API
* **Image Hosting:** ImgBB API

---

## ⚙️ Environment Variables

Create a `.env` file in your root/client and server directory and configure the required keys:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FIREBASE_API_KEY=your_firebase_api_key




📦 Installation & Getting Started
Clone the Repository:

Bash
git clone [https://github.com/your-username/medicare-connect.git](https://github.com/your-username/medicare-connect.git)
cd medicare-connect
Install Client Dependencies:

Bash
npm install
Install Server Dependencies:

Bash
cd server
npm install
Run Development Servers:

Bash
# Run Frontend
npm run dev

# Run Backend
npm run start
🔑 Admin Credentials for Evaluation
Admin Email: admin@medicare.com

Admin Password: Admin@1234

🔗 Live Site & Repositories
🌐 Live Site Link: View Live Preview

💻 GitHub Repository (Client): Client Repository Link

🖥️ GitHub Repository (Server): Server Repository Link