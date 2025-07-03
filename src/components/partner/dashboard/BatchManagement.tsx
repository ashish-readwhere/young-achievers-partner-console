
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  Clock,
  Eye,
  BookOpen,
  TrendingUp,
  Award,
  Search,
  Filter
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BatchManagementProps {
  onNavigate?: (section: string, id?: number) => void;
}

export function BatchManagement({ onNavigate }: BatchManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const batches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      time: "6:00 PM - 7:00 PM",
      days: "Mon, Wed, Fri",
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
      days: "Tue, Thu",
      students: 10,
      capacity: 12,
      status: "Active",
      progress: 80,
      nextSession: "Tuesday, Jan 16 at 4:00 PM",
      previousSession: "Thursday, Jan 11 at 4:00 PM",
      completedSessions: 16,
      totalSessions: 20
    }
  ];

  // Filter batches based on search query and status filter
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = searchQuery === "" || 
      batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.days.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.time.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && batch.status === "Active") ||
      (statusFilter === "inactive" && batch.status === "Inactive") ||
      (statusFilter === "high-progress" && batch.progress >= 70) ||
      (statusFilter === "low-progress" && batch.progress < 70);
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary stats
  const totalBatches = filteredBatches.length;
  const totalStudents = filteredBatches.reduce((sum, batch) => sum + batch.students, 0);
  const totalCapacity = filteredBatches.reduce((sum, batch) => sum + batch.capacity, 0);
  const averageProgress = filteredBatches.length > 0 ? Math.round(filteredBatches.reduce((sum, batch) => sum + batch.progress, 0) / filteredBatches.length) : 0;
  const completedSessions = filteredBatches.reduce((sum, batch) => sum + batch.completedSessions, 0);

  const handleViewBatchDetails = (batchId: number) => {
    console.log("Navigating to batch details for ID:", batchId);
    if (onNavigate) {
      onNavigate('batch-details', batchId);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const stats = [
    { label: "Total Batches", value: totalBatches.toString(), icon: BookOpen, color: "blue" },
    { label: "Total Students", value: `${totalStudents}/${totalCapacity}`, icon: Users, color: "green" },
    { label: "Average Progress", value: `${averageProgress}%`, icon: TrendingUp, color: "purple" },
    { label: "Sessions Completed", value: completedSessions.toString(), icon: Award, color: "orange" }
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">My Batches</h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">Manage and monitor your active batches</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium text-${stat.color}-600 mb-1 leading-tight`}>{stat.label}</p>
                    <p className={`text-xl font-bold text-${stat.color}-900 leading-tight`}>{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by batch name, time, or days..." 
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
                All Batches
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("high-progress")}>
                High Progress (70%+)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("low-progress")}>
                Low Progress (<70%)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearFilters}>
                Clear All Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-sm text-gray-600">
          <span className="text-blue-600 font-medium">{filteredBatches.length} batches</span> found
          {(searchQuery || statusFilter !== "all") && (
            <span className="ml-1">
              {searchQuery && ` for "${searchQuery}"`}
              {statusFilter !== "all" && ` (${statusFilter})`}
            </span>
          )}
        </div>

        {/* Batch Listing Table */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Batch Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Session</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map((batch) => (
                    <TableRow key={batch.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{batch.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Clock className="w-3 h-3" />
                            <span>{batch.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{batch.days}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {batch.students}/{batch.capacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={batch.progress} className="h-2 w-16" />
                            <span className="text-sm font-medium text-gray-900">{batch.progress}%</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {batch.completedSessions}/{batch.totalSessions} sessions
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={batch.status === "Active" ? "default" : "secondary"} className="bg-gray-800 text-white text-xs">
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-900">{batch.nextSession}</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewBatchDetails(batch.id)}
                          className="flex items-center gap-2 text-xs"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* No Results Message */}
        {filteredBatches.length === 0 && (searchQuery || statusFilter !== "all") && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              No batches found matching your search criteria.
            </p>
            <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
