import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, NavbarItem } from "@nextui-org/react";
import React from "react";
import { NotificationIcon } from "../icons/Icons";
import { Badge } from "@nextui-org/react";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <Badge content="5" color="danger" placement="top-right">
            <NotificationIcon width={28} height={28} />
          </Badge>
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.">
            📣 Edit your information
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.">
            🚀 Say goodbye to paper receipts!
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.">
            📣 Edit your information
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
