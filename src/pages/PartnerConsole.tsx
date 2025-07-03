import { useState } from "react";
import { PartnerDashboard } from "@/components/partner/PartnerDashboard";
import { SessionDetails } from "@/components/partner/dashboard/SessionDetails";

const PartnerConsole = () => {
  const [currentSection, setCurrentSection] = useState<string>('overview');
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const handleNavigate = (section: string, id?: number) => {
    console.log("Navigating to section:", section, "with ID:", id);
    setCurrentSection(section);
    setSelectedId(id);
  };

  // If we're on session-details, show the SessionDetails component
  if (currentSection === 'session-details') {
    return (
      <SessionDetails 
        onNavigate={handleNavigate}
        sessionId={selectedId}
      />
    );
  }

  // Otherwise show the main dashboard
  return (
    <PartnerDashboard 
      onNavigate={handleNavigate}
      currentSection={currentSection}
      selectedId={selectedId}
    />
  );
};

export default PartnerConsole;
