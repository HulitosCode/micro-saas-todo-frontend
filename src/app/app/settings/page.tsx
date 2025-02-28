import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";

export const Page = () => {
  return (
    <DashboardPage>
          <DashboardPageHeader>
            <DashboardPageHeaderTitle>Configuracoes</DashboardPageHeaderTitle>
          </DashboardPageHeader>
          <DashboardPageMain>
            <h1>Configuracoes</h1>
          </DashboardPageMain>
        </DashboardPage>
  );
};

export default Page;
