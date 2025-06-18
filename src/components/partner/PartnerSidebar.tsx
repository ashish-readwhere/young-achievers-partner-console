
import { 
  Calendar, 
  Users, 
  BookOpen, 
  User,
  BarChart3,
  Settings,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    id: "overview",
    description: "Overview & Analytics"
  },
  {
    title: "Batch Management",
    icon: BookOpen,
    id: "batches",
    description: "Manage batches"
  },
  {
    title: "Member Management",
    icon: Users,
    id: "members",
    description: "Student enrollment"
  },
  {
    title: "Profile",
    icon: User,
    id: "profile",
    description: "Account settings"
  }
];

interface PartnerSidebarProps {
  onMenuSelect?: (menuId: string) => void;
  activeMenu?: string;
}

export function PartnerSidebar({ onMenuSelect, activeMenu = "overview" }: PartnerSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleMenuClick = (menuId: string) => {
    onMenuSelect?.(menuId);
  };

  const handlePhoneSupport = () => {
    window.open('tel:+1234567890', '_self');
  };

  const handleEmailSupport = () => {
    window.open('mailto:support@youngachievers.com?subject=Partner Support Query&body=Hi, I need assistance with...', '_self');
  };

  return (
    <Sidebar className="border-r bg-gradient-to-b from-blue-50 to-white" collapsible="icon">
      <SidebarHeader className={`p-4 border-b bg-white/50 backdrop-blur-sm ${isCollapsed ? 'px-2' : ''}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative flex-shrink-0">
              <img 
                src="/lovable-uploads/95eca461-e78f-43e5-9b21-9ac173f03cdc.png" 
                alt="Young Achievers Logo" 
                className="w-8 h-8 rounded-lg shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-sm text-gray-900 truncate">Young Achievers</h2>
                <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">PARTNER CONSOLE</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-6 w-6 p-0 hover:bg-blue-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!isCollapsed && (
          <div className="mt-3 p-2 bg-blue-100 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 font-medium">Welcome back!</p>
            <p className="text-xs text-blue-600">Manage your programs</p>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4 flex flex-col h-full overflow-y-auto">
        <SidebarGroup className="flex-1">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3 px-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeMenu === item.id}
                    tooltip={isCollapsed ? item.title : undefined}
                    className="w-full justify-start gap-3 px-3 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-500 rounded-lg transition-all duration-200 group"
                  >
                    <button 
                      className={`flex items-center gap-3 w-full text-left ${isCollapsed ? 'justify-center' : ''}`}
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <div className="flex-shrink-0">
                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium block leading-tight truncate">{item.title}</span>
                          <span className="text-xs text-gray-500 block mt-0.5 leading-tight truncate">{item.description}</span>
                        </div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <>
            {/* Quick Stats Section */}
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Active Batches</span>
                  <span className="text-sm font-bold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Total Students</span>
                  <span className="text-sm font-bold text-green-600">248</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">This Month</span>
                  <span className="text-sm font-bold text-purple-600">+24</span>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                  <Settings className="w-3 h-3 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-800">Need Help?</h4>
                  <p className="text-xs text-gray-600">Contact support</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 text-xs h-7"
                  onClick={handlePhoneSupport}
                >
                  <Phone className="w-3 h-3" />
                  Call Support
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2 text-xs h-7"
                  onClick={handleEmailSupport}
                >
                  <Mail className="w-3 h-3" />
                  Email Support
                </Button>
              </div>
            </div>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
