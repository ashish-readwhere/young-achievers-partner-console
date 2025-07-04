import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    id: number;
    name: string;
    avatar: string;
    existingRating?: number;
    existingFeedback?: string;
  } | null;
}

export function RatingModal({ isOpen, onClose, member }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  console.log("RatingModal rendered with:", { isOpen, member });

  // Set existing rating and feedback when modal opens
  useEffect(() => {
    if (member && isOpen) {
      setRating(member.existingRating || 0);
      setFeedback(member.existingFeedback || "");
    }
  }, [member, isOpen]);

  if (!member) return null;

  const handleSubmitRating = () => {
    console.log("Submitting rating:", {
      memberId: member.id,
      rating,
      feedback
    });
    
    // Here you would typically send the rating to your backend
    // For now, we'll just log it and close the modal
    
    // Reset form
    setRating(0);
    setHoveredRating(0);
    setFeedback("");
    onClose();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredRating || rating);
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => {
            console.log("Star clicked:", starValue);
            setRating(starValue);
          }}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 ${
              isActive 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      );
    });
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "Select a rating";
    }
  };

  const hasExistingRating = member.existingRating && member.existingRating > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {hasExistingRating ? "Update Rating" : "Rate Member"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Rating Alert */}
          {hasExistingRating && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This member already has a rating of {member.existingRating} stars. You can update it below.
              </AlertDescription>
            </Alert>
          )}

          {/* Member Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">
                {hasExistingRating ? "Update this member's rating" : "Rate this member's performance"}
              </p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-1">
              {renderStars()}
            </div>
            <p className="text-lg font-medium text-gray-700">
              {getRatingText(hoveredRating || rating)}
            </p>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Feedback (Optional)
            </label>
            <Textarea
              placeholder="Share your thoughts about the member's performance, behavior, or areas for improvement..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={rating === 0}
              className="flex-1"
            >
              {hasExistingRating ? "Update Rating" : "Submit Rating"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
