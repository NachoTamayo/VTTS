import React from "react";
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
  Tooltip,
  Card,
  CardBody,
  CardHeader,
  Spacer,
} from "@nextui-org/react";
import { ViewModalProps, ModalViewContentProps } from "@/helpers/interfaces";
import { useEffect, useState } from "react";
import { formatDate } from "@/helpers/js-utils";
import { AttachedDocument } from "./Attached";
import ViewModalSkeleton from "./ViewModalSkeleton";
import { Calendar03Icon, TrelloIcon, ExternalLinkIcon } from "@/components/icons/Icons_temp";

export const ViewModal: React.FC<ViewModalProps> = (props) => {
  const [content, setContent] = useState<ModalViewContentProps>();

  useEffect(() => {
    if (props.isOpen && props.id) fetchInfo();
  }, [props.isOpen]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`/api/v1/testPssSystem/${props.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json().then((data) => {
        console.log(data);
        setContent(data);
      });
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const handleExternalLink = (link: string) => {
    window.open(link, "_blank");
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
                      type="text"
                      label="App"
                      value={content?.releaseVersionRelation.appRelation.app}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Version"
                      value={content?.releaseVersionRelation.systemVersion.version}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Stage"
                      value={content?.releaseVersionRelation.stageRelation.stage}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Release Note"
                      value={content?.releaseNote.toLocaleUpperCase()}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Test Date"
                      value={content != null ? formatDate(content.dateTest) : ""}
                      className="max-w-32"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Assigned"
                      value={
                        content != null && content.assignedRelation != null ? content.assignedRelation.assigned : " "
                      }
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Test Status"
                      color={
                        content != null && content.statusRelation
                          ? content.statusRelation.isFailed != "N"
                            ? "danger"
                            : "success"
                          : "default"
                      }
                      value={
                        content != null && content.statusRelation ? content.statusRelation.descStatus : "No Status"
                      }
                      className="max-w-48"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-col max-w-92">
                    {content != null && content.testAttachedInfo ? (
                      <>
                        <p className="w-full mb-2 text-default-500 text-sm">Attached</p>
                        <Card shadow="sm">
                          <CardBody>
                            <AttachedDocument file={content.testAttachedInfo[0].fileName} />
                          </CardBody>
                        </Card>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-col w-full">
                    {/* {content != null ? <Comments comment={content.COMMENTS} /> : ""} */}
                    {content != null ? (
                      <Card shadow="sm" allowTextSelectionOnPress={true}>
                        <CardHeader>
                          {" "}
                          <p className="text-small text-default-500">Comments</p>
                        </CardHeader>
                        <CardBody>
                          <ScrollShadow className="w-full h-fit max-h-92">
                            <div dangerouslySetInnerHTML={{ __html: content.comments || "" }}></div>
                          </ScrollShadow>
                        </CardBody>
                      </Card>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
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
