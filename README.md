<div align="center">

  # 🏥 MediCare Connect
  ### *A Modern Hospital Appointment & Healthcare Management System*

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
    <img src="https://img.shields.io/badge/BetterAuth-000000?style=for-the-badge&logo=auth0&logoColor=white" />
  </p>

  <p><b>A full-stack healthcare ecosystem bridging the gap between patients, specialized doctors, and administrators with secure authentication and seamless payments.</b></p>
  
  <p>
    <a href="#-live-site--repositories"><b>Live Demo & Links</b></a> •
    <a href="#-project-overview"><b>Overview</b></a> •
    <a href="#-core-features--role-based-portals"><b>Features</b></a> •
    <a href="#-tech-stack"><b>Tech Stack</b></a> •
    <a href="#-database-collections-schema"><b>Database Schema</b></a>
  </p>
</div>

---

## 📌 Project Overview

**MediCare Connect** is a comprehensive, production-ready hospital appointment and healthcare management platform built to streamline the medical consultation process. It eliminates long waiting times, manual paperwork, and communication bottlenecks by offering dedicated, secure portals for **Patients**, **Doctors**, and **Administrators**, coupled with robust Stripe payment processing and real-time analytics.

---

## 🚀 Core Features & Role-Based Portals

### 🧑‍⚕️ 1. Patient Portal
* **Advanced Authentication:** Secure registration and login supporting email/password along with Google Sign-in via **BetterAuth**.
* **Doctor Discovery & Filtering:** Explore doctors by name, specialization, experience, consultation fees, and highest ratings with smooth pagination.
* **Secure Appointment & Payments:** Book specific time slots and securely pay consultation fees online via **Stripe Gateway** before confirmation.
* **Appointment & Medical Lifecycle:** View, reschedule, or cancel appointments, track payment histories, access digital prescriptions, and leave/manage doctor reviews.

### 🩺 2. Doctor Portal
* **Schedule & Slot Management:** Easily configure and update working days and available time slots.
* **Appointment Control:** Accept or reject incoming appointment requests from patients.
* **Prescription Workflow:** Mark appointments as completed and instantly generate/update digital prescriptions.
* **Profile Customization:** Maintain professional qualifications, experience, hospital details, and fees.

### 🛡️ 3. Admin Portal
* **User & Doctor Oversight:** Manage users, suspend/delete accounts, and review verification requests for newly registered doctors.
* **Ecosystem Analytics:** Monitor system-wide appointments, payment records, and platform performance through interactive **Recharts** visualizations (tracking doctor performance, patient growth, and appointment trends).

---

## 🛠️ Technology Stack

* **Frontend:** Next.js (App Router), Tailwind CSS, HeroUI / DaisyUI, Framer Motion, Recharts, React Icons
* **Backend:** Node.js, Express.js, JWT Token Verification & Role-Based Access Control (RBAC)
* **Database:** MongoDB & Mongoose
* **Authentication:** Better Auth (Google & Email/Password)
* **Payment Gateway:** Stripe API
* **Image Hosting:** ImgBB API

---

## 🗄️ Database Collections Schema

* **Users Collection:** `name`, `email`, `role`, `Photo`, `phone`, `gender`, `createdAt`, `status`
* **Doctors Collection:** `doctorName`, `specialization`, `qualifications`, `experience`, `consultationFee`, `hospitalName`, `profileImage`, `availableDays`, `availableSlots`, `verificationStatus`
* **Appointments Collection:** `patientId`, `doctorId`, `appointmentDate`, `appointmentTime`, `appointmentStatus`, `symptoms`, `paymentStatus`
* **Reviews Collection:** `patientId`, `doctorId`, `rating`, `reviewText`, `createdAt`
* **Payments Collection:** `appointmentId`, `patientId`, `doctorId`, `amount`, `transactionId`, `paymentDate`
* **Prescriptions Collection:** `doctorId`, `patientId`, `appointmentId`, `diagnosis`, `medications`, `notes`, `createdAt`

---




📦 Installation & Getting Started
Clone the Repository:

Bash
git clone [https://github.com/mdlimonislam000000-code/MediCare--Client](https://github.com/mdlimonislam000000-code/MediCare--Client)
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
# Run Frontend (Client)
npm run dev

# Run Backend (Server)
npm run start
🔑 Admin Credentials for Evaluation
Admin Email: admin@gmail.com

Admin Password: Admin123@

🔗 Live Site & Repositories
🌐 Live Site Preview: https://medicare-connect-rose.vercel.app

💻 Client Repository: https://github.com/mdlimonislam000000-code/MediCare--Client

🖥️ Server Repository: https://github.com/mdlimonislam000000-code/MediCare--Server