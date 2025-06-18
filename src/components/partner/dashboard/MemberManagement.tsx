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
  Award
} from "lucide-react";

export function MemberManagement() {
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
      performance: 88,
      batchesEnrolled: 2,
      canEdit: true,
      teacher: "Instructor Sarah Wilson",
      achievements: ["Flexibility Master", "Best Student"],
      lastAssessment: "A+",
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
      performance: 92,
      batchesEnrolled: 1,
      canEdit: true,
      teacher: "Instructor Sarah Wilson",
      achievements: ["Regular Attendee"],
      lastAssessment: "A",
      nextSession: "Tomorrow 6:00 PM",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    // Other students (view only)
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
      performance: 85,
      batchesEnrolled: 1,
      canEdit: false,
      teacher: "Master John Smith",
      achievements: ["Tournament Winner"],
      lastAssessment: "B+",
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
      performance: 94,
      batchesEnrolled: 2,
      canEdit: false,
      teacher: "Prof. Tech Guru",
      achievements: ["Code Master"],
      lastAssessment: "A+",
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

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
        <p className="text-gray-600 mt-1">Manage your {partnerSubject} students and view platform members</p>
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
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search members..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span className="text-blue-600 font-medium">{myStudents.length} students</span> you can manage • 
          <span className="text-gray-500 ml-1">{allStudents.length - myStudents.length} view-only</span>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {members.map((member) => (
            <Card key={member.id} className={`${member.canEdit ? 'border-blue-200 bg-blue-25' : 'border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className={member.canEdit ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <Badge 
                          variant={member.status === "Active" ? "default" : "secondary"}
                          className={member.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {member.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Age {member.age} • {member.canEdit ? 'Intermediate' : 'Advanced'}</p>
                      {member.canEdit && (
                        <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-700">
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
                      <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                        <span className="text-green-600 text-xs font-bold">Y</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <span className="text-purple-600 text-xs font-bold">C</span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{member.batch.split(' - ')[0]}</span>
                  </div>
                  <p className="text-sm text-gray-600">{member.batch}</p>
                  <p className="text-xs text-gray-500 mt-1">Batches Enrolled: {member.batchesEnrolled}</p>
                </div>

                {/* Performance and Attendance */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-700">Performance</span>
                      <span className="text-lg font-bold text-blue-900">{member.performance}%</span>
                    </div>
                    <Progress value={member.performance} className="h-2" />
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
                        <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          <Trophy className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Session Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Assessment</p>
                    <p className="text-lg font-bold text-gray-900">{member.lastAssessment}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Next Session</p>
                    <p className="text-sm text-gray-900">{member.nextSession}</p>
                  </div>
                </div>

                {/* Parent/Guardian Contact */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Parent/Guardian Contact</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-3 w-3" />
                      <span>{member.parentPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3" />
                      <span>{member.parentEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  {member.canEdit ? (
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <Star className="h-4 w-4 mr-2" />
                      Rate Student
                    </Button>
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
    </div>
  );
}
