import { useTheme as useNextTheme } from "next-themes";

export const useIconColor = (): string => {
  const { resolvedTheme } = useNextTheme();
  return resolvedTheme === "dark" ? "#ffffff" : "#000000";
};

export const useIconColorBackground = (): string => {
  const { resolvedTheme } = useNextTheme();
  return resolvedTheme === "dark" ? "#000000" : "#ffffff";
};
