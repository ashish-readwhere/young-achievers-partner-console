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
  Settings,
  Info
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RatingModal } from "./RatingModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MemberManagementProps {
  onNavigate?: (section: string, id?: number) => void;
}

export function MemberManagement({ onNavigate }: MemberManagementProps) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [memberToRate, setMemberToRate] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Partner can teach multiple programs
  const partnerPrograms = ["Yoga", "Chess"];
  
  // Helper function to get actual dates
  const getNextSessionDate = (sessionInfo: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (sessionInfo.includes("Today")) {
      return {
        date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: today.toLocaleDateString('en-US', { weekday: 'long' }),
        time: sessionInfo.split(' ').slice(-2).join(' ')
      };
    } else if (sessionInfo.includes("Tomorrow")) {
      return {
        date: tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: tomorrow.toLocaleDateString('en-US', { weekday: 'long' }),
        time: sessionInfo.split(' ').slice(-2).join(' ')
      };
    }
    return {
      date: sessionInfo,
      day: '',
      time: ''
    };
  };
  
  // Only show members enrolled in partner's batches
  const members = [
    {
      id: 1,
      name: "Sarah Williams",
      age: 16,
      batch: "Yoga Advanced - Batch A",
      joinDate: "Dec 1, 2024",
      status: "Active",
      attendance: 95,
      rating: 4.5,
      programs: [
        {
          name: "Yoga",
          batches: [
            { id: 2, name: "Yoga Advanced - Batch A", level: "Advanced", status: "Active" }
          ]
        }
      ],
      canEdit: true,
      teacher: "Instructor Sarah Wilson",
      nextSession: "Today 4:00 PM",
      nextSessionDate: "Today",
      nextSessionDay: "Monday",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 2,
      name: "Lisa Garcia",
      age: 14,
      batch: "Yoga Fundamentals - Batch B",
      joinDate: "Dec 5, 2024",
      status: "Active",
      attendance: 89,
      rating: 4.2,
      programs: [
        {
          name: "Yoga",
          batches: [
            { id: 1, name: "Yoga Fundamentals - Batch B", level: "Beginner", status: "Active" }
          ]
        },
        {
          name: "Chess",
          batches: [
            { id: 3, name: "Chess Beginner - Batch A", level: "Beginner", status: "Active" }
          ]
        }
      ],
      canEdit: true,
      teacher: "Instructor Sarah Wilson",
      nextSession: "Tomorrow 6:00 PM",
      nextSessionDate: "Tomorrow",
      nextSessionDay: "Tuesday",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = searchQuery === "" || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && member.status === "Active") ||
      (statusFilter === "inactive" && member.status === "Inactive") ||
      (statusFilter === "my-members" && member.canEdit);
    
    return matchesSearch && matchesStatus;
  });

  const myMembers = filteredMembers.filter(member => member.canEdit);
  const allMembers = filteredMembers;

  const stats = [
    { 
      label: "My Members", 
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
        const myActiveMembers = members.filter(m => m.canEdit);
        return myActiveMembers.length > 0 ? 
          Math.round(myActiveMembers.reduce((sum, m) => sum + m.attendance, 0) / myActiveMembers.length) + "%" : 
          "0%";
      })(), 
      color: "orange"
    }
  ];

  const handleViewProfile = (member: any) => {
    console.log("Navigate to member profile for:", member.name, "ID:", member.id);
    if (onNavigate) {
      onNavigate('member-profile', member.id);
    } else {
      console.error("onNavigate function not provided");
    }
  };

  const handleRateMember = (memberId: number) => {
    console.log("Rate Member clicked for ID:", memberId);
    const member = members.find(m => m.id === memberId);
    if (member) {
      setMemberToRate({
        id: member.id,
        name: member.name,
        avatar: member.avatar
      });
      setShowRatingModal(true);
    }
  };

  const closeRatingModal = () => {
    console.log("Closing rating modal");
    setShowRatingModal(false);
    setMemberToRate(null);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const getProgramIcon = (programName: string) => {
    switch (programName.toLowerCase()) {
      case 'yoga':
        return 'Y';
      case 'chess':
        return 'C';
      default:
        return programName.charAt(0).toUpperCase();
    }
  };

  const getProgramColor = (programName: string) => {
    switch (programName.toLowerCase()) {
      case 'yoga':
        return 'bg-green-100 text-green-600';
      case 'chess':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full bg-white min-h-screen">
        {/* Header */}
        <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage members enrolled in your programs</p>
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
                placeholder="Search by name, batch, or teacher..." 
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
                <DropdownMenuItem onClick={() => setStatusFilter("my-members")}>
                  My Members Only
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClearFilters}>
                  Clear All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <span className="text-blue-600 font-medium">{myMembers.length} members</span> enrolled in your batches
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
                      <TableHead>Member</TableHead>
                      <TableHead>Program/Batch</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Next Session</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => {
                      const nextSessionInfo = getNextSessionDate(member.nextSession);
                      const totalBatches = member.programs.reduce((sum, program) => sum + program.batches.length, 0);
                      
                      return (
                        <TableRow key={member.id} className="hover:bg-gray-50 bg-blue-25">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 flex-shrink-0">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
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
                                <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-700">
                                  My Member
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              {member.programs.map((program, index) => (
                                <div key={index} className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${getProgramColor(program.name)}`}>
                                      <span className="text-xs font-bold">{getProgramIcon(program.name)}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{program.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 ml-7">
                                    <span className="text-sm text-gray-600">Batches: {program.batches.length}</span>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                                        >
                                          <Info className="h-3 w-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-xs">
                                        <div className="space-y-1">
                                          {program.batches.map((batch, batchIndex) => (
                                            <p key={batchIndex} className="text-sm">{batch.name}</p>
                                          ))}
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </div>
                              ))}
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
                              <p className="text-sm font-medium text-gray-900">{nextSessionInfo.date}</p>
                              <p className="text-xs text-gray-600">{nextSessionInfo.day}</p>
                              <p className="text-xs text-gray-500">{nextSessionInfo.time}</p>
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
                              
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
                                onClick={() => handleRateMember(member.id)}
                              >
                                <Star className="h-3 w-3 mr-1" />
                                Rate
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

        {/* Rating Modal */}
        <RatingModal
          isOpen={showRatingModal}
          onClose={closeRatingModal}
          member={memberToRate}
        />
      </div>
    </TooltipProvider>
  );
}
