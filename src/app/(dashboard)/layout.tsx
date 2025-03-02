import { AppSidebar } from "@/components/Global/SideBar";
import TimeAgoProvider from "@/components/Global/TImeAgoProvider";
import CreateCommunityModal from "@/featuers/Community/components/CreateCommunityModal";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <TimeAgoProvider>
        <AppSidebar>
          {children}
          <CreateCommunityModal/>
          </AppSidebar>
        </TimeAgoProvider>
      </div>
  );
}
