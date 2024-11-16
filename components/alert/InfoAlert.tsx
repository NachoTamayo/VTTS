import React from "react";
import { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { InfoAlertProps } from "@/helpers/interfaces";
import { useAlert } from "@/helpers/alert-context";
import { useTranslations } from "next-intl";
import { AlertCircleIcon } from "@/components/icons/Icons";

export const InfoAlert: React.FC<InfoAlertProps> = (props) => {
  const { alert, showAlert, hideAlert } = useAlert();
  const g = useTranslations("Global");
  const t = useTranslations(alert && alert.multilang ? alert.multilang : "Global");
  let { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      {alert && (
        <Modal
          backdrop="opaque"
          hideCloseButton={true}
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
                <ModalHeader>
                  <p></p>
                </ModalHeader>
                <ModalBody className="text-center">
                  <AlertCircleIcon width={60} height={60} color={"#f31260"} className="mx-auto" />
                  {alert.type === "info" ? (
                    <h1>{g("messages.info")}</h1>
                  ) : (
                    <p className="text-2xl">{g("messages.delete")}</p>
                  )}
                  <p className="text-slate-500">{t(alert.message)}</p>
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button size="sm" color="danger" onPress={hideAlert}>
                    {alert.type === "info" ? g("close") : g("cancel")}
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => {
                      if (alert.callback && typeof alert.callback === "function") alert.callback();
                      hideAlert();
                    }}>
                    {alert.type === "info" ? g("ok") : g("confirm")}
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
