
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
}

export function PartnerSidebar({ onMenuSelect }: PartnerSidebarProps) {
  const [activeMenu, setActiveMenu] = useState("overview");

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    onMenuSelect?.(menuId);
  };

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">YA</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Young Achievers</h2>
            <p className="text-sm text-gray-500">PARTNER CONSOLE</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeMenu === item.id}
                    className="w-full justify-start gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600"
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <button>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
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
