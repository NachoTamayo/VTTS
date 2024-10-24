import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  SortDescriptor,
} from "@nextui-org/react";
import React, { useEffect } from "react";
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
  onSortChange?: (sortDescriptor: SortDescriptor) => void;
  onClick?: (id: string, option: string) => void;
}

export const TableWrapper: React.FC<TableWrapperProps> = ({ rows, columns, isLoading, onSortChange, onClick }) => {
  const t = useTranslations("Version");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "3",
    direction: "descending",
  });
  const [hideColumn, setHideColumn] = React.useState(true);

  useEffect(() => {
    console.log(sortDescriptor);
    if (onSortChange) {
      onSortChange(sortDescriptor);
    }
  }, [sortDescriptor]);

  return (
    <div className="w-10/12 mx-auto mt-4 flex flex-col">
      <Table
        isStriped
        removeWrapper
        aria-label="Version"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}>
        <TableHeader>
          {columns.map((column, index) => {
            const isActionsColumn = column.name === "table.header.actions";
            return (
              <TableColumn
                key={index}
                hideHeader={column.hideHeader}
                align={column.align ?? "center"}
                style={isActionsColumn ? { maxWidth: "100px" } : {}}
                className={`${column.hideColumn ? "hideColumn" : ""} ${
                  isActionsColumn ? "narrowColumn" : "centeredHeader"
                }`}
                allowsSorting={column.sortable}>
                {t(column.name)}
              </TableColumn>
            );
          })}
        </TableHeader>
        <TableBody items={rows}>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(row).map((key, index) => (
                <TableCell className={hideColumn && key == "id" ? "hideColumn" : ""} key={index}>
                  <RenderCell id={row.id} data={getKeyValue(row, key)} columnKey={key} onClick={onClick} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
