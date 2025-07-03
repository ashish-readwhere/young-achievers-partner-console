
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
  User,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  MessageSquare
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SessionDetailsProps {
  onNavigate: (section: string, id?: number) => void;
  sessionId?: number;
}

export function SessionDetails({ onNavigate, sessionId }: SessionDetailsProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for all sessions
  const allSessions = [
    {
      id: 1,
      sessionNumber: 14,
      title: "Yoga Advanced - Session 14",
      date: "Monday, January 15, 2025",
      time: "6:00 PM - 7:00 PM",
      venue: "Talkatora Stadium",
      status: "Upcoming",
      batchName: "Yoga Advanced - Batch A",
      batchId: 2,
      students: 15,
      attendanceRate: null,
      instructor: "Sarah Wilson",
      notes: "Focus on advanced breathing techniques and balance poses. Ensure all students have proper mats and blocks.",
      materials: ["Yoga mats", "Blocks", "Straps", "Bolsters"],
      previousNotes: "Students showed great improvement in flexibility. Need to work more on core strength."
    },
    {
      id: 2,
      sessionNumber: 13,
      title: "Yoga Fundamentals - Session 13",
      date: "Tuesday, January 16, 2025", 
      time: "4:00 PM - 5:00 PM",
      venue: "Noida Stadium",
      status: "Upcoming",
      batchName: "Yoga Fundamentals - Batch B",
      batchId: 1,
      students: 18,
      attendanceRate: null,
      instructor: "Sarah Wilson",
      notes: "Introduction to Sun Salutation sequences. Take it slow for beginners.",
      materials: ["Yoga mats", "Water bottles", "Towels"],
      previousNotes: "Good energy in the class. Some students need more guidance on posture alignment."
    },
    {
      id: 3,
      sessionNumber: 12,
      title: "Yoga Advanced - Session 12",
      date: "Thursday, January 11, 2025",
      time: "6:00 PM - 7:00 PM", 
      venue: "Talkatora Stadium",
      status: "Completed",
      batchName: "Yoga Advanced - Batch A",
      batchId: 2,
      students: 15,
      attendanceRate: 87,
      instructor: "Sarah Wilson",
      notes: "Completed session focused on backbends and hip openers.",
      materials: ["Yoga mats", "Blocks", "Straps"],
      previousNotes: "Excellent participation. Students are ready for more challenging poses."
    },
    {
      id: 4,
      sessionNumber: 11,
      title: "Yoga Fundamentals - Session 11", 
      date: "Wednesday, January 10, 2025",
      time: "4:00 PM - 5:00 PM",
      venue: "Noida Stadium", 
      status: "Completed",
      batchName: "Yoga Fundamentals - Batch B",
      batchId: 1,
      students: 18,
      attendanceRate: 94,
      instructor: "Sarah Wilson",
      notes: "Great session on basic standing poses and alignment.",
      materials: ["Yoga mats", "Blocks"],
      previousNotes: "Students are improving steadily. Focus on breathing techniques next time."
    },
    {
      id: 5,
      sessionNumber: 10,
      title: "Yoga Advanced - Session 10",
      date: "Monday, January 8, 2025",
      time: "6:00 PM - 7:00 PM",
      venue: "Talkatora Stadium",
      status: "Cancelled",
      batchName: "Yoga Advanced - Batch A", 
      batchId: 2,
      students: 15,
      attendanceRate: null,
      instructor: "Sarah Wilson",
      notes: "Session cancelled due to venue unavailability. Rescheduled for next week.",
      materials: [],
      previousNotes: "Students were notified in advance. Make-up session scheduled."
    }
  ];

  // If sessionId is provided, show details for that specific session
  const selectedSession = sessionId ? allSessions.find(s => s.id === sessionId) : null;

  const filteredSessions = allSessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSessionClick = (session: any) => {
    console.log("Navigate to session attendance for ID:", session.id);
    onNavigate('session-attendance', session.id);
  };

  const handleBatchClick = (batchId: number) => {
    console.log("Navigate to batch details for ID:", batchId);
    onNavigate('batch-details', batchId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "Upcoming":
        return <Clock className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // If showing specific session details
  if (selectedSession) {
    return (
      <div className="w-full bg-white min-h-screen">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('session-details')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Sessions
            </Button>
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
            {selectedSession.title}
          </h1>
          <p className="text-sm text-gray-600 mt-1 leading-tight">{selectedSession.batchName}</p>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Session Details Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">Session Information</CardTitle>
                <Badge className={getStatusColor(selectedSession.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(selectedSession.status)}
                    {selectedSession.status}
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{selectedSession.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{selectedSession.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{selectedSession.venue}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{selectedSession.students} Students</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">Instructor: {selectedSession.instructor}</span>
                  </div>
                  {selectedSession.attendanceRate && (
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">Attendance: {selectedSession.attendanceRate}%</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Session Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => handleSessionClick(selectedSession)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Attendance
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleBatchClick(selectedSession.batchId)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Batch Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Session Notes */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Current Session Notes</h4>
                      <p className="text-sm text-gray-700">{selectedSession.notes}</p>
                    </div>
                  </div>
                </div>
                {selectedSession.previousNotes && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Previous Session Feedback</h4>
                        <p className="text-sm text-gray-700">{selectedSession.previousNotes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Required Materials */}
          {selectedSession.materials.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-gray-900">Required Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedSession.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-900">{material}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Session Resources */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-900">Session Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-900">Session Plan PDF</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-900">Attendance Sheet</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show all sessions view
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('overview')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
          All Sessions
        </h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">Manage and view all your teaching sessions</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Session Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">{allSessions.length}</p>
                <p className="text-sm text-blue-600">Total Sessions</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-green-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-900">
                  {allSessions.filter(s => s.status === "Completed").length}
                </p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-yellow-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-900">
                  {allSessions.filter(s => s.status === "Upcoming").length}
                </p>
                <p className="text-sm text-yellow-600">Upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-red-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-900">
                  {allSessions.filter(s => s.status === "Cancelled").length}
                </p>
                <p className="text-sm text-red-600">Cancelled</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base font-semibold text-gray-900">Sessions List</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  New Session
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{session.title}</p>
                          <p className="text-xs text-gray-600">Session #{session.sessionNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-sm"
                          onClick={() => handleBatchClick(session.batchId)}
                        >
                          {session.batchName}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{session.date}</p>
                          <p className="text-xs text-gray-600">{session.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-900">{session.venue}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{session.students}</p>
                          {session.attendanceRate && (
                            <p className="text-xs text-gray-600">{session.attendanceRate}% attended</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(session.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(session.status)}
                            {session.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onNavigate('session-details', session.id)}
                            className="h-8 px-3"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSessionClick(session)}
                            className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Users className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSessions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No sessions found matching "{searchTerm}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
