import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { PropsWithChildren } from "react";
import SettingsSidebar from "./_components/settings-sidebar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configuracoes</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="grid grid-cols-[16rem_1fr] gap-12">
            <SettingsSidebar />
            <div>{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
};

export default Layout;
