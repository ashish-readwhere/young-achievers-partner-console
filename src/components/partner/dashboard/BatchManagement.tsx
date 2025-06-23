import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  MessageSquare,
  Search,
  Grid3X3
} from "lucide-react";
import { BatchDetailsModal } from "./BatchDetailsModal";
import RescheduleModal from "./RescheduleModal";
import { FeedbackModal } from "./FeedbackModal";

export function BatchManagement() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllBatches, setShowAllBatches] = useState(false);

  // Mock data for current partner (Yoga instructor)
  const partnerName = "Instructor Sarah Wilson";
  const partnerSubject = "Yoga";
  
  const partnerBatches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      teacher: "Instructor Sarah Wilson",
      level: "Beginner",
      students: 18,
      maxStudents: 25,
      schedule: "Tue, Thu - 2:00 PM",
      venue: "Noida Stadium",
      spot: "Practice Area",
      status: "Active",
      nextSession: "1/16/2024",
      nextSessionTime: "02:00 PM",
      lastSession: "1/11/2024",
      lastSessionTime: "02:00 PM",
      capacity: 72,
      completedSessions: 7,
      totalSessions: 10,
      icon: "🧘‍♀️"
    },
    {
      id: 2,
      name: "Yoga Advanced - Batch A",
      teacher: "Instructor Sarah Wilson",
      level: "Advanced",
      students: 15,
      maxStudents: 20,
      schedule: "Mon, Wed, Fri - 10:00 AM",
      venue: "Talkatora Stadium",
      spot: "Yoga Area",
      status: "Active",
      nextSession: "1/15/2024",
      nextSessionTime: "10:00 AM",
      lastSession: "1/12/2024",
      lastSessionTime: "10:00 AM",
      capacity: 75,
      completedSessions: 8,
      totalSessions: 12,
      icon: "🧘‍♀️"
    },
    {
      id: 3,
      name: "Yoga Intermediate - Batch C",
      teacher: "Instructor Sarah Wilson",
      level: "Intermediate",
      students: 22,
      maxStudents: 30,
      schedule: "Wed, Fri - 4:00 PM",
      venue: "Sports Complex",
      spot: "Hall A",
      status: "Active",
      nextSession: "1/17/2024",
      nextSessionTime: "04:00 PM",
      lastSession: "1/12/2024",
      lastSessionTime: "04:00 PM",
      capacity: 73,
      completedSessions: 5,
      totalSessions: 8,
      icon: "🧘‍♀️"
    },
    {
      id: 4,
      name: "Morning Yoga - Batch D",
      teacher: "Instructor Sarah Wilson",
      level: "Beginner",
      students: 12,
      maxStudents: 20,
      schedule: "Mon, Tue - 7:00 AM",
      venue: "City Park",
      spot: "Open Ground",
      status: "Active",
      nextSession: "1/15/2024",
      nextSessionTime: "07:00 AM",
      lastSession: "1/09/2024",
      lastSessionTime: "07:00 AM",
      capacity: 60,
      completedSessions: 4,
      totalSessions: 12,
      icon: "🧘‍♀️"
    }
  ];

  // Filter batches based on search term
  const filteredBatches = partnerBatches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show only first 2 batches unless "View All" is clicked
  const displayedBatches = showAllBatches ? filteredBatches : filteredBatches.slice(0, 2);

  const upcomingSessions = [
    {
      id: 1,
      title: "Yoga Fundamentals - Session 8",
      date: "Jan 16, 2024",
      time: "2:00 PM",
      venue: "Noida Stadium - Practice Area",
      batchName: "Yoga Fundamentals - Batch B",
      students: 18,
      status: "Upcoming",
      batchId: 1
    },
    {
      id: 2,
      title: "Yoga Advanced - Session 9",
      date: "Jan 15, 2024",
      time: "10:00 AM",
      venue: "Talkatora Stadium - Yoga Area",
      batchName: "Yoga Advanced - Batch A",
      students: 15,
      status: "Upcoming",
      batchId: 2
    }
  ];

  const handleViewDetails = (batch: any) => {
    console.log("Opening details for batch:", batch);
    setSelectedBatch(batch);
    setIsDetailsModalOpen(true);
  };

  const handleViewSessionDetails = (sessionId: number) => {
    console.log("Opening session details for session ID:", sessionId);
    const session = upcomingSessions.find(s => s.id === sessionId);
    if (session) {
      const relatedBatch = partnerBatches.find(b => b.id === session.batchId);
      if (relatedBatch) {
        setSelectedBatch(relatedBatch);
        setIsDetailsModalOpen(true);
      }
    }
  };

  const handleReschedule = (batch: any) => {
    console.log("Opening reschedule for batch:", batch);
    setSelectedBatch(batch);
    setIsRescheduleModalOpen(true);
  };

  const handleFeedback = (batch: any) => {
    console.log("Opening feedback for batch:", batch);
    setSelectedBatch(batch);
    setIsFeedbackModalOpen(true);
  };

  const handleRescheduleConfirm = (batchId: string, newDate: Date, newTime: string, reason: string) => {
    console.log("Rescheduling batch:", batchId, "to:", newDate, newTime, "Reason:", reason);
    // Here you would typically send the reschedule request to the admin
    // For now, we'll just log it
  };

  const handleFeedbackSubmit = (feedback: string, rating: number) => {
    console.log("Submitting feedback:", feedback, rating);
    // Here you would typically save the feedback
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-8 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Batch Management</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your {partnerSubject} batches and sessions</p>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600 mb-1">My Active Batches</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">{partnerBatches.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                  🧘‍♀️
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-green-50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-green-600 mb-1">Total Students</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-900">
                    {partnerBatches.reduce((sum, batch) => sum + batch.students, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-purple-50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-purple-600 mb-1">Upcoming Sessions</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-900">{upcomingSessions.length}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-orange-50">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-orange-600 mb-1">Completed Sessions</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-900">
                    {partnerBatches.reduce((sum, batch) => sum + batch.completedSessions, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and View All Section */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 items-start justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {filteredBatches.length > 2 && (
              <Button
                variant="outline"
                onClick={() => setShowAllBatches(!showAllBatches)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Grid3X3 className="w-4 h-4" />
                {showAllBatches ? "Show Less" : `View All (${filteredBatches.length})`}
              </Button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              {filteredBatches.length} batch{filteredBatches.length !== 1 ? 'es' : ''} found
            </p>
          )}
        </div>

        {/* Batch Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {displayedBatches.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No batches found matching your search.</p>
            </div>
          ) : (
            displayedBatches.map((batch) => {
              const progressPercentage = Math.round((batch.completedSessions / batch.totalSessions) * 100);
              
              return (
                <Card key={batch.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="text-2xl flex-shrink-0">{batch.icon}</div>
                        <div className="min-w-0">
                          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            {batch.name}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                            Teacher: {batch.teacher}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Level: {batch.level}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={batch.status === "Active" ? "default" : "secondary"}
                        className={`${batch.status === "Active" ? "bg-green-100 text-green-800" : ""} flex-shrink-0`}
                      >
                        {batch.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Student Count and Schedule */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-blue-600">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold text-sm">{batch.students}/{batch.maxStudents}</span>
                            <span className="text-xs text-gray-600">students</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">{batch.schedule}</span>
                        </div>
                      </div>

                      {/* Batch Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Batch Progress</span>
                          <span className="text-sm font-medium">
                            {batch.completedSessions}/{batch.totalSessions} sessions ({progressPercentage}%)
                          </span>
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className={`h-2 ${
                            progressPercentage >= 80 ? '[&>div]:bg-green-500' : 
                            progressPercentage >= 50 ? '[&>div]:bg-blue-500' : 
                            '[&>div]:bg-gray-400'
                          }`}
                        />
                      </div>

                      {/* Sessions Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Next Session */}
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600 mb-1 font-medium">Next Session</p>
                          <div>
                            <p className="font-medium text-blue-900 text-sm">{batch.nextSession}</p>
                            <p className="text-sm text-blue-700">
                              {batch.nextSessionTime}
                            </p>
                            <p className="text-xs text-blue-600 mt-1 truncate">{batch.venue} - {batch.spot}</p>
                          </div>
                        </div>

                        {/* Last Session */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1 font-medium">Last Session</p>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{batch.lastSession}</p>
                            <p className="text-sm text-gray-700">
                              {batch.lastSessionTime}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 truncate">{batch.venue} - {batch.spot}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                          onClick={() => handleViewDetails(batch)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs sm:text-sm"
                          onClick={() => handleReschedule(batch)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Reschedule
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 text-xs sm:text-sm"
                          onClick={() => handleFeedback(batch)}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Feedback
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Upcoming Sessions Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Session</th>
                      <th className="py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Date & Time</th>
                      <th className="py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Venue</th>
                      <th className="py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Students</th>
                      <th className="py-3 px-2 sm:px-4 font-medium text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingSessions.map((session) => (
                      <tr key={session.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 sm:px-4">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{session.title}</p>
                            <p className="text-xs text-gray-600">{session.batchName}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{session.date} at {session.time}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm truncate max-w-[150px]">{session.venue}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          <span className="font-medium text-sm">{session.students}</span>
                        </td>
                        <td className="py-3 px-2 sm:px-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewSessionDetails(session.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <BatchDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        batch={selectedBatch}
      />

      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        onReschedule={handleRescheduleConfirm}
        batch={selectedBatch}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        batch={selectedBatch}
      />
    </div>
  );
}
