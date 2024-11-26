"use client";
import React from "react";

import { LinkIcon, AddSquareIcon, TrashIcon, TrelloIcon } from "@/components/icons/Icons";

interface Props {
  id: string;
  data: string;
  columnKey: string | React.Key;
  onClick?: (id: string, option: string) => void;
}

export const RenderCell = ({ id, data, columnKey, onClick }: Props) => {
  if (!data) {
    return null; // Return null instead of an empty string
  }
  const handleClick = (id: string, option: string) => {
    if (onClick) {
      onClick(id, option);
    }
  };

  const cellValue = data;
  switch (columnKey) {
    case "actions":
      return (
        <div className="flex flex-row mx-auto gap-2 text-center">
          <AddSquareIcon className="cursor-pointer " onClick={() => handleClick(id, "add")} />
        </div>
      );
    default:
      return <>{cellValue != "" ? cellValue : null}</>;
  }
};
