
import { 
  Calendar, 
  Users, 
  BookOpen, 
  User,
  BarChart3,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useState } from "react";

const menuItems = [
  {
    title: "Partner Console Overview",
    icon: BarChart3,
    id: "overview"
  },
  {
    title: "Batch Management",
    icon: BookOpen,
    id: "batches"
  },
  {
    title: "Member Management",
    icon: Users,
    id: "members"
  },
  {
    title: "Profile",
    icon: User,
    id: "profile"
  }
];

interface PartnerSidebarProps {
  onMenuSelect?: (menuId: string) => void;
  activeMenu?: string;
}

export function PartnerSidebar({ onMenuSelect, activeMenu = "overview" }: PartnerSidebarProps) {
  const handleMenuClick = (menuId: string) => {
    onMenuSelect?.(menuId);
  };

  return (
    <Sidebar className="border-r bg-white w-64">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">YA</span>
          </div>
          <div>
            <h2 className="font-semibold text-base text-gray-900">Young Achievers</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wide">PARTNER CONSOLE</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeMenu === item.id}
                    className="w-full justify-start gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-500 rounded-none"
                  >
                    <button 
                      className="flex items-center gap-3 w-full"
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
