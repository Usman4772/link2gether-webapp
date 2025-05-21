import {AppSidebar} from "@/components/Global/SideBar";
import TimeAgoProvider from "@/components/Global/TImeAgoProvider";
import CreateCommunityModal from "@/featuers/Community/components/CreateCommunityModal";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import NextTopLoader from 'nextjs-toploader';
import TawkToChat from "@/components/Global/TawkToBeacon";


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
                        <NextTopLoader
                            showSpinner={false}
                            color={"#00b07c"}
                        />
                        {children}
                        <TawkToChat/>
                    </AntdRegistry>
                    <CreateCommunityModal/>
                </AppSidebar>
            </TimeAgoProvider>
        </div>
    );
}
