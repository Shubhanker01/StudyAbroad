import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    GraduationCap,
    Settings,
    User,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Navigation Items Configuration

export default function Navbar({ userId }) {
    const location = useLocation();
    const mainNavItems = [
        {
            title: "Dashboard",
            url: `/app/${userId}`,
            icon: LayoutDashboard,
        },
        {
            title: "Applications",
            url: `/app/${userId}/applications`,
            icon: FileText,
        },
    ];


    return (
        <Sidebar collapsible="icon" className="border-r border-slate-800 bg-slate-900">

            {/* Sidebar Header / Brand */}
            <SidebarHeader className="p-4 flex items-center gap-2 border-b border-slate-800/60">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                    <span className="font-bold text-sm text-slate-100 tracking-tight">
                        StudyAbroad<span className="text-blue-500">HQ</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Student Portal</span>
                </div>
            </SidebarHeader>

            {/* Sidebar Main Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs text-slate-500">Overview</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={
                                                isActive
                                                    ? "bg-blue-600 text-white hover:bg-blue-500 font-medium"
                                                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                                            }
                                        >
                                            <Link to={item.url} className="flex items-center gap-3">
                                                <item.icon className="w-4 h-4 shrink-0" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter className="p-4 border-t border-slate-800/60">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/60">
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    );
}