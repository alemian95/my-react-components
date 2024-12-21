import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../ui/sidebar"

export const WebSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}