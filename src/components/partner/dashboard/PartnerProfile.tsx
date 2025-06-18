
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Edit
} from "lucide-react";

export function PartnerProfile() {
  const partnerInfo = {
    name: "TechEd Solutions",
    contactPerson: "John Smith",
    email: "john.smith@teched.com",
    phone: "+1 (555) 123-4567",
    address: "123 Education Lane, Tech City, TC 12345",
    joinDate: "January 15, 2024",
    status: "Active Partner",
    specializations: ["Technology Training", "Coding Bootcamps", "Digital Skills"]
  };

  const achievements = [
    {
      title: "Top Partner 2024",
      description: "Highest student satisfaction rate",
      date: "Dec 2024"
    },
    {
      title: "100+ Students Trained",
      description: "Successfully completed training programs",
      date: "Nov 2024"
    },
    {
      title: "Quality Excellence",
      description: "Maintained 95%+ attendance rate",
      date: "Oct 2024"
    }
  ];

  const statistics = [
    { label: "Total Batches", value: "24" },
    { label: "Students Trained", value: "312" },
    { label: "Success Rate", value: "94%" },
    { label: "Average Rating", value: "4.8/5" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Profile</h1>
          <p className="text-gray-600 mt-2">Manage your partner information and track performance</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Partner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partnerName">Partner Name</Label>
                  <Input id="partnerName" value={partnerInfo.name} readOnly />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" value={partnerInfo.contactPerson} readOnly />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={partnerInfo.email} readOnly />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={partnerInfo.phone} readOnly />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={partnerInfo.address} readOnly rows={2} />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium">Specializations:</span>
                {partnerInfo.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Partner Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Partner since</span>
                <Badge variant="outline">{partnerInfo.joinDate}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <Badge className="bg-green-100 text-green-800">{partnerInfo.status}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Award className="mr-2 h-4 w-4" />
                View Certificates
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
