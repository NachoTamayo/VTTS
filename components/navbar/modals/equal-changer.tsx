import { NotEqualSignCircleIcon, EqualSignCircleIcon } from "@/components/icons/icons";
import exp from "constants";
import { useState } from "react";

interface EqualChangerProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const EqualChanger = (props: EqualChangerProps) => {
  const [equal, setEqual] = useState<boolean>(true);
  const handleClick = () => {
    setEqual(!equal);
    props.setValue(!equal);
  };
  if (equal) {
    return <EqualSignCircleIcon onClick={handleClick} width={24} height={24} className="cursor-pointer" />;
  } else {
    return <NotEqualSignCircleIcon onClick={handleClick} width={24} height={24} className="cursor-pointer" />;
  }
};