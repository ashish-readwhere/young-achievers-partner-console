import { useState } from "react";
import { UnifiedDashboard } from "./dashboard/UnifiedDashboard";
import { BatchManagement } from "./dashboard/BatchManagement";
import { MemberManagement } from "./dashboard/MemberManagement";
import { PartnerProfile } from "./dashboard/PartnerProfile";
import { MemberProfile } from "./dashboard/MemberProfile";
import { BatchDetails } from "./dashboard/BatchDetails";
import { SessionAttendance } from "./dashboard/SessionAttendance";

export function PartnerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>();
  const [selectedBatchId, setSelectedBatchId] = useState<number | undefined>();
  const [selectedSessionId, setSelectedSessionId] = useState<number | undefined>();

  const handleNavigation = (section: string, id?: number) => {
    console.log("Navigating to section:", section, "ID:", id);
    setActiveSection(section);
    if (section === "member-profile" && id) {
      setSelectedMemberId(id);
    } else if (section === "batch-details" && id) {
      setSelectedBatchId(id);
    } else if (section === "session-attendance" && id) {
      setSelectedSessionId(id);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <UnifiedDashboard onNavigate={handleNavigation} />;
      case "batches":
        return <BatchManagement onNavigate={handleNavigation} />;
      case "members":
        return <MemberManagement />;
      case "profile":
        return <PartnerProfile />;
      case "member-profile":
        return <MemberProfile onNavigate={handleNavigation} memberId={selectedMemberId} />;
      case "batch-details":
        return <BatchDetails onNavigate={handleNavigation} batchId={selectedBatchId} />;
      case "session-attendance":
        return <SessionAttendance onNavigate={handleNavigation} sessionId={selectedSessionId} />;
      case "session-details":
        return <div className="p-8"><h1 className="text-2xl font-bold">Session Details Page</h1><p>Full session details will be shown here.</p></div>;
      case "rate-member":
        return <div className="p-8"><h1 className="text-2xl font-bold">Rate Member Page</h1><p>Member rating interface will be shown here.</p></div>;
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
