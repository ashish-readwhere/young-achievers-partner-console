
import { SidebarProvider } from "@/components/ui/sidebar";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { PartnerDashboard } from "@/components/partner/PartnerDashboard";

const PartnerConsole = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <PartnerSidebar />
        <main className="flex-1">
          <PartnerDashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PartnerConsole;
