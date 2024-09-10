"use client";

import { ServiceRequest } from "@/components/test-release/service-request";
import { useEffect, useState } from "react";
import { ServiceRequestProps } from "@/helpers/interfaces";
import { ServiceRequestSkeleton } from "./service-request-skeleton";
import { ViewModal } from "@/components/modals/view-modal";
import { useDisclosure } from "@nextui-org/react";
import { set } from "mongoose";

export const TestRelease = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch("/api/v1/testPssSystem", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setServiceRequests(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };
  const onView = async (id: string) => {
    onOpen();
    setId(id);
  };

  return (
    <div>
      {serviceRequests.map((serviceRequest: ServiceRequestProps) => (
        <ServiceRequest key={serviceRequest._id} {...serviceRequest} onOpen={onOpen} onView={onView} />
      ))}
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onView={onView}
        id={id}
      />
    </div>
  );
};
