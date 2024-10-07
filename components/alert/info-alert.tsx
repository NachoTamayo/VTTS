import React from "react";
import { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { InfoAlertProps } from "@/helpers/interfaces";
import { useAlert } from "@/helpers/alert-context";

export const InfoAlert: React.FC<InfoAlertProps> = (props) => {
  const { alert, showAlert, hideAlert } = useAlert();

  let { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      {alert && (
        <Modal
          backdrop="opaque"
          isOpen={true} // Usa el estado `isOpen`
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <p>{alert.message}</p>
                </ModalBody>
                <ModalFooter>
                  <Button size="sm" color="danger" variant="light" onPress={hideAlert}>
                    Close
                  </Button>
                  <Button size="sm" color="primary" onPress={hideAlert}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
