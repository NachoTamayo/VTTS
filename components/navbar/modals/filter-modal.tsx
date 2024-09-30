import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Tooltip,
  select,
} from "@nextui-org/react";
import { SrType, VttsSystem, ReleaseVersion, Stage, ServiceRequest, VttsUser, Status } from "@/helpers/interfaces";
import { FilterModalSkeleton } from "./filter-modal-skeleton";
import { useState, useEffect, ChangeEvent } from "react";
import { FloppyDiskIcon, FolderOpenIcon } from "@/components/icons/icons";
import { EqualChanger } from "./equal-changer";
import { useDataStore } from "@/helpers/data-store";

interface FilterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const { testPssSystem, setTestPssSystem } = useDataStore();

  const [srTypes, setSrTypes] = useState<SrType[]>([]);
  const [selectedSrType, setSelectedSrType] = useState("0");
  const [systems, setSystems] = useState<VttsSystem[]>([]);
  const [selectedSystem, setSelectedSystem] = useState("0");
  const [releaseVersions, setReleaseVersions] = useState<ReleaseVersion[]>([]);
  const [selectedReleaseVersion, setSelectedReleaseVersion] = useState("all");
  const [stageVersions, setStageVersions] = useState<Stage[]>([]);
  const [selectedStageVersion, setSelectedStageVersion] = useState("All");
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState("all");
  const [users, setUsers] = useState<VttsUser[]>([]);
  const [selectedUser, setSelectedUser] = useState("0");
  const [loaded, setLoaded] = useState(false);
  const [selectedReleaseNote, setSelectedReleaseNote] = useState("all");
  const [systemStatuses, setSystemStatuses] = useState<Status[]>([]);
  const [selectedSystemStatus, setSelectedSystemStatus] = useState("all");

  const [equalType, setEqualType] = useState(true);
  const [equalStageVersion, setEqualStageVersion] = useState(true);
  const [equalUser, setEqualUser] = useState(true);
  const [equalSystemStatus, setEqualSystemStatus] = useState(true);

  const releaseNotes = [
    { key: "all", value: "ALL" },
    { key: "yes", value: "YES" },
    { key: "no", value: "NO" },
  ];

  const fetchSrTypes = async () => {
    try {
      const response = await fetch("/api/v1/srType", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ id: 0, srType: "All" }, ...data];
      setSrTypes(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };
  const fetchSystem = async () => {
    try {
      const response = await fetch("/api/v1/system", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ id: 0, app: "All" }, ...data];
      setSystems(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchReleaseVersion = async () => {
    try {
      const response = await fetch("/api/v1/systemVersion?distinct=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ version: "All" }, ...data];
      console.log(dataAux);
      setReleaseVersions(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchStage = async () => {
    try {
      const response = await fetch("/api/v1/stageVersion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ id: 0, stage: "All" }, ...data];
      setStageVersions(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch("/api/v1/serviceRequest?distinct=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ key: "All", srNumber: "All" }, ...data];
      setServiceRequests(dataAux);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ id: 0, assigned: "All" }, { id: 999, assigned: "Unassigned" }, ...data];
      setUsers(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };
  const fetchSystemStatuses = async () => {
    try {
      const response = await fetch("/api/v1/systemStatus", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ id: 0, descStatus: "All" }, ...data];
      setSystemStatuses(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const clearFilter = () => {
    setSelectedSrType("0");
    setSelectedSystem("0");
    setSelectedReleaseVersion("all");
    setSelectedStageVersion("All");
    setSelectedServiceRequest("all");
    setSelectedUser("0");
    setSelectedSystemStatus("all");
    setSelectedReleaseNote("all");
  };

  const handleSelectionChange = (select: string, value: string) => {
    switch (select) {
      case "srType":
        setSelectedSrType(value);
        break;
      case "system":
        setSelectedSystem(value);
        break;
      case "systemVersion":
        setSelectedReleaseVersion(value);
        break;
      case "stageVersion":
        setSelectedStageVersion(value);
        break;
      case "serviceRequest":
        setSelectedServiceRequest(value);
        break;
      case "user":
        setSelectedUser(value);
        break;
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

  const applyFilter = async () => {
    let filter = "?";
    if (selectedSrType !== "0") {
      filter += `srType=${selectedSrType}&`;
    }
    filter += `equalType=${equalType}&`;
    if (selectedSystem !== "0") {
      filter += `system=${selectedSystem}&`;
    }
    if (selectedReleaseVersion !== "all") {
      filter += `systemVersion=${selectedReleaseVersion}&`;
    }
    if (selectedStageVersion !== "All") {
      filter += `stageVersion=${selectedStageVersion}&`;
    }

    filter += `equalStageVersion=${equalStageVersion}&`;

    if (selectedServiceRequest !== "all") {
      filter += `serviceRequest=${selectedServiceRequest}&`;
    }
    if (selectedUser !== "0") {
      filter += `user=${selectedUser}&`;
    }
    filter += `equalUser=${equalUser}&`;
    if (selectedSystemStatus !== "all") {
      filter += `systemStatus=${selectedSystemStatus}&`;
    }
    filter += `equalSystemStatus=${equalSystemStatus}&`;

    if (selectedReleaseNote !== "all") {
      filter += `releaseNote=${selectedReleaseNote}&`;
    }

    try {
      const response = await fetch("/api/v1/testPssSystem" + filter, {
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

  const saveFilter = (filter: string) => {};
  const loadFilter = (filter: string) => {};

  useEffect(() => {
    if (props.isOpen) {
      fetchSrTypes();
      fetchSystem();
      fetchReleaseVersion();
      fetchStage();
      fetchServiceRequests();
      fetchUsers();
      fetchSystemStatuses();
    }
  }, [props.isOpen]);
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} placement="top" size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Test Release Filter</ModalHeader>
            <ModalBody>
              {!loaded ? (
                <FilterModalSkeleton />
              ) : (
                <>
                  <div className="flex flex-row gap-2">
                    <Select
                      label="Type"
                      className="max-w-xs w-2/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedSrType]}
                      startContent={<EqualChanger value={equalType} setValue={setEqualType} />}
                      onChange={(event) => handleSelectionChange("srType", event.target.value)}>
                      {srTypes.map((item, index) => {
                        return <SelectItem key={item.id}>{item.srType}</SelectItem>;
                      })}
                    </Select>
                    <Select
                      label="App"
                      items={systems}
                      className="max-w-xs w-3/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedSystem]}
                      onChange={(event) => handleSelectionChange("system", event.target.value)}>
                      {(system: VttsSystem) => <SelectItem key={system.id}>{system.app}</SelectItem>}
                    </Select>
                    <Select
                      label="Version"
                      className="max-w-xs w-2/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedReleaseVersion]}
                      onChange={(event) => handleSelectionChange("systemVersion", event.target.value)}>
                      {releaseVersions.map((item, index) => (
                        <SelectItem key={index === 0 ? "all" : item.version}>
                          {index === 0 ? "All" : item.version}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Stage"
                      items={stageVersions}
                      className="max-w-xs w-24"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedStageVersion]}
                      startContent={<EqualChanger value={equalStageVersion} setValue={setEqualStageVersion} />}
                      onChange={(event) => handleSelectionChange("stageVersion", event.target.value)}>
                      {stageVersions.map((item, index) => (
                        <SelectItem key={item.stage}>{item.stage}</SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Assigned"
                      items={users}
                      className="max-w-xs w-3/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedUser]}
                      startContent={<EqualChanger value={equalUser} setValue={setEqualUser} />}
                      onChange={(event) => handleSelectionChange("user", event.target.value)}>
                      {users.map((item, index) => (
                        <SelectItem key={item.id}>{item.assigned}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Select
                      label="Service Request"
                      className="max-w-xs w-6/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedServiceRequest]}
                      onChange={(event) => handleSelectionChange("serviceRequest", event.target.value)}>
                      {serviceRequests.map((item, index) => (
                        <SelectItem key={index === 0 ? "all" : item.srNumber}>
                          {index === 0 ? "All" : item.srNumber}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Test Status"
                      className="max-w-xs w-4/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedSystemStatus]}
                      startContent={<EqualChanger value={equalSystemStatus} setValue={setEqualSystemStatus} />}
                      onChange={(event) => handleSelectionChange("systemStatus", event.target.value)}>
                      {systemStatuses.map((item, index) => (
                        <SelectItem key={index === 0 ? "all" : item.id}>
                          {index === 0 ? "All" : item.descStatus}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Release Note"
                      className="max-w-xs w-2/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedReleaseNote]}
                      onChange={(event) => handleSelectionChange("releaseNote", event.target.value)}>
                      {releaseNotes.map((item, index) => (
                        <SelectItem key={index === 0 ? "all" : item.value}>
                          {index === 0 ? "All" : item.value}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <div className=" flex justify-start w-5/12 gap-1 align-middle">
                <div className="align-middle">
                  <Button onClick={() => loadFilter("one")}>Load Filter 1</Button>
                </div>
                <Tooltip content="Save Filter 1" color="primary">
                  <div>
                    <FloppyDiskIcon
                      className="cursor-pointer mt-1"
                      height={30}
                      width={30}
                      onClick={() => saveFilter("one")}
                    />
                  </div>
                </Tooltip>
                <div>
                  <Button onClick={() => loadFilter("two")}>Load Filter 2</Button>
                </div>
                <Tooltip content="Save Filter 2" color="primary">
                  <div>
                    <FloppyDiskIcon
                      className="cursor-pointer mt-1"
                      height={30}
                      width={30}
                      onClick={() => saveFilter("two")}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className=" flex gap-2 justify-center w-4/12">
                <Button color="default" onPress={props.onClose}>
                  Last Release
                </Button>
              </div>
              <div className=" flex flex-row gap-2 justify-end w-3/12">
                <Button color="danger" variant="flat" onClick={clearFilter}>
                  Clear
                </Button>
                <Button color="primary" onPress={props.onClose} onClick={applyFilter}>
                  Apply
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
