import React from "react";
import { Sidebar } from "./Sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./CompaniesDropdown";
import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import LocaleSwitcherSelect from "@/components/language/LocaleSwitcherSelect";
import { useLocale, useTranslations } from "next-intl";
import {
  TestIcon,
  DashboardIcon,
  TaskIcon,
  ReminderIcon,
  CommandLineIcon,
  DatabaseSyncIcon,
  BubbleChatEditIcon,
  GitBranchIcon,
  SettingsIcon,
} from "@/components/icons/Icons";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const locale = useLocale();
  const t = useTranslations("Sidebar");

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
            <SidebarItem
              title={t("links.home.label")}
              icon={<DashboardIcon />}
              isActive={pathname === "/" + locale}
              href="/"
            />
            <SidebarMenu title={t("links.projectManagement.label")}>
              <SidebarItem
                isActive={pathname === "/" + locale + t("links.serviceRequest.href")}
                title={t("links.serviceRequest.label")}
                icon={<BubbleChatEditIcon />}
                href={t("links.serviceRequest.href")}
              />
              <SidebarItem
                isActive={pathname === "/" + locale + t("links.version.href")}
                title={t("links.version.label")}
                href={t("links.version.href")}
                icon={<GitBranchIcon />}
              />
            </SidebarMenu>
            <SidebarMenu title={t("links.testing.label")}>
              <SidebarItem
                isActive={pathname === "/a"}
                title={t("links.manageRelease.label")}
                icon={<DatabaseSyncIcon />}
                href="manage-release"
              />
              <SidebarItem
                isActive={pathname === "/a"}
                title={t("links.createList.label")}
                icon={<ReminderIcon />}
                href="create-list"
              />
              <SidebarItem
                isActive={pathname === "/" + locale + t("links.testRelease.href")}
                title={t("links.testRelease.label")}
                icon={<TestIcon />}
                href={t("links.testRelease.href")}
              />
            </SidebarMenu>

            <SidebarMenu title={t("links.development.label")}>
              <SidebarItem
                isActive={pathname === "/a"}
                title={t("links.srDocument.label")}
                icon={<CommandLineIcon />}
              />
              <SidebarItem isActive={pathname === "/a"} title={t("links.myTasks.label")} icon={<TaskIcon />} />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://trello-members.s3.amazonaws.com/5e68bc325c270506507aa81b/975e4d7f5e966e61fa5b37f80d99a5a9/170.png"
                size="sm"
              />
            </Tooltip>
            <LocaleSwitcherSelect defaultValue={locale} />
          </div>
        </div>
      </div>
    </aside>
  );
};
