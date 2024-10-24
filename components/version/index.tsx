"use client";
import { useEffect, useState } from "react";
import { SystemVersion } from "@/helpers/interfaces";
import { TableWrapper } from "@/components/version/table/Table";
import { Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { SortDescriptor } from "@nextui-org/react";

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
  };

  useEffect(() => {
    fetchVersion();
  }, [query]);

  return <TableWrapper rows={rows} columns={columns} onSortChange={handleSortChange} onClick={handleClick} />;
};
