"use client";

import React, { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";
import { Modal } from "@heroui/react";

const EditPrescription = ({ isOpen, onOpenChange, prescriptionData, onUpdate }) => {
  const [editDiagnosis, setEditDiagnosis] = useState(prescriptionData?.diagnosis || "");
  const [editAdvice, setEditAdvice] = useState(prescriptionData?.advice || "");
  const [editMedicines, setEditMedicines] = useState(
    prescriptionData?.medicines || [{ name: "", dose: "", duration: "" }]
  );
  const [updating, setUpdating] = useState(false);

  const handleAddEditMedicineField = () => {
    setEditMedicines([...editMedicines, { name: "", dose: "", duration: "" }]);
  };

  const handleEditMedicineChange = (index, field, value) => {
    const updated = [...editMedicines];
    updated[index][field] = value;
    setEditMedicines(updated);
  };

  const handleRemoveEditMedicine = (index) => {
    setEditMedicines(editMedicines.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);

    const updatedData = {
      ...prescriptionData,
      diagnosis: editDiagnosis,
      advice: editAdvice,
      medicines: editMedicines,
    };

    if (onUpdate) {
      onUpdate(updatedData, () => setUpdating(false));
    } else {
      setUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-2xl w-full bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b dark:border-zinc-800 px-6 py-4">
              <Modal.Heading className="text-lg font-bold text-zinc-900 dark:text-white">
                Edit Prescription
              </Modal.Heading>
              <p className="text-xs text-zinc-500 mt-0.5">
                Update diagnosis, medicines, or instructions for {prescriptionData?.patient?.name || "Patient"}
              </p>
            </Modal.Header>
            
            <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
              <form id="edit-prescription-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">CLINICAL DIAGNOSIS</label>
                  <input
                    type="text"
                    value={editDiagnosis}
                    onChange={(e) => setEditDiagnosis(e.target.value)}
                    className="input input-bordered w-full bg-zinc-50 dark:bg-zinc-800"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">MEDICATIONS INSTRUCTIONS</label>
                    <button
                      type="button"
                      onClick={handleAddEditMedicineField}
                      className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1"
                    >
                      <HiPlus /> Add Medicine
                    </button>
                  </div>

                  {editMedicines.map((med, index) => (
                    <div key={index} className="flex gap-2 items-center bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <input
                        type="text"
                        placeholder="Medicine Name"
                        value={med.name}
                        onChange={(e) => handleEditMedicineChange(index, "name", e.target.value)}
                        className="input input-bordered input-sm w-1/2 bg-white dark:bg-zinc-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Dose"
                        value={med.dose}
                        onChange={(e) => handleEditMedicineChange(index, "dose", e.target.value)}
                        className="input input-bordered input-sm w-1/4 bg-white dark:bg-zinc-800"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Duration"
                        value={med.duration}
                        onChange={(e) => handleEditMedicineChange(index, "duration", e.target.value)}
                        className="input input-bordered input-sm w-1/4 bg-white dark:bg-zinc-800"
                        required
                      />
                      {editMedicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEditMedicine(index)}
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
                    value={editAdvice}
                    onChange={(e) => setEditAdvice(e.target.value)}
                    className="textarea textarea-bordered w-full bg-zinc-50 dark:bg-zinc-800 h-24"
                  ></textarea>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer className="border-t dark:border-zinc-800 px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                className="btn btn-sm btn-outline border-zinc-300 dark:border-zinc-700"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-prescription-form"
                disabled={updating}
                className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white px-5"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditPrescription;