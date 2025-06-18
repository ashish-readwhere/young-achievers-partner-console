
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";

export function BatchManagement() {
  const batches = [
    {
      id: 1,
      name: "Yoga - Advanced Level",
      students: 15,
      completedSessions: 3,
      totalSessions: 10,
      venue: "Greenfield Center",
      spot: "Yoga Hall",
      status: "Active",
      nextSession: "Today, 2:00 PM"
    },
    {
      id: 2,
      name: "Chess - Intermediate",
      students: 8,
      completedSessions: 5,
      totalSessions: 12,
      venue: "Downtown Center",
      spot: "Chess Room",
      status: "Active",
      nextSession: "Tomorrow, 4:30 PM"
    },
    {
      id: 3,
      name: "Coding - Python Basics",
      students: 12,
      completedSessions: 8,
      totalSessions: 10,
      venue: "Tech Hub",
      spot: "Computer Lab",
      status: "Active",
      nextSession: "Dec 20, 10:00 AM"
    },
    {
      id: 4,
      name: "Art & Craft Workshop",
      students: 20,
      completedSessions: 6,
      totalSessions: 6,
      venue: "Creative Center",
      spot: "Art Studio",
      status: "Completed",
      nextSession: null
    }
  ];

  const sessions = [
    {
      id: 1,
      title: "Yoga Session 4",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      venue: "Greenfield Center",
      spot: "Yoga Hall",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Chess Strategy Deep Dive",
      date: "Dec 19, 2024",
      time: "4:30 PM",
      venue: "Downtown Center",
      spot: "Chess Room",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Python Functions & Loops",
      date: "Dec 17, 2024",
      time: "10:00 AM",
      venue: "Tech Hub",
      spot: "Computer Lab",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
          <p className="text-gray-600 mt-2">Manage your training batches and sessions</p>
        </div>
        <Button>Create New Batch</Button>
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <Card key={batch.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{batch.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {batch.students} students
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {batch.venue} - {batch.spot}
                    </div>
                  </div>
                </div>
                <Badge variant={batch.status === "Active" ? "default" : "secondary"}>
                  {batch.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{batch.completedSessions}/{batch.totalSessions} Sessions</span>
                </div>
                <Progress value={(batch.completedSessions / batch.totalSessions) * 100} />
              </div>

              {/* Next Session */}
              {batch.nextSession && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Next Session:</span>
                  <span>{batch.nextSession}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">View Details</Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Manage Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Session Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Session Title</th>
                  <th className="text-left py-3 px-4 font-medium">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium">Venue + Spot</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{session.title}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {session.date} at {session.time}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {session.venue} - {session.spot}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={session.status === "Completed" ? "secondary" : "default"}
                        className={session.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {session.status === "Completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {session.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
