"use client";

import React, { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Textarea 
} from "@heroui/react";
import { FiEdit3 } from "react-icons/fi";
import toast from "react-hot-toast";

const PaitentEditAppointmntCard = ({ appointment, onUpdateSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: appointment?.name || "",
    phone: appointment?.phone || "",
    appointmentDate: appointment?.appointmentDate || "",
    message: appointment?.message || "",
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const id = appointment._id || appointment.id;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();

      if (data.modifiedCount > 0 || data.success) {
        setIsOpen(false);
        if (onUpdateSuccess) {
          onUpdateSuccess(id, editFormData);
        }
        toast.success("Appointment updated successfully!");
      } else {
        toast.error("Failed to update or no changes made.");
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={() => setIsOpen(true)}
        size="sm"
        variant="flat"
        className="bg-amber-50 text-amber-600 border border-amber-200 font-semibold"
        startContent={<FiEdit3 className="text-sm" />}
      >
        Edit
      </Button>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        placement="center"
        backdrop="blur"
      >
        <ModalContent className="bg-white text-zinc-900 border border-zinc-200 shadow-2xl rounded-2xl">
          {(onClose) => (
            <div className="w-full">
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold border-b border-zinc-100 pb-3">
                Edit Appointment
              </ModalHeader>
              
              <ModalBody className="space-y-4 py-4">
                <Input
                  label="Patient Name"
                  placeholder="Enter patient name"
                  variant="bordered"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-zinc-200",
                  }}
                  isRequired
                />

                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  variant="bordered"
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, phone: e.target.value })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-zinc-200",
                  }}
                  isRequired
                />

                <Input
                  label="Appointment Date"
                  type="date"
                  variant="bordered"
                  value={editFormData.appointmentDate}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, appointmentDate: e.target.value })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-zinc-200",
                  }}
                  isRequired
                />

                <Textarea
                  label="Problem / Message"
                  placeholder="Enter problem details"
                  variant="bordered"
                  value={editFormData.message}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      message: e.target.value,
                    })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-zinc-200",
                  }}
                  minRows={3}
                />
              </ModalBody>

              <ModalFooter className="border-t border-zinc-100 pt-3">
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="bg-zinc-100 text-zinc-700 font-semibold"
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleUpdateSubmit}
                  isLoading={loading}
                  className="bg-indigo-600 text-white font-semibold shadow-md"
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaitentEditAppointmntCard;