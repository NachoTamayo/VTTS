"use client";

import React from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, DatePicker, Input } from "@nextui-org/react";

interface EditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseModal: () => void;
}

export const EditModal: React.FC<EditModalProps> = (props) => {
  const [ready, setReady] = React.useState(true);
  const t = useTranslations("Versiona");
  const g = useTranslations("Global");

  const handleEdit = () => {
    // handle edit
  };

  return (
    <Modal
      size="xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onClose={props.onCloseModal}
      isDismissable={false}>
      <ModalContent>
        {(onClose) =>
          !ready ? (
            <></>
          ) : (
            <>
              <ModalHeader className="flex flex-col gap-1">{t("modal.editHeader")}</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <div className="w-6/12">
                    <Input label={t("modal.system")} />
                  </div>
                  <div className="w-6/12">
                    <Input label={t("modal.version")} />
                  </div>
                  <div className="w-6/12">
                    <DatePicker label={t("modal.date")} isRequired />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button size="sm" color="danger" variant="flat" onPress={onClose}>
                  {g("cancel")}
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    handleEdit();
                  }}>
                  {t("table.actions.modify")}
                </Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  );
};
