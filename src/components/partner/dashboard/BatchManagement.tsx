
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search,
  Filter,
  Users,
  Clock,
  Calendar,
  Eye,
  User,
  Mail,
  Phone,
  Star,
  Trophy,
  BookOpen,
  TrendingUp,
  X
} from "lucide-react";

interface Batch {
  id: number;
  name: string;
  time: string;
  day: string;
  level: string;
  students: number;
  capacity: number;
  status: string;
  progress: number;
  nextSession: string;
  previousSession: string;
  completedSessions: number;
  totalSessions: number;
}

interface Member {
  id: number;
  name: string;
  age: number;
  email: string;
  phone: string;
  parentPhone: string;
  parentEmail: string;
  batchesEnrolled: { id: number; name: string; level: string; status: string }[];
  joinDate: string;
  status: string;
  attendance: number;
  rating: number;
  achievements: string[];
  avatar: string;
}

export function BatchManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"batch" | "member">("batch");
  const [batchFilter, setBatchFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState("all");

  const batches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      time: "6:00 PM - 7:00 PM",
      day: "Mon, Wed, Fri",
      level: "Beginner",
      students: 15,
      capacity: 20,
      status: "Active",
      progress: 65,
      nextSession: "Monday, Jan 15 at 6:00 PM",
      previousSession: "Friday, Jan 12 at 6:00 PM",
      completedSessions: 13,
      totalSessions: 20
    },
    {
      id: 2,
      name: "Yoga Advanced - Batch A",
      time: "4:00 PM - 5:00 PM",
      day: "Tue, Thu",
      level: "Advanced",
      students: 10,
      capacity: 12,
      status: "Active",
      progress: 80,
      nextSession: "Tuesday, Jan 16 at 4:00 PM",
      previousSession: "Thursday, Jan 11 at 4:00 PM",
      completedSessions: 16,
      totalSessions: 20
    },
    {
      id: 3,
      name: "Yoga Intermediate - Batch C",
      time: "7:30 PM - 8:30 PM",
      day: "Mon, Wed",
      level: "Intermediate",
      students: 12,
      capacity: 15,
      status: "Inactive",
      progress: 45,
      nextSession: "On Hold",
      previousSession: "Wednesday, Jan 10 at 7:30 PM",
      completedSessions: 9,
      totalSessions: 20
    }
  ];

  // Member data for search functionality
  const members = [
    {
      id: 1,
      name: "Sarah Williams",
      age: 16,
      email: "sarah.williams@email.com",
      phone: "+1 (555) 123-4567",
      parentPhone: "+1 (555) 123-4500",
      parentEmail: "parent.sarah@email.com",
      batchesEnrolled: [
        { id: 2, name: "Yoga Advanced - Batch A", level: "Advanced", status: "Active" }
      ],
      joinDate: "Monday, Dec 1, 2024",
      status: "Active",
      attendance: 95,
      rating: 4.5,
      achievements: ["Flexibility Master", "Best Student"],
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
      batchesEnrolled: [
        { id: 1, name: "Yoga Fundamentals - Batch B", level: "Beginner", status: "Active" }
      ],
      joinDate: "Thursday, Dec 5, 2024",
      status: "Active",
      attendance: 89,
      rating: 4.2,
      achievements: ["Regular Attendee"],
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
      batchesEnrolled: [
        { id: 3, name: "Yoga Intermediate - Batch C", level: "Intermediate", status: "Active" }
      ],
      joinDate: "Friday, Nov 15, 2024",
      status: "Active",
      attendance: 87,
      rating: 4.0,
      achievements: ["Consistent Performer"],
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  // Enhanced filter logic for batches
  const getFilteredBatches = () => {
    let filtered = batches;
    
    // Apply search filter
    if (searchQuery && searchType === "batch") {
      filtered = filtered.filter(batch =>
        batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.level.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (batchFilter !== "all") {
      filtered = filtered.filter(batch => {
        switch (batchFilter) {
          case "active":
            return batch.status === "Active";
          case "inactive":
            return batch.status === "Inactive";
          case "beginner":
            return batch.level === "Beginner";
          case "intermediate":
            return batch.level === "Intermediate";
          case "advanced":
            return batch.level === "Advanced";
          default:
            return true;
        }
      });
    }
    
    return filtered;
  };

  // Enhanced filter logic for members
  const getFilteredMembers = () => {
    let filtered = members;
    
    // Apply search filter
    if (searchQuery && searchType === "member") {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.batchesEnrolled.some(batch => 
          batch.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Apply status filter
    if (memberFilter !== "all") {
      filtered = filtered.filter(member => {
        switch (memberFilter) {
          case "active":
            return member.status === "Active";
          case "inactive":
            return member.status === "Inactive";
          case "high-rating":
            return member.rating >= 4.0;
          case "low-attendance":
            return member.attendance < 90;
          default:
            return true;
        }
      });
    }
    
    return filtered;
  };

  const filteredBatches = getFilteredBatches();
  const filteredMembers = getFilteredMembers();

  const shouldShowBatches = searchType === "batch";
  const shouldShowMembers = searchType === "member";

  const stats = [
    { 
      label: "Total Batches", 
      value: batches.length.toString(), 
      color: "blue"
    },
    { 
      label: "Active Batches", 
      value: batches.filter(b => b.status === "Active").length.toString(), 
      color: "green"
    },
    { 
      label: "Total Enrollment", 
      value: batches.reduce((sum, b) => sum + b.students, 0).toString(), 
      color: "purple"
    },
    { 
      label: "Avg Batch Progress", 
      value: Math.round(batches.reduce((sum, b) => sum + b.progress, 0) / batches.length) + "%", 
      color: "orange"
    }
  ];

  const handleViewBatch = (batchId: number) => {
    console.log("Navigate to batch details for ID:", batchId);
    // Navigate to batch details page
  };

  const handleViewMember = (memberId: number) => {
    console.log("Navigate to member profile for ID:", memberId);
    // Navigate to member profile page
  };

  const handleSearchTypeChange = (type: "batch" | "member") => {
    setSearchType(type);
    setSearchQuery("");
    setBatchFilter("all");
    setMemberFilter("all");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setBatchFilter("all");
    setMemberFilter("all");
  };

  const hasActiveFilters = searchQuery !== "" || batchFilter !== "all" || memberFilter !== "all";

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Batch Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage your yoga batches and enrolled members</p>
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
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Search and Filter */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Type Toggle */}
          <div className="flex gap-2">
            <Button 
              variant={searchType === "batch" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSearchTypeChange("batch")}
            >
              Search Batches
            </Button>
            <Button 
              variant={searchType === "member" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSearchTypeChange("member")}
            >
              Search Members
            </Button>
          </div>

          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder={searchType === "batch" ? "Search batches..." : "Search members..."}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdown */}
            <Select 
              value={searchType === "batch" ? batchFilter : memberFilter} 
              onValueChange={(value) => {
                if (searchType === "batch") {
                  setBatchFilter(value);
                } else {
                  setMemberFilter(value);
                }
              }}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {searchType === "batch" ? (
                  <>
                    <SelectItem value="all">All Batches</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                    <SelectItem value="beginner">Beginner Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate Level</SelectItem>
                    <SelectItem value="advanced">Advanced Level</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                    <SelectItem value="high-rating">High Rating (4.0+)</SelectItem>
                    <SelectItem value="low-attendance">Low Attendance (&lt;90%)</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {(searchQuery || (searchType === "batch" ? batchFilter !== "all" : memberFilter !== "all")) && (
          <div className="text-sm text-gray-600 mb-4">
            {searchType === "batch" 
              ? `Found ${filteredBatches.length} batch(es)`
              : `Found ${filteredMembers.length} member(s)`
            }
            {searchQuery && ` matching "${searchQuery}"`}
            {(searchType === "batch" ? batchFilter !== "all" : memberFilter !== "all") && 
              ` with applied filters`
            }
          </div>
        )}

        {/* Member Search Results - Table Format */}
        {shouldShowMembers && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Member Search Results</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.age}</TableCell>
                      <TableCell>
                        <div>
                          {member.batchesEnrolled.map((batch, index) => (
                            <div key={batch.id} className={index > 0 ? "mt-1" : ""}>
                              <p className="text-sm font-medium">{batch.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {batch.level}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{member.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{member.attendance}%</span>
                          <Progress value={member.attendance} className="h-2 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.status === "Active" ? "default" : "secondary"}
                          className={member.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewMember(member.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* Batch Cards Grid */}
        {shouldShowBatches && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {searchQuery || batchFilter !== "all" ? "Batch Search Results" : "My Batches"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBatches.map((batch) => (
                <Card key={batch.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Header with Time and Day */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">{batch.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <Clock className="w-4 h-4" />
                            <span>{batch.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{batch.day}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={batch.status === "Active" ? "default" : "secondary"}>
                        {batch.status}
                      </Badge>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Batch Progress</span>
                        <span className="text-sm font-bold text-gray-900">{batch.progress}%</span>
                      </div>
                      <Progress value={batch.progress} className="h-3 mb-1" />
                      <p className="text-xs text-gray-600">
                        {batch.completedSessions} of {batch.totalSessions} sessions completed
                      </p>
                    </div>

                    {/* Session Information */}
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-700">Next Session</span>
                        </div>
                        <p className="text-sm text-green-900 font-medium">{batch.nextSession}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-700">Previous Session</span>
                        </div>
                        <p className="text-sm text-gray-900">{batch.previousSession}</p>
                      </div>
                    </div>

                    {/* Level and Enrollment */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-700">Level</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900">{batch.level}</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-700">Enrollment</span>
                        </div>
                        <p className="text-lg font-bold text-yellow-900">{batch.students}/{batch.capacity}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleViewBatch(batch.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Batch Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {((shouldShowBatches && filteredBatches.length === 0) ||
          (shouldShowMembers && filteredMembers.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              No {searchType === "batch" ? "batches" : "members"} found with the current search and filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
