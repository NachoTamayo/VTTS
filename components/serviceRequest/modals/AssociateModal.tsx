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
  Chip,
  ScrollShadow,
  SortDescriptor,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Descriptor, ServiceRequest, RowsProps, RelatedSR } from "@/helpers/interfaces";
import { TableWrapper } from "@/components/table/Table";
import { RenderCell } from "@/components/serviceRequest/modals/table/RenderCell";
import AnimateHeight from "react-animate-height";

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

interface AssociatenModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSubmit: () => void;
  onCloseModal: () => void;
  selectedId?: string;
}

interface Related {
  id: string;
  sr1Id: string;
  sr2Id: string;
  srNumber1: string;
  srNumber2: string;
  description?: string;
  srType: string;
}

export const AssociateModal: React.FC<AssociatenModalProps> = (props) => {
  const t = useTranslations("ServiceRequest");
  const g = useTranslations("Global");
  const [rows, setRows] = useState<RowsProps[]>([]);
  const [relatedSRs, setRelatedSRs] = useState<Related[]>([]);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "3", direction: "ascending" });
  const [descriptor, setDescriptor] = useState<Descriptor>({ column: "srNumber", direction: "asc" });
  const [ready, setReady] = useState(false);

  const handleClose = (rel: Related) => {
    console.log(rel);
    setRelatedSRs(relatedSRs.filter((related) => related.sr2Id !== rel.sr2Id));
    const newRelated: RowsProps = {
      actions: "actions",
      id: rel.id,
      srType: rel.srType,
      srNumber: rel.srNumber2,
      description: rel.description || "",
    };
    setRows([...rows, newRelated]);
  };

  const fetchData = async () => {
    try {
      const relationResponse = await fetch(
        `/api/v1/related?srNumber1=${props.selectedId}?orderBy=srType&orderDirection=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const relations = await relationResponse.json();
      const relSRs = relations.map((item: RelatedSR) => {
        console.log(item);
        return {
          id: item.id,
          sr1Id: item.srNumber1,
          sr2Id: item.srNumber2,
          srNumber1: item.srNumber1Relation.srNumber,
          srNumber2: item.srNumber2Relation.srNumber,
          description: item.srNumber2Relation.description,
          srType: item.srNumber2Relation.srTypeRelation.srType,
        };
      });
      setRelatedSRs(relSRs);
      const response = await fetch("/api/v1/serviceRequest?orderBy=srNumber&orderDirection=asc", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const newData = data.map((item: ServiceRequest) => {
        return {
          actions: "actions",
          id: item.id,
          srType: item.srTypeRelation.srType,
          srNumber: item.srNumber,
          description: item.description,
        };
      });

      // Crear un Set de sr1Id para una búsqueda eficiente
      const relatedSr2Ids = new Set(relSRs.map((sr: Related) => sr.sr2Id));

      // Filtrar newData verificando si item.id existe en relatedSr1Ids y si es diferente de selectedId
      setRows(
        newData.filter((item: ServiceRequest) => !relatedSr2Ids.has(item.id) && Number(props.selectedId) !== item.id)
      );

      setReady(true);
    } catch (error) {
      console.error("Error fetching service request", error);
    }
  };

  const handleClick = (id: string, option: string) => {
    if (option === "add") {
      let selectedSR: RowsProps | undefined;
      const newRows = rows.filter((row) => {
        if (row.id === id) {
          selectedSR = row;
          return false;
        }
        return true;
      });
      setRows(newRows);
      const sr1Id = props.selectedId ? props.selectedId : "";
      const sr2Id = selectedSR ? selectedSR.id : "";
      const srNumber1 = props.selectedId ? props.selectedId : "";
      const srNumber2 = selectedSR?.srNumber ? selectedSR.srNumber : "";
      const description = selectedSR ? selectedSR.description : "";
      const srType = selectedSR?.srType ? selectedSR.srType : "";
      const newRelated: Related = { id: "", sr1Id, sr2Id, srNumber1, srNumber2, description, srType };
      setRelatedSRs([...relatedSRs, newRelated]);
    }
  };

  const sortSRs = (serviceRequests: RowsProps[] = rows, column: keyof RowsProps) => {
    console.log(relatedSRs.length);
    const sortArray = [...serviceRequests].sort((a: RowsProps, b: RowsProps) => {
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
  };

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    const column =
      sortDescriptor.column === "2" ? "srType" : sortDescriptor.column === "3" ? "srNumber" : "description";
    const direction = sortDescriptor.direction === "ascending" ? "asc" : "desc";
    setDescriptor({ column, direction });
  };

  const handleAssociate = async () => {
    let sSRNumbers2 = "";
    relatedSRs.forEach((rel) => {
      if (sSRNumbers2 != "") sSRNumbers2 += ",";
      sSRNumbers2 += rel.sr2Id;
    });
    try {
      const response = await fetch(`/api/v1/related`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ srNumber1: props.selectedId, srNumbers2: sSRNumbers2 }),
      });
      if (response.ok) {
        toast.success(t("messages.associate.success"), {
          duration: 2000,
        });
      } else {
        toast.error(t("messages.associate.error"), {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error associating service requests", error);
    }
  };

  useEffect(() => {
    if (props.isOpen) fetchData();
  }, [props.isOpen]);

  useEffect(() => {
    sortSRs(rows, descriptor.column as keyof RowsProps);
  }, [descriptor]);

  useEffect(() => {
    sortSRs(rows, descriptor.column as keyof RowsProps);
  }, [relatedSRs]);

  return (
    <Modal
      size="5xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onClose={props.onCloseModal}
      isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
            <ModalBody>
              <Card shadow="sm" className="min-h-14 max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
                <CardBody>
                  <div className="w-full h-full overflow-auto">
                    <div className="flex gap-2 flex-wrap">
                      {relatedSRs.map((related, index) => (
                        <Chip key={index} onClose={() => handleClose(related)} variant="flat">
                          {related.srNumber2}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="overflow-scroll max-h-96">
                {ready ? (
                  <TableWrapper
                    isHeaderSticky={true}
                    rows={rows}
                    columns={columns}
                    onClick={handleClick}
                    onSortChange={handleSortChange}
                    sortDescriptorProp={sortDescriptor}
                    multiLanguage="ServiceRequest"
                    RenderCell={RenderCell}
                  />
                ) : null}
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
                  handleAssociate();
                  onClose();
                }}>
                {t("table.actions.associate")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
