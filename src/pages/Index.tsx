
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Young Achievers</h1>
        <p className="text-xl text-muted-foreground mb-8">Choose your console to get started</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Admin Console</h3>
              <p className="text-muted-foreground mb-4">Full administrative access and management</p>
              <Button className="w-full" asChild>
                <Link to="/admin">Access Admin Console</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Partner Console</h3>
              <p className="text-muted-foreground mb-4">Manage your batches and training sessions</p>
              <Button className="w-full" asChild>
                <Link to="/partner">Access Partner Console</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
