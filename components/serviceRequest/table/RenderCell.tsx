import React from "react";
import { LinkIcon, TrelloIcon, TrashIcon, EditIcon, ExternalLinkIcon } from "@/components/icons/Icons";

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

  const externalLink = (url: string) => {
    window.open(url, "_blank");
  };

  const cellValue = data;
  switch (columnKey) {
    case "trelloLink":
      return cellValue != null ? (
        <TrelloIcon className="cursor-pointer mx-auto" onClick={() => externalLink(cellValue)} />
      ) : null;
    case "externalLink":
      return cellValue != null ? (
        <ExternalLinkIcon className="cursor-pointer mx-auto" onClick={() => externalLink(cellValue)} />
      ) : null;
    case "actions":
      return (
        <div className="flex flex-row mx-auto gap-2 text-center">
          <EditIcon className="cursor-pointer" onClick={() => handleClick(id, "edit")} />
          <LinkIcon className="cursor-pointer" onClick={() => handleClick(id, "associate")} />
          <TrashIcon className="cursor-pointer" onClick={() => handleClick(id, "delete")} />
        </div>
      );
    default:
      return <>{cellValue != "" ? cellValue : null}</>;
  }
};
