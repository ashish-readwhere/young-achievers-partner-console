import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StudentProfileModal } from "./StudentProfileModal";
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

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  attendance: number;
  status: "Active" | "Inactive";
  avatar: string;
}

interface Session {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  studentsEnrolled: number;
  completionPercentage: number;
  status: "Completed" | "Upcoming" | "In Progress";
  description: string;
  enrolledStudents: Student[];
}

interface BatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMemberManagement?: (studentId?: number) => void;
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
  const [activeTab, setActiveTab] = useState<"sessions" | "students">("sessions");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [studentToRate, setStudentToRate] = useState<any>(null);

  if (!batch) return null;

  console.log("BatchDetailsModal rendered with batch:", batch?.name);

  // Mock students data with full profile information
  const allStudents: Student[] = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma.j@email.com",
      phone: "+1 234-567-8901",
      attendance: 95,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 234-567-8902",
      attendance: 88,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 3,
      name: "Sarah Williams",
      email: "s.williams@email.com",
      phone: "+1 234-567-8903",
      attendance: 92,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  // Convert students to full profile format for the modal
  const getFullStudentProfile = (student: Student) => ({
    id: student.id,
    name: student.name,
    age: 16, // Mock age
    email: student.email,
    phone: student.phone,
    parentPhone: "+1 234-567-8900", // Mock parent phone
    parentEmail: `parent.${student.email}`, // Mock parent email
    joinDate: "Dec 1, 2024", // Mock join date
    status: student.status,
    attendance: student.attendance,
    rating: 4.8, // Mock rating
    batchesEnrolled: 2, // Mock batches enrolled
    achievements: ["Quick Learner", "Team Player"], // Mock achievements
    avatar: student.avatar
  });

  // Mock sessions data with enrolled students
  const sessions: Session[] = [
    {
      id: 1,
      title: "Introduction to Yoga Basics",
      date: "Jan 10, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      venue: `${batch.venue} - ${batch.spot}`,
      studentsEnrolled: 18,
      completionPercentage: 100,
      status: "Completed",
      description: "Basic poses and breathing techniques",
      enrolledStudents: allStudents
    },
    {
      id: 2,
      title: "Advanced Poses & Flow",
      date: "Jan 12, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      venue: `${batch.venue} - ${batch.spot}`,
      studentsEnrolled: 15,
      completionPercentage: 100,
      status: "Completed",
      description: "Building strength and flexibility",
      enrolledStudents: allStudents.slice(0, 2)
    },
    {
      id: 3,
      title: "Meditation & Mindfulness",
      date: "Jan 16, 2024",
      time: "2:00 PM",
      duration: "1.5 hours",
      venue: `${batch.venue} - ${batch.spot}`,
      studentsEnrolled: 12,
      completionPercentage: 0,
      status: "Upcoming",
      description: "Focus on mental wellness and relaxation",
      enrolledStudents: allStudents.slice(0, 1)
    }
  ];

  const handleSessionDetails = (session: Session) => {
    console.log("Viewing session details:", session);
    setSelectedSession(session);
  };

  const handleBackToSessions = () => {
    setSelectedSession(null);
  };

  const handleViewProfile = (student: Student) => {
    console.log("View Profile clicked for:", student.name);
    const fullProfile = getFullStudentProfile(student);
    setSelectedStudent(fullProfile);
    setShowProfileModal(true);
  };

  const handleRateStudent = (studentId: number) => {
    console.log("Rate Student clicked for ID:", studentId);
    const student = allStudents.find(s => s.id === studentId);
    if (student) {
      setStudentToRate({
        id: student.id,
        name: student.name,
        avatar: student.avatar
      });
      setShowRatingModal(true);
    }
  };

  const closeProfileModal = () => {
    console.log("Closing profile modal");
    setShowProfileModal(false);
    setSelectedStudent(null);
  };

  const closeRatingModal = () => {
    console.log("Closing rating modal");
    setShowRatingModal(false);
    setStudentToRate(null);
  };

  // Get current display data based on selected session
  const getCurrentStats = () => {
    if (selectedSession) {
      return {
        students: selectedSession.studentsEnrolled,
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
  const displayStudents = selectedSession ? selectedSession.enrolledStudents : allStudents;

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
                      {selectedSession ? "Session Students" : "Total Students"}
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
                onClick={() => setActiveTab("students")}
                className={`pb-2 px-4 font-medium ${
                  activeTab === "students"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Students ({displayStudents.length})
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
                          <span className="text-sm font-medium">{session.studentsEnrolled} students</span>
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

          {((!selectedSession && activeTab === "students") || selectedSession) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayStudents.map((student) => (
                <Card key={student.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                            <Badge 
                              variant={student.status === "Active" ? "default" : "secondary"}
                              className={student.status === "Active" ? "bg-green-100 text-green-800" : ""}
                            >
                              {student.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{student.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{student.phone}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">Attendance</span>
                            <span className="text-sm font-medium">{student.attendance}%</span>
                          </div>
                          <Progress 
                            value={student.attendance} 
                            className={`h-2 ${
                              student.attendance >= 90 ? '[&>div]:bg-green-500' : 
                              student.attendance >= 75 ? '[&>div]:bg-yellow-500' : 
                              '[&>div]:bg-red-500'
                            }`}
                          />
                        </div>

                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewProfile(student)}
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

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        onRateStudent={handleRateStudent}
        student={selectedStudent}
      />

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={closeRatingModal}
        student={studentToRate}
      />
    </>
  );
}
