"use client";
import React from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { useAuthStore } from "@/helpers/auth-store";
import { useTranslations } from "next-intl";
import { BatteryFullIcon } from "../icons/Icons";

export const Content = () => {
  const t = useTranslations("HomePage");
  const { setCurrentWindow } = useAuthStore();
  useEffect(() => {
    setCurrentWindow("home");
  }, []);
  return (
    <div className="h-full lg:px-6">
      <h1>{t("title")}</h1>
      <BatteryFullIcon width={30} height={30} />
    </div>
  );
};
