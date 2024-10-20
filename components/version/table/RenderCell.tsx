import React from "react";
import { formatDate } from "@/helpers/js-utils";

interface Props {
  data: string;
  columnKey: string | React.Key;
}

export const RenderCell = ({ data, columnKey }: Props) => {
  const cellValue = data;
  switch (columnKey) {
    case "date":
      return <>{formatDate(cellValue)}</>;
      break;
    case "system":
    case "version":
      return <>{cellValue}</>;
      break;
    default:
      return <>{cellValue}</>;
  }
};
