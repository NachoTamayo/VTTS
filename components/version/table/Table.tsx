import { Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import React from "react";
import { RenderCell } from "./RenderCell";
import { SystemVersion } from "@/helpers/interfaces";
import { useLocale, useTranslations } from "next-intl";

interface RowsProps {
  id: string;
  system: string;
  version: string;
  date: string;
}

interface Column {
  name: string;
  align?: "start" | "center" | "end";
  hideHeader?: boolean;
  hideColumn?: boolean;
  sortable?: boolean;
}

interface TableWrapperProps {
  rows: RowsProps[];
  columns: Column[];
  isLoading?: boolean;
}

export const TableWrapper: React.FC<TableWrapperProps> = ({ rows, columns, isLoading }) => {
  const t = useTranslations("Version");

  const [hideColumn, setHideColumn] = React.useState(true);
  return (
    <div className="w-10/12 mx-auto mt-4 flex flex-col">
      <Table isStriped removeWrapper aria-label="Example table with custom cells">
        <TableHeader>
          {columns.map((column, index) => (
            <TableColumn
              key={index}
              hideHeader={column.hideHeader}
              align={column.align ?? "center"}
              className={column.hideColumn ? "hideColumn" : ""}
              allowsSorting={column.sortable}>
              {t(column.name)}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={rows}>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(row).map((key, index) => (
                <TableCell className={hideColumn && key == "id" ? "hideColumn" : ""} key={index}>
                  <RenderCell data={getKeyValue(row, key)} columnKey={key} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
