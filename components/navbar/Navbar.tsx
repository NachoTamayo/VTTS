import {
  Input,
  Link,
  Navbar,
  NavbarContent,
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { TitleOnlyIcon, EdgeStyleIcon, FilterIcon } from "@/components/icons/Icons";
import { BurguerButton } from "./BurgerButton";
import { NotificationsDropdown } from "@/components/navbar/NotificationsDropdown";
import { UserDropdown } from "@/components/navbar/UserDropdown";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { useTheme as useNextTheme } from "next-themes";
import { useAuthStore } from "@/helpers/auth-store";
import { FilterModal } from "./modals/FilterModal";
import { filterProps } from "framer-motion";
import { InfoAlert } from "@/components/alert/InfoAlert";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { currentWindow, setShowDescription, showDescription } = useAuthStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleTitleOnly = () => {
    setShowDescription(!showDescription);
  };

  const handleModalOpen = () => {
    onOpen();
  };

  return (
    <>
      <InfoAlert />
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
              <FilterIcon className="cursor-pointer" onClick={handleModalOpen} />
              <FilterModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose} />
            </NavbarContent>
          ) : (
            <NavbarContent justify="start" className="w-full max-md:hidden"></NavbarContent>
          )}
          <NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
            <div className="flex items-center gap-2 max-md:hidden">
              <DarkModeSwitch />
            </div>

            <NotificationsDropdown />

            <NavbarContent>
              <UserDropdown />
            </NavbarContent>
          </NavbarContent>
        </Navbar>
        {children}
      </div>
    </>
  );
};
