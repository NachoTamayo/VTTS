import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import {
  TestIcon,
  DashboardIcon,
  SourceCodeIcon,
  TaskIcon,
  ReminderIcon,
  CommandLineIcon,
  DatabaseSyncIcon,
  BubbleChatEditIcon,
  GitBranchIcon,
  SettingsIcon,
} from "@/components/icons/icons";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}>
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<DashboardIcon />} isActive={pathname === "/"} href="/" />
            <SidebarMenu title="Project Management">
              <SidebarItem isActive={pathname === "/a"} title="Service Request" icon={<BubbleChatEditIcon />} />
              <SidebarItem isActive={pathname === "/a"} title="Version" icon={<GitBranchIcon />} />
            </SidebarMenu>
            <SidebarMenu title="Testing">
              <SidebarItem
                isActive={pathname === "/a"}
                title="Manage Release"
                icon={<DatabaseSyncIcon />}
                href="manage-release"
              />
              <SidebarItem
                isActive={pathname === "/a"}
                title="Create List"
                icon={<ReminderIcon />}
                href="create-list"
              />
              <SidebarItem
                isActive={pathname === "/test-release"}
                title="Test Release"
                icon={<TestIcon />}
                href="test-release"
              />
            </SidebarMenu>

            <SidebarMenu title="Development">
              <SidebarItem isActive={pathname === "/a"} title="SR Document" icon={<CommandLineIcon />} />
              <SidebarItem isActive={pathname === "/a"} title="My Tasks" icon={<TaskIcon />} />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm" />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
