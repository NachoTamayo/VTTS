"use client";
import React from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { useAuthStore } from "@/helpers/auth-store";

export const Content = () => {
  const { setCurrentWindow } = useAuthStore();
  useEffect(() => {
    setCurrentWindow("home");
  }, []);
  return <div className="h-full lg:px-6"></div>;
};
