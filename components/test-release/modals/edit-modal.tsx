import React from "react";
import { parseAbsoluteToLocal, toCalendarDate } from "@internationalized/date";
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
  Select,
  SelectItem,
  DatePicker,
  Spacer,
} from "@nextui-org/react";
import { EditModalProps, ModalEditContentProps } from "@/helpers/interfaces";
import { useEffect, useState } from "react";
import EditModalSkeleton from "./edit-modal-skeleton";
import { Status } from "@/helpers/interfaces";
import { Calendar03Icon, TrelloIcon, ExternalLinkIcon } from "@/components/icons/icons";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Editor } from "@tinymce/tinymce-react";
import DragNdrop from "@/components/dragndrop/dragndrop";
import { toast } from "sonner";

interface SelectValue {
  key: string;
  value: string;
}

export const EditModal: React.FC<EditModalProps> = (props) => {
  const [ready, setReady] = useState(false);

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(undefined);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const [comments, setComments] = useState<string>("");

  useEffect(() => {
    if (props.isOpen && props.id) {
      setContent(undefined);
      fetchInfo();
      fetchSystemStatuses();
      setSelectedFile(null);
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
        setContent(data);
        //setSelectedSystemStatus(data.status);
        setSelectedSystemStatus(data.status?.toString() ?? null);
        setSelectedReleaseNote(data.releaseNote);
        setSelectedFileId(data.testAttachedInfo[0]?.id ?? null);
        setSelectedFileName(data.testAttachedInfo[0]?.fileName ?? undefined);
        if (data.dateTest) {
          setActualDate(toCalendarDate(parseAbsoluteToLocal(data.dateTest)));
        }
        setTimeout(() => {
          setReady(true);
        }, 250);
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

  const handleFileChange = async (file: File) => {
    console.log(file);
    setSelectedFile(file);
  };
  const handleExternalLink = (link: string) => {
    window.open(link, "_blank");
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile?.name ?? "");
      formData.append("comments", comments);
      formData.append("status", selectedSystemStatus);
      formData.append("releaseNote", selectedReleaseNote);
      formData.append("dateTest", actualDate.toString());
      formData.append("fileId", selectedFileId ?? "");
      formData.append("srNumber", content?.srNumberRelation.srNumber ?? "");
      console.log(selectedFile);

      const response = await fetch(`/api/v1/testPssSystem/${props.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        props.handleRefresh && props.handleRefresh();
        props.onOpenChange && props.onOpenChange(false);
        toast.success("Data saved successfully", { duration: 3000, position: "top-right" });
      } else {
        console.error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving data:", error);
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
              <div className={ready ? "block" : "hidden"}>
                <ModalHeader className="flex flex-col gap-1">
                  <div>
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-row gap-2">{content?.srNumberRelation.srNumber}</div>
                      <div className="flex flex-row gap-4 align-middle">
                        <TrelloIcon
                          width={30}
                          height={30}
                          onClick={() => handleExternalLink(content.srNumberRelation.trelloLink ?? "")}
                          className={
                            content.srNumberRelation.trelloLink != null ? "opacity-100 cursor-pointer" : "opacity-20"
                          }
                        />
                        <ExternalLinkIcon
                          width={30}
                          height={30}
                          onClick={() => handleExternalLink(content.srNumberRelation.externalLink)}
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
                      className="max-w-xs w-3/12 h-12"
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
                      className="max-w-28 w-2/12 h-12"
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
                        className="w-3/12 h-12"
                        label={"Test Date"}
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
                      <DragNdrop
                        onFilesSelected={handleFileChange}
                        srNumber={content.srNumberRelation.srNumber}
                        fileName={selectedFileName}
                        width={"100%"}
                        height={112}
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                    <div className="flex flex-col w-full">
                      {/* {content != null ? <Comments comment={content.COMMENTS} /> : ""} */}
                      {content != null ? (
                        <Editor
                          apiKey="r7158rr7s6ebkb65xmfx31fja06m36w2c9jnxgdpdi82uhoo"
                          onEditorChange={(newValue, editor) => {
                            setComments(newValue);
                          }}
                          scriptLoading={{ async: true }}
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              // Core editing features
                              "wordcount",
                              "lists",
                              "code",
                              "fullscreen",
                            ],
                            toolbar:
                              " forecolor | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code fullscreen",
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
                  <Button size="sm" color="primary" variant="light" onClick={handleSave}>
                    Save
                  </Button>
                </ModalFooter>
              </div>
              <div className={ready ? "hidden" : "block"}>
                <EditModalSkeleton />
              </div>
            </>
          )
        ) : (
          <EditModalSkeleton />
        )}
      </ModalContent>
    </Modal>
  );
};
