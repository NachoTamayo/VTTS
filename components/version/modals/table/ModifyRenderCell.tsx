import React from "react";
import { Checkbox } from "@nextui-org/react";

interface Props {
  id: string;
  data: string | boolean;
  columnKey: string | React.Key;
  onClick?: (id: string, option: string, selected?: boolean) => void;
  isOpen?: boolean;
}

export const RenderCell = ({ id, data, columnKey, onClick, isOpen }: Props) => {
  const [isSelected, setIsSelected] = React.useState(true);
  const cellValue = data;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onClick) onClick(id, "check", e.target.checked);
  };

  switch (columnKey) {
    case "checked":
      return (
        <div className="flex flex-row mx-auto gap-2">
          <Checkbox isSelected={cellValue as boolean} onChange={handleChange}></Checkbox>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};
