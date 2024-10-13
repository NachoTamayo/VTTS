import { NotEqualSignCircleIcon, EqualSignCircleIcon } from "@/components/icons/Icons";
import exp from "constants";
import { useState, useEffect } from "react";

interface EqualChangerProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const EqualChanger = (props: EqualChangerProps) => {
  useEffect(() => {
    setEqual(props.value);
  }, [props]);
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
