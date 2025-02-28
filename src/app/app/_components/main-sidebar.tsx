'use client'

import {
  DashboardSidebar,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain,
} from "@/components/dashboard/sidebar";
import { ArrowUpDown, House } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import { Session } from "next-auth";
import UserDropdown from "./user-dropdown";

type MainSidebarProps = {
  user: Session['user']
}

const MainSidebar = ({ user }: MainSidebarProps) => {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname == path
    }

  return (
    <DashboardSidebar>
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
            <House className="w-4 h-4 mr-3" />
            Tarefas
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/app/settings" active={isActive('/app/settings')}>
            <ArrowUpDown className="w-4 h-4 mr-3" />
            Configuracoes
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>Links extras</DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/">Precisa de ajuda?</DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown  user={user}/>
      </DashboardSidebarFooter>
    </DashboardSidebar>
  );
};

export default MainSidebar;
