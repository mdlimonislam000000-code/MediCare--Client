"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { FiEye, FiFileText, FiActivity, FiCheckCircle } from "react-icons/fi";

const ViewPrescription = ({ prescriptionData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button 
        onPress={() => setIsOpen(true)} 
        color="primary" 
        variant="flat"
        startContent={<FiEye className="text-lg" />}
        className="font-medium bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all"
      >
        View Prescription
      </Button>

      <Modal.Backdrop className="bg-black/70 backdrop-blur-md">
        <Modal.Container className="max-w-2xl w-full p-4">
          <Modal.Dialog className="bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-2xl rounded-3xl overflow-hidden">
            <Modal.CloseTrigger className="text-zinc-400 hover:text-zinc-100" />
            
            <Modal.Header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                  <FiFileText className="text-xl" />
                </div>
                <div>
                  <Modal.Heading className="text-lg font-bold text-zinc-100">Prescription Details</Modal.Heading>
                  <p className="text-xs text-zinc-400 font-normal mt-0.5">
                    Booking ID: <span className="text-zinc-300 font-mono">{prescriptionData?.bookingId || "N/A"}</span>
                  </p>
                </div>
              </div>
            </Modal.Header>
            
            <Modal.Body className="px-6 py-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Diagnosis Section */}
              <div className="bg-zinc-800/40 p-4 rounded-2xl border border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <FiActivity className="text-sm" />
                  <span>Diagnosis</span>
                </div>
                <p className="text-base font-medium text-zinc-200 pl-6">
                  {prescriptionData?.diagnosis || "No diagnosis provided."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                  <FiCheckCircle className="text-sm" />
                  <span>Medicines List</span>
                </div>
                <div className="space-y-2.5">
                  {Array.isArray(prescriptionData?.medicines) ? (
                    prescriptionData.medicines.map((med, idx) => (
                      <div 
                        key={idx} 
                        className="bg-zinc-800/50 hover:bg-zinc-800/80 transition-colors p-3.5 rounded-xl border border-zinc-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-semibold text-zinc-100 text-sm">
                            {idx + 1}. {med?.name || med}
                          </p>
                        </div>
                        {(med?.dose || med?.duration) && (
                          <div className="flex items-center gap-2 text-xs">
                            {med?.dose && (
                              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg font-medium border border-blue-500/20">
                                Dose: {med.dose}
                              </span>
                            )}
                            {med?.duration && (
                              <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg font-medium border border-purple-500/20">
                                Duration: {med.duration}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : typeof prescriptionData?.medicines === "object" && prescriptionData?.medicines !== null ? (
                    <div className="bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-700/50 text-sm text-zinc-200">
                      {prescriptionData.medicines.name || JSON.stringify(prescriptionData.medicines)}
                    </div>
                  ) : (
                    <div className="bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-700/50 text-sm text-zinc-300 whitespace-pre-wrap">
                      {prescriptionData?.medicines || "No medicines listed."}
                    </div>
                  )}
                </div>
              </div>

              {prescriptionData?.advice && (
                <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                    Doctor's Advice
                  </span>
                  <p className="text-sm italic text-zinc-300">
                    "{prescriptionData.advice}"
                  </p>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer className="border-t border-zinc-800 px-6 py-4 flex justify-end">
              <Button 
                slot="close" 
                variant="flat"
                className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-medium px-6"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ViewPrescription;