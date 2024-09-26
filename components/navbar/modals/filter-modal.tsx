import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { SrType, VttsSystem, ReleaseVersion } from "@/helpers/interfaces";

import { useState, useEffect, ChangeEvent } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}
interface SystemStageVersion {
  stage: string;
  version: string;
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const [srTypes, setSrTypes] = useState<SrType[]>([]);
  const [selectedSrType, setSelectedSrType] = useState("0");
  const [systems, setSystems] = useState<VttsSystem[]>([]);
  const [selectedSystem, setSelectedSystem] = useState("0");
  const [releaseVersions, setReleaseVersions] = useState<SystemStageVersion[]>([]);
  const [selectedReleaseVersion, setSelectedReleaseVersion] = useState("All");

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
      const response = await fetch("/api/v1/releaseVersion", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      let dataAux = [{ stage: "All", version: "All" }, ...data];
      setReleaseVersions(dataAux);
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
      default:
        break;
    }
  };

  useEffect(() => {
    fetchSrTypes();
    fetchSystem();
    fetchReleaseVersion();
  }, []);
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} placement="top-center" size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <div className="flex flex-row gap-2">
                <Select
                  label="Type"
                  items={srTypes}
                  className="max-w-xs w-2/12"
                  size="sm"
                  radius="sm"
                  selectedKeys={selectedSrType}
                  onChange={(event) => handleSelectionChange("srType", event.target.value)}>
                  {(srType: SrType) => <SelectItem key={srType.id}>{srType.srType}</SelectItem>}
                </Select>
                <Select
                  label="App"
                  items={systems}
                  className="max-w-xs w-3/12"
                  size="sm"
                  radius="sm"
                  selectedKeys={selectedSystem}
                  onChange={(event) => handleSelectionChange("system", event.target.value)}>
                  {(system: VttsSystem) => <SelectItem key={system.id}>{system.app}</SelectItem>}
                </Select>
                {
                  <Select
                    label="Version"
                    items={releaseVersions}
                    className="max-w-xs w-3/12"
                    size="sm"
                    radius="sm"
                    selectedKeys={{}}
                    onChange={(event) => handleSelectionChange("systemVersion", event.target.value)}>
                    {(version: { stage: string; version: string }) =>
                      version.stage === "All" ? (
                        <SelectItem key={"all"}>{"All"}</SelectItem>
                      ) : (
                        <SelectItem key={version.version}>{version.version + "." + version.stage}</SelectItem>
                      )
                    }
                  </Select>
                }
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={props.onClose}>
                Close
              </Button>
              <Button color="primary" onPress={props.onClose} onClick={applyFilter}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
