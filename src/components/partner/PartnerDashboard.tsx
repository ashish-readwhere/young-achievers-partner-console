
import { useState } from "react";
import { UnifiedDashboard } from "./dashboard/UnifiedDashboard";
import { BatchManagement } from "./dashboard/BatchManagement";
import { MemberManagement } from "./dashboard/MemberManagement";
import { PartnerProfile } from "./dashboard/PartnerProfile";
import { StudentProfile } from "./dashboard/StudentProfile";
import { BatchDetails } from "./dashboard/BatchDetails";
import { SessionAttendance } from "./dashboard/SessionAttendance";

interface PartnerDashboardProps {
  onNavigate: (section: string, id?: number) => void;
  currentSection: string;
  selectedId?: number;
}

export function PartnerDashboard({ onNavigate, currentSection, selectedId }: PartnerDashboardProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<number | undefined>();
  const [selectedBatchId, setSelectedBatchId] = useState<number | undefined>();
  const [selectedSessionId, setSelectedSessionId] = useState<number | undefined>();

  const handleNavigation = (section: string, id?: number) => {
    console.log("Navigating to section:", section, "ID:", id);
    onNavigate(section, id);
    if (section === "student-profile" && id) {
      setSelectedStudentId(id);
    } else if (section === "batch-details" && id) {
      setSelectedBatchId(id);
    } else if (section === "session-attendance" && id) {
      setSelectedSessionId(id);
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case "overview":
        return <UnifiedDashboard onNavigate={handleNavigation} />;
      case "batches":
        return <BatchManagement onNavigate={handleNavigation} />;
      case "members":
        return <MemberManagement />;
      case "profile":
        return <PartnerProfile />;
      case "student-profile":
        return <StudentProfile onNavigate={handleNavigation} studentId={selectedStudentId || selectedId} />;
      case "batch-details":
        return <BatchDetails onNavigate={handleNavigation} batchId={selectedBatchId || selectedId} />;
      case "session-attendance":
        return <SessionAttendance onNavigate={handleNavigation} sessionId={selectedSessionId || selectedId} />;
      case "session-details":
        return <div className="p-8"><h1 className="text-2xl font-bold">Session Details Page</h1><p>Full session details will be shown here.</p></div>;
      case "rate-student":
        return <div className="p-8"><h1 className="text-2xl font-bold">Rate Student Page</h1><p>Student rating interface will be shown here.</p></div>;
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
