import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "../icons/Icons_temp";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
    <Switch
      isSelected={resolvedTheme === "dark" ? true : false}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      thumbIcon={resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
      color="default"
    />
  );
};
