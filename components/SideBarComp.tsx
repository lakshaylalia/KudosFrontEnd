"use client";
import { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { IconHome, IconBuildingStore, IconTicket, IconDeviceDesktopAnalytics, IconArrowLeft, IconSettings } from "@tabler/icons-react";
import { MdOutlineLogin } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
function SideBarComp() {
    const [login, setLogin] = useState(false);

    const toggleLogin = () => {
        setLogin(!login);
    };
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
                    <div onClick={toggleLogin}>
                        <SidebarLink
                            link={{ label: login ? "Logout" : "Sign In", href: login ? "/login" : "/signup", icon: login ?<BiLogOut/> :<MdOutlineLogin /> }}
                        />
                    </div>
                    <SidebarLink
                        link={{ label: "Settings", href: "/settings", icon: <IconSettings /> }}
                    />
                </SidebarBody>
            </Sidebar>
        </div>
    )
}

export default SideBarComp