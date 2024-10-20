"use client";
import { useEffect, useState } from "react";
import { SystemVersion } from "@/helpers/interfaces";
import { TableWrapper } from "@/components/version/table/Table";
import { Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface Version {
  id: string;
  system: string;
  version: string;
  date: string;
  actions: "actions";
  prevision: "prevision";
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
  {
    name: "table.header.prevision",
    hideHeader: true,
  },
];

export const Version = () => {
  const [rows, setRows] = useState<Version[]>([]);
  const [ready, setReady] = useState(false);
  const g = useTranslations("Global");
  const fetchVersion = async () => {
    try {
      const response = await fetch("/api/v1/systemVersion", {
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

          prevision: "prevision",
        };
      });
      setRows(newData);
      console.log(newData);
      setTimeout(() => {
        setReady(true);
      }, 250);
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };
  useEffect(() => {
    setReady(false);
    fetchVersion();
  }, []);

  return ready ? (
    <TableWrapper rows={rows} columns={columns} />
  ) : (
    <div className="w-10/12 mt-4 mx-auto my-auto mt-4 flex flex-col">
      <Spinner label={g("loading")} />
    </div>
  );
};
