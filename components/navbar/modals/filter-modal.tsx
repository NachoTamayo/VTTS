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

interface SelectValue {
  key: string;
  value: string;
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const { testPssSystem, setTestPssSystem } = useDataStore();

  const [srTypes, setSrTypes] = useState<SelectValue[]>([]);
  const [selectedSrType, setSelectedSrType] = useState("0");
  const [systems, setSystems] = useState<SelectValue[]>([]);
  const [selectedSystem, setSelectedSystem] = useState("0");
  const [releaseVersions, setReleaseVersions] = useState<SelectValue[]>([]);
  const [selectedReleaseVersion, setSelectedReleaseVersion] = useState("all");
  const [stageVersions, setStageVersions] = useState<SelectValue[]>([]);
  const [selectedStageVersion, setSelectedStageVersion] = useState("0");
  const [serviceRequests, setServiceRequests] = useState<SelectValue[]>([]);
  const [selectedServiceRequest, setSelectedServiceRequest] = useState("all");
  const [users, setUsers] = useState<SelectValue[]>([]);
  const [selectedUser, setSelectedUser] = useState("0");
  const [loaded, setLoaded] = useState(false);
  const [selectedReleaseNote, setSelectedReleaseNote] = useState("all");
  const [systemStatuses, setSystemStatuses] = useState<SelectValue[]>([]);
  const [selectedSystemStatus, setSelectedSystemStatus] = useState("0");

  const [equalType, setEqualType] = useState(true);
  const [equalStageVersion, setEqualStageVersion] = useState(true);
  const [equalUser, setEqualUser] = useState(true);
  const [equalSystemStatus, setEqualSystemStatus] = useState(true);

  const releaseNotes = [
    { key: "all", value: "All" },
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
      data = data.map((item: SrType) => ({ key: item.id, value: item.srType }));
      let dataAux = [{ key: 0, value: "All" }, ...data];
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
      data = data.map((item: VttsSystem) => ({ key: item.id, value: item.app }));
      let dataAux = [{ key: 0, value: "All" }, ...data];
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
      data = data.map((item: ReleaseVersion) => ({ key: item.version, value: item.version }));
      let dataAux = [{ key: "all", value: "All" }, ...data];
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
      data = data.map((item: Stage) => ({ key: item.id, value: item.stage }));
      let dataAux = [{ key: 0, value: "All" }, ...data];
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
      data = data.map((item: ServiceRequest) => ({ key: item.srNumber, value: item.srNumber }));
      let dataAux = [{ key: "all", value: "All" }, ...data];
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
      data = data.map((item: VttsUser) => ({ key: item.id, value: item.assigned }));
      let dataAux = [{ key: 0, value: "All" }, { key: 999, value: "Unassigned" }, ...data];
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
      data = data.map((item: Status) => ({ key: item.id, value: item.descStatus }));
      let dataAux = [{ key: 0, value: "All" }, ...data];
      setSystemStatuses(dataAux);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const clearFilter = () => {
    setSelectedSrType("0");
    setSelectedSystem("0");
    setSelectedReleaseVersion("all");
    setSelectedStageVersion("0");
    setSelectedServiceRequest("all");
    setSelectedUser("0");
    setSelectedSystemStatus("0");
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
      filter += `equalType=${equalType}&`;
    }

    if (selectedSystem !== "0") {
      filter += `system=${selectedSystem}&`;
    }
    if (selectedReleaseVersion !== "all") {
      filter += `systemVersion=${selectedReleaseVersion}&`;
    }
    if (selectedStageVersion !== "0") {
      filter += `stageVersion=${selectedStageVersion}&`;
      filter += `equalStageVersion=${equalStageVersion}&`;
    }

    if (selectedServiceRequest !== "all") {
      filter += `serviceRequest=${selectedServiceRequest}&`;
    }
    if (selectedUser !== "0") {
      filter += `user=${selectedUser}&`;
      filter += `equalUser=${equalUser}&`;
    }

    if (selectedSystemStatus !== "0") {
      filter += `systemStatus=${selectedSystemStatus}&`;
      filter += `equalSystemStatus=${equalSystemStatus}&`;
    }

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
                      items={srTypes}
                      className="max-w-xs w-2/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedSrType]}
                      startContent={<EqualChanger value={equalType} setValue={setEqualType} />}
                      onChange={(event) => handleSelectionChange("srType", event.target.value)}>
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
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
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
                    </Select>
                    <Select
                      label="Version"
                      items={releaseVersions}
                      className="max-w-xs w-2/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedReleaseVersion]}
                      onChange={(event) => handleSelectionChange("systemVersion", event.target.value)}>
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
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
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
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
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
                    </Select>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Select
                      label="Service Request"
                      items={serviceRequests}
                      className="max-w-xs w-6/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedServiceRequest]}
                      onChange={(event) => handleSelectionChange("serviceRequest", event.target.value)}>
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
                    </Select>
                    <Select
                      label="Test Status"
                      items={systemStatuses}
                      className="max-w-xs w-4/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedSystemStatus]}
                      startContent={<EqualChanger value={equalSystemStatus} setValue={setEqualSystemStatus} />}
                      onChange={(event) => handleSelectionChange("systemStatus", event.target.value)}>
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
                    </Select>
                    <Select
                      label="Release Note"
                      items={releaseNotes}
                      className="max-w-xs w-2/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedReleaseNote]}
                      onChange={(event) => handleSelectionChange("releaseNote", event.target.value)}>
                      {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
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
