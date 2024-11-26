"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Card,
  CardBody,
  SortDescriptor,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Descriptor, ServiceRequest, RowsProps, Version, SystemVersion, SelectValue } from "@/helpers/interfaces";
import { TableWrapper } from "@/components/table/Table";
import { RenderCell } from "@/components/version/modals/table/ModifyRenderCell";
import { VersionForecast } from "@prisma/client";
import { ModifyModalSkeleton } from "@/components/version/modals/ModifyModalSkeleton";
import { toast } from "sonner";

const columns = [
  {
    name: "table.header.actions",
    hideHeader: true,
  },
  {
    name: "table.header.id",
    sortable: false,
    hideHeader: true,
    hideColumn: true,
  },
  {
    name: "table.header.type",
    sortable: true,
  },
  {
    name: "table.header.srNumber",
    sortable: true,
  },
  {
    name: "table.header.description",
    sortable: true,
    width: "w-3/5",
  },
];

interface ModifyModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSubmit: () => void;
  onCloseModal: () => void;
  selectedId?: string;
}

export const ModifyModal: React.FC<ModifyModalProps> = (props) => {
  const t = useTranslations("Version");
  const g = useTranslations("Global");
  const [ready, setReady] = useState<boolean>(false);
  const [rows, setRows] = useState<RowsProps[]>([]);
  const [rowsInitial, setRowsInitial] = useState<RowsProps[]>([]);
  const [selectedSRs, setSelectedSRs] = useState<RowsProps[]>([]);
  const [selectedVersion, setSelecedVersion] = useState<VersionForecast[]>([]);
  const [descriptor, setDescriptor] = useState<Descriptor>({ column: "srType", direction: "asc" });
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "2", direction: "ascending" }); //checked, id, srType, srNumber, description
  const [systemVersions, setSystemVersions] = useState<SelectValue[]>([]);
  const [selectedSystemVersion, setSelectedSystemVersion] = useState<string>("0");

  const handleClick = (id: string, option: string, selected?: boolean) => {
    if (option === "check" && !selected) {
      const newSelectedSRs = selectedSRs.filter((sr: RowsProps) => {
        return sr.id.toString() !== id.toString();
      });
      const newRows = rows.map((row: RowsProps) => {
        if (row.id === id) {
          return { ...row, checked: false };
        }
        return row;
      });
      setRows(newRows);
      setSelectedSRs(newSelectedSRs);
    } else if (option === "check" && selected) {
      const newSR = rows.map((row: RowsProps) => {
        if (row.id === id) {
          return { ...row, checked: true };
        }
        return row;
      });
      const newSelectedSRs = rows.find((sr: RowsProps) => {
        return sr.id.toString() === id.toString();
      });
      if (newSelectedSRs) setSelectedSRs([...selectedSRs, newSelectedSRs]);
      setRows(newSR);
    }
  };

  const sortSRs = (objectArray: RowsProps[] = rows, column: keyof RowsProps) => {
    const sortArray = [...objectArray].sort((a: RowsProps, b: RowsProps) => {
      if (descriptor.direction === "asc") {
        if (a[column] !== undefined && b[column] !== undefined && a[column] > b[column]) return 1;
        else if (b[column] !== undefined && a[column] !== undefined && b[column] > a[column]) return -1;
        return 0;
      } else {
        if (a[column] !== undefined && b[column] !== undefined && a[column] < b[column]) return 1;
        else if (b[column] !== undefined && a[column] !== undefined && b[column] < a[column]) return -1;
        return 0;
      }
    });

    setRows(sortArray);
    setRowsInitial(sortArray);
  };

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    const column =
      sortDescriptor.column === "2" ? "srType" : sortDescriptor.column === "3" ? "srNumber" : "description";
    const direction = sortDescriptor.direction === "ascending" ? "asc" : "desc";
    setDescriptor({ column, direction });
  };

  const handleModify = async () => {
    try {
      const deleteResult = await fetch(`/api/v1/version?version`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: props.selectedId,
        }),
      });
      const newData = selectedSRs.map((sr: RowsProps) => {
        return sr.id;
      });
      const result = await fetch(`/api/v1/version`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedSRs: newData.join(","),
          version: props.selectedId,
        }),
      });
      if (result.status === 200) {
        toast.success(t("messages.success.update"));
        props.onCloseModal();
      } else {
        toast.error(t("messages.error.update"));
      }
    } catch (error) {
      console.error("Error modifying service request", error);
    }
  };
  const handleSelectionChange = async (key: string, value: string) => {
    if (key === "systemVersion") {
      setSelectedSystemVersion(value);
      const importedVersion = await fetch(`/api/v1/version?version=${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      let arrSelected = new Array();
      const selSRs = importedVersion.map((item: Version) => {
        arrSelected.push(item.srNumberRelation.id);
        return {
          id: item.srNumberRelation.id,
          srType: item.srNumberRelation.srTypeRelation.srType,
          srNumber: item.srNumberRelation.srNumber,
          description: item.srNumberRelation.description,
        };
      });
      const newRows = rows.map((row: RowsProps) => {
        if (arrSelected.includes(row.id)) {
          return { ...row, checked: true };
        }
        return { ...row, checked: false };
      });
      setRows(newRows);
      setSelectedSRs(selSRs);
    }
  };

  const handleClose = (serviceRequest: RowsProps) => {
    setSelectedSRs(selectedSRs.filter((sr) => sr.id !== serviceRequest.id));
    const newRows = rows.map((row: RowsProps) => {
      if (row.id === serviceRequest.id) {
        return { ...row, checked: false };
      }
      return row;
    });
    setRows(newRows);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/v1/version?version=${props.selectedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dat = await res.json();
      setSelecedVersion(dat);
      const selSRs = dat.map((item: Version) => {
        return {
          id: item.srNumberRelation.id,
          srType: item.srNumberRelation.srTypeRelation.srType,
          srNumber: item.srNumberRelation.srNumber,
          description: item.srNumberRelation.description,
        };
      });

      setSelectedSRs(selSRs);

      const response = await fetch("/api/v1/serviceRequest?status=OPEN", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const result = data.map((item: ServiceRequest) => {
        const found = selSRs.some((sr: ServiceRequest) => {
          return sr.id === item.id;
        });
        return {
          checked: found,
          id: item.id,
          srType: item.srTypeRelation.srType,
          srNumber: item.srNumber,
          description: item.description,
        };
      });

      setRows(result);
      setRowsInitial(result);

      const systemVersions = await fetch(`/api/v1/systemVersion`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      const systemVersionsData = systemVersions.map((item: SystemVersion) => {
        return {
          key: item.id,
          value: item.appRelation.app + " " + item.version,
        };
      });
      setSystemVersions([{ key: 0, value: g("all") }, ...systemVersionsData]);
    } catch (error) {
      console.error("Error fetching service request", error);
    }
  };

  const init = async () => {
    setReady(false);
    setSelectedSystemVersion("0");
    await fetchData().then(() => {
      setReady(true);
    });
  };

  useEffect(() => {
    if (props.isOpen) {
      init();
    }
  }, [props.isOpen]);

  useEffect(() => {
    sortSRs(rows, descriptor.column as keyof RowsProps);
  }, [selectedVersion, selectedSRs, descriptor]);

  return (
    <Modal
      size="5xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onClose={props.onCloseModal}
      isDismissable={false}>
      <ModalContent>
        {(onClose) =>
          !ready ? (
            <>
              <ModifyModalSkeleton />
            </>
          ) : (
            <>
              <ModalHeader className="flex flex-col gap-1">{t("modal.editHeader")}</ModalHeader>
              <ModalBody>
                <Card shadow="sm" className="min-h-14 max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
                  <CardBody>
                    <div className="w-full h-full overflow-auto">
                      <div className="flex gap-2 flex-wrap">
                        {selectedSRs.map((related, index) => (
                          <Chip key={index} onClose={() => handleClose(related)} variant="flat">
                            {related.srNumber}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="flex flex-row justify-items-end gap-2 mt-1 w-12/12 ">
                  <div className="w-8/12"></div>
                  <div className="w-2/12 flex items-center justify-end">
                    <label className="align-middle text-[#11181c] text-xs subpixel-antialiased">
                      {t("labels.previousVersion")}
                    </label>
                  </div>
                  <div className="w-3/12 flex items-center justify-end">
                    <Select
                      aria-label="version"
                      items={systemVersions}
                      className=" w-11/12"
                      size="sm"
                      radius="sm"
                      selectionMode="single"
                      selectedKeys={[selectedSystemVersion]}
                      onChange={(event) => handleSelectionChange("systemVersion", event.target.value)}>
                      {(item: SelectValue) => (
                        <SelectItem key={item.key ?? ""} textValue={item.value}>
                          {item.value}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </div>
                <div className="overflow-scroll max-h-[410px]">
                  <TableWrapper
                    isHeaderSticky={true}
                    rows={rows}
                    columns={columns}
                    onClick={handleClick}
                    onSortChange={handleSortChange}
                    sortDescriptorProp={sortDescriptor}
                    multiLanguage="ServiceRequest"
                    RenderCell={RenderCell}
                    isOpen={ready}
                  />
                </div>
                <div className="w-full">
                  <label className="align-middle text-[#11181c] text-sm subpixel-antialiased">
                    {t("labels.resultsSelected1") + selectedSRs.length + t("labels.resultsSelected2") + rows.length}
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button size="sm" color="danger" variant="flat" onPress={onClose}>
                  {g("cancel")}
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    handleModify();
                  }}>
                  {t("table.actions.modify")}
                </Button>
              </ModalFooter>
            </>
          )
        }
      </ModalContent>
    </Modal>
  );
};
