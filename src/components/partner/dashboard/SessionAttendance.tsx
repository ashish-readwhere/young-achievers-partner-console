import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  User,
  Search
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SessionAttendanceProps {
  onNavigate: (section: string, id?: number) => void;
  sessionId?: number;
}

export function SessionAttendance({ onNavigate, sessionId }: SessionAttendanceProps) {
  const { toast } = useToast();
  
  // Mock session data
  const sessionData = {
    id: sessionId || 1,
    sessionNumber: 14,
    date: "Monday, January 15, 2025",
    time: "6:00 PM - 7:00 PM",
    venue: "Talkatora Stadium",
    status: "Upcoming",
    batchName: "Yoga Fundamentals - Batch B"
  };

  // Mock students with attendance status
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emma Johnson",
      age: 16,
      email: "emma.j@email.com",
      phone: "+1 234-567-8901",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png",
      attendance: "present" as "present" | "absent" | "not_marked"
    },
    {
      id: 2,
      name: "Sarah Williams",
      age: 15,
      email: "sarah.w@email.com",
      phone: "+1 234-567-8902",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png",
      attendance: "present" as "present" | "absent" | "not_marked"
    },
    {
      id: 3,
      name: "Mike Chen",
      age: 17,
      email: "mike.c@email.com",
      phone: "+1 234-567-8903",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png",
      attendance: "absent" as "present" | "absent" | "not_marked"
    },
    {
      id: 4,
      name: "Lisa Wang",
      age: 16,
      email: "lisa.w@email.com",
      phone: "+1 234-567-8904",
      avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png",
      attendance: "not_marked" as "present" | "absent" | "not_marked"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleAttendanceChange = (studentId: number, status: "present" | "absent") => {
    const student = students.find(s => s.id === studentId);
    const studentName = student?.name || "Student";
    
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, attendance: status }
        : student
    ));

    // Show confirmation toast
    toast({
      title: "Attendance Marked",
      description: `${studentName} has been marked as ${status}`,
      duration: 3000,
    });
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, attendance: "present" as const })));
    
    toast({
      title: "Attendance Updated",
      description: "All students have been marked as present",
      duration: 3000,
    });
  };

  const handleMarkAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, attendance: "absent" as const })));
    
    toast({
      title: "Attendance Updated", 
      description: "All students have been marked as absent",
      duration: 3000,
    });
  };

  const getAttendanceStats = () => {
    const present = students.filter(s => s.attendance === "present").length;
    const absent = students.filter(s => s.attendance === "absent").length;
    const notMarked = students.filter(s => s.attendance === "not_marked").length;
    return { present, absent, notMarked, total: students.length };
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = getAttendanceStats();

  const handleStudentClick = (studentId: number) => {
    console.log("Navigate to student profile for ID:", studentId);
    onNavigate('student-profile', studentId);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('batch-details')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Batch Details
          </Button>
        </div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
          Session #{sessionData.sessionNumber} Attendance
        </h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">{sessionData.batchName}</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Session Info */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Session Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{sessionData.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{sessionData.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{sessionData.venue}</span>
              </div>
            </div>
            <Badge variant={sessionData.status === "Upcoming" ? "default" : "secondary"}>
              {sessionData.status}
            </Badge>
          </CardContent>
        </Card>

        {/* Attendance Stats */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                <p className="text-sm text-blue-600">Total Students</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-900">{stats.present}</p>
                <p className="text-sm text-green-600">Present</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
                <p className="text-sm text-red-600">Absent</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">{stats.notMarked}</p>
                <p className="text-sm text-gray-600">Not Marked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleMarkAllPresent}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Present
              </Button>
              <Button
                onClick={handleMarkAllAbsent}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                size="sm"
              >
                <X className="w-4 h-4 mr-2" />
                Mark All Absent
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Attendance List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base font-semibold text-gray-900">Student Attendance</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
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
                          <p className="text-xs text-gray-600 truncate">{student.email}</p>
                          <p className="text-xs text-gray-600">{student.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            student.attendance === "present" ? "default" :
                            student.attendance === "absent" ? "destructive" : "secondary"
                          }
                          className={
                            student.attendance === "present" ? "bg-green-100 text-green-700" :
                            student.attendance === "absent" ? "bg-red-100 text-red-700" : 
                            "bg-gray-100 text-gray-700"
                          }
                        >
                          {student.attendance === "present" ? "Present" :
                           student.attendance === "absent" ? "Absent" : "Not Marked"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, "present")}
                            className={`h-8 px-3 ${
                              student.attendance === "present" 
                                ? "bg-green-600 text-white" 
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAttendanceChange(student.id, "absent")}
                            className={`h-8 px-3 ${
                              student.attendance === "absent" 
                                ? "bg-red-600 text-white" 
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStudentClick(student.id)}
                            className="h-8 px-3"
                          >
                            <User className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No students found matching "{searchTerm}"
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
