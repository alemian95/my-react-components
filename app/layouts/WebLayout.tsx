import type { PropsWithChildren } from "react";
import { WebSidebar } from "~/components/layout/WebSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export const WebLayout = (props: PropsWithChildren) => {
    return (
        <SidebarProvider>
            <WebSidebar />
            <main>
                <SidebarTrigger />
                {props.children}
            </main>
        </SidebarProvider>
    )
}