import React from "react";
import { DateValue, now, parseAbsoluteToLocal } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Spacer,
} from "@nextui-org/react";
import { EditModalProps, ModalEditContentProps } from "@/helpers/interfaces";
import { useEffect, useState } from "react";
import { formatDate } from "@/helpers/js-utils";
import ViewModalSkeleton from "./view-modal-skeleton";
import { Status } from "@/helpers/interfaces";
import { Calendar03Icon, TrelloIcon, ExternalLinkIcon } from "@/components/icons/icons";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Editor } from "@tinymce/tinymce-react";
import DragNdrop from "@/components/dragndrop/dragndrop";

interface SelectValue {
  key: string;
  value: string;
}

export const EditModal: React.FC<EditModalProps> = (props) => {
  const [content, setContent] = useState<ModalEditContentProps>();
  let defaultDate = today(getLocalTimeZone());

  const [actualDate, setActualDate] = React.useState(defaultDate);
  const releaseNotes = [
    { key: "yes", value: "YES" },
    { key: "no", value: "NO" },
  ];
  const [systemStatuses, setSystemStatuses] = useState<SelectValue[]>([]);
  const [selectedSystemStatus, setSelectedSystemStatus] = useState("14");
  const [selectedReleaseNote, setSelectedReleaseNote] = useState("no");

  const [comments, setComments] = useState<string>("");

  useEffect(() => {
    if (props.isOpen && props.id) {
      fetchInfo();
      fetchSystemStatuses();
    }
  }, [props.isOpen]);

  const fetchSystemStatuses = async () => {
    try {
      const response = await fetch("/api/v1/systemStatus", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      setSystemStatuses(data.map((item: Status) => ({ key: item.id.toString(), value: item.descStatus })));
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchInfo = async () => {
    try {
      const response = await fetch(`/api/v1/testPssSystem/${props.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json().then((data) => {
        console.log(systemStatuses);
        setContent(data);
        //setSelectedSystemStatus(data.status);
        setSelectedSystemStatus(data.status.toString());
        setSelectedReleaseNote(data.releaseNote);
        setActualDate(today(getLocalTimeZone()));
      });
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const handleSelectionChange = (select: string, value: string) => {
    switch (select) {
      case "releaseNote":
        setSelectedReleaseNote(value);
        break;
      case "systemStatus":
        setSelectedSystemStatus(value);
        break;
      default:
        break;
    }
  };
  return (
    <Modal
      size="5xl"
      isOpen={props.isOpen}
      onOpenChange={props?.onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      className="z-40">
      <ModalContent>
        {content ? (
          (onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div>
                  <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-row gap-2">{content?.srNumberRelation.srNumber}</div>
                    <div className="flex flex-row gap-4">
                      <TrelloIcon
                        className={
                          content.srNumberRelation.trelloLink != null ? "opacity-100 cursor-pointer" : "opacity-20"
                        }
                      />
                      <ExternalLinkIcon
                        className={
                          content.srNumberRelation.externalLink != null ? "opacity-100 cursor-pointer" : "opacity-20"
                        }
                      />
                      <Spacer x={10} />
                    </div>
                  </div>
                  <div className="text-small text-default-500">{content?.srNumberRelation.description}</div>
                </div>

                <Divider />
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      isDisabled
                      type="text"
                      label="App"
                      value={content?.releaseVersionRelation.appRelation.app}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      isDisabled
                      type="text"
                      label="Version"
                      value={content?.releaseVersionRelation.systemVersion.version}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      isDisabled
                      type="text"
                      label="Stage"
                      value={content?.releaseVersionRelation.stageRelation.stage}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      isDisabled
                      type="text"
                      label="Test Date"
                      value={content != null ? formatDate(content.dateTest) : ""}
                      className="max-w-32"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isDisabled={true}
                      type="text"
                      label="Assigned"
                      value={
                        content != null && content.assignedRelation != null ? content.assignedRelation.assigned : " "
                      }
                      className="max-w-28"
                    />
                  </div>
                </div>
                <Divider className="my-4" />
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <Select
                    label="Test Status"
                    className="max-w-xs w-3/12"
                    size="sm"
                    radius="sm"
                    selectionMode="single"
                    defaultSelectedKeys={[selectedSystemStatus]}
                    onChange={(event) => handleSelectionChange("systemStatus", event.target.value)}>
                    {systemStatuses.map((item, index) => (
                      <SelectItem key={item.key}>{item.value}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Release Note"
                    className="max-w-28 w-2/12"
                    size="sm"
                    radius="sm"
                    selectionMode="single"
                    selectedKeys={[selectedReleaseNote]}
                    onChange={(event) => handleSelectionChange("releaseNote", event.target.value)}>
                    {releaseNotes.map((item, index) => (
                      <SelectItem key={item.key}>{item.value}</SelectItem>
                    ))}
                  </Select>
                  <I18nProvider locale="en-GB">
                    <DatePicker
                      size="sm"
                      radius="sm"
                      className="w-3/12"
                      label={"Birth date"}
                      variant={"flat"}
                      value={actualDate}
                      onChange={setActualDate}
                      showMonthAndYearPickers
                      selectorIcon={<Calendar03Icon />}
                    />
                  </I18nProvider>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-col w-full">
                    {/* content != null && content.testAttachedInfo */}
                    <DragNdrop onFilesSelected={() => console.log("aaa")} width={"100%"} height={105} />
                  </div>
                </div>
                <Spacer y={10} />
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-col w-full">
                    {/* {content != null ? <Comments comment={content.COMMENTS} /> : ""} */}
                    {content != null ? (
                      <Editor
                        apiKey="r7158rr7s6ebkb65xmfx31fja06m36w2c9jnxgdpdi82uhoo"
                        onEditorChange={(newValue, editor) => {
                          setComments(newValue);
                        }}
                        init={{
                          menubar: false,
                          plugins: [
                            // Core editing features
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | forecolor | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                          mergetags_list: [
                            { value: "First.Name", title: "First Name" },
                            { value: "Email", title: "Email" },
                          ],
                        }}
                        initialValue={content.comments || ""}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button size="sm" color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button size="sm" color="primary" variant="light" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )
        ) : (
          <ViewModalSkeleton />
        )}
      </ModalContent>
    </Modal>
  );
};
