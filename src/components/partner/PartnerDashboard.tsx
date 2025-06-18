
import { useState } from "react";
import { PartnerOverview } from "./dashboard/PartnerOverview";
import { BatchManagement } from "./dashboard/BatchManagement";
import { MemberManagement } from "./dashboard/MemberManagement";
import { PartnerProfile } from "./dashboard/PartnerProfile";
import { PartnerSidebar } from "./PartnerSidebar";

export function PartnerDashboard() {
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
    <div className="flex min-h-screen">
      <PartnerSidebar onMenuSelect={setActiveSection} />
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
}
