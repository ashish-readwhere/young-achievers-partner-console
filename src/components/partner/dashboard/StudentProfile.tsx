import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  Trophy,
  Users,
  Clock,
  ArrowLeft
} from "lucide-react";
import { RatingModal } from "./RatingModal";

interface StudentBatch {
  id: number;
  name: string;
  level: string;
  venue: string;
  spot: string;
  schedule: string;
  teacher: string;
  status: "Active" | "Completed" | "Paused";
  enrolledDate: string;
  sessionsAttended: number;
  totalSessions: number;
  attendance: number;
}

interface StudentProfileProps {
  onNavigate: (section: string) => void;
  studentId?: number;
}

export function StudentProfile({ onNavigate, studentId }: StudentProfileProps) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [studentToRate, setStudentToRate] = useState<any>(null);

  // Mock student data - in real app, this would be fetched based on studentId
  const student = {
    id: studentId || 1,
    name: "Sarah Williams",
    age: 16,
    email: "sarah.williams@email.com",
    phone: "+1 (555) 123-4567",
    parentPhone: "+1 (555) 123-4500",
    parentEmail: "parent.sarah@email.com",
    joinDate: "Monday, Dec 1, 2024",
    status: "Active",
    attendance: 95,
    rating: 4.5,
    batchesEnrolled: 2,
    achievements: ["Flexibility Master", "Best Student", "Regular Attendee"],
    avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
  };

  // Mock batch enrollment data for the student
  const studentBatches: StudentBatch[] = [
    {
      id: 1,
      name: "Yoga Advanced",
      level: "Advanced",
      venue: "Noida Stadium",
      spot: "Yoga Area",
      schedule: "Mon, Wed, Fri - 4:00 PM",
      teacher: "Instructor Sarah Wilson",
      status: "Active",
      enrolledDate: "Monday, Dec 1, 2024",
      sessionsAttended: 18,
      totalSessions: 20,
      attendance: 90
    },
    {
      id: 2,
      name: "Yoga Fundamentals",
      level: "Beginner",
      venue: "Talkatora Stadium",
      spot: "Yoga Area",
      schedule: "Tue, Thu - 6:00 PM",
      teacher: "Instructor Sarah Wilson",
      status: "Completed",
      enrolledDate: "Friday, Nov 1, 2024",
      sessionsAttended: 24,
      totalSessions: 24,
      attendance: 100
    }
  ];

  const handleRateStudent = () => {
    console.log("Rate Student clicked for ID:", student.id);
    setStudentToRate({
      id: student.id,
      name: student.name,
      avatar: student.avatar
    });
    setShowRatingModal(true);
  };

  const closeRatingModal = () => {
    console.log("Closing rating modal");
    setShowRatingModal(false);
    setStudentToRate(null);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('batches')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Batch Management
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-600">Age {student.age} • Member since {student.joinDate}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {student.status}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{student.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Student Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{student.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Parent/Guardian Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{student.parentEmail}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{student.parentPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Overall Attendance</p>
                  <p className="text-3xl font-bold text-blue-900">{student.attendance}%</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 mb-1">Current Rating</p>
                  <p className="text-3xl font-bold text-yellow-900">{student.rating}/5</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Batches Enrolled</p>
                  <p className="text-3xl font-bold text-green-900">{student.batchesEnrolled}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        {student.achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {student.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200 px-3 py-1">
                    <Trophy className="w-3 h-3 mr-2" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Batch Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Batch Enrollments ({studentBatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {studentBatches.map((batch) => (
                <Card key={batch.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{batch.name}</h4>
                        <p className="text-gray-600">{batch.level} Level</p>
                      </div>
                      <Badge 
                        variant={batch.status === "Active" ? "default" : batch.status === "Completed" ? "secondary" : "outline"}
                        className={
                          batch.status === "Active" ? "bg-green-100 text-green-800" :
                          batch.status === "Completed" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {batch.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{batch.venue} - {batch.spot}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{batch.schedule}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{batch.teacher}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Enrolled: {batch.enrolledDate}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Sessions: </span>
                          <span className="font-medium">{batch.sessionsAttended}/{batch.totalSessions}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Batch Attendance</span>
                        <span className="text-sm font-bold text-gray-900">{batch.attendance}%</span>
                      </div>
                      <Progress 
                        value={batch.attendance} 
                        className={`h-3 ${
                          batch.attendance >= 90 ? '[&>div]:bg-green-500' : 
                          batch.attendance >= 75 ? '[&>div]:bg-yellow-500' : 
                          '[&>div]:bg-red-500'
                        }`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button onClick={handleRateStudent} className="flex-1">
            <Star className="w-4 h-4 mr-2" />
            Rate Student
          </Button>
          <Button variant="outline" onClick={() => onNavigate('batches')} className="flex-1">
            Back to Batch Management
          </Button>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={closeRatingModal}
        student={studentToRate}
      />
    </div>
  );
}
