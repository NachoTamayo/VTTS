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
} from "@nextui-org/react";
import { ViewModalProps, ModalViewContentProps } from "@/helpers/interfaces";
import { useEffect, useState } from "react";
import { formatDate } from "@/helpers/js-utils";
import { Clip } from "../icons/icons";
import { Comments } from "./comments";
import { AttachedDocument } from "./attached";

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
        setContent(data[0]);
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
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div>
                {content?.srNumber[0].SR_NUMBER}
                <div className="text-small text-default-500">{content?.srNumber[0].DESCRIPTION}</div>
              </div>
              <Divider />
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                <div className="flex flex-nowrap">
                  <Input isReadOnly type="text" label="App" value={content?.APP} className="max-w-28" />
                </div>
                <div className="flex flex-nowrap">
                  <Input isReadOnly type="text" label="Version" value={content?.RELEASE_VERSION} className="max-w-28" />
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
                    color={content != null && content.status[0].IS_FAILED ? "danger" : "success"}
                    value={content != null ? content.status[0].DESC_STATUS : ""}
                    className="max-w-48"
                  />
                </div>
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                <div className="flex flex-col max-w-92">
                  {content != null && content.attachedInfo[0] ? (
                    <>
                      <div className="bg-gray-100 border border-gray-100 rounded-lg p-4 text-gray-800">
                        <p className="w-full mb-2 text-default-500 text-sm">Attached</p>
                        <Tooltip content="Download" color="primary">
                          <AttachedDocument file={content.attachedInfo[0].FILE_NAME} />
                        </Tooltip>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
                <div className="flex flex-col w-full">
                  <h5 className="w-full mb-2 text-default-500">Comments</h5>
                  <ScrollShadow className="w-full h-fit max-h-92">
                    {content != null ? <Comments comment={content.COMMENTS} /> : ""}
                  </ScrollShadow>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
