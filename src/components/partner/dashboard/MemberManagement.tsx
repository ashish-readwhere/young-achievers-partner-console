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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface MemberManagementProps {
  onNavigate?: (section: string, id?: number) => void;
}

export function MemberManagement({ onNavigate }: MemberManagementProps) {
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
      nextSessionDate: "Today",
      nextSessionDay: "Monday",
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
      nextSessionDate: "Tomorrow",
      nextSessionDay: "Tuesday",
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
      nextSessionDate: "Tomorrow",
      nextSessionDay: "Tuesday",
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
      nextSessionDate: "Today",
      nextSessionDay: "Monday",
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
      color: "blue"
    },
    { 
      label: "Active in My Batches", 
      value: members.filter(m => m.canEdit && m.status === "Active").length.toString(), 
      color: "green"
    },
    { 
      label: "Total Platform Members", 
      value: members.length.toString(), 
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
      color: "orange"
    }
  ];

  const handleViewProfile = (member: any) => {
    console.log("Navigate to student profile for:", member.name);
    if (onNavigate) {
      onNavigate('student-profile', member.id);
    }
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

        {/* Member Listing Table */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Member Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject/Batch</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Next Session</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className={`hover:bg-gray-50 ${member.canEdit ? 'bg-blue-25' : ''}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className={member.canEdit ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h3>
                              <Badge 
                                variant={member.status === "Active" ? "default" : "secondary"}
                                className={`${member.status === "Active" ? "bg-green-100 text-green-800" : ""} text-xs`}
                              >
                                {member.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">Age {member.age}</p>
                            {member.canEdit && (
                              <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-700">
                                My Student
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {member.canEdit ? (
                              <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 text-xs font-bold">Y</span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                                <span className="text-purple-600 text-xs font-bold">C</span>
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-700">{member.batch.split(' - ')[0]}</span>
                          </div>
                          <p className="text-xs text-gray-600">{member.batch}</p>
                          <p className="text-xs text-gray-500">Batches: {Array.isArray(member.batchesEnrolled) ? member.batchesEnrolled.length : 1}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-600">
                            <strong>Student:</strong>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone className="h-3 w-3" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            <strong>Parent:</strong>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone className="h-3 w-3" />
                            <span>{member.parentPhone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{member.rating}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">Attendance</span>
                              <span className="text-xs font-medium">{member.attendance}%</span>
                            </div>
                            <Progress value={member.attendance} className="h-1.5 w-16" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">{member.nextSessionDate}</p>
                          <p className="text-xs text-gray-600">{member.nextSessionDay}</p>
                          <p className="text-xs text-gray-500">{member.nextSession.split(' ').slice(-2).join(' ')}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-7"
                            onClick={() => handleViewProfile(member)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          
                          {!member.canEdit && (
                            <Button size="sm" variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 text-xs h-7">
                              <Phone className="h-3 w-3 mr-1" />
                              Contact
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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
