import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MemberProfileModal } from "./MemberProfileModal";
import { RatingModal } from "./RatingModal";
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle,
  Eye,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Star
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  attendance: number;
  status: "Active" | "Inactive";
  avatar: string;
  existingRating?: number;
  existingFeedback?: string;
}

interface Session {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  membersEnrolled: number;
  completionPercentage: number;
  status: "Completed" | "Upcoming" | "In Progress";
  description: string;
  enrolledMembers: Member[];
}

interface BatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMemberManagement?: (memberId?: number) => void;
  batch: {
    id: number;
    name: string;
    teacher: string;
    level: string;
    students: number;
    maxStudents: number;
    schedule: string;
    venue: string;
    spot: string;
    status: string;
    completedSessions: number;
    totalSessions: number;
    icon: string;
  } | null;
}

export function BatchDetailsModal({ isOpen, onClose, onNavigateToMemberManagement, batch }: BatchDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"sessions" | "members">("sessions");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [memberToRate, setMemberToRate] = useState<any>(null);

  if (!batch) return null;

  console.log("BatchDetailsModal rendered with batch:", batch?.name);

  // Mock members data with existing ratings
  const allMembers: Member[] = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma.j@email.com",
      phone: "+1 234-567-8901",
      attendance: 95,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png",
      existingRating: 4,
      existingFeedback: "Great participation and attitude in class."
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 234-567-8902",
      attendance: 88,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png",
      existingRating: 5,
      existingFeedback: "Excellent student, very dedicated."
    },
    {
      id: 3,
      name: "Sarah Williams",
      email: "s.williams@email.com",
      phone: "+1 234-567-8903",
      attendance: 92,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
      // No existing rating for this member
    }
  ];

  // Convert members to full profile format for the modal
  const getFullMemberProfile = (member: Member) => ({
    id: member.id,
    name: member.name,
    age: 16, // Mock age
    email: member.email,
    phone: member.phone,
    parentPhone: "+1 234-567-8900", // Mock parent phone
    parentEmail: `parent.${member.email}`, // Mock parent email
    joinDate: "Dec 1, 2024", // Mock join date
    status: member.status,
    attendance: member.attendance,
    rating: 4.8, // Mock rating
    batchesEnrolled: 2, // Mock batches enrolled
    achievements: ["Quick Learner", "Team Player"], // Mock achievements
    avatar: member.avatar
  });

  // Mock sessions data with enrolled members
  const sessions: Session[] = [
    {
      id: 1,
      title: "Introduction to Yoga Basics",
      date: "Jan 10, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      venue: `${batch.venue} - ${batch.spot}`,
      membersEnrolled: 18,
      completionPercentage: 100,
      status: "Completed",
      description: "Basic poses and breathing techniques",
      enrolledMembers: allMembers
    },
    {
      id: 2,
      title: "Advanced Poses & Flow",
      date: "Jan 12, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      venue: `${batch.venue} - ${batch.spot}`,
      membersEnrolled: 15,
      completionPercentage: 100,
      status: "Completed",
      description: "Building strength and flexibility",
      enrolledMembers: allMembers.slice(0, 2)
    },
    {
      id: 3,
      title: "Meditation & Mindfulness",
      date: "Jan 16, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      venue: `${batch.venue} - ${batch.spot}`,
      membersEnrolled: 12,
      completionPercentage: 0,
      status: "Upcoming",
      description: "Focus on mental wellness and relaxation",
      enrolledMembers: allMembers.slice(0, 1)
    }
  ];

  const handleSessionDetails = (session: Session) => {
    console.log("Viewing session details:", session);
    setSelectedSession(session);
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
  };

  const handleViewProfile = (member: Member) => {
    console.log("View Profile clicked for:", member.name);
    const fullProfile = getFullMemberProfile(member);
    setSelectedMember(fullProfile);
    setShowProfileModal(true);
  };

  const handleRateMember = (memberId: number) => {
    console.log("Rate Member clicked for ID:", memberId);
    const member = allMembers.find(s => s.id === memberId);
    if (member) {
      setMemberToRate({
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        existingRating: member.existingRating,
        existingFeedback: member.existingFeedback
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

  // Get current display data based on selected session
  const getCurrentStats = () => {
    if (selectedSession) {
      return {
        students: selectedSession.membersEnrolled,
        maxStudents: batch.maxStudents,
        sessions: `Session ${selectedSession.id}`,
        progress: selectedSession.completionPercentage,
        schedule: `${selectedSession.date} at ${selectedSession.time}`,
        context: `Session: ${selectedSession.title}`
      };
    }
    return {
      students: batch.students,
      maxStudents: batch.maxStudents,
      sessions: `${batch.completedSessions}/${batch.totalSessions}`,
      progress: Math.round((batch.completedSessions / batch.totalSessions) * 100),
      schedule: batch.schedule,
      context: `Batch: ${batch.name}`
    };
  };

  const currentStats = getCurrentStats();
  const displayMembers = selectedSession ? selectedSession.enrolledMembers : allMembers;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedSession && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToSessions}
                  className="mr-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <span className="text-2xl">{batch.icon}</span>
              <div>
                <h2 className="text-xl font-bold">
                  {selectedSession ? selectedSession.title : batch.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedSession ? `${selectedSession.date} at ${selectedSession.time}` : `Instructor: ${batch.teacher}`}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Context Banner - Shows which batch/session data is being displayed */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-blue-800">
              📊 Showing data for: <span className="font-bold">{currentStats.context}</span>
            </p>
          </div>

          {/* Batch/Session Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">
                      {selectedSession ? "Session Members" : "Total Members"}
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {currentStats.students}/{currentStats.maxStudents}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">
                      {selectedSession ? "Session" : "Sessions"}
                    </p>
                    <p className="text-2xl font-bold text-green-900">{currentStats.sessions}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Progress</p>
                    <p className="text-2xl font-bold text-purple-900">{currentStats.progress}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600">Schedule</p>
                    <p className="text-sm font-bold text-orange-900">{currentStats.schedule}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Show session details if selected */}
          {selectedSession && (
            <Card className="mb-6 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedSession.title}</h3>
                    <p className="text-gray-600">{selectedSession.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedSession.date} at {selectedSession.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedSession.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedSession.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={selectedSession.status === "Completed" ? "default" : selectedSession.status === "Upcoming" ? "secondary" : "outline"}
                      className={
                        selectedSession.status === "Completed" ? "bg-green-100 text-green-800" :
                        selectedSession.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {selectedSession.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Completion:</span>
                      <Progress value={selectedSession.completionPercentage} className="w-20 h-2" />
                      <span className="text-sm font-medium">{selectedSession.completionPercentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab Navigation - Hide when viewing session details */}
          {!selectedSession && (
            <div className="flex gap-4 mb-6 border-b">
              <button
                onClick={() => setActiveTab("sessions")}
                className={`pb-2 px-4 font-medium ${
                  activeTab === "sessions"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sessions ({sessions.length})
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`pb-2 px-4 font-medium ${
                  activeTab === "members"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Members ({displayMembers.length})
              </button>
            </div>
          )}

          {/* Content */}
          {(!selectedSession && activeTab === "sessions") && (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card key={session.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                      </div>
                      <Badge 
                        variant={session.status === "Completed" ? "default" : session.status === "Upcoming" ? "secondary" : "outline"}
                        className={
                          session.status === "Completed" ? "bg-green-100 text-green-800" :
                          session.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{session.date} at {session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{session.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{session.membersEnrolled} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Completion:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={session.completionPercentage} className="w-20 h-2" />
                            <span className="text-sm font-medium">{session.completionPercentage}%</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSessionDetails(session)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {((!selectedSession && activeTab === "members") || selectedSession) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayMembers.map((member) => (
                <Card key={member.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <Badge 
                              variant={member.status === "Active" ? "default" : "secondary"}
                              className={member.status === "Active" ? "bg-green-100 text-green-800" : ""}
                            >
                              {member.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{member.phone}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Attendance</span>
                            <span className="text-sm font-medium">{member.attendance}%</span>
                          </div>
                          <Progress 
                            value={member.attendance} 
                            className={`h-2 ${
                              member.attendance >= 90 ? '[&>div]:bg-green-500' : 
                              member.attendance >= 75 ? '[&>div]:bg-yellow-500' : 
                              '[&>div]:bg-red-500'
                            }`}
                          />
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewProfile(member)}
                        >
                          <User className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Member Profile Modal */}
      <MemberProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        onRateMember={handleRateMember}
        member={selectedMember}
      />

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={closeRatingModal}
        member={memberToRate}
      />
    </>
  );
}
