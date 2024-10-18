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
import { FilterModalSkeleton } from "./FilterModalSkeleton";
import { useState, useEffect, ChangeEvent } from "react";
import { FloppyDiskIcon, FolderOpenIcon } from "@/components/icons/Icons_temp";
import { EqualChanger } from "./EqualChanger";
import { useDataStore } from "@/helpers/data-store";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { useAlert } from "@/helpers/alert-context";

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

interface LastRelease {
  id: number;
  app: number;
  releaseVersion: number;
  stage: number;
}

interface SRFilters {
  filter1: string;
  filter2: string;
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const { testPssSystem, setTestPssSystem } = useDataStore();
  const { id: userID } = JSON.parse(localStorage.getItem("user") || "{}");
  const [userFilters, setUserFilters] = useState<SRFilters>();
  const { showAlert, alert } = useAlert();

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

  const [lastRelease, setLastRelease] = useState<LastRelease>();

  const [isLoadingSF1, setIsLoadingSF1] = useState(false);
  const [isLoadingSF2, setIsLoadingSF2] = useState(false);
  const [isLoadingLF2, setIsLoadingLF2] = useState(false);
  const [isLoadingLF1, setIsLoadingLF1] = useState(false);

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
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const newFilters = {
        filter1: data.srFilter1,
        filter2: data.srFilter2,
      };
      setUserFilters(newFilters);
      return newFilters; // Retorna los filtros actualizados
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
      data = data.map((item: VttsUser) => (item.id != userID ? { key: item.id, value: item.assigned } : null));
      let dataAux = [
        { key: 0, value: "All" },
        { key: 999, value: "Unassigned" },
        { key: userID, value: "My SRs" },
        ...data,
      ];
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

  const fetchLastRelease = async () => {
    try {
      const response = await fetch("/api/v1/releaseVersion?orderBy=id&orderType=desc&limit=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLastRelease({
        id: data[0].id,
        app: data[0].app,
        releaseVersion: data[0].releaseVersion,
        stage: data[0].stage,
      });
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

  const handleLastRelease = async () => {
    let filter = "?";
    if (lastRelease) {
      filter += `system=${lastRelease.app}&`;
      filter += `systemVersionId=${lastRelease.releaseVersion}&`;
      filter += `stageVersion=${lastRelease.stage}&`;
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

  const saveFilter = async (filter: string) => {
    filter === "one" ? setIsLoadingSF1(true) : setIsLoadingSF2(true);
    let body;
    const bodyJSON = JSON.stringify({
      srType: selectedSrType,
      srTypeEqual: equalType,
      system: selectedSystem,
      systemVersion: selectedReleaseVersion,
      stageVersion: selectedStageVersion,
      equalStage: equalStageVersion,
      serviceRequest: selectedServiceRequest,
      user: selectedUser,
      equalUser: equalUser,
      systemStatus: selectedSystemStatus,
      equalSystemStatus: equalSystemStatus,
      releaseNote: selectedReleaseNote,
    });

    if (filter === "one") {
      body = JSON.stringify({
        filter1: bodyJSON,
      });
    } else {
      body = JSON.stringify({
        filter2: bodyJSON,
      });
    }

    const response = fetch(`/api/v1/users/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    await response.then(() => {
      setTimeout(() => {
        filter === "one" ? setIsLoadingSF1(false) : setIsLoadingSF2(false);
      }, 250);
    });
  };
  const loadFilter = async (filter: string) => {
    filter === "one" ? setIsLoadingLF1(true) : setIsLoadingLF2(true);
    const response = await fetchUser();
    const filters = filter === "one" ? response?.filter1 : response?.filter2;

    if (filters) {
      const data = JSON.parse(filters);
      setSelectedSrType(data.srType);
      setEqualType(data.srTypeEqual);
      setSelectedSystem(data.system);
      setSelectedReleaseVersion(data.systemVersion);
      setSelectedStageVersion(data.stageVersion);
      setEqualStageVersion(data.equalStage);
      setSelectedServiceRequest(data.serviceRequest);
      setSelectedUser(data.user);
      setEqualUser(data.equalUser);
      setSelectedSystemStatus(data.systemStatus);
      setEqualSystemStatus(data.equalSystemStatus);
      setSelectedReleaseNote(data.releaseNote);
    }
    setTimeout(() => {
      filter === "one" ? setIsLoadingLF1(false) : setIsLoadingLF2(false);
    }, 250);
  };

  useEffect(() => {
    if (props.isOpen) {
      fetchSrTypes();
      fetchSystem();
      fetchReleaseVersion();
      fetchStage();
      fetchServiceRequests();
      fetchUsers();
      fetchSystemStatuses();
      fetchLastRelease();
      setTimeout(() => {
        setLoaded(true);
      }, 750);
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
                  <Button
                    size="sm"
                    onClick={() => loadFilter("one")}
                    className="bg-amber-300"
                    isLoading={isLoadingLF1}
                    isIconOnly>
                    <FolderOpenIcon width={15} height={15} />
                  </Button>
                </div>
                <div>
                  <Button
                    size="sm"
                    onClick={() => saveFilter("one")}
                    className="bg-green-400"
                    isLoading={isLoadingSF1}
                    isIconOnly>
                    <FloppyDiskIcon width={15} height={15} />
                  </Button>
                </div>
                <div>
                  <Button
                    size="sm"
                    onClick={() => loadFilter("two")}
                    className="bg-amber-300"
                    isLoading={isLoadingLF2}
                    isIconOnly>
                    <FolderOpenIcon width={15} height={15} />
                  </Button>
                </div>
                <div>
                  <Button
                    size="sm"
                    onClick={() => saveFilter("two")}
                    className="bg-green-400"
                    isLoading={isLoadingSF2}
                    isIconOnly>
                    <FloppyDiskIcon width={15} height={15} />
                  </Button>
                </div>
              </div>
              <div className=" flex gap-2 justify-center w-4/12">
                <Button size="sm" color="default" onPress={props.onClose} onClick={handleLastRelease}>
                  Last Release
                </Button>
              </div>
              <div className=" flex flex-row gap-2 justify-end w-3/12">
                <Button size="sm" color="danger" variant="flat" onClick={clearFilter}>
                  Clear
                </Button>
                <Button size="sm" color="primary" onPress={props.onClose} onClick={applyFilter}>
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
