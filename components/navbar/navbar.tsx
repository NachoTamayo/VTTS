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
import { SearchIcon, TitleOnlyIcon, EdgeStyleIcon, FilterIcon } from "../icons/icons";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleTitleOnly = () => {
    setShowDescription(!showDescription);
  };

  return (
    <>
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
              <FilterIcon className="cursor-pointer" onClick={onOpen} />
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input autoFocus label="Email" placeholder="Enter your email" variant="bordered" />
                <Input label="Password" placeholder="Enter your password" type="password" variant="bordered" />
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
