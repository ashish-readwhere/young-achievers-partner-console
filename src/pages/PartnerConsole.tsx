
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { PartnerOverview } from "@/components/partner/dashboard/PartnerOverview";
import { BatchManagement } from "@/components/partner/dashboard/BatchManagement";
import { MemberManagement } from "@/components/partner/dashboard/MemberManagement";
import { PartnerProfile } from "@/components/partner/dashboard/PartnerProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const PartnerConsole = () => {
  const [activeSection, setActiveSection] = useState("overview");

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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <PartnerSidebar 
          onMenuSelect={setActiveSection} 
          activeMenu={activeSection}
        />
        <main className="flex-1 min-w-0">
          {/* Navigation Header */}
          <div className="bg-white border-b px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Partner Console • Current Section: <span className="font-medium capitalize">{activeSection}</span>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PartnerConsole;
