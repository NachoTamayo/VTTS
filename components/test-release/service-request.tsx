import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Avatar,
  Badge,
  Tooltip,
  Spacer,
} from "@nextui-org/react";
import { ServiceRequestProps } from "@/helpers/interfaces";
import { formatDate } from "@/helpers/js-utils";
import { useAuthStore } from "@/helpers/auth-store";
import {
  Calendar03Icon,
  SourceCodeSquareIcon,
  CloudServerIcon,
  Note05Icon,
  Clip,
  TrelloIcon,
  EditIcon,
  ViewIcon,
  UnlinkIcon,
  BookmarkIcon,
  PinCode,
  ExternalLinkIcon,
} from "../icons/icons";
export const ServiceRequest: React.FC<ServiceRequestProps> = ({ onView, onOpen, handleRefresh, ...props }) => {
  const {
    _id,
    serviceRequest,
    RELEASE_VERSION,
    SR_TYPE,
    RELEASE_NOTE,
    DATE_TEST,
    testStatus,
    ASSIGNED,
    STAGE,
    COMMENTS,
    APP,
    DATE_MODIFICATION,
    attached,
  } = props;
  const username = localStorage.getItem("assigned");
  const { showDescription } = useAuthStore();

  const handleView = () => {
    onView({
      SR_NUMBER: serviceRequest.SR_NUMBER,
      APP: APP,
      RELEASE_VERSION: RELEASE_VERSION,
      STAGE: STAGE,
    });
  };

  const handleUnlink = async () => {
    try {
      const response = await fetch(
        `/api/v1/testPssSystem/${APP}/${RELEASE_VERSION}/${STAGE}/${serviceRequest.SR_NUMBER}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ASSIGNED: null }),
        }
      );

      await response.json().then((data) => {
        handleRefresh();
      });
    } catch (error) {
      console.error("Error to unlink tester:", error);
    }
  };

  const handleEdit = () => {};

  const handleBookmark = async () => {
    try {
      const response = await fetch(
        `/api/v1/testPssSystem/${APP}/${RELEASE_VERSION}/${STAGE}/${serviceRequest.SR_NUMBER}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ASSIGNED: window.localStorage.getItem("assigned") }),
        }
      );

      await response.json().then((data) => {
        handleRefresh();
      });
    } catch (error) {
      console.error("Error to bookmark service request:", error);
    }
  };
  return (
    <div>
      <Card className="mx-4 my-2">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col min-w-[37%]">
            <div className="flex text-md">
              {serviceRequest.SR_NUMBER}
              <Spacer className="flex" x={4} />
              <ViewIcon onClick={handleView} className="cursor-pointer mt-0.5" width={18} height={18} />
              {ASSIGNED === null ? (
                <>
                  <Spacer x={2} />
                  <BookmarkIcon onClick={handleBookmark} className="cursor-pointer mt-0.5" width={18} height={18} />
                </>
              ) : null}
              {ASSIGNED === username ? (
                <>
                  <Spacer x={2} />
                  <EditIcon onClick={handleEdit} className="cursor-pointer mt-0.5" width={18} height={18} />
                  <Spacer x={2} />
                  <UnlinkIcon onClick={handleUnlink} className="cursor-pointer mt-0.5" width={18} height={18} />
                </>
              ) : null}
            </div>

            <div className="text-small text-default-500">{serviceRequest.DESCRIPTION}</div>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex items-center space-x-2">
              <SourceCodeSquareIcon />
              <Tooltip content="Version" color="primary">
                <p>{RELEASE_VERSION}</p>
              </Tooltip>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <PinCode />
              <Tooltip content="Stage" color="primary">
                <p className="min-w-7">{STAGE}</p>
              </Tooltip>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 ">
              <CloudServerIcon />
              <p className="min-w-16">{APP}</p>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Note05Icon />
              <Tooltip content="Release Note" color="primary">
                <p>{RELEASE_NOTE.toLocaleUpperCase()}</p>
              </Tooltip>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Calendar03Icon />
              <p className="min-w-24">{formatDate(DATE_TEST)}</p>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 ">
              {testStatus != null ? (
                <Chip
                  variant="flat"
                  className="min-w-36 text-center"
                  color={testStatus.IS_FAILED != "N" ? "danger" : "success"}>
                  {testStatus.DESC_STATUS}{" "}
                </Chip>
              ) : (
                <Chip variant="flat" color={"default"} className="min-w-36 text-center">
                  No Status{" "}
                </Chip>
              )}
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Avatar name={ASSIGNED} size="sm" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Badge color="default" variant="faded" content={attached != null ? "1" : "0"}>
                <Clip />
              </Badge>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 cursor-pointer">
              <TrelloIcon />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 cursor-pointer">
              <ExternalLinkIcon />
            </div>
          </div>
        </CardHeader>
        {showDescription ? (
          <>
            <Divider />
            <CardBody>
              <p className="text-small text-default-500">{COMMENTS}</p>
            </CardBody>
          </>
        ) : null}
      </Card>
    </div>
  );
};
