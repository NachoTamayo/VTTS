"use client";
import React, { useState, useEffect } from "react";
import { TableWrapper } from "@/components/table/Table";
import { ServiceRequest as IServiceRequest } from "@/helpers/interfaces";
import { SortDescriptor, Select, SelectItem, Button, useDisclosure } from "@nextui-org/react";
import { RenderCell } from "@/components/serviceRequest/table/RenderCell";
import { SrType, VttsSystem, ReleaseVersion, Stage, VttsUser, Status, Descriptor } from "@/helpers/interfaces";
import { PlusIcon } from "@/components/icons/Icons";
import { useTranslations } from "next-intl";
import { EditModal } from "./modals/EditModal";
import { AssociateModal } from "./modals/AssociateModal";
import { toast } from "sonner";
import { useAlert } from "@/helpers/alert-context";
import { isValidUrl } from "@/helpers/js-utils";

interface SelectValue {
  key: string;
  value: string;
}

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
    name: "table.header.status",
    sortable: true,
  },
  {
    name: "table.header.description",
    sortable: true,
    width: "w-2/4",
  },
  {
    name: "table.header.externalLink",
    sortable: false,
    width: "w-1/12",
  },
  {
    name: "table.header.trelloLink",
    sortable: false,
    width: "w-1/12",
  },
];

export const ServiceRequest = () => {
  const t = useTranslations("ServiceRequest");
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("/api/v1/serviceRequest?orderBy=srNumber&orderDirection=asc");
  const [typeQuery, setTypeQuery] = useState("/api/v1/srType");
  const [srTypes, setSrTypes] = useState<SelectValue[]>([]);
  const [selectedSrType, setSelectedSrType] = useState("0");
  const [status, setStatus] = useState<SelectValue[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("0");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "3", direction: "ascending" });
  const [descriptor, setDescriptor] = useState<Descriptor>({ column: "srNumber", direction: "asc" });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isOpen: isOpenA, onOpen: onOpenA, onOpenChange: onOpenChangeA, onClose: onCloseA } = useDisclosure();
  const [selectedId, setSelectedId] = useState("0");
  const { alert, showAlert, hideAlert } = useAlert();

  const statusArray = [
    { key: "0", value: "All" },
    { key: "1", value: "Open" },
    { key: "2", value: "Closed" },
  ];

  const fetchServiceRequest = async () => {
    try {
      const response = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const newData = data.map((item: IServiceRequest) => {
        return {
          actions: "actions",
          id: item.id,
          type: item.srTypeRelation.srType,
          srNumber: item.srNumber,
          status: item.statusSr,
          description: item.description,
          externalLink: item.externalLink,
          trelloLink: item.trelloLink,
        };
      });
      setRows(newData);
    } catch (error) {
      console.error("Error fetching service request", error);
    }
  };

  const fetchType = async () => {
    try {
      const response = await fetch(typeQuery, {
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
      console.error("Error fetching srType", error);
    }
  };

  const handleClick = (id: string, option: string) => {
    if (option === "edit") {
      setSelectedId(id);
      onOpen();
    } else if (option === "delete") {
      showAlert("messages.deleteConfirmation", "warning", "ServiceRequest", () => {
        handleDelete(id);
      });
    } else {
      setSelectedId(id);
      onOpenA();
    }
  };

  const refreshQuery = () => {
    let newQuery = "/api/v1/serviceRequest?";
    if (selectedSrType !== "0") {
      newQuery += `srType=${selectedSrType}&`;
    }
    if (selectedStatus !== "0") {
      newQuery += `status=${Number(selectedStatus) === 1 ? "OPEN" : "CLOSED"}&`;
    }
    setQuery(newQuery + `orderBy=${descriptor.column}&orderDirection=${descriptor.direction}`);
    console.log(newQuery + `orderBy=${descriptor.column}&orderDirection=${descriptor.direction}`);
  };

  const handleSelectionChange = (select: string, value: string) => {
    if (value === "") return null;
    switch (select) {
      case "srType":
        setSelectedSrType(value);
        break;
      case "status":
        setSelectedStatus(value);
        break;
      default:
        break;
    }
  };

  const handleNew = () => {
    onOpen();
  };

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    const column =
      sortDescriptor.column === "2"
        ? "srType"
        : sortDescriptor.column === "3"
        ? "srNumber"
        : sortDescriptor.column === "4"
        ? "statusSr"
        : sortDescriptor.column === "5"
        ? "description"
        : sortDescriptor.column === "6"
        ? "externalLink"
        : "trelloLink";
    const direction = sortDescriptor.direction === "ascending" ? "asc" : "desc";
    setDescriptor({ column, direction });
  };

  const handleDelete = (id: string) => {
    fetch(`/api/v1/serviceRequest/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchServiceRequest();
          toast.success(t("messages.success.delete"));
        } else {
          toast.error(t("messages.error"));
        }
      })
      .catch((error) => {
        toast.error(t("messages.error"));
      });
  };

  const handleSubmit = (title: string, tlink: string, elink: string, desc: string, type: string, status: string) => {
    if (!title || !desc || !type) {
      toast.error(t("messages.requiredFields"), {
        duration: 2000,
      });
      return;
    }
    if (elink && !isValidUrl(elink)) {
      toast.error(t("messages.invalidLink"));
      return;
    }
    if (tlink && !isValidUrl(tlink)) {
      toast.error(t("messages.invalidTrelloLink"));
      return;
    }
    let result;
    console.log(selectedId);
    if (selectedId == "") {
      result = fetch("/api/v1/serviceRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          srNumber: title,
          trelloLink: tlink,
          externalLink: elink,
          description: desc,
          srType: type,
          statusSr: status == "0" ? "OPEN" : "CLOSED",
        }),
      });
    } else {
      result = fetch(`/api/v1/serviceRequest/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          srNumber: title,
          trelloLink: tlink,
          externalLink: elink,
          description: desc,
          srType: type,
          statusSr: status == "0" ? "OPEN" : "CLOSED",
        }),
      });
    }

    result
      .then((res) => {
        if (res.ok) {
          toast.success(selectedId == "" ? t("messages.success.create") : t("messages.success.update"));
          onClose();
          fetchServiceRequest();
        } else {
          toast.error(t("messages.error"));
        }
      })
      .catch((error) => {
        toast.error(t("messages.error"));
      });
  };

  const handleCloseModal = () => {
    setSelectedId("");
  };
  const handleAssociate = () => {};

  useEffect(() => {
    if (!isOpen) {
      setSelectedId("");
    }
  }, [isOpen]);

  useEffect(() => {
    refreshQuery();
  }, [selectedSrType, selectedStatus, descriptor]);

  useEffect(() => {
    setTimeout(() => {
      fetchType();
      fetchServiceRequest();
      setReady(true);
    }, 200);
  }, [query]);

  return ready ? (
    <div className="w-10/12 mx-auto mt-4 flex flex-col">
      <div className="w-full flex flex-row">
        <Button className="bg-foreground h-12 text-background" onClick={handleNew} endContent={<PlusIcon />} size="md">
          {t("table.actions.newSR")}
        </Button>
        <div className="w-4"></div>
        <Select
          label={t("labels.type")}
          items={srTypes}
          className="max-w-xs w-1/12"
          size="sm"
          radius="sm"
          selectionMode="single"
          selectedKeys={[selectedSrType]}
          onChange={(event) => handleSelectionChange("srType", event.target.value)}>
          {(item: SelectValue) => (
            <SelectItem key={item.key ?? ""} textValue={item.value}>
              {item.value}
            </SelectItem>
          )}
        </Select>
        <div className="w-6"></div>
        <Select
          label={t("labels.status")}
          items={statusArray}
          className="max-w-xs w-1/12"
          size="sm"
          radius="sm"
          selectionMode="single"
          selectedKeys={[selectedStatus]}
          onChange={(event) => handleSelectionChange("status", event.target.value)}>
          {(item: SelectValue) => <SelectItem key={item.key}>{item.value}</SelectItem>}
        </Select>
      </div>
      <div className="w-full mt-4">
        <TableWrapper
          rows={rows}
          columns={columns}
          onClick={handleClick}
          onSortChange={handleSortChange}
          sortDescriptorProp={sortDescriptor}
          multiLanguage="ServiceRequest"
          RenderCell={RenderCell}
        />
      </div>
      <EditModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onSubmit={handleSubmit}
        arrTypes={srTypes}
        selectedId={selectedId}
      />
      <AssociateModal
        isOpen={isOpenA}
        onOpen={onOpenA}
        onOpenChange={onOpenChangeA}
        onClose={onCloseA}
        onSubmit={handleAssociate}
        onCloseModal={handleCloseModal}
        selectedId={selectedId}
      />
    </div>
  ) : null;
};
