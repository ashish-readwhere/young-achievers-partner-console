
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { PartnerOverview } from "@/components/partner/dashboard/PartnerOverview";
import { BatchManagement } from "@/components/partner/dashboard/BatchManagement";
import { MemberManagement } from "@/components/partner/dashboard/MemberManagement";
import { PartnerProfile } from "@/components/partner/dashboard/PartnerProfile";

const PartnerConsole = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <PartnerOverview />;
      case "batches":
        return <BatchManagement />;
      case "members":
        return <MemberManagement />;
      case "profile":
        return <PartnerProfile />;
      default:
        return <PartnerOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <PartnerSidebar 
          onMenuSelect={setActiveSection} 
          activeMenu={activeSection}
        />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PartnerConsole;
