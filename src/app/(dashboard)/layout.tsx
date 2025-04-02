import { AppSidebar } from "@/components/Global/SideBar";
import TimeAgoProvider from "@/components/Global/TImeAgoProvider";
import CreateCommunityModal from "@/featuers/Community/components/CreateCommunityModal";
import { AntdRegistry } from "@ant-design/nextjs-registry";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <TimeAgoProvider>
        <AppSidebar>
          <AntdRegistry>
            {children}
            </AntdRegistry>
          <CreateCommunityModal/>
          </AppSidebar>
        </TimeAgoProvider>
      </div>
  );
}
