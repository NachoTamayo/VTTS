"use client";
import { useEffect, useState } from "react";
import { SystemVersion } from "@/helpers/interfaces";
import { TableWrapper } from "@/components/table/Table";
import { SortDescriptor, useDisclosure } from "@nextui-org/react";
import { RenderCell } from "./table/RenderCell";
import { ModifyModal } from "@/components/version/modals/ModifyModal";
import { EditModal } from "./modals/EditModal";

interface Version {
  id: string;
  system: string;
  version: string;
  date: string;
  actions: "actions";
}

interface sortDescriptor {
  column: string;
  direction: string;
}

const columns = [
  {
    name: "table.header.actions",
    hideHeader: true,
  },
  {
    name: "table.header.id",
    hideHeader: true,
    hideColumn: true,
  },
  {
    name: "table.header.system",
    hideHeader: false,
    sortable: true,
  },
  {
    name: "table.header.version",
    hideHeader: false,
    sortable: true,
  },
  {
    name: "table.header.date",
    hideHeader: false,
    sortable: true,
  },
];

export const Version = () => {
  const [rows, setRows] = useState<Version[]>([]);
  const [query, setQuery] = useState("/api/v1/systemVersion?orderBy=version&orderDirection=desc");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "3", direction: "descending" });
  const [selectedId, setSelectedId] = useState<string>("");
  const {
    isOpen: isOpenList,
    onOpen: onOpenList,
    onOpenChange: onOpenChangeList,
    onClose: onCloseList,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const fetchVersion = async () => {
    try {
      const response = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const newData = data.map((item: SystemVersion) => {
        return {
          actions: "actions",
          id: item.id,
          system: item.appRelation.app,
          version: item.version,
          date: item.deliveryDate,
        };
      });
      setRows(newData);
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  const handleSortChange = (sortDescriptor: SortDescriptor) => {
    const column = sortDescriptor.column === "2" ? "app" : sortDescriptor.column === "3" ? "version" : "deliveryDate";
    const direction = sortDescriptor.direction === "ascending" ? "asc" : "desc";
    setQuery(`/api/v1/systemVersion?orderBy=${column}&orderDirection=${direction}`);
  };

  const handleClick = (id: string, option: string) => {
    console.log("id", id, "option", option);
    setSelectedId(id);
    switch (option) {
      case "list":
        onOpenList();
        break;
      case "edit":
        onOpenEdit();
        break;
    }
  };

  useEffect(() => {
    fetchVersion();
  }, [query]);

  return (
    <>
      <div className="w-10/12 mx-auto mt-4 flex flex-col">
        <TableWrapper
          rows={rows}
          columns={columns}
          onSortChange={handleSortChange}
          onClick={handleClick}
          sortDescriptorProp={sortDescriptor}
          multiLanguage="Version"
          RenderCell={RenderCell}
        />
      </div>
      <ModifyModal
        isOpen={isOpenList}
        onOpenChange={onOpenChangeList}
        onCloseModal={onCloseList}
        onClose={onCloseList}
        onOpen={onOpenList}
        onSubmit={() => console.log("Submit")}
        selectedId={selectedId}
      />
      <EditModal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit} onCloseModal={onCloseEdit} />
    </>
  );
};
