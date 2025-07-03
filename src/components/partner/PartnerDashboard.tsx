
import { useState } from "react";
import { UnifiedDashboard } from "./dashboard/UnifiedDashboard";
import { BatchManagement } from "./dashboard/BatchManagement";
import { MemberManagement } from "./dashboard/MemberManagement";
import { PartnerProfile } from "./dashboard/PartnerProfile";

export function PartnerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <UnifiedDashboard onNavigate={handleNavigation} />;
      case "batches":
        return <BatchManagement />;
      case "members":
        return <MemberManagement />;
      case "profile":
        return <PartnerProfile />;
      default:
        return <UnifiedDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
}
