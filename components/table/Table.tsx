"use client";
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
import { useTranslations } from "next-intl";

interface RowsProps {
  id: string;
  system: string;
  version: string;
  date: string;
}

interface RenderCellProps {
  id: string;
  data: any;
  columnKey: string;
  onClick?: (id: string, option: string) => void;
}

interface Column {
  name: string;
  align?: "start" | "center" | "end";
  hideHeader?: boolean;
  hideColumn?: boolean;
  sortable?: boolean;
  width?: string;
}

interface TableWrapperProps {
  rows: RowsProps[];
  columns: Column[];
  isLoading?: boolean;
  onSortChange?: (sortDescriptor: SortDescriptor) => void;
  onClick?: (id: string, option: string) => void;
  sortDescriptorProp: SortDescriptor;
  multiLanguage: string;
  RenderCell: React.FC<RenderCellProps>;
}

export const TableWrapper: React.FC<TableWrapperProps> = ({
  rows,
  columns,
  isLoading,
  onSortChange,
  onClick,
  sortDescriptorProp,
  multiLanguage,
  RenderCell,
}) => {
  const t = useTranslations(multiLanguage);
  const g = useTranslations("Global");
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>(sortDescriptorProp);
  const [hideColumn, setHideColumn] = React.useState(true);

  useEffect(() => {
    if (onSortChange) {
      onSortChange(sortDescriptor);
    }
  }, [sortDescriptor]);

  return (
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
              } ${column.width ? column.width : ""}`}
              allowsSorting={column.sortable}>
              {t(column.name)}
            </TableColumn>
          );
        })}
      </TableHeader>
      <TableBody items={rows} emptyContent={g("emptyTable")}>
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
  );
};
