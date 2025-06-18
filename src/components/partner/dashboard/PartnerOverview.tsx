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
import { StudentProfileModal } from "./StudentProfileModal";
import { RatingModal } from "./RatingModal";

interface PartnerOverviewProps {
  onNavigate: (section: string) => void;
}

export function PartnerOverview({ onNavigate }: PartnerOverviewProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [studentToRate, setStudentToRate] = useState<any>(null);

  // Partner data and stats
  const partnerName = "Instructor Sarah Wilson";
  const partnerSubject = "Yoga";
  
  const stats = [
    { label: "Active Batches", value: "2", change: "+1 this month", icon: Users, color: "blue" },
    { label: "Total Students", value: "33", change: "+5 this week", icon: Users, color: "green" },
    { label: "This Week Sessions", value: "8", change: "4 completed", icon: Calendar, color: "purple" },
    { label: "Average Rating", value: "4.8", change: "+0.2 vs last month", icon: Star, color: "yellow" }
  ];

  const recentStudents = [
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

  const handleViewProfile = (student: any) => {
    console.log("View Profile clicked for:", student.name);
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const handleRateStudent = (studentId: number) => {
    console.log("Rate Student clicked for ID:", studentId);
    const student = recentStudents.find(s => s.id === studentId);
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

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Partner Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back, {partnerName}! Here's your {partnerSubject} teaching overview.</p>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-${stat.color}-600 mb-1`}>{stat.label}</p>
                    <p className={`text-3xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                    <p className={`text-xs text-${stat.color}-600 mt-1`}>{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Students */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Students</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('members')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {student.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{student.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Attendance</span>
                            <span className="font-medium text-gray-900">{student.attendance}%</span>
                          </div>
                          <Progress value={student.attendance} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gray-800 hover:bg-gray-900 text-white"
                      onClick={() => handleViewProfile(student)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Sessions</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('batches')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{session.title}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{session.date} at {session.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{session.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{session.students} students</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('batches')}
                      >
                        <Eye className="w-4 h-4" />
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
      <StudentProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
        onRateStudent={handleRateStudent}
        student={selectedStudent}
      />

      <RatingModal
        isOpen={showRatingModal}
        onClose={closeRatingModal}
        student={studentToRate}
      />
    </div>
  );
}
