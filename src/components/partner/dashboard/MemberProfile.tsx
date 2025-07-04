
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar,
  MapPin,
  Star,
  Trophy,
  Users,
  Clock,
  ArrowLeft,
  User
} from "lucide-react";
import { RatingModal } from "./RatingModal";

interface MemberBatch {
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

interface MemberProfileProps {
  onNavigate: (section: string) => void;
  memberId?: number;
}

export function MemberProfile({ onNavigate, memberId }: MemberProfileProps) {
  console.log("MemberProfile rendered - all contact info sections removed");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [memberToRate, setMemberToRate] = useState<any>(null);

  // Mock member data - in real app, this would be fetched based on memberId
  const member = {
    id: memberId || 1,
    name: "Sarah Williams",
    age: 16,
    joinDate: "Monday, Dec 1, 2024",
    status: "Active",
    attendance: 95,
    rating: 4.5,
    batchesEnrolled: 2,
    achievements: ["Flexibility Master", "Best Member", "Regular Attendee"],
    avatar: "/lovable-uploads/1ba055c7-e9a3-4a04-b0e8-31a2367343ed.png"
  };

  // Mock batch enrollment data for the member
  const memberBatches: MemberBatch[] = [
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

  const handleRateMember = () => {
    console.log("Rate Member clicked for ID:", member.id);
    setMemberToRate({
      id: member.id,
      name: member.name,
      avatar: member.avatar
    });
    setShowRatingModal(true);
  };

  const closeRatingModal = () => {
    console.log("Closing rating modal");
    setShowRatingModal(false);
    setMemberToRate(null);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Back to Member Management clicked");
              onNavigate('members');
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Member Management
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-gray-600">Age {member.age} • Member since {member.joinDate}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {member.status}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{member.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Achievements */}
        {member.achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <Trophy className="w-3 h-3 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Overall Attendance</p>
                  <p className="text-3xl font-bold text-blue-900">{member.attendance}%</p>
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
                  <p className="text-3xl font-bold text-yellow-900">{member.rating}/5</p>
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
                  <p className="text-3xl font-bold text-green-900">{member.batchesEnrolled}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batch Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Batch Enrollments ({memberBatches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {memberBatches.map((batch) => (
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
          <Button onClick={handleRateMember} className="flex-1">
            <Star className="w-4 h-4 mr-2" />
            Rate Member
          </Button>
          <Button variant="outline" onClick={() => onNavigate('members')} className="flex-1">
            Back to Member Management
          </Button>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={closeRatingModal}
        member={memberToRate}
      />
    </div>
  );
}
