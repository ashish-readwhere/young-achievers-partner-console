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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BatchManagementProps {
  onNavigate?: (section: string, id?: number) => void;
}

export function BatchManagement({ onNavigate }: BatchManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [scheduleFilter, setScheduleFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All");

  console.log("BatchManagement component rendering with program filter:", programFilter);

  const batches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      program: "Yoga",
      time: "6:00 PM - 7:00 PM",
      days: "Mon, Wed, Fri",
      members: 15,
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
      program: "Yoga",
      time: "4:00 PM - 5:00 PM",
      days: "Tue, Thu",
      members: 10,
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
      name: "Chess Beginner - Batch A",
      program: "Chess",
      time: "3:00 PM - 4:00 PM",
      days: "Mon, Wed",
      members: 8,
      capacity: 15,
      status: "Active",
      progress: 45,
      nextSession: "Monday, Jan 15 at 3:00 PM",
      previousSession: "Wednesday, Jan 10 at 3:00 PM",
      completedSessions: 9,
      totalSessions: 20
    },
    {
      id: 4,
      name: "Chess Advanced - Batch B",
      program: "Chess",
      time: "5:00 PM - 6:00 PM",
      days: "Tue, Thu, Sat",
      members: 12,
      capacity: 15,
      status: "Active",
      progress: 60,
      nextSession: "Tuesday, Jan 16 at 5:00 PM",
      previousSession: "Saturday, Jan 13 at 5:00 PM",
      completedSessions: 12,
      totalSessions: 20
    }
  ];

  // Get unique programs for filter options
  const availablePrograms = [...new Set(batches.map(batch => batch.program))];

  // Filter batches based on search and filters
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || batch.status === statusFilter;
    const matchesProgram = programFilter === "All" || batch.program === programFilter;
    const matchesSchedule = scheduleFilter === "All" || 
      (scheduleFilter === "Weekdays" && !batch.days.includes("Sat") && !batch.days.includes("Sun")) ||
      (scheduleFilter === "Weekends" && (batch.days.includes("Sat") || batch.days.includes("Sun"))) ||
      (scheduleFilter === "Daily" && batch.days.split(", ").length >= 5) ||
      (scheduleFilter === "3x Week" && batch.days.split(", ").length === 3) ||
      (scheduleFilter === "2x Week" && batch.days.split(", ").length === 2);
    
    return matchesSearch && matchesStatus && matchesProgram && matchesSchedule;
  });

  // Calculate summary stats from filtered batches
  const totalBatches = filteredBatches.length;
  const totalMembers = filteredBatches.reduce((sum, batch) => sum + batch.members, 0);
  const totalCapacity = filteredBatches.reduce((sum, batch) => sum + batch.capacity, 0);
  const averageProgress = filteredBatches.length > 0 
    ? Math.round(filteredBatches.reduce((sum, batch) => sum + batch.progress, 0) / filteredBatches.length)
    : 0;
  const completedSessions = filteredBatches.reduce((sum, batch) => sum + batch.completedSessions, 0);

  const handleViewBatchDetails = (batchId: number) => {
    console.log("Navigating to batch details for ID:", batchId);
    if (onNavigate) {
      onNavigate('batch-details', batchId);
    }
  };

  const stats = [
    { label: "Total Batches", value: totalBatches.toString(), icon: BookOpen, color: "blue" },
    { label: "Total Members", value: `${totalMembers}/${totalCapacity}`, icon: Users, color: "green" },
    { label: "Average Progress", value: `${averageProgress}%`, icon: TrendingUp, color: "purple" },
    { label: "Sessions Completed", value: completedSessions.toString(), icon: Award, color: "orange" }
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setScheduleFilter("All");
    setProgramFilter("All");
  };

  const getProgramColor = (program: string) => {
    switch (program.toLowerCase()) {
      case 'yoga':
        return 'bg-green-100 text-green-700';
      case 'chess':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

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

        {/* Search and Filter Section */}
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search batches by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex gap-2 flex-wrap">
                {/* Program Filter - Make sure it's first and visible */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white border-gray-300">
                      <Filter className="w-4 h-4" />
                      Program: {programFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem onClick={() => setProgramFilter("All")} className="hover:bg-gray-100">
                      All Programs
                    </DropdownMenuItem>
                    {availablePrograms.map((program) => (
                      <DropdownMenuItem key={program} onClick={() => setProgramFilter(program)} className="hover:bg-gray-100">
                        {program}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white border-gray-300">
                      <Filter className="w-4 h-4" />
                      Status: {statusFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem onClick={() => setStatusFilter("All")} className="hover:bg-gray-100">All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Active")} className="hover:bg-gray-100">Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Completed")} className="hover:bg-gray-100">Completed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Paused")} className="hover:bg-gray-100">Paused</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white border-gray-300">
                      <Calendar className="w-4 h-4" />
                      Schedule: {scheduleFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem onClick={() => setScheduleFilter("All")} className="hover:bg-gray-100">All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setScheduleFilter("Weekdays")} className="hover:bg-gray-100">Weekdays</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setScheduleFilter("Weekends")} className="hover:bg-gray-100">Weekends</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setScheduleFilter("Daily")} className="hover:bg-gray-100">Daily</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setScheduleFilter("3x Week")} className="hover:bg-gray-100">3x Week</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setScheduleFilter("2x Week")} className="hover:bg-gray-100">2x Week</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {(searchTerm || statusFilter !== "All" || scheduleFilter !== "All" || programFilter !== "All") && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter !== "All" || scheduleFilter !== "All" || programFilter !== "All") && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                  {programFilter !== "All" && (
                    <Badge variant="secondary" className="text-xs">
                      Program: {programFilter}
                    </Badge>
                  )}
                  {statusFilter !== "All" && (
                    <Badge variant="secondary" className="text-xs">
                      Status: {statusFilter}
                    </Badge>
                  )}
                  {scheduleFilter !== "All" && (
                    <Badge variant="secondary" className="text-xs">
                      Schedule: {scheduleFilter}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Batch Listing Table */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              Batch Listing {filteredBatches.length !== batches.length && `(${filteredBatches.length} of ${batches.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBatches.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No batches found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== "All" || scheduleFilter !== "All" || programFilter !== "All"
                    ? "Try adjusting your search or filter criteria."
                    : "You don't have any batches yet."}
                </p>
                {(searchTerm || statusFilter !== "All" || scheduleFilter !== "All" || programFilter !== "All") && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Members</TableHead>
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
                          <Badge className={`text-xs ${getProgramColor(batch.program)}`}>
                            {batch.program}
                          </Badge>
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
                              {batch.members}/{batch.capacity}
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
