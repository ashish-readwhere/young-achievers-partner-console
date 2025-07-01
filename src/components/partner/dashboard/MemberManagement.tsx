
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
  Edit,
  Settings
} from "lucide-react";
import { StudentProfileModal } from "./StudentProfileModal";
import { RatingModal } from "./RatingModal";
import { EditMemberModal } from "./EditMemberModal";
import { ManageBatchesModal } from "./ManageBatchesModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MemberManagement() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [studentToRate, setStudentToRate] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<any>(null);
  const [showBatchesModal, setShowBatchesModal] = useState(false);
  const [memberToManageBatches, setMemberToManageBatches] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
      batchesEnrolled: [
        { id: 2, name: "Yoga Advanced - Batch A", level: "Advanced", status: "Active" }
      ],
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
      batchesEnrolled: [
        { id: 1, name: "Yoga Fundamentals - Batch B", level: "Beginner", status: "Active" }
      ],
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
      status: "Inactive",
      attendance: 87,
      rating: 4.0,
      batchesEnrolled: [
        { id: 3, name: "Chess - Intermediate", level: "Intermediate", status: "Inactive" }
      ],
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
      batchesEnrolled: [
        { id: 4, name: "Coding - Python Basics", level: "Beginner", status: "Active" },
        { id: 5, name: "Coding - Advanced", level: "Advanced", status: "Active" }
      ],
      canEdit: false,
      teacher: "Prof. Tech Guru",
      achievements: ["Code Master"],
      nextSession: "Today 5:00 PM",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  // Filter members based on search query and status filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchQuery === "" || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && member.status === "Active") ||
      (statusFilter === "inactive" && member.status === "Inactive") ||
      (statusFilter === "my-students" && member.canEdit);
    
    return matchesSearch && matchesStatus;
  });

  const myStudents = filteredMembers.filter(member => member.canEdit);
  const allStudents = filteredMembers;

  const stats = [
    { 
      label: "My Students", 
      value: members.filter(m => m.canEdit).length.toString(), 
      change: "+2 this week",
      color: "blue"
    },
    { 
      label: "Active in My Batches", 
      value: members.filter(m => m.canEdit && m.status === "Active").length.toString(), 
      change: "+1 this week",
      color: "green"
    },
    { 
      label: "Total Platform Members", 
      value: members.length.toString(), 
      change: "View only access",
      color: "purple"
    },
    { 
      label: "My Avg Attendance", 
      value: (() => {
        const myActiveStudents = members.filter(m => m.canEdit);
        return myActiveStudents.length > 0 ? 
          Math.round(myActiveStudents.reduce((sum, m) => sum + m.attendance, 0) / myActiveStudents.length) + "%" : 
          "0%";
      })(), 
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

  const handleManageBatches = (member: any) => {
    console.log("Manage Batches clicked for:", member.name);
    setMemberToManageBatches(member);
    setShowBatchesModal(true);
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

  const closeBatchesModal = () => {
    console.log("Closing batches modal");
    setShowBatchesModal(false);
    setMemberToManageBatches(null);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Member Management</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your {partnerSubject} students and view platform members</p>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs sm:text-sm font-medium text-${stat.color}-600 mb-1 truncate`}>{stat.label}</p>
                    <p className={`text-xl sm:text-2xl lg:text-3xl font-bold text-${stat.color}-900`}>{stat.value}</p>
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
            <Input 
              placeholder="Search by name, email, batch, or teacher..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => {
                console.log("Search query changed:", e.target.value);
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filter {statusFilter !== "all" && `(${statusFilter})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Members
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("my-students")}>
                My Students Only
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearFilters}>
                Clear All Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span className="text-blue-600 font-medium">{myStudents.length} students</span> you can manage • 
          <span className="text-gray-500 ml-1">{allStudents.length - myStudents.length} view-only</span>
          {(searchQuery || statusFilter !== "all") && (
            <span className="ml-1">
              • Showing {filteredMembers.length} results
              {searchQuery && ` for "${searchQuery}"`}
              {statusFilter !== "all" && ` (${statusFilter})`}
            </span>
          )}
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 sm:gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className={`${member.canEdit ? 'border-blue-200 bg-blue-25' : 'border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-4 sm:p-6">
                {/* Header with Avatar and Basic Info */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <Avatar className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex-shrink-0">
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
                  <p className="text-xs text-gray-500 mt-1">Batches Enrolled: {Array.isArray(member.batchesEnrolled) ? member.batchesEnrolled.length : 1}</p>
                </div>

                {/* Rating and Attendance - Improved for tablet */}
                <div className="grid grid-cols-2 gap-3 mb-4">
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

                {/* Action Buttons - Improved responsive layout */}
                <div className="space-y-2">
                  {/* First row - View Profile (always visible) */}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewProfile(member)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  
                  {/* Second row - Student actions or Contact Parent */}
                  {member.canEdit ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-orange-50 text-orange-700 hover:bg-orange-100"
                        onClick={() => handleManageBatches(member)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Batches
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full bg-green-50 text-green-700 hover:bg-green-100">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Parent
                    </Button>
                  )}
                  
                  {/* Third row - Rate Student (only for editable students) */}
                  {member.canEdit && (
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleRateStudent(member.id)}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Rate Student
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMembers.length === 0 && (searchQuery || statusFilter !== "all") && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              No members found matching your search criteria.
            </p>
            <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
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

      <ManageBatchesModal
        isOpen={showBatchesModal}
        onClose={closeBatchesModal}
        member={memberToManageBatches}
      />
    </div>
  );
}
