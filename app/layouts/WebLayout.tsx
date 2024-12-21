import type { PropsWithChildren } from "react";
import { WebSidebar } from "~/components/layout/WebSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export const WebLayout = (props: PropsWithChildren) => {
    return (
        <SidebarProvider>
            <WebSidebar />
            <main className="min-h-dvh flex flex-col w-full">
                <header className="p-2"><SidebarTrigger /></header>
                <section className="flex-1 p-2">{props.children}</section>
                <footer className="text-sm text-center py-1 px-2 text-muted"><span>&copy;{new Date().getFullYear()} - My React Components</span></footer>
            </main>
        </SidebarProvider>
    )
}