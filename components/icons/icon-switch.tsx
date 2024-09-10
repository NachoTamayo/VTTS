import { useTheme as useNextTheme } from "next-themes";

export const useIconColor = (): string => {
  const { resolvedTheme } = useNextTheme();
  return resolvedTheme === "dark" ? "#ffffff" : "#000000";
};
