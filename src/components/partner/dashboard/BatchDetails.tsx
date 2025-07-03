import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  ArrowLeft,
  BookOpen,
  TrendingUp
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BatchDetailsProps {
  onNavigate: (section: string, studentId?: number) => void;
  batchId?: number;
}

export function BatchDetails({ onNavigate, batchId }: BatchDetailsProps) {
  // Mock batch data - in real app, this would be fetched based on batchId
  const batchData = {
    id: batchId || 1,
    name: "Yoga Fundamentals - Batch B",
    time: "6:00 PM - 7:00 PM",
    day: "Monday, Wednesday, Friday",
    level: "Beginner",
    students: 15,
    capacity: 20,
    status: "Active",
    progress: 65,
    completedSessions: 13,
    totalSessions: 20,
    startDate: "December 1, 2024",
    endDate: "February 28, 2025",
    venue: "Talkatora Stadium",
    description: "A comprehensive beginner-friendly yoga program focusing on fundamental poses, breathing techniques, and flexibility."
  };

  const sessions = [
    {
      id: 1,
      sessionNumber: 14,
      date: "Monday, January 15, 2025",
      time: "6:00 PM - 7:00 PM",
      venue: "Talkatora Stadium",
      status: "Upcoming",
      attendees: 14
    },
    {
      id: 2,
      sessionNumber: 13,
      date: "Friday, January 12, 2025",
      time: "6:00 PM - 7:00 PM",
      venue: "Talkatora Stadium",
      status: "Completed",
      attendees: 15
    },
    {
      id: 3,
      sessionNumber: 12,
      date: "Wednesday, January 10, 2025",
      time: "6:00 PM - 7:00 PM",
      venue: "Talkatora Stadium",
      status: "Completed",
      attendees: 13
    }
  ];

  const enrolledStudents = [
    {
      id: 1,
      name: "Emma Johnson",
      age: 16,
      email: "emma.j@email.com",
      phone: "+1 234-567-8901",
      joinDate: "December 1, 2024",
      attendance: 95,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 2,
      name: "Sarah Williams",
      age: 15,
      email: "sarah.w@email.com",
      phone: "+1 234-567-8902",
      joinDate: "December 1, 2024",
      attendance: 88,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    },
    {
      id: 3,
      name: "Mike Chen",
      age: 17,
      email: "mike.c@email.com",
      phone: "+1 234-567-8903",
      joinDate: "December 5, 2024",
      attendance: 92,
      status: "Active",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
    }
  ];

  const handleStudentClick = (studentId: number) => {
    console.log("Navigate to student profile for ID:", studentId);
    onNavigate('student-profile', studentId);
  };

  const handleSessionClick = (sessionId: number) => {
    console.log("Navigate to session attendance for ID:", sessionId);
    onNavigate('session-attendance', sessionId);
  };

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
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">{batchData.name}</h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">{batchData.description}</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Batch Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Batch Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Enrollment</span>
                </div>
                <p className="text-xl font-bold text-blue-900">{batchData.students}/{batchData.capacity}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Progress</span>
                </div>
                <p className="text-xl font-bold text-green-900">{batchData.progress}%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Sessions</span>
                </div>
                <p className="text-xl font-bold text-purple-900">{batchData.completedSessions}/{batchData.totalSessions}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Schedule</span>
                </div>
                <p className="text-sm font-bold text-orange-900">{batchData.day}</p>
                <p className="text-xs text-orange-700">{batchData.time}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Batch Progress</span>
                <span className="font-medium text-gray-900">{batchData.progress}%</span>
              </div>
              <Progress value={batchData.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Start Date</p>
                <p className="font-medium text-gray-900">{batchData.startDate}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">End Date</p>
                <p className="font-medium text-gray-900">{batchData.endDate}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Venue</p>
                <p className="font-medium text-gray-900">{batchData.venue}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Level</p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {batchData.level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.map((session) => (
                <div 
                  key={session.id} 
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSessionClick(session.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          Session #{session.sessionNumber}
                        </h4>
                        <Badge 
                          variant={session.status === "Upcoming" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{session.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Students */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Enrolled Students ({enrolledStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledStudents.map((student) => (
                    <TableRow 
                      key={student.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleStudentClick(student.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                            <p className="text-xs text-gray-600">Age: {student.age}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-900">{student.joinDate}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={student.attendance} className="h-2 w-16" />
                          <span className="text-sm font-medium text-gray-900 w-10">{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                          {student.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
