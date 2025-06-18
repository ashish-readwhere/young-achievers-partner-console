
import { useState } from "react";
import { PartnerOverview } from "./dashboard/PartnerOverview";
import { BatchManagement } from "./dashboard/BatchManagement";
import { MemberManagement } from "./dashboard/MemberManagement";
import { PartnerProfile } from "./dashboard/PartnerProfile";

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
    <div className="w-full">
      {renderContent()}
    </div>
  );
}
