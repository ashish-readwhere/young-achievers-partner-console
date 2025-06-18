
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Clock
} from "lucide-react";

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

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRateStudent: (studentId: number) => void;
  student: {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string;
    parentPhone: string;
    parentEmail: string;
    joinDate: string;
    status: string;
    attendance: number;
    rating: number;
    batchesEnrolled: number;
    achievements: string[];
    avatar: string;
  } | null;
}

export function StudentProfileModal({ isOpen, onClose, onRateStudent, student }: StudentProfileModalProps) {
  if (!student) return null;

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
      enrolledDate: "Dec 1, 2024",
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
      enrolledDate: "Nov 1, 2024",
      sessionsAttended: 24,
      totalSessions: 24,
      attendance: 100
    }
  ];

  const handleRateStudent = () => {
    onRateStudent(student.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-gray-600">Age {student.age} • Member since {student.joinDate}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {student.status}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{student.rating}/5</span>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Student Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{student.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Parent/Guardian Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{student.parentEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{student.parentPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
                <div className="flex flex-wrap gap-2">
                  {student.achievements.map((achievement, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      <Trophy className="w-3 h-3 mr-1" />
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
              <div className="space-y-4">
                {studentBatches.map((batch) => (
                  <Card key={batch.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{batch.name}</h4>
                          <p className="text-sm text-gray-600">{batch.level} Level</p>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{batch.venue} - {batch.spot}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{batch.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{batch.teacher}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
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
                          <span className="text-sm font-medium text-gray-700">Attendance</span>
                          <span className="text-sm font-bold text-gray-900">{batch.attendance}%</span>
                        </div>
                        <Progress 
                          value={batch.attendance} 
                          className={`h-2 ${
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
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
