"use client";

import { NavMain } from "@/components/(general)/SideBar/nav-main";
import { NavProjects } from "@/components/(general)/SideBar/nav-projects";
import { NavUser } from "@/components/(general)/SideBar/nav-user";
import { TeamSwitcher } from "@/components/(general)/SideBar/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import type { NavMain as INavMain, Team, User } from "@/payload-types";

export function ClientAppSidebar({
  user,
  navMain,
}: {
  user: User | null;
  navMain: INavMain;
}) {
  const teams = user ? (user.team as Team[]) : null;
  const items = navMain.links;
  const projects = navMain.projects;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
