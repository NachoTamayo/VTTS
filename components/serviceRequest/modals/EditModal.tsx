import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface SelectValue {
  key: string;
  value: string;
}

interface EditModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSubmit: (title: string, tlink: string, elink: string, desc: string, type: string) => void;
  arrTypes: SelectValue[];
  selectedId?: string;
}

export const EditModal: React.FC<EditModalProps> = (props) => {
  const t = useTranslations("ServiceRequest");
  const g = useTranslations("Global");
  const [title, setTitle] = useState("");
  const [tlink, setTlink] = useState("");
  const [elink, setElink] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  let auxTypes = props.arrTypes;
  const handleSubmit = () => {
    if (!title || !desc || !type) {
      toast.error(t("messages.requiredFields"), {
        duration: 2000,
      });
      return;
    }
    props.onSubmit(title, tlink, elink, desc, type);
  };

  const loadServiceRequest = async (id: string) => {
    const response = await fetch(`/api/v1/serviceRequest/${id}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTitle(data.srNumber);
      setTlink(data.trelloLink || "");
      setElink(data.externalLink || "");
      setDesc(data.description);
      setType(data.srType.toString());
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      setTitle("");
      setTlink("");
      setElink("");
      setDesc("");
      setType("");
      auxTypes[0] = { key: "", value: "" };
      if (props.selectedId && props.selectedId != "0") {
        loadServiceRequest(props.selectedId);
      }
    }
  }, [props.isOpen]);

  return (
    <Modal size="2xl" isOpen={props.isOpen} onOpenChange={props.onOpenChange} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            {props.selectedId && props.selectedId != "0" ? (
              <ModalHeader>{t("labels.modal.editHeader")}</ModalHeader>
            ) : (
              <ModalHeader>{t("labels.modal.header")}</ModalHeader>
            )}
            <ModalBody>
              <Input
                isRequired
                type="text"
                placeholder={t("labels.modal.titlePlaceholder")}
                labelPlacement="outside"
                label={t("labels.modal.srNumber")}
                className="w-full"
                value={title}
                onValueChange={setTitle}
              />
              <Select
                isRequired
                label={t("labels.type")}
                labelPlacement="outside"
                placeholder={t("labels.modal.typePlaceholder")}
                items={auxTypes}
                className="max-w-xs w-6/12"
                size="md"
                radius="sm"
                selectionMode="single"
                selectedKeys={[type]}
                onChange={(event) => setType(event.target.value)}>
                {(item: SelectValue) => <SelectItem key={item.key ?? ""}>{item.value}</SelectItem>}
              </Select>
              <Input
                type="text"
                placeholder={t("labels.modal.externalLinkPlaceholder")}
                labelPlacement="outside"
                label={t("labels.modal.externalLink")}
                className="w-full"
                value={elink}
                onValueChange={setElink}
              />
              <Input
                type="text"
                placeholder={t("labels.modal.trelloLinkPlaceholder")}
                labelPlacement="outside"
                label={t("labels.modal.trelloLink")}
                className="w-full"
                value={tlink}
                onValueChange={setTlink}
              />
              <Textarea
                isRequired
                placeholder={t("labels.modal.descriptionPlaceholder")}
                label={t("labels.modal.description")}
                labelPlacement="outside"
                className="w-full"
                minRows={4}
                maxRows={10}
                value={desc}
                onValueChange={setDesc}
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" color="danger" variant="flat" onPress={props.onClose}>
                {g("cancel")}
              </Button>
              <Button size="sm" color="primary" onClick={handleSubmit}>
                {g("save")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
