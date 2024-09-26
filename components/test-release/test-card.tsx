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
import { TestPssSystemProps } from "@/helpers/interfaces";
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
export const TestCard: React.FC<TestPssSystemProps> = ({ onView, handleRefresh, ...props }) => {
  const {
    id,
    dateTest,
    comments,
    dateModification,
    releaseNote,
    appRelation,
    srTypeRelation,
    srNumberRelation,
    stageRelation,
    statusRelation,
    assignedRelation,
    testAttachedInfo,
    releaseVersionRelation,
    systemVersionRelation,
  } = props;
  const username = localStorage.getItem("assigned");
  const { showDescription } = useAuthStore();

  const handleView = () => {
    onView(props.id);
  };

  const handleUnlink = async () => {
    try {
      const response = await fetch(`/api/v1/testPssSystem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ASSIGNED: null }),
      });

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
      const response = await fetch(`/api/v1/testPssSystem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ASSIGNED: window.localStorage.getItem("assigned") }),
      });

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
              {srNumberRelation.srNumber}
              {!showDescription ? (
                <>
                  <Spacer x={2} />
                  <div className="text-small text-default-500">{srNumberRelation.description}</div>
                </>
              ) : null}
              <Spacer className="flex" x={4} />

              <ViewIcon onClick={handleView} className="cursor-pointer mt-0.5" width={18} height={18} />
              {assignedRelation === null ? (
                <>
                  <Spacer x={2} />
                  <BookmarkIcon onClick={handleBookmark} className="cursor-pointer mt-0.5" width={18} height={18} />
                </>
              ) : null}
              {assignedRelation?.assigned === username ? (
                <>
                  <Spacer x={2} />
                  <EditIcon onClick={handleEdit} className="cursor-pointer mt-0.5" width={18} height={18} />
                  <Spacer x={2} />
                  <UnlinkIcon onClick={handleUnlink} className="cursor-pointer mt-0.5" width={18} height={18} />
                </>
              ) : null}
            </div>

            {showDescription ? <div className="text-small text-default-500">{srNumberRelation.description}</div> : null}
          </div>
          <div className="flex justify-end w-full">
            <div className="flex items-center space-x-2">
              <SourceCodeSquareIcon />
              <Tooltip content="Version" color="primary">
                <p>{systemVersionRelation.version}</p>
              </Tooltip>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <PinCode />
              <Tooltip content="Stage" color="primary">
                <p className="min-w-7">{releaseVersionRelation.stageRelation.stage}</p>
              </Tooltip>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 ">
              <CloudServerIcon />
              <p className="min-w-16">{appRelation.app}</p>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Note05Icon />
              <Tooltip content="Release Note" color="primary">
                <p>{releaseNote.toLocaleUpperCase()}</p>
              </Tooltip>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Calendar03Icon />
              <p className="min-w-24">{formatDate(dateTest)}</p>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 ">
              {statusRelation != null ? (
                <Chip
                  variant="flat"
                  className="min-w-36 text-center"
                  color={statusRelation.isFailed != "N" ? "danger" : "success"}>
                  {statusRelation.descStatus}{" "}
                </Chip>
              ) : (
                <Chip variant="flat" color={"default"} className="min-w-36 text-center">
                  No Status{" "}
                </Chip>
              )}
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Avatar name={assignedRelation?.assigned} size="sm" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Badge color="default" variant="faded" content={testAttachedInfo[0] != null ? "1" : "0"}>
                <Clip />
              </Badge>
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 cursor-pointer">
              <TrelloIcon className={srNumberRelation.trelloLink != null ? "opacity-100" : "opacity-20"} />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 cursor-pointer">
              <ExternalLinkIcon className={srNumberRelation.externalLink != null ? "opacity-100" : "opacity-20"} />
            </div>
          </div>
        </CardHeader>
        {showDescription ? (
          <>
            <Divider />
            <CardBody>
              <p className="text-small text-default-500">{comments}</p>
            </CardBody>
          </>
        ) : null}
      </Card>
    </div>
  );
};
