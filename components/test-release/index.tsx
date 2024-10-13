"use client";

import { TestCard } from "@/components/test-release/TestCard";
import { useEffect, useState } from "react";
import { ListSrSkeleton } from "@/components/test-release/ListSRSkeleton";
import { ViewModal } from "@/components/test-release/modals/ViewModal";
import { useDisclosure } from "@nextui-org/react";
import { useAuthStore } from "@/helpers/auth-store";
import { useDataStore } from "@/helpers/data-store";
import { EditModal } from "./modals/EditModal";

export const TestRelease = () => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [id, setId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { setCurrentWindow } = useAuthStore();
  const { testPssSystem, setTestPssSystem } = useDataStore();
  const [isLoaded, setLoaded] = useState(false);

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
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };
  const onView = async (id: number) => {
    onOpen();
    setId(id);
  };

  const onEdit = async (id: number) => {
    onOpenEdit();
    setId(id);
  };

  return (
    <div>
      {isLoaded ? (
        testPssSystem.length > 0 ? (
          testPssSystem.map((testInfo, index) => (
            <TestCard key={index} {...testInfo} onEdit={onEdit} onView={onView} handleRefresh={handleRefresh} />
          ))
        ) : (
          <div className="flex justify-center items-center h-[80vh]">No service requests found</div>
        )
      ) : (
        <ListSrSkeleton />
      )}
      {isOpen && (
        <ViewModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onView={onView}
          id={id}
        />
      )}
      {isOpenEdit && (
        <EditModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          onOpen={onOpenEdit}
          onOpenChange={onOpenChangeEdit}
          onEdit={onEdit}
          handleRefresh={handleRefresh}
          id={id}
        />
      )}
    </div>
  );
};
