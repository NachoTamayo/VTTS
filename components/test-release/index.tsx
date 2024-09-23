"use client";

import { ServiceRequest } from "@/components/test-release/service-request";
import { useEffect, useState } from "react";
import { ServiceRequestProps, ServiceRequestPrimaryKey } from "@/helpers/interfaces";
import { ServiceRequestSkeleton } from "./service-request-skeleton";
import { ViewModal } from "@/components/modals/view-modal";
import { useDisclosure } from "@nextui-org/react";
import { useAuthStore } from "@/helpers/auth-store";

export const TestRelease = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");
  const [primaryKey, setPrimaryKey] = useState({ SR_NUMBER: "", APP: "", RELEASE_VERSION: "", STAGE: "" });
  const [refresh, setRefresh] = useState(false);
  const { setCurrentWindow } = useAuthStore();

  useEffect(() => {
    fetchServiceRequests();
    setCurrentWindow("test-release");
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchServiceRequests();
      setRefresh(false);
    }
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(true);
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch("/api/v1/testPssSystem", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setServiceRequests(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };
  const onView = async (primKey: ServiceRequestPrimaryKey) => {
    onOpen();
    setPrimaryKey(primKey);
  };

  return (
    <div>
      {serviceRequests.map((serviceRequest: ServiceRequestProps, index: number) => (
        <ServiceRequest key={index} {...serviceRequest} onOpen={onOpen} onView={onView} handleRefresh={handleRefresh} />
      ))}
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onView={onView}
        primKey={primaryKey}
      />
    </div>
  );
};
