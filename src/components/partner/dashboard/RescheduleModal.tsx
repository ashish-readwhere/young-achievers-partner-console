
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string, reason: string) => void;
  batch: {
    name: string;
    nextSession: string;
    nextSessionTime: string;
    venue: string;
    spot: string;
  } | null;
}

export function RescheduleModal({ isOpen, onClose, onConfirm, batch }: RescheduleModalProps) {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [reason, setReason] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState<'checking' | 'available' | 'unavailable' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!batch) return null;

  // Mock venue availability checker
  const checkVenueAvailability = (date: string, time: string) => {
    if (!date || !time) {
      setAvailabilityStatus(null);
      return;
    }

    setAvailabilityStatus('checking');
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock logic: make some dates/times unavailable for demo
      const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
      const hour = parseInt(time.split(':')[0]);
      const isEarlyMorning = hour < 8;
      const isLateEvening = hour > 20;
      
      if (isWeekend || isEarlyMorning || isLateEvening) {
        setAvailabilityStatus('unavailable');
      } else {
        setAvailabilityStatus('available');
      }
    }, 1000);
  };

  const handleDateTimeChange = (date: string, time: string) => {
    checkVenueAvailability(date, time);
  };

  const handleDateChange = (date: string) => {
    setNewDate(date);
    handleDateTimeChange(date, newTime);
  };

  const handleTimeChange = (time: string) => {
    setNewTime(time);
    handleDateTimeChange(newDate, time);
  };

  const handleConfirm = () => {
    if (newDate && newTime && reason.trim() && availabilityStatus === 'available') {
      onConfirm(newDate, newTime, reason);
      setIsSubmitted(true);
      
      // Auto close after showing success message
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after modal closes
    setTimeout(() => {
      setNewDate("");
      setNewTime("");
      setReason("");
      setAvailabilityStatus(null);
      setIsSubmitted(false);
    }, 300);
  };

  const isFormValid = newDate && newTime && reason.trim() && availabilityStatus === 'available';

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Reschedule Request Submitted
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Your reschedule request has been sent to the admin for approval.
            </p>
            <p className="text-sm text-gray-500">
              You will be notified once the admin reviews and approves your request.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Session Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">{batch.name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Current: {batch.nextSession} at {batch.nextSessionTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{batch.venue} - {batch.spot}</span>
              </div>
            </div>
          </div>

          {/* New Date and Time */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Date *
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Time *
              </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Venue Availability Status */}
          {availabilityStatus === 'checking' && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Checking venue availability...
              </AlertDescription>
            </Alert>
          )}

          {availabilityStatus === 'available' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Great! {batch.venue} - {batch.spot} is available on {newDate} at {newTime}.
              </AlertDescription>
            </Alert>
          )}

          {availabilityStatus === 'unavailable' && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Sorry, {batch.venue} - {batch.spot} is not available on {newDate} at {newTime}. 
                Please select a different date or time.
              </AlertDescription>
            </Alert>
          )}

          {/* Reason for Reschedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Reschedule *
            </label>
            <Textarea
              placeholder="Please provide a reason for rescheduling this session..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[80px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {reason.length}/500 characters
            </p>
          </div>

          {/* Admin Approval Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Note:</strong> This reschedule request will be sent to the admin for approval. 
              The session will only be rescheduled after admin approval.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!isFormValid || availabilityStatus === 'checking'}
          >
            {availabilityStatus === 'checking' ? 'Checking...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
