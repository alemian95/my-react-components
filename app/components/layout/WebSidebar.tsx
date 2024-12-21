import { LayoutDashboard } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export const WebSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-row gap-4 items-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="hover:text-white" size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <LayoutDashboard className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <h1 className="font-semibold">Reusable React Components</h1>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}