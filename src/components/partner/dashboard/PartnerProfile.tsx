import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileModal } from "./EditProfileModal";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Edit,
  CheckCircle,
  FileText,
  MessageSquare,
  DollarSign,
  Percent
} from "lucide-react";

export function PartnerProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const partnerInfo = {
    name: "John Smith",
    contactPerson: "John Smith", // Same as name since teacher is the partner
    email: "john.smith@teached.com",
    phone: "+1 (555) 123-4567",
    address: "123 Education Lane, Tech City, TC 12345",
    joinDate: "January 15, 2024",
    status: "Active Partner",
    kycStatus: "verified", // Can be "verified", "pending", or "not_submitted"
    specializations: ["Technology Training", "Coding Bootcamps", "Digital Skills"],
    payoutType: "revenue_share", // Can be "fixed" or "revenue_share"
    payoutDetails: {
      fixed: {
        amount: 5000,
        currency: "USD",
        frequency: "per batch"
      },
      revenueShare: {
        percentage: 70,
        description: "70% of student fees collected",
        estimatedAmount: 4200 // Estimated amount based on average batch revenue
      }
    }
  };

  const achievements = [
    {
      title: "Top Partner 2024",
      description: "Highest student satisfaction rate",
      date: "Dec 2024"
    },
    {
      title: "100+ Students Trained",
      description: "Successfully completed training programs",
      date: "Nov 2024"
    },
    {
      title: "Quality Excellence",
      description: "Maintained 95%+ attendance rate",
      date: "Oct 2024"
    }
  ];

  const statistics = [
    { label: "Total Batches", value: "24" },
    { label: "Students Trained", value: "312" },
    { label: "Success Rate", value: "94%" },
    { label: "Average Rating", value: "4.8/5" }
  ];

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    setIsEditModalOpen(true);
  };

  const handleContactSupport = () => {
    window.open('mailto:support@youngachievers.com?subject=Partner Support - Profile Query&body=Hello, I need help with my partner profile...', '_self');
  };

  const handleViewCertificates = () => {
    console.log("View certificates clicked");
    alert("Opening certificates viewer - showing partner achievements and certifications");
  };

  const handleScheduleMeeting = () => {
    console.log("Schedule meeting clicked");
    window.open('https://calendly.com/youngachievers-support', '_blank');
  };

  const getKycStatusBadge = () => {
    switch (partnerInfo.kycStatus) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            KYC Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Calendar className="w-3 h-3 mr-1" />
            KYC Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <FileText className="w-3 h-3 mr-1" />
            KYC Required
          </Badge>
        );
    }
  };

  const getPayoutDisplay = () => {
    console.log("Getting payout display for type:", partnerInfo.payoutType);
    console.log("Payout details:", partnerInfo.payoutDetails);
    
    if (partnerInfo.payoutType === "fixed") {
      const result = {
        icon: <DollarSign className="w-4 h-4 text-green-600" />,
        title: "Fixed Payout",
        amount: `$${partnerInfo.payoutDetails.fixed.amount}`,
        description: `${partnerInfo.payoutDetails.fixed.currency} ${partnerInfo.payoutDetails.fixed.frequency}`,
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        borderColor: "border-green-200"
      };
      console.log("Fixed payout result:", result);
      return result;
    } else {
      const result = {
        icon: <Percent className="w-4 h-4 text-blue-600" />,
        title: "Revenue Share",
        amount: `$${partnerInfo.payoutDetails.revenueShare.estimatedAmount}`,
        description: `${partnerInfo.payoutDetails.revenueShare.percentage}% of student fees (estimated per batch)`,
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200"
      };
      console.log("Revenue share result:", result);
      return result;
    }
  };

  const payoutInfo = getPayoutDisplay();
  console.log("Final payout info:", payoutInfo);

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Partner Profile</h1>
          <p className="text-gray-600 mt-2 text-sm lg:text-base">Manage your partner information and track performance</p>
        </div>
        <div className="flex-shrink-0">
          <Button 
            onClick={handleEditProfile}
            className="w-full lg:w-auto whitespace-nowrap"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Partner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partnerName" className="text-sm font-medium">Full Name</Label>
                  <Input id="partnerName" value={partnerInfo.name} readOnly className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input id="email" value={partnerInfo.email} readOnly className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  <Input id="phone" value={partnerInfo.phone} readOnly className="text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <Textarea id="address" value={partnerInfo.address} readOnly rows={2} className="text-sm resize-none" />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium">Specializations:</span>
                {partnerInfo.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{spec}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payout Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Payout Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border ${payoutInfo.bgColor} ${payoutInfo.borderColor}`}>
                <div className="flex items-center gap-3 mb-3">
                  {payoutInfo.icon}
                  <h3 className={`font-semibold ${payoutInfo.textColor}`}>{payoutInfo.title}</h3>
                </div>
                <div className="space-y-2">
                  <div className={`text-2xl font-bold ${payoutInfo.textColor}`}>
                    {payoutInfo.amount}
                  </div>
                  <p className={`text-sm ${payoutInfo.textColor} opacity-80`}>
                    {payoutInfo.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Payouts are processed monthly based on completed batches and student enrollment. 
                  For questions about payout schedules or amounts, please contact support.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center p-3 lg:p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl lg:text-2xl font-bold text-blue-600 break-words">{stat.value}</div>
                    <div className="text-xs lg:text-sm text-gray-600 mt-1 break-words">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Partner Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm">Partner since</span>
                <Badge variant="outline" className="text-xs">{partnerInfo.joinDate}</Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <Badge className="bg-green-100 text-green-800 text-xs">{partnerInfo.status}</Badge>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                {getKycStatusBadge()}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm break-words">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 break-words">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        partnerInfo={partnerInfo}
      />
    </div>
  );
}
