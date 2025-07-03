
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  Clock,
  Eye,
  BookOpen
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BatchManagementProps {
  onNavigate?: (section: string, id?: number) => void;
}

export function BatchManagement({ onNavigate }: BatchManagementProps) {
  const batches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      time: "6:00 PM - 7:00 PM",
      days: "Mon, Wed, Fri",
      students: 15,
      capacity: 20,
      status: "Active",
      progress: 65,
      nextSession: "Monday, Jan 15 at 6:00 PM",
      previousSession: "Friday, Jan 12 at 6:00 PM",
      completedSessions: 13,
      totalSessions: 20
    },
    {
      id: 2,
      name: "Yoga Advanced - Batch A",
      time: "4:00 PM - 5:00 PM",
      days: "Tue, Thu",
      students: 10,
      capacity: 12,
      status: "Active",
      progress: 80,
      nextSession: "Tuesday, Jan 16 at 4:00 PM",
      previousSession: "Thursday, Jan 11 at 4:00 PM",
      completedSessions: 16,
      totalSessions: 20
    }
  ];

  const handleViewBatchDetails = (batchId: number) => {
    console.log("Navigating to batch details for ID:", batchId);
    if (onNavigate) {
      onNavigate('batch-details', batchId);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">My Batches</h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">Manage and monitor your active batches</p>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Batch Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Session</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{batch.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Clock className="w-3 h-3" />
                            <span>{batch.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{batch.days}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {batch.students}/{batch.capacity}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={batch.progress} className="h-2 w-16" />
                            <span className="text-sm font-medium text-gray-900">{batch.progress}%</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {batch.completedSessions}/{batch.totalSessions} sessions
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={batch.status === "Active" ? "default" : "secondary"} className="bg-gray-800 text-white text-xs">
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-900">{batch.nextSession}</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewBatchDetails(batch.id)}
                          className="flex items-center gap-2 text-xs"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </Button>
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
