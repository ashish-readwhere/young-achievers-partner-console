
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, BookOpen, Star, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/95eca461-e78f-43e5-9b21-9ac173f03cdc.png" 
                alt="Young Achievers Logo" 
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">Young Achievers</h1>
            </div>
            <nav className="flex space-x-4">
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Partner Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Young Achievers
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Empowering young minds with expert instructors across various subjects
          </p>
          
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Partner Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Expert Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Learn from certified professionals in various subjects
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Diverse Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From Yoga to Coding, Chess to Music - find your passion
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Star className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
              <CardTitle>Quality Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Rated and reviewed courses ensuring high-quality learning
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calendar className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Flexible Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose from multiple batches with convenient timings
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
