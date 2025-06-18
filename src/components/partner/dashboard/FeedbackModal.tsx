
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string, rating: number) => void;
  batch: {
    name: string;
    students: number;
  } | null;
}

export function FeedbackModal({ isOpen, onClose, onSubmit, batch }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  if (!batch) return null;

  const handleSubmit = () => {
    if (feedback.trim() && rating > 0) {
      onSubmit(feedback, rating);
      onClose();
      setFeedback("");
      setRating(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Session Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">{batch.name}</h3>
            <p className="text-sm text-gray-600">{batch.students} students enrolled</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating
            </label>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-400 transition-colors`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <Badge variant="outline" className="text-xs">
                {rating === 5 ? "Excellent" : 
                 rating === 4 ? "Good" : 
                 rating === 3 ? "Average" : 
                 rating === 2 ? "Below Average" : "Poor"}
              </Badge>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about today's session, student engagement, and any observations..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!feedback.trim() || rating === 0}>
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
