
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
  Calendar
} from "lucide-react";

export function MemberManagement() {
  const members = [
    {
      id: 1,
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "+1 (555) 123-4567",
      batch: "Yoga - Advanced Level",
      joinDate: "Dec 1, 2024",
      status: "Active",
      attendance: "95%"
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 234-5678",
      batch: "Chess - Intermediate",
      joinDate: "Nov 15, 2024",
      status: "Active",
      attendance: "87%"
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      phone: "+1 (555) 345-6789",
      batch: "Coding - Python Basics",
      joinDate: "Nov 20, 2024",
      status: "Active",
      attendance: "92%"
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 456-7890",
      batch: "Art & Craft Workshop",
      joinDate: "Oct 10, 2024",
      status: "Completed",
      attendance: "100%"
    },
    {
      id: 5,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      phone: "+1 (555) 567-8901",
      batch: "Yoga - Advanced Level",
      joinDate: "Dec 5, 2024",
      status: "Active",
      attendance: "89%"
    }
  ];

  const stats = [
    { label: "Total Members", value: "256", change: "+12 this week" },
    { label: "Active Members", value: "234", change: "+8 this week" },
    { label: "Completed Programs", value: "22", change: "+4 this month" },
    { label: "Average Attendance", value: "91%", change: "+2% vs last month" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-2">Manage and track your training participants</p>
        </div>
        <Button>Add New Member</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
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

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Member</th>
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Batch</th>
                  <th className="text-left py-3 px-4 font-medium">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium">Attendance</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{member.name}</span>
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
                      <Badge variant="outline">{member.batch}</Badge>
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
                      <Button size="sm" variant="outline">View Profile</Button>
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
