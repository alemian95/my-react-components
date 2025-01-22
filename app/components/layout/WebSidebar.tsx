import { BinaryIcon, CalendarDaysIcon, DiffIcon, HourglassIcon, LayoutDashboardIcon, Rows4Icon, Table2Icon, TimerIcon } from "lucide-react"
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
                                    <LayoutDashboardIcon className="w-8 h-8" />
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
                                        <CalendarDaysIcon />
                                        <span>Calendar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/components/datatable">
                                        <Table2Icon />
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
                                        <BinaryIcon />
                                        <span>useBoolean</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/useinterval">
                                        <TimerIcon />
                                        <span>useInterval</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/usetimeout">
                                        <HourglassIcon />
                                        <span>useTimeout</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/usecounter">
                                        <DiffIcon />
                                        <span>useCounter</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={false}>
                                    <Link to="/hooks/usearray">
                                        <Rows4Icon />
                                        <span>useArray</span>
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