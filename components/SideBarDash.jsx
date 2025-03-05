"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { IconHome, IconBuildingStore, IconTicket, IconDeviceDesktopAnalytics,IconSettings } from "@tabler/icons-react";
function SideBarComp() {
    return (
        <div>
            <Sidebar>
                <SidebarBody>
                    <SidebarLink
                        link={{ label: "Home", href: "/", icon: <IconHome /> }}
                    />
                    <SidebarLink
                        link={{ label: "Tickets", href: "/tickets", icon: <IconTicket /> }}
                    />
                    <SidebarLink
                        link={{ label: "Store", href: "/store", icon: <IconBuildingStore /> }}
                    />
                    <SidebarLink
                        link={{
                            label: "Dashboard", href: "/dashboard", icon: <IconDeviceDesktopAnalytics />}}
                    />
                    <SidebarLink
                        link={{ label: "Settings", href: "/settings", icon: <IconSettings /> }}
                    />
                </SidebarBody>
            </Sidebar>
        </div>
    )
}

export default SideBarComp