import React from "react";
import { useSidebarContext } from "@/components/layout/layout-context";
import { StyledBurgerButton } from "./Navbar.styles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}>
      <div />
      <div />
    </div>
  );
};
