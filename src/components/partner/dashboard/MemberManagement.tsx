import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Calendar,
  Eye,
  Users
} from "lucide-react";

export function MemberManagement() {
  // Partner can see all members but can only edit those in their batches
  const partnerSubject = "Yoga";
  
  const members = [
    // Partner's students (editable)
    {
      id: 1,
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "+1 (555) 123-4567",
      batch: "Yoga Advanced - Batch A",
      joinDate: "Dec 1, 2024",
      status: "Active",
      attendance: "95%",
      canEdit: true,
      teacher: "Instructor Sarah Wilson"
    },
    {
      id: 2,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      phone: "+1 (555) 567-8901",
      batch: "Yoga Fundamentals - Batch B",
      joinDate: "Dec 5, 2024",
      status: "Active",
      attendance: "89%",
      canEdit: true,
      teacher: "Instructor Sarah Wilson"
    },
    // Other students (view only)
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 234-5678",
      batch: "Chess - Intermediate",
      joinDate: "Nov 15, 2024",
      status: "Active",
      attendance: "87%",
      canEdit: false,
      teacher: "Master John Smith"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      phone: "+1 (555) 345-6789",
      batch: "Coding - Python Basics",
      joinDate: "Nov 20, 2024",
      status: "Active",
      attendance: "92%",
      canEdit: false,
      teacher: "Prof. Tech Guru"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 456-7890",
      batch: "Art & Craft Workshop",
      joinDate: "Oct 10, 2024",
      status: "Completed",
      attendance: "100%",
      canEdit: false,
      teacher: "Ms. Creative Artist"
    }
  ];

  const myStudents = members.filter(member => member.canEdit);
  const allStudents = members;

  const stats = [
    { 
      label: "My Students", 
      value: myStudents.length.toString(), 
      change: "+2 this week",
      color: "blue"
    },
    { 
      label: "Active in My Batches", 
      value: myStudents.filter(m => m.status === "Active").length.toString(), 
      change: "+1 this week",
      color: "green"
    },
    { 
      label: "Total Platform Members", 
      value: allStudents.length.toString(), 
      change: "View only access",
      color: "purple"
    },
    { 
      label: "My Avg Attendance", 
      value: Math.round(myStudents.reduce((sum, m) => sum + parseInt(m.attendance), 0) / myStudents.length) + "%", 
      change: "+3% vs last month",
      color: "orange"
    }
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Member Management</h1>
        <p className="text-gray-600 mt-1">Manage your {partnerSubject} students and view platform members</p>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-${stat.color}-600 mb-1`}>{stat.label}</p>
                    <p className={`text-3xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                    <p className={`text-xs text-${stat.color}-600 mt-1`}>{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Members Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-900">All Platform Members</CardTitle>
              <div className="text-sm text-gray-600">
                <span className="text-blue-600 font-medium">{myStudents.length} students</span> you can manage • 
                <span className="text-gray-500 ml-1">{allStudents.length - myStudents.length} view-only</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search members..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 px-4 font-medium text-gray-700">Member</th>
                    <th className="py-3 px-4 font-medium text-gray-700">Contact</th>
                    <th className="py-3 px-4 font-medium text-gray-700">Batch & Teacher</th>
                    <th className="py-3 px-4 font-medium text-gray-700">Join Date</th>
                    <th className="py-3 px-4 font-medium text-gray-700">Attendance</th>
                    <th className="py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr 
                      key={member.id} 
                      className={`border-b hover:bg-gray-50 ${
                        member.canEdit ? 'bg-blue-25' : 'bg-gray-25'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${
                            member.canEdit ? 'bg-blue-100' : 'bg-gray-100'
                          } rounded-full flex items-center justify-center`}>
                            <User className={`h-4 w-4 ${
                              member.canEdit ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <span className="font-medium">{member.name}</span>
                            {member.canEdit && (
                              <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700">
                                My Student
                              </Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {member.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <Badge 
                            variant="outline" 
                            className={member.canEdit ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-800'}
                          >
                            {member.batch}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">{member.teacher}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {member.joinDate}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{member.attendance}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={member.status === "Active" ? "default" : "secondary"}
                          className={member.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                        >
                          {member.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {member.canEdit && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              Manage
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
