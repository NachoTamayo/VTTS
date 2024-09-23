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
} from "@nextui-org/react";
import { ViewModalProps, ModalViewContentProps } from "@/helpers/interfaces";
import { useEffect, useState } from "react";
import { formatDate } from "@/helpers/js-utils";
import { Clip } from "../icons/icons";
import { Comments } from "./comments";
import { AttachedDocument } from "./attached";
import ViewModalSkeleton from "./view-modal-skeleton";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export const ViewModal: React.FC<ViewModalProps> = (props) => {
  const [content, setContent] = useState<ModalViewContentProps>();

  useEffect(() => {
    if (props.isOpen && props.primKey) fetchInfo();
  }, [props.isOpen]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(
        `/api/v1/testPssSystem/${props.primKey.APP}/${props.primKey.RELEASE_VERSION}/${props.primKey.STAGE}/${props.primKey.SR_NUMBER}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json().then((data) => {
        console.log(data);
        setContent(data);
      });
    } catch (error) {
      console.error("Error fetching service requests:", error);
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
                  {content?.serviceRequest.SR_NUMBER}
                  <div className="text-small text-default-500">{content?.serviceRequest.DESCRIPTION}</div>
                </div>
                <Divider />
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-nowrap">
                    <Input isReadOnly type="text" label="App" value={content?.APP} className="max-w-28" />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Version"
                      value={content?.RELEASE_VERSION}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input isReadOnly type="text" label="Stage" value={content?.STAGE} className="max-w-28" />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Release Note"
                      value={content?.RELEASE_NOTE.toLocaleUpperCase()}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Test Date"
                      value={content != null ? formatDate(content.DATE_TEST) : ""}
                      className="max-w-32"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Last Tester"
                      value={content != null ? content.ASSIGNED : ""}
                      className="max-w-28"
                    />
                  </div>
                  <div className="flex flex-nowrap">
                    <Input
                      isReadOnly
                      type="text"
                      label="Test Status"
                      color={
                        content != null && content.testStatus
                          ? content.testStatus.IS_FAILED != "N"
                            ? "danger"
                            : "success"
                          : "default"
                      }
                      value={content != null && content.testStatus ? content.testStatus.DESC_STATUS : "No Status"}
                      className="max-w-48"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                  <div className="flex flex-col max-w-92">
                    {content != null && content.attached ? (
                      <>
                        <Card shadow="sm">
                          <CardHeader>
                            <p className="w-full mb-2 text-default-500 text-sm">Attached</p>
                          </CardHeader>
                          <CardBody>
                            <Tooltip content="Download" color="primary">
                              <AttachedDocument file={content.attached.FILE_NAME} />
                            </Tooltip>
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
                            <div dangerouslySetInnerHTML={{ __html: content.COMMENTS || "" }}></div>
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
