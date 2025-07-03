
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Calendar, 
  Star, 
  Clock,
  MapPin,
  Eye,
  BookOpen,
  TrendingUp
} from "lucide-react";

interface UnifiedDashboardProps {
  onNavigate: (section: string) => void;
}

export function UnifiedDashboard({ onNavigate }: UnifiedDashboardProps) {
  // Partner data and stats
  const partnerName = "Instructor Sarah Wilson";
  const partnerSubject = "Yoga";
  
  const stats = [
    { label: "Active Batches", value: "2", icon: Users, color: "blue" },
    { label: "Total Students", value: "33", icon: Users, color: "green" },
    { label: "This Week Sessions", value: "8", icon: Calendar, color: "purple" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "yellow" }
  ];

  const batches = [
    {
      id: 1,
      name: "Yoga Fundamentals - Batch B",
      time: "6:00 PM - 7:00 PM",
      day: "Mon, Wed, Fri",
      level: "Beginner",
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
      day: "Tue, Thu",
      level: "Advanced",
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

  const upcomingSessions = [
    {
      id: 1,
      title: "Yoga Advanced - Session 9",
      date: "Monday, Jan 15, 2024",
      time: "10:00 AM",
      venue: "Talkatora Stadium",
      students: 15
    },
    {
      id: 2,
      title: "Yoga Fundamentals - Session 8",
      date: "Tuesday, Jan 16, 2024",
      time: "2:00 PM",
      venue: "Noida Stadium",
      students: 18
    }
  ];

  const handleViewBatch = (batch: any) => {
    console.log("Navigate to batch details for:", batch.name);
    onNavigate('batch-details');
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">Dashboard Overview</h1>
        <p className="text-sm text-gray-600 mt-1 leading-tight">Welcome back, {partnerName}! Here's your {partnerSubject} teaching overview.</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-0 shadow-sm bg-${stat.color}-50`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium text-${stat.color}-600 mb-1 leading-tight`}>{stat.label}</p>
                    <p className={`text-xl font-bold text-${stat.color}-900 leading-tight`}>{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 bg-${stat.color}-500 rounded-lg flex items-center justify-center flex-shrink-0 ml-2`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Batches */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Active Batches</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('batches')}
                className="text-xs"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-4">
                {batches.map((batch) => (
                  <div key={batch.id} className="p-4 bg-blue-50 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{batch.name}</h4>
                          <p className="text-xs text-gray-600">{batch.time} • {batch.day}</p>
                        </div>
                      </div>
                      <Badge variant={batch.status === "Active" ? "default" : "secondary"} className="text-xs">
                        {batch.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-white rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="w-3 h-3 text-gray-600" />
                          <span className="text-xs text-gray-600">Students</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{batch.students}/{batch.capacity}</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-gray-600" />
                          <span className="text-xs text-gray-600">Progress</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{batch.progress}%</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <Progress value={batch.progress} className="h-2" />
                      <p className="text-xs text-gray-600 mt-1">
                        {batch.completedSessions} of {batch.totalSessions} sessions completed
                      </p>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewBatch(batch)}
                      className="w-full text-xs"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between px-4 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Upcoming Sessions</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('batches')}
                className="text-xs"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">{session.title}</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{session.date} at {session.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{session.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Users className="w-3 h-3 flex-shrink-0" />
                            <span>{session.students} students</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('session-details')}
                        className="w-full text-xs"
                      >
                        <Eye className="w-3 h-3 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
