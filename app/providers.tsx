"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { AlertProvider } from "../helpers/alert-context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <AlertProvider>
      <NextUIProvider>
        <NextThemesProvider defaultTheme="light" attribute="class" {...themeProps}>
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </AlertProvider>
  );
}
