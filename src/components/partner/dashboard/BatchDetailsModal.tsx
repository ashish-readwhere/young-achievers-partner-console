import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: any;
}

export function BatchDetailsModal({ isOpen, onClose, batch }: BatchDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!batch) return null;

  const mockAttendanceData = Array.from({ length: batch.totalSessions || 20 }, (_, i) => ({
    date: `2024-01-${i + 1 < 10 ? '0' : ''}${i + 1}`,
    attended: Math.random() > 0.2,
  }));

  const AttendanceDots = () => (
    <div className="flex items-center space-x-1">
      {mockAttendanceData.map((item, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${item.attended ? 'bg-green-500' : 'bg-red-500'}`}
          title={`${item.date}: ${item.attended ? 'Attended' : 'Absent'}`}
        />
      ))}
    </div>
  );

  const stats = [
    { 
      label: "Overall Attendance", 
      value: `${batch.attendance}%`, 
      icon: Calendar, 
      color: "blue",
      bgColor: "bg-blue-50"
    },
    { 
      label: "Batches Enrolled", 
      value: batch.batchesEnrolled?.toString() || "1", 
      icon: Users, 
      color: "green",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {batch.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className={`border-0 shadow-sm ${stat.bgColor}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium text-${stat.color}-600 mb-1`}>{stat.label}</p>
                      <p className={`text-2xl font-bold text-${stat.color}-900`}>{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
              <TabsTrigger value="attendance" onClick={() => setActiveTab("attendance")}>Attendance</TabsTrigger>
              <TabsTrigger value="members" onClick={() => setActiveTab("members")}>Members</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Batch Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Time:</p>
                    <p className="text-gray-900">{batch.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Days:</p>
                    <p className="text-gray-900">{batch.day}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Members:</p>
                    <p className="text-gray-900">{batch.members}/{batch.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status:</p>
                    <Badge variant={batch.status === "Active" ? "default" : "secondary"}>{batch.status}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Next Session:</p>
                    <p className="text-gray-900">{batch.nextSession}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Previous Session:</p>
                    <p className="text-gray-900">{batch.previousSession}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Sessions:</p>
                    <p className="text-gray-900">{batch.completedSessions} of {batch.totalSessions} sessions</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attendance">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Attendance</h3>
                <ScrollArea className="rounded-md border p-4 h-[200px]">
                  <AttendanceDots />
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="members">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Members</h3>
                <p className="text-gray-600">List of members enrolled in this batch will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
