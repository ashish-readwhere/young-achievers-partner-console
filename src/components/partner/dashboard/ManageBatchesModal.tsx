
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Users, CheckCircle, AlertCircle, Plus, Minus } from "lucide-react";

interface ManageBatchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    id: number;
    name: string;
    avatar: string;
    batchesEnrolled?: { id: number; name: string; level: string; status: string }[];
  } | null;
}

export function ManageBatchesModal({ isOpen, onClose, member }: ManageBatchesModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<number[]>([]);
  const [requestSent, setRequestSent] = useState(false);
  const { toast } = useToast();

  // Available batches (partner's yoga batches)
  const availableBatches = [
    { id: 1, name: "Yoga Fundamentals - Batch B", level: "Beginner", time: "6:00 PM - 7:00 PM", day: "Mon, Wed, Fri" },
    { id: 2, name: "Yoga Advanced - Batch A", level: "Advanced", time: "4:00 PM - 5:00 PM", day: "Tue, Thu" },
    { id: 3, name: "Yoga Intermediate - Batch C", level: "Intermediate", time: "7:30 PM - 8:30 PM", day: "Mon, Wed" },
    { id: 4, name: "Yoga Morning Flow", level: "Beginner", time: "7:00 AM - 8:00 AM", day: "Daily" },
    { id: 5, name: "Yoga Power Session", level: "Advanced", time: "8:00 PM - 9:00 PM", day: "Wed, Fri" }
  ];

  // Reset form when member changes
  useEffect(() => {
    if (member && member.batchesEnrolled) {
      const currentBatchIds = member.batchesEnrolled.map(batch => batch.id);
      setSelectedBatches(currentBatchIds);
      setRequestSent(false);
    }
  }, [member]);

  const handleBatchToggle = (batchId: number) => {
    setSelectedBatches(prev => {
      if (prev.includes(batchId)) {
        return prev.filter(id => id !== batchId);
      } else {
        return [...prev, batchId];
      }
    });
  };

  const onSubmit = async () => {
    if (!member) return;
    
    console.log("Submitting batch management request:", { memberId: member.id, selectedBatches });
    setIsSubmitting(true);

    try {
      // Simulate API call to submit batch management request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Batch management request submitted successfully");
      setRequestSent(true);
      
      toast({
        title: "Batch Management Request Submitted",
        description: "Your request to update batch enrollment has been sent to admin for approval.",
      });
      
    } catch (error) {
      console.error("Error submitting batch management request:", error);
      toast({
        title: "Error",
        description: "Failed to submit batch management request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRequestSent(false);
    onClose();
  };

  if (!member) return null;

  const currentBatchIds = member.batchesEnrolled?.map(batch => batch.id) || [];
  const hasChanges = JSON.stringify(selectedBatches.sort()) !== JSON.stringify(currentBatchIds.sort());

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Manage Batch Enrollment</h2>
              <p className="text-sm text-gray-600">{member.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {requestSent ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Batch Management Request Submitted
            </h3>
            <p className="text-gray-600 mb-6">
              Your request to update {member.name}'s batch enrollment has been sent to the admin for approval. 
              You'll be notified once the changes are reviewed.
            </p>
            <Button onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Admin Approval Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">
                  Admin Approval Required
                </p>
              </div>
              <p className="text-sm text-blue-700">
                Changes to batch enrollment require admin approval. Your proposed changes will be reviewed before being applied.
              </p>
            </div>

            {/* Current Enrollment */}
            {member.batchesEnrolled && member.batchesEnrolled.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Current Enrollment
                </h3>
                <div className="space-y-2">
                  {member.batchesEnrolled.map((batch) => (
                    <div key={batch.id} className="bg-gray-50 rounded-lg p-3 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{batch.name}</p>
                          <p className="text-sm text-gray-600">Level: {batch.level}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {batch.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Batches */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Available Yoga Batches
              </h3>
              <div className="space-y-2">
                {availableBatches.map((batch) => {
                  const isCurrentlyEnrolled = currentBatchIds.includes(batch.id);
                  const isSelected = selectedBatches.includes(batch.id);
                  const isBeingAdded = !isCurrentlyEnrolled && isSelected;
                  const isBeingRemoved = isCurrentlyEnrolled && !isSelected;
                  
                  return (
                    <div key={batch.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`batch-${batch.id}`}
                          checked={isSelected}
                          onCheckedChange={() => handleBatchToggle(batch.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <label 
                              htmlFor={`batch-${batch.id}`}
                              className="font-medium text-gray-900 cursor-pointer"
                            >
                              {batch.name}
                            </label>
                            {isBeingAdded && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Plus className="w-3 h-3 mr-1" />
                                Adding
                              </Badge>
                            )}
                            {isBeingRemoved && (
                              <Badge variant="destructive" className="text-xs">
                                <Minus className="w-3 h-3 mr-1" />
                                Removing
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Level: {batch.level}</p>
                            <p>Time: {batch.time}</p>
                            <p>Days: {batch.day}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                disabled={!hasChanges || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Submitting Request..." : "Submit for Approval"}
              </Button>
            </div>

            {!hasChanges && (
              <p className="text-sm text-gray-500 text-center">
                No changes detected. Select or deselect batches to enable submission.
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
