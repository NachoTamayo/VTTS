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
import { TestPssSystemProps, VttsUser, RelatedSR } from "@/helpers/interfaces";
import { formatDate } from "@/helpers/js-utils";
import { useAuthStore } from "@/helpers/auth-store";
import { useDataStore } from "@/helpers/data-store";
import { useState } from "react";
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
} from "../icons/Icons";
export const TestCard: React.FC<TestPssSystemProps> = ({ onView, onEdit, handleRefresh, ...props }) => {
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
  const username: VttsUser = JSON.parse(localStorage.getItem("user")?.toString() || "{}");
  const { showDescription } = useAuthStore();
  const { testPssSystem, setTestPssSystem } = useDataStore();
  const [relatedSRs, setRelatedSRs] = useState<RelatedSR[]>([]);

  const handleView = () => {
    onView(props.id);
  };

  const handleEdit = () => {
    onEdit(props.id);
  };

  const handleCheckRelated = async () => {
    const result = await fetch(`/api/v1/related?srNumber1=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await result.json().then((data) => {
      const newRelatedSRs = data.map((item: RelatedSR) => ({
        id: item.id,
        srNumber1Relation: item.srNumber1Relation,
        srNumber2Relation: item.srNumber2Relation,
        linkedByRelation: item.linkedByRelation,
      }));
      if (newRelatedSRs.length > 0) {
        setRelatedSRs(newRelatedSRs);
      } else {
        handleBookmark();
      }
    });
  };

  const handleUnlink = async () => {
    try {
      const response = await fetch(`/api/v1/testPssSystem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: null }),
      });

      await response.json().then((data) => {
        handleRefresh();
      });
    } catch (error) {
      console.error("Error to unlink tester:", error);
    }
  };

  const handleFilterSRNumber = async (srNumber: string) => {
    try {
      const response = await fetch("/api/v1/testPssSystem?serviceRequest=" + srNumber, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setTestPssSystem(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const handleBookmark = async () => {
    const user = window.localStorage.getItem("user");

    try {
      const response = await fetch(`/api/v1/testPssSystem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });

      await response.json().then((data) => {
        handleRefresh();
      });
    } catch (error) {
      console.error("Error to bookmark service request:", error);
    }
  };

  /*
    try {
      const response = await fetch(`/api/v1/testPssSystem/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      });

      await response.json().then((data) => {
        handleRefresh();
      });
    } catch (error) {
      console.error("Error to bookmark service request:", error);
    }*/

  return (
    <div>
      <Card
        className={srNumberRelation.lastTesterRelation.id === username.id ? "mx-4 my-2 bg-orange-100" : "mx-4 my-2"}>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col min-w-[37%]">
            <div className="flex text-md">
              <div
                className="cursor-pointer hover:underline"
                onClick={() => {
                  handleFilterSRNumber(srNumberRelation.srNumber);
                }}>
                {srNumberRelation.srNumber}
              </div>
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
              {assignedRelation?.id === username.id ? (
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
                <p>{releaseVersionRelation.systemVersion.version}</p>
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
              <p className="min-w-16">{releaseVersionRelation.appRelation.app}</p>
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
              <p className="min-w-24">{dateTest != null ? formatDate(dateTest) : " "}</p>
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
              <Badge
                color="default"
                variant="faded"
                content={testAttachedInfo[0] != null && testAttachedInfo[0].fileName != "" ? "1" : "0"}>
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
