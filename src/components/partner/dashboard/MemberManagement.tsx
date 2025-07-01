
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Calendar,
  Eye,
  Users,
  Star,
  Trophy,
  Award,
  Edit
} from "lucide-react";
import { StudentProfileModal } from "./StudentProfileModal";
import { RatingModal } from "./RatingModal";
import { EditMemberModal } from "./EditMemberModal";

export function MemberManagement() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [studentToRate, setStudentToRate] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<any>(null);

  // Partner can see all members but can only edit those in their batches
  const partnerSubject = "Yoga";
  
  const members = [
    // Partner's students (editable)
    {
      id: 1,
      name: "Sarah Williams",
      age: 16,
      email: "sarah.williams@email.com",
      phone: "+1 (555) 123-4567",
      parentPhone: "+1 (555) 123-4500",
      parentEmail: "parent.sarah@email.com",
      batch: "Yoga Advanced - Batch A",
      joinDate: "Dec 1, 2024",
      status: "Active",
      attendance: 95,
      rating: 4.5,
      batchesEnrolled: 2,
      canEdit: true,
      teacher: "Instructor Sarah Wilson",
      achievements: ["Flexibility Master", "Best Student"],
      nextSession: "Today 4:00 PM",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 2,
      name: "Lisa Garcia",
      age: 14,
      email: "lisa.garcia@email.com",
      phone: "+1 (555) 567-8901",
      parentPhone: "+1 (555) 567-8900",
      parentEmail: "parent.lisa@email.com",
      batch: "Yoga Fundamentals - Batch B",
      joinDate: "Dec 5, 2024",
      status: "Active",
      attendance: 89,
      rating: 4.2,
      batchesEnrolled: 1,
      canEdit: true,
      teacher: "Instructor Sarah Wilson",
      achievements: ["Regular Attendee"],
      nextSession: "Tomorrow 6:00 PM",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 12,
      email: "mike.johnson@email.com",
      phone: "+1 (555) 234-5678",
      parentPhone: "+1 (555) 234-5600",
      parentEmail: "parent.mike@email.com",
      batch: "Chess - Intermediate",
      joinDate: "Nov 15, 2024",
      status: "Active",
      attendance: 87,
      rating: 4.0,
      batchesEnrolled: 1,
      canEdit: false,
      teacher: "Master John Smith",
      achievements: ["Tournament Winner"],
      nextSession: "Tomorrow 3:00 PM",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 4,
      name: "Emily Chen",
      age: 15,
      email: "emily.chen@email.com",
      phone: "+1 (555) 345-6789",
      parentPhone: "+1 (555) 345-6700",
      parentEmail: "parent.emily@email.com",
      batch: "Coding - Python Basics",
      joinDate: "Nov 20, 2024",
      status: "Active",
      attendance: 92,
      rating: 4.8,
      batchesEnrolled: 2,
      canEdit: false,
      teacher: "Prof. Tech Guru",
      achievements: ["Code Master"],
      nextSession: "Today 5:00 PM",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  const myStudents = members.filter(member => member.canEdit);
  const allStudents = members;

  const stats = [
    { 
      label: "My Students", 
      value: myStudents.length.toString(), 
      change: "+2 this week",
      color: "blue"
    },
    { 
      label: "Active in My Batches", 
      value: myStudents.filter(m => m.status === "Active").length.toString(), 
      change: "+1 this week",
      color: "green"
    },
    { 
      label: "Total Platform Members", 
      value: allStudents.length.toString(), 
      change: "View only access",
      color: "purple"
    },
    { 
      label: "My Avg Attendance", 
      value: Math.round(myStudents.reduce((sum, m) => sum + m.attendance, 0) / myStudents.length) + "%", 
      change: "+3% vs last month",
      color: "orange"
    }
  ];

  const handleViewProfile = (member: any) => {
    console.log("View Profile clicked for:", member.name);
    setSelectedStudent(member);
    setShowProfileModal(true);
  };

  const handleRateStudent = (studentId: number) => {
    console.log("Rate Student clicked for ID:", studentId);
    const student = members.find(m => m.id === studentId);
    if (student) {
      setStudentToRate({
        id: student.id,
        name: student.name,
        avatar: student.avatar
      });
      setShowRatingModal(true);
    }
  };

  const handleEditMember = (member: any) => {
    console.log("Edit Member clicked for:", member.name);
    setMemberToEdit(member);
    setShowEditModal(true);
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

  const closeEditModal = () => {
    console.log("Closing edit modal");
    setShowEditModal(false);
    setMemberToEdit(null);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-8 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Member Management</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your {partnerSubject} students and view platform members</p>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs sm:text-sm font-medium text-${stat.color}-600 mb-1 truncate`}>{stat.label}</p>
                    <p className={`text-2xl sm:text-3xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                    <p className={`text-xs text-${stat.color}-600 mt-1 truncate`}>{stat.change}</p>
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stat.color}-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search members..." className="pl-10" />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span className="text-blue-600 font-medium">{myStudents.length} students</span> you can manage • 
          <span className="text-gray-500 ml-1">{allStudents.length - myStudents.length} view-only</span>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {members.map((member) => (
            <Card key={member.id} className={`${member.canEdit ? 'border-blue-200 bg-blue-25' : 'border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 sm:p-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className={member.canEdit ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{member.name}</h3>
                        <Badge 
                          variant={member.status === "Active" ? "default" : "secondary"}
                          className={`${member.status === "Active" ? "bg-green-100 text-green-800" : ""} text-xs flex-shrink-0 w-fit`}
                        >
                          {member.status}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">Age {member.age} • {member.canEdit ? 'Intermediate' : 'Advanced'}</p>
                      {member.canEdit && (
                        <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-700 w-fit">
                          My Student
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course/Batch Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {member.canEdit ? (
                      <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-xs font-bold">Y</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 text-xs font-bold">C</span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 truncate">{member.batch.split(' - ')[0]}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{member.batch}</p>
                  <p className="text-xs text-gray-500 mt-1">Batches Enrolled: {member.batchesEnrolled}</p>
                </div>

                {/* Rating and Attendance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-yellow-700">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-bold text-yellow-900">{member.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-700">Attendance</span>
                      <span className="text-lg font-bold text-green-900">{member.attendance}%</span>
                    </div>
                    <Progress value={member.attendance} className="h-2" />
                  </div>
                </div>

                {/* Achievements */}
                {member.achievements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Achievements:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.achievements.map((achievement, index) => (
                        <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 text-xs">
                          <Trophy className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Session Info */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Next Session</p>
                  <p className="text-sm text-gray-900">{member.nextSession}</p>
                </div>

                {/* Parent/Guardian Contact */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Parent/Guardian Contact</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{member.parentPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{member.parentEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewProfile(member)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  {member.canEdit ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 bg-purple-50 text-purple-700 hover:bg-purple-100"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleRateStudent(member.id)}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Rate Student
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1 bg-green-50 text-green-700 hover:bg-green-100">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Parent
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
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

      <EditMemberModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        member={memberToEdit}
      />
    </div>
  );
}
