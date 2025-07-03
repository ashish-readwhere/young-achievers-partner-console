import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { UnifiedDashboard } from "@/components/partner/dashboard/UnifiedDashboard";
import { BatchManagement } from "@/components/partner/dashboard/BatchManagement";
import { MemberManagement } from "@/components/partner/dashboard/MemberManagement";
import { PartnerProfile } from "@/components/partner/dashboard/PartnerProfile";
import { StudentProfile } from "@/components/partner/dashboard/StudentProfile";
import { BatchDetails } from "@/components/partner/dashboard/BatchDetails";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";

const PartnerConsoleContent = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedStudentId, setSelectedStudentId] = useState<number | undefined>();
  const [selectedBatchId, setSelectedBatchId] = useState<number | undefined>();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  const handleNavigation = (section: string, id?: number) => {
    console.log("Navigating to section:", section, "ID:", id);
    setActiveSection(section);
    if (section === "student-profile" && id) {
      setSelectedStudentId(id);
    } else if (section === "batch-details" && id) {
      setSelectedBatchId(id);
    }
  };

  const renderContent = () => {
    console.log("Current active section:", activeSection);
    switch (activeSection) {
      case "overview":
        return <UnifiedDashboard onNavigate={handleNavigation} />;
      case "batches":
        return <BatchManagement onNavigate={handleNavigation} />;
      case "members":
        return <MemberManagement />;
      case "profile":
        return <PartnerProfile />;
      case "student-profile":
        return <StudentProfile onNavigate={handleNavigation} studentId={selectedStudentId} />;
      case "batch-details":
        return <BatchDetails onNavigate={handleNavigation} batchId={selectedBatchId} />;
      case "session-details":
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Session Details</h1>
            <p className="text-gray-600">Complete session information and management will be displayed here.</p>
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('overview')}
              className="mt-4"
            >
              Back to Dashboard
            </Button>
          </div>
        );
      case "rate-student":
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Rate Student</h1>
            <p className="text-gray-600">Student rating interface will be displayed here.</p>
            <Button 
              variant="outline" 
              onClick={() => handleNavigation('student-profile', selectedStudentId)}
              className="mt-4"
            >
              Back to Student Profile
            </Button>
          </div>
        );
      default:
        console.log("Defaulting to overview for section:", activeSection);
        return <UnifiedDashboard onNavigate={handleNavigation} />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "overview":
        return "Dashboard Overview";
      case "batches":
        return "Batch Management";
      case "members":
        return "Member Management";
      case "profile":
        return "Partner Profile";
      case "student-profile":
        return "Student Profile";
      case "batch-details":
        return "Batch Details";
      case "session-details":
        return "Session Details";
      case "rate-student":
        return "Rate Student";
      default:
        return "Dashboard";
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
                <span className="hidden sm:inline">Partner Console • </span>
                <span className="font-medium">{getSectionTitle()}</span>
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
          {renderContent()}
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
