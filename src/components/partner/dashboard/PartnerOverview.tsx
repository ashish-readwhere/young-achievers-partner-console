
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react";

export function PartnerOverview() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Partner Console Overview</h1>
        <p className="text-gray-600 mt-1">Manage your batches and track student progress</p>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Active Batches</p>
                  <p className="text-3xl font-bold text-blue-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Enrolled Members</p>
                  <p className="text-3xl font-bold text-green-900">256</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    ↑ 12 this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Upcoming Sessions</p>
                  <p className="text-3xl font-bold text-purple-900">8</p>
                  <p className="text-xs text-purple-600 mt-1">Next 7 days</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-orange-900">87%</p>
                  <p className="text-xs text-orange-600 mt-1">Average</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Sessions Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Next Sessions Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Yoga - Advanced</h4>
                    <p className="text-sm text-gray-600">Greenfield Center - Yoga Hall</p>
                    <p className="text-sm text-blue-600">Today, 2:00 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">24 Students</p>
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded mt-1 hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Chess Fundamentals</h4>
                    <p className="text-sm text-gray-600">Downtown Center - Chess Room</p>
                    <p className="text-sm text-blue-600">Tomorrow, 10:00 AM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">18 Students</p>
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded mt-1 hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Music Theory</h4>
                    <p className="text-sm text-gray-600">Arts Center - Music Room A</p>
                    <p className="text-sm text-blue-600">Friday, 3:30 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">15 Students</p>
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded mt-1 hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Batch Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Yoga - Beginner Batch</span>
                    <span className="text-sm text-gray-600">7/10 Sessions</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">22 Students • Greenfield Center</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Chess Advanced</span>
                    <span className="text-sm text-gray-600">5/12 Sessions</span>
                  </div>
                  <Progress value={42} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">16 Students • Downtown Center</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Music Theory</span>
                    <span className="text-sm text-gray-600">3/8 Sessions</span>
                  </div>
                  <Progress value={38} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">12 Students • Arts Center</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Dance Basics</span>
                    <span className="text-sm text-gray-600">9/10 Sessions</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">28 Students • Community Hall</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
