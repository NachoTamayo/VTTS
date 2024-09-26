"use client";

import { TestCard } from "@/components/test-release/test-card";
import { useEffect, useState } from "react";
import { TestPssSystemProps } from "@/helpers/interfaces";
import { ServiceRequestSkeleton } from "./service-request-skeleton";
import { ViewModal } from "@/components/test-release/modals/view-modal";
import { useDisclosure } from "@nextui-org/react";
import { useAuthStore } from "@/helpers/auth-store";
import { useDataStore } from "@/helpers/data-store";

export const TestRelease = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { setCurrentWindow } = useAuthStore();
  const { testPssSystem, setTestPssSystem } = useDataStore();

  useEffect(() => {
    fetchServiceRequests();
    setCurrentWindow("test-release");
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchServiceRequests();
      setRefresh(false);
    }
  }, [refresh, testPssSystem]);

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
      setTestPssSystem(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };
  const onView = async (id: number) => {
    onOpen();
    setId(id);
  };

  return (
    <div>
      {testPssSystem.map((testInfo: TestPssSystemProps, index: number) => (
        <TestCard key={index} {...testInfo} onView={onView} handleRefresh={handleRefresh} />
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
