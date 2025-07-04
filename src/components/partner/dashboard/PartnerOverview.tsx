import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  Star, 
  TrendingUp,
  Clock,
  MapPin,
  Eye,
  User,
  Mail,
  Phone
} from "lucide-react";
import { MemberProfileModal } from "./MemberProfileModal";
import { RatingModal } from "./RatingModal";

interface PartnerOverviewProps {
  onNavigate: (section: string) => void;
}

export function PartnerOverview({ onNavigate }: PartnerOverviewProps) {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [memberToRate, setMemberToRate] = useState<any>(null);

  // Partner data and stats
  const partnerName = "Instructor Sarah Wilson";
  const partnerSubject = "Yoga";
  
  const stats = [
    { label: "Active Batches", value: "2", icon: Users, color: "blue" },
    { label: "Total Members", value: "33", icon: Users, color: "green" },
    { label: "This Week Sessions", value: "8", icon: Calendar, color: "purple" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "yellow" }
  ];

  const recentMembers = [
    {
      id: 1,
      name: "Emma Johnson",
      age: 16,
      email: "emma.j@email.com",
      phone: "+1 234-567-8901",
      parentPhone: "+1 234-567-8900",
      parentEmail: "parent.emma@email.com",
      batch: "Yoga Advanced",
      joinDate: "Dec 1, 2024",
      status: "Active",
      attendance: 95,
      rating: 4.8,
      batchesEnrolled: 2,
      achievements: ["Flexibility Master", "Perfect Attendance"],
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 2,
      name: "Sarah Williams",
      age: 15,
      email: "sarah.w@email.com",
      phone: "+1 234-567-8902",
      parentPhone: "+1 234-567-8901",
      parentEmail: "parent.sarah@email.com",
      batch: "Yoga Fundamentals",
      joinDate: "Nov 25, 2024",
      status: "Active",
      attendance: 88,
      rating: 4.5,
      batchesEnrolled: 1,
      achievements: ["Quick Learner"],
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 3,
      name: "Mike Chen",
      age: 17,
      email: "mike.c@email.com",
      phone: "+1 234-567-8903",
      parentPhone: "+1 234-567-8902",
      parentEmail: "parent.mike@email.com",
      batch: "Yoga Advanced",
      joinDate: "Nov 20, 2024",
      status: "Active",
      attendance: 92,
      rating: 4.6,
      batchesEnrolled: 2,
      achievements: ["Team Player", "Consistent Progress"],
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Yoga Advanced - Session 9",
      date: "Jan 15, 2024",
      time: "10:00 AM",
      venue: "Talkatora Stadium",
      students: 15
    },
    {
      id: 2,
      title: "Yoga Fundamentals - Session 8",
      date: "Jan 16, 2024",
      time: "2:00 PM",
      venue: "Noida Stadium",
      students: 18
    }
  ];

  const handleViewProfile = (member: any) => {
    console.log("View Profile clicked for:", member.name);
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const handleRateMember = (memberId: number) => {
    console.log("Rate Member clicked for ID:", memberId);
    const member = recentMembers.find(s => s.id === memberId);
    if (member) {
      setMemberToRate({
        id: member.id,
        name: member.name,
        avatar: member.avatar
      });
      setShowRatingModal(true);
    }
  };

  const closeProfileModal = () => {
    console.log("Closing profile modal");
    setShowProfileModal(false);
    setSelectedMember(null);
  };

  const closeRatingModal = () => {
    console.log("Closing rating modal");
    setShowRatingModal(false);
    setMemberToRate(null);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">Partner Overview</h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">Welcome back, {partnerName}! Here's your {partnerSubject} teaching overview.</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium text-${stat.color}-600 mb-1 leading-tight`}>{stat.label}</p>
                    <p className={`text-xl font-bold text-${stat.color}-900 leading-tight`}>{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          {/* Recent Members */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Recent Members</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('members')}
                className="text-xs"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {recentMembers.map((member) => (
                  <div key={member.id} className="p-3 bg-gray-50 rounded-lg">
                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <Avatar className="h-12 w-12 flex-shrink-0">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
                              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                {member.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{member.phone}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-xs text-gray-600 mb-1">Attendance</div>
                              <div className="flex items-center gap-2">
                                <Progress value={member.attendance} className="h-2 w-20" />
                                <span className="text-sm font-medium text-gray-900 w-10">{member.attendance}%</span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              className="bg-gray-800 hover:bg-gray-900 text-white text-xs"
                              onClick={() => handleViewProfile(member)}
                            >
                              <User className="w-3 h-3 mr-1" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{member.name}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 text-xs flex-shrink-0">
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-1 min-w-0">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-1 min-w-0">
                            <Phone className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{member.phone}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Attendance</span>
                            <span className="font-medium text-gray-900">{member.attendance}%</span>
                          </div>
                          <Progress value={member.attendance} className="h-2" />
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-gray-800 hover:bg-gray-900 text-white text-xs w-full"
                        onClick={() => handleViewProfile(member)}
                      >
                        <User className="w-3 h-3 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Upcoming Sessions</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('batches')}
                className="text-xs"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">{session.title}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{session.date} at {session.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{session.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Users className="w-3 h-3 flex-shrink-0" />
                            <span>{session.students} students</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('batches')}
                        className="w-full md:w-auto text-xs"
                      >
                        <Eye className="w-3 h-3 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <MemberProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        onRateMember={handleRateMember}
        member={selectedMember}
      />

      <RatingModal
        isOpen={showRatingModal}
        onClose={closeRatingModal}
        member={memberToRate}
      />
    </div>
  );
}
