"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { HiOutlineDocumentText, HiPlus, HiTrash, HiCheckCircle, HiPencilAlt } from "react-icons/hi";
import EditPrescription from "@/components/EditPrescription";
import toast from "react-hot-toast";

const PrescriptionCabin = () => {
  const searchParams = useSearchParams();

  
  const urlDoctorId = searchParams.get("doctorId");
  const bookingId = searchParams.get("bookingId");
  const patientId = searchParams.get("patientId") || searchParams.get("userId") || "";
  
  const patientData = {
    name: searchParams.get("name"),
    email: searchParams.get("email"),
    phone: searchParams.get("phone"),
    age: searchParams.get("age"),
    message: searchParams.get("message"),
    date: searchParams.get("date"),
  };


  const { data: session } = authClient.useSession();
  const loggedInDoctorId = session?.user?.id || session?.user?._id;
  

  const currentDoctorId = urlDoctorId || loggedInDoctorId;

  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(true);

  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", duration: "" }
  ]);
  const [submitting, setSubmitting] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEditingRx, setCurrentEditingRx] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/prescriptions");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllPrescriptions(data);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    } finally {
      setLoadingPrescriptions(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleAddMedicineField = () => {
    setMedicines([...medicines, { name: "", dose: "", duration: "" }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const prescriptionData = {
      bookingId: bookingId || "",
      patientId: patientId || "",
      doctorId: currentDoctorId || "", 
      patientEmail: patientData.email !== "N/A" ? patientData.email : "",
      patient: patientData,
      diagnosis,
      medicines,
      advice,
      createdAt: new Date().toISOString(),
    };

    try {
      const {data:tokenData}= await authClient.token()
      const res = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
         },
        body: JSON.stringify(prescriptionData),
      });

      if (res.ok) {
        setDiagnosis("");
        setAdvice("");
        setMedicines([{ name: "", dose: "", duration: "" }]);
        fetchPrescriptions();
      } else {
        toast.error("Failed to save prescription!");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEditModal = (rx) => {
    setCurrentEditingRx(rx);
    setIsEditOpen(true);
  };

  const handleUpdatePrescription = async (updatedData, stopLoading) => {
    const rxId = updatedData._id || updatedData.id;

    try {
      const {data:tokenData} = await authClient.token()
      const res = await fetch(`http://localhost:5000/api/prescriptions/${rxId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
         },
        body: JSON.stringify({
          diagnosis: updatedData.diagnosis,
          advice: updatedData.advice,
          medicines: updatedData.medicines,
        }),
      });

      if (res.ok) {
        setIsEditOpen(false);
        fetchPrescriptions();
      } else {
        toast.error("Failed to update prescription!");
      }
    } catch (error) {
      console.error("Error updating prescription:", error);
      toast.error("Something went wrong during update!");
    } finally {
      stopLoading();
    }
  };


  const isAlreadyIssued = allPrescriptions.some(
    (p) => p.bookingId === bookingId && (!p.doctorId || p.doctorId === currentDoctorId)
  );


  const doctorPrescriptions = allPrescriptions.filter(
    (rx) => !currentDoctorId || rx.doctorId === currentDoctorId
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="border-b pb-4 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white flex items-center gap-2">
          <HiOutlineDocumentText className="text-emerald-600" /> Medications & Prescription Records
        </h1>
        <p className="text-sm text-zinc-500">Manage digital prescriptions and patient medical logs.</p>
      </div>

      {!isAlreadyIssued && bookingId ? (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-zinc-800 dark:to-zinc-800 p-4 rounded-xl border border-emerald-100 dark:border-zinc-700 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Generate Digital Rx</span>
              <h3 className="font-semibold text-zinc-800 dark:text-white">Patient: {patientData.name}</h3>
            </div>
            <span className="text-xs bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-emerald-200 text-zinc-600 dark:text-zinc-300 font-medium">
              Age: {patientData.age} | Ph: {patientData.phone}
            </span>
          </div>

          <form onSubmit={handleSubmitPrescription} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">CLINICAL DIAGNOSIS</label>
              <input
                type="text"
                placeholder="e.g., Acute Respiratory Infection, Hypercholesterolemia"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="input input-bordered w-full bg-zinc-50 dark:bg-zinc-800"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">MEDICATIONS INSTRUCTIONS</label>
                <button
                  type="button"
                  onClick={handleAddMedicineField}
                  className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1"
                >
                  <HiPlus /> Add Medicine
                </button>
              </div>

              {medicines.map((med, index) => (
                <div key={index} className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <input
                    type="text"
                    placeholder="Medicine Name (e.g. Aspirin 81mg)"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                    className="input input-bordered input-sm w-1/2 bg-white dark:bg-zinc-800"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dose (e.g. Daily post breakfast)"
                    value={med.dose}
                    onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
                    className="input input-bordered input-sm w-1/4 bg-white dark:bg-zinc-800"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 7 days)"
                    value={med.duration}
                    onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                    className="input input-bordered input-sm w-1/4 bg-white dark:bg-zinc-800"
                    required
                  />
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <HiTrash className="text-lg" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">ADVISORY NOTES</label>
              <textarea
                placeholder="e.g., Avoid strenuous workouts, take rest and rehydrate frequently."
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="textarea textarea-bordered w-full bg-zinc-50 dark:bg-zinc-800 h-24"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 rounded-xl shadow-md"
              >
                {submitting ? "Issuing..." : "Issue Digital Prescription"}
              </button>
            </div>
          </form>
        </div>
      ) : bookingId ? (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300 text-center font-medium">
          <HiCheckCircle className="inline text-2xl mr-1" /> Prescription formulated and appointment marked COMPLETED! Form hidden.
        </div>
      ) : null}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-white">Prescription Records</h3>
        
        {loadingPrescriptions ? (
          <p className="text-zinc-500 text-center py-6">Loading records...</p>
        ) : doctorPrescriptions.length === 0 ? (
          <div className="text-center py-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border text-zinc-500">
            No prescription records found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctorPrescriptions.map((rx, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex justify-between items-start border-b pb-3 dark:border-zinc-800">
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-base">
                      {rx.patient?.name || "Patient Name"}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Date of Issue: {new Date(rx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(rx)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 shadow-sm transition-all active:scale-95"
                    >
                      <HiPencilAlt className="text-sm" />
                      Edit
                    </button>
                    
                    <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-700">
                      Modify Rx
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <p>
                    <span className="font-semibold text-zinc-900 dark:text-white">Diagnosis:</span> {rx.diagnosis}
                  </p>
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white">Medications:</span>
                    <ul className="list-disc list-inside text-xs mt-1 space-y-1 text-zinc-600 dark:text-zinc-400">
                      {rx.medicines?.map((m, mIdx) => (
                        <li key={mIdx}>
                          {m.name} ({m.dose} - {m.duration})
                        </li>
                      ))}
                    </ul>
                  </div>
                  {rx.advice && (
                    <p className="text-xs text-zinc-500 pt-1">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Notes:</span> {rx.advice}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditPrescription
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        prescriptionData={currentEditingRx}
        onUpdate={handleUpdatePrescription}
      />
    </div>
  );
};

export default PrescriptionCabin;