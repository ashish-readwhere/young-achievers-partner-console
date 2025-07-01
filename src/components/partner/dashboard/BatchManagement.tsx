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
  Users,
  Clock,
  Calendar,
  Eye,
  User,
  Mail,
  Phone,
  Star,
  Trophy
} from "lucide-react";
import { BatchDetailsModal } from "./BatchDetailsModal";

interface Batch {
  id: number;
  name: string;
  time: string;
  day: string;
  level: string;
  students: number;
  capacity: number;
  status: string;
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

interface Stat {
  label: string;
  value: string;
  change: string;
  color: string;
}

export function BatchManagement() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"batch" | "member">("batch");

  const batches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      time: "6:00 PM - 7:00 PM",
      day: "Mon, Wed, Fri",
      level: "Beginner",
      students: 15,
      capacity: 20,
      status: "Active"
    },
    {
      id: 2,
      name: "Yoga Advanced - Batch A",
      time: "4:00 PM - 5:00 PM",
      day: "Tue, Thu",
      level: "Advanced",
      students: 10,
      capacity: 12,
      status: "Active"
    },
    {
      id: 3,
      name: "Yoga Intermediate - Batch C",
      time: "7:30 PM - 8:30 PM",
      day: "Mon, Wed",
      level: "Intermediate",
      students: 12,
      capacity: 15,
      status: "Inactive"
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
      joinDate: "Dec 1, 2024",
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
      joinDate: "Dec 5, 2024",
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
      joinDate: "Nov 15, 2024",
      status: "Active",
      attendance: 87,
      rating: 4.0,
      achievements: ["Consistent Performer"],
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  // Filter data based on search
  const filteredBatches = batches.filter(batch =>
    searchType === "batch" && batch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    searchType === "member" && member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shouldShowBatches = searchType === "batch" || searchQuery === "";
  const shouldShowMembers = searchType === "member" && searchQuery !== "";

  const stats = [
    { 
      label: "Total Batches", 
      value: batches.length.toString(), 
      change: "+1 this week",
      color: "blue"
    },
    { 
      label: "Active Batches", 
      value: batches.filter(b => b.status === "Active").length.toString(), 
      change: "-1 this week",
      color: "green"
    },
    { 
      label: "Total Enrollment", 
      value: batches.reduce((sum, b) => sum + b.students, 0).toString(), 
      change: "+5% vs last month",
      color: "purple"
    },
    { 
      label: "Avg Batch Capacity", 
      value: Math.round(batches.reduce((sum, b) => sum + b.capacity, 0) / batches.length).toString(), 
      change: "No change",
      color: "orange"
    }
  ];

  const handleViewBatch = (batch: any) => {
    console.log("View Batch clicked for:", batch.name);
    setSelectedBatch(batch);
    setShowBatchModal(true);
  };

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

        {/* Enhanced Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <Button 
              variant={searchType === "batch" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSearchType("batch");
                setSearchQuery("");
              }}
            >
              Search Batches
            </Button>
            <Button 
              variant={searchType === "member" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSearchType("member");
                setSearchQuery("");
              }}
            >
              Search Members
            </Button>
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder={searchType === "batch" ? "Search batches..." : "Search members..."}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-sm text-gray-600 mb-4">
            {searchType === "batch" 
              ? `Found ${filteredBatches.length} batch(es) matching "${searchQuery}"`
              : `Found ${filteredMembers.length} member(s) matching "${searchQuery}"`
            }
          </div>
        )}

        {/* Member Search Results */}
        {shouldShowMembers && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Member Search Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="border-blue-200 bg-blue-25 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Member Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
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
                          <p className="text-sm text-gray-600">Age {member.age} • Joined {member.joinDate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Batch Enrollment Info */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Enrolled Batches:</h4>
                      <div className="space-y-2">
                        {member.batchesEnrolled.map((batch) => (
                          <div key={batch.id} className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{batch.name}</p>
                                <p className="text-sm text-gray-600">Level: {batch.level}</p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                {batch.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
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

                    {/* Contact Information */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Contact Information</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span>Parent: {member.parentPhone}</span>
                        </div>
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

                    {/* Action Button */}
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Batch Cards Grid */}
        {shouldShowBatches && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {searchQuery ? "Batch Search Results" : "My Batches"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(searchQuery ? filteredBatches : batches).map((batch) => (
                <Card key={batch.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {/* Header with Time and Day */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">{batch.name}</CardTitle>
                          <p className="text-sm text-gray-600">{batch.time}</p>
                          <p className="text-sm text-gray-600">{batch.day}</p>
                        </div>
                      </div>
                      <Badge variant={batch.status === "Active" ? "default" : "secondary"}>
                        {batch.status}
                      </Badge>
                    </div>

                    {/* Level and Enrollment */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-purple-700 mb-1">Level</p>
                        <p className="text-lg font-bold text-purple-900">{batch.level}</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-yellow-700 mb-1">Enrollment</p>
                        <p className="text-lg font-bold text-yellow-900">{batch.students}/{batch.capacity}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleViewBatch(batch)}>
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
        {searchQuery && (
          (searchType === "batch" && filteredBatches.length === 0) ||
          (searchType === "member" && filteredMembers.length === 0)
        ) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              No {searchType === "batch" ? "batches" : "members"} found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <BatchDetailsModal
        isOpen={showBatchModal}
        onClose={() => {
          setShowBatchModal(false);
          setSelectedBatch(null);
        }}
        batch={selectedBatch}
      />
    </div>
  );
}
