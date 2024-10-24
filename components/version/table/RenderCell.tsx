import React from "react";
import { formatDate } from "@/helpers/js-utils";
import { ViewIcon, TrashIcon, EditIcon, ChartIcon, ReminderIcon } from "@/components/icons/Icons";

interface Props {
  id: string;
  data: string;
  columnKey: string | React.Key;
  onClick?: (id: string, option: string) => void;
}

export const RenderCell = ({ id, data, columnKey, onClick }: Props) => {
  const handleClick = (id: string, option: string) => {
    if (onClick) {
      onClick(id, option);
    }
  };

  const cellValue = data;
  switch (columnKey) {
    case "date":
      return <>{formatDate(cellValue)}</>;
    case "system":
    case "version":
      return <>{cellValue}</>;
    case "actions":
      return (
        <div className="flex flex-row mx-auto gap-2">
          <ViewIcon className="cursor-pointer" onClick={() => handleClick(id, "view")} />
          <TrashIcon className="cursor-pointer" onClick={() => handleClick(id, "delete")} />
          <EditIcon className="cursor-pointer" onClick={() => handleClick(id, "edit")} />
          <ChartIcon className="cursor-pointer" onClick={() => handleClick(id, "chart")} />
          <ReminderIcon className="cursor-pointer" onClick={() => handleClick(id, "list")} />
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};
