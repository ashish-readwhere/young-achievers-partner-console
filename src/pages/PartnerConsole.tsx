
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { PartnerOverview } from "@/components/partner/dashboard/PartnerOverview";
import { BatchManagement } from "@/components/partner/dashboard/BatchManagement";
import { MemberManagement } from "@/components/partner/dashboard/MemberManagement";
import { PartnerProfile } from "@/components/partner/dashboard/PartnerProfile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";

const PartnerConsoleContent = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  const handleNavigation = (section: string) => {
    console.log("Navigating to section:", section);
    setActiveSection(section);
  };

  const renderContent = () => {
    console.log("Current active section:", activeSection);
    switch (activeSection) {
      case "overview":
        return <PartnerOverview onNavigate={handleNavigation} />;
      case "batches":
        return <BatchManagement />;
      case "members":
        return <MemberManagement />;
      case "profile":
        return <PartnerProfile />;
      default:
        console.log("Defaulting to overview for section:", activeSection);
        return <PartnerOverview onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <PartnerSidebar 
        onMenuSelect={setActiveSection} 
        activeMenu={activeSection}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Navigation Header */}
        <div className="bg-white border-b px-3 sm:px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="md:hidden"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <div className="text-sm text-gray-600 truncate">
                <span className="hidden sm:inline">Partner Console • Current Section: </span>
                <span className="font-medium capitalize">{activeSection}</span>
              </div>
            </div>
            <Link to="/login" className="flex-shrink-0">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Home className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Login</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 sm:p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

const PartnerConsole = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <PartnerConsoleContent />
    </SidebarProvider>
  );
};

export default PartnerConsole;
