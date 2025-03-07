"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { IconHome, IconBuildingStore, IconTicket, IconDeviceDesktopAnalytics, IconSettings } from "@tabler/icons-react";
import { CiBoxList } from "react-icons/ci";
// import { useState } from 'react'
// import { MdOutlineLogin } from "react-icons/md";
// import { BiLogOut } from "react-icons/bi";
function SideBarComp() {
    // const [login, setLogin] = useState(false);
    // const toggleLogin = () => {
    //     setLogin(!login);
    // };
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
                            label: "Dashboard", href: "/dashboard", icon: <IconDeviceDesktopAnalytics />
                        }}
                    />
                    <SidebarLink
                        link={{ label: "About", href: "/about", icon: <CiBoxList className='text-3xl' /> }}
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