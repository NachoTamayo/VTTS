import { Input, Link, Navbar, NavbarContent, Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon, TitleOnlyIcon, EdgeStyleIcon } from "../icons/icons";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useTheme as useNextTheme } from "next-themes";
import { useAuthStore } from "@/helpers/auth-store";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { currentWindow, setShowDescription, showDescription } = useAuthStore();

  const handleTitleOnly = () => {
    setShowDescription(!showDescription);
  };
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}>
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        {currentWindow === "test-release" ? (
          <NavbarContent justify="start" className="w-full max-md:hidden">
            <Tooltip
              showArrow={true}
              content={showDescription ? "Hide descriptions" : "Show descriptions"}
              placement="bottom"
              color="warning">
              <div>
                {showDescription ? (
                  <TitleOnlyIcon onClick={handleTitleOnly} className="cursor-pointer" />
                ) : (
                  <EdgeStyleIcon onClick={handleTitleOnly} className="cursor-pointer" />
                )}
              </div>
            </Tooltip>
          </NavbarContent>
        ) : (
          <NavbarContent justify="start" className="w-full max-md:hidden"></NavbarContent>
        )}
        <NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
          <div className="flex items-center gap-2 max-md:hidden">
            <DarkModeSwitch />
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <SupportIcon />
          </div>

          <Link href="https://github.com/Siumauricio/nextui-dashboard-template" target={"_blank"}>
            <GithubIcon />
          </Link>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
