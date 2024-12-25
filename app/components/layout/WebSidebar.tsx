import { Calendar1, Clock, LayoutDashboard, Power, Table, Timer } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { Link } from "react-router"

export const WebSidebar = () => {
    return (
        <Sidebar collapsible="icon" className="shadow-lg">
            <SidebarHeader className="flex flex-row gap-4 items-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <LayoutDashboard className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <h1 className="font-semibold">Reusable React Components</h1>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Components</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/components/calendar">
                                        <Calendar1 />
                                        <span>Calendar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/components/datatable">
                                        <Table />
                                        <span>Datatable</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Hooks</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/useboolean">
                                        <Power />
                                        <span>useBoolean</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/useinterval">
                                        <Clock />
                                        <span>useInterval</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/usetimeout">
                                        <Timer />
                                        <span>useTimeout</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}