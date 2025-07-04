
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Users, CheckCircle, AlertCircle, Plus, Minus, X } from "lucide-react";

interface ManageBatchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    id: number;
    name: string;
    avatar: string;
    batchesEnrolled?: { id: number; name: string; status: string }[];
  } | null;
}

export function ManageBatchesModal({ isOpen, onClose, member }: ManageBatchesModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<number[]>([]);
  const [requestSent, setRequestSent] = useState(false);
  const [conflictErrors, setConflictErrors] = useState<string[]>([]);
  const { toast } = useToast();

  // Available batches with program and level information
  const availableBatches = [
    { id: 1, name: "Yoga Fundamentals - Batch B", time: "6:00 PM - 7:00 PM", day: "Mon, Wed, Fri", program: "Yoga", level: "Beginner" },
    { id: 2, name: "Yoga Advanced - Batch A", time: "4:00 PM - 5:00 PM", day: "Tue, Thu", program: "Yoga", level: "Advanced" },
    { id: 3, name: "Yoga Intermediate - Batch C", time: "7:30 PM - 8:30 PM", day: "Mon, Wed", program: "Yoga", level: "Intermediate" },
    { id: 4, name: "Yoga Morning Flow", time: "7:00 AM - 8:00 AM", day: "Daily", program: "Yoga", level: "Beginner" },
    { id: 5, name: "Yoga Power Session", time: "8:00 PM - 9:00 PM", day: "Wed, Fri", program: "Yoga", level: "Advanced" },
    { id: 6, name: "Chess Basics - Batch A", time: "5:00 PM - 6:00 PM", day: "Mon, Wed", program: "Chess", level: "Beginner" },
    { id: 7, name: "Chess Advanced - Batch B", time: "6:30 PM - 7:30 PM", day: "Tue, Thu", program: "Chess", level: "Advanced" }
  ];

  // Define level hierarchy for each program
  const levelHierarchy = {
    "Yoga": ["Beginner", "Intermediate", "Advanced"],
    "Chess": ["Beginner", "Intermediate", "Advanced"]
  };

  // Reset form when member changes
  useEffect(() => {
    if (member && member.batchesEnrolled) {
      const currentBatchIds = member.batchesEnrolled.map(batch => batch.id);
      setSelectedBatches(currentBatchIds);
      setRequestSent(false);
      setConflictErrors([]);
    }
  }, [member]);

  // Check for batch conflicts when selection changes
  useEffect(() => {
    checkBatchConflicts();
  }, [selectedBatches]);

  const checkBatchConflicts = () => {
    const errors: string[] = [];
    const selectedBatchData = availableBatches.filter(batch => selectedBatches.includes(batch.id));
    
    // Group selected batches by program
    const batchesByProgram: { [program: string]: typeof availableBatches } = {};
    selectedBatchData.forEach(batch => {
      if (!batchesByProgram[batch.program]) {
        batchesByProgram[batch.program] = [];
      }
      batchesByProgram[batch.program].push(batch);
    });

    // Check for level conflicts within each program
    Object.entries(batchesByProgram).forEach(([program, batches]) => {
      const levels = batches.map(batch => batch.level);
      const uniqueLevels = [...new Set(levels)];
      
      if (uniqueLevels.length > 1) {
        const hierarchy = levelHierarchy[program as keyof typeof levelHierarchy];
        if (hierarchy) {
          // Sort levels by hierarchy position
          const sortedLevels = uniqueLevels.sort((a, b) => hierarchy.indexOf(a) - hierarchy.indexOf(b));
          
          // Check for any non-consecutive levels
          const levelIndices = sortedLevels.map(level => hierarchy.indexOf(level));
          for (let i = 1; i < levelIndices.length; i++) {
            if (levelIndices[i] - levelIndices[i-1] > 1) {
              errors.push(`Cannot enroll in multiple ${program} levels simultaneously. A member can only be enrolled in one level at a time within the same program.`);
              break;
            }
          }
          
          // Also prevent enrollment in multiple levels of the same program regardless of progression
          if (uniqueLevels.length > 1) {
            errors.push(`Cannot enroll in multiple ${program} batches of different levels simultaneously. Please complete current level before enrolling in the next level.`);
          }
        }
      }
    });

    setConflictErrors(errors);
  };

  const handleBatchToggle = (batchId: number) => {
    setSelectedBatches(prev => {
      if (prev.includes(batchId)) {
        return prev.filter(id => id !== batchId);
      } else {
        return [...prev, batchId];
      }
    });
  };

  const isBatchDisabled = (batchId: number) => {
    const batch = availableBatches.find(b => b.id === batchId);
    if (!batch || selectedBatches.includes(batchId)) return false;

    // Check if selecting this batch would create a conflict
    const testSelection = [...selectedBatches, batchId];
    const testSelectedBatchData = availableBatches.filter(b => testSelection.includes(b.id));
    
    // Group by program
    const batchesByProgram: { [program: string]: typeof availableBatches } = {};
    testSelectedBatchData.forEach(b => {
      if (!batchesByProgram[b.program]) {
        batchesByProgram[b.program] = [];
      }
      batchesByProgram[b.program].push(b);
    });

    // Check if this batch's program would have multiple levels
    const sameProgramBatches = batchesByProgram[batch.program] || [];
    if (sameProgramBatches.length > 1) {
      const levels = sameProgramBatches.map(b => b.level);
      const uniqueLevels = [...new Set(levels)];
      
      // If there would be multiple levels in the same program, disable this batch
      if (uniqueLevels.length > 1) {
        return true;
      }
    }
    
    return false;
  };

  const onSubmit = async () => {
    if (!member || conflictErrors.length > 0) return;
    
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
    setConflictErrors([]);
    onClose();
  };

  if (!member) return null;

  const currentBatchIds = member.batchesEnrolled?.map(batch => batch.id) || [];
  const hasChanges = JSON.stringify(selectedBatches.sort()) !== JSON.stringify(currentBatchIds.sort());
  const hasConflicts = conflictErrors.length > 0;

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

            {/* Enrollment Rules Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <p className="text-sm font-medium text-amber-800">
                  Enrollment Rules
                </p>
              </div>
              <p className="text-sm text-amber-700">
                Members can only be enrolled in one level per program at a time. Please complete the current level before enrolling in the next level within the same program.
              </p>
            </div>

            {/* Conflict Errors */}
            {hasConflicts && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <X className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium text-red-800">
                    Enrollment Conflicts Detected
                  </p>
                </div>
                <div className="space-y-1">
                  {conflictErrors.map((error, index) => (
                    <p key={index} className="text-sm text-red-700">• {error}</p>
                  ))}
                </div>
              </div>
            )}

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
                Available Batches
              </h3>
              <div className="space-y-2">
                {availableBatches.map((batch) => {
                  const isCurrentlyEnrolled = currentBatchIds.includes(batch.id);
                  const isSelected = selectedBatches.includes(batch.id);
                  const isBeingAdded = !isCurrentlyEnrolled && isSelected;
                  const isBeingRemoved = isCurrentlyEnrolled && !isSelected;
                  const isDisabled = !isSelected && isBatchDisabled(batch.id);
                  
                  return (
                    <div key={batch.id} className={`border rounded-lg p-4 ${isDisabled ? 'bg-gray-50 opacity-60' : ''}`}>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`batch-${batch.id}`}
                          checked={isSelected}
                          disabled={isDisabled}
                          onCheckedChange={() => !isDisabled && handleBatchToggle(batch.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <label 
                              htmlFor={`batch-${batch.id}`}
                              className={`font-medium cursor-pointer ${isDisabled ? 'text-gray-500' : 'text-gray-900'}`}
                            >
                              {batch.name}
                            </label>
                            <Badge variant="outline" className="text-xs">
                              {batch.program} - {batch.level}
                            </Badge>
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
                            {isDisabled && (
                              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                                Level Conflict
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
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
                disabled={!hasChanges || isSubmitting || hasConflicts}
                className="flex-1"
              >
                {isSubmitting ? "Submitting Request..." : "Submit for Approval"}
              </Button>
            </div>

            {!hasChanges && !hasConflicts && (
              <p className="text-sm text-gray-500 text-center">
                No changes detected. Select or deselect batches to enable submission.
              </p>
            )}

            {hasConflicts && (
              <p className="text-sm text-red-500 text-center">
                Please resolve enrollment conflicts before submitting.
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
