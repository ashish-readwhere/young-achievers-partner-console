
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: any; // Replace 'any' with the actual type of 'batch'
  onReschedule: (batchId: string, newDate: Date, newTime: string, reason: string) => void;
}

const RescheduleModal = ({ isOpen, onClose, batch, onReschedule }: RescheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const { toast } = useToast();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(undefined);
      setSelectedTime('');
      setReason('');
      setAvailableTimes([]);
      setAvailabilityStatus('idle');
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedDate) {
      setAvailabilityStatus('checking');
      setSelectedTime(''); // Reset selected time when date changes
      
      // Simulate checking availability with realistic data
      setTimeout(() => {
        const dayOfWeek = selectedDate.getDay();
        const dateStr = selectedDate.toDateString();
        
        // Generate different available slots based on day of week
        let slots: string[] = [];
        
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
          slots = ['9:00 AM', '10:00 AM', '11:00 AM', '4:00 PM', '5:00 PM', '6:00 PM'];
        } else { // Weekday
          slots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
        }
        
        // Randomly remove some slots to simulate real availability
        const availableSlots = slots.filter(() => Math.random() > 0.3);
        
        if (availableSlots.length > 0) {
          setAvailableTimes(availableSlots);
          setAvailabilityStatus('available');
        } else {
          setAvailableTimes([]);
          setAvailabilityStatus('unavailable');
        }
      }, 800);
    } else {
      setAvailabilityStatus('idle');
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && reason.trim()) {
      onReschedule(batch.id, selectedDate, selectedTime, reason);
      
      // Show success message
      toast({
        title: "Reschedule Request Submitted",
        description: "Your request has been sent to the admin for approval. You will receive a notification once it's reviewed.",
      });
      
      onClose();
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  const isFormValid = selectedDate && selectedTime && reason.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reschedule Batch</DialogTitle>
          <DialogDescription>
            Select a new date and time for the batch: {batch?.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="date">New Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date()
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Available Time Slots</Label>
            {availabilityStatus === 'checking' && (
              <div className="w-full p-3 border rounded-md bg-blue-50 text-blue-700 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                Checking available slots...
              </div>
            )}
            
            {availabilityStatus === 'available' && (
              <>
                <div className="text-sm text-green-600 mb-2 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {availableTimes.length} slot{availableTimes.length !== 1 ? 's' : ''} available
                </div>
                <Select onValueChange={setSelectedTime} value={selectedTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            
            {availabilityStatus === 'unavailable' && (
              <div className="w-full p-3 border rounded-md bg-red-50 text-red-700 text-sm">
                No slots available on this date. Please select a different date.
              </div>
            )}
            
            {availabilityStatus === 'idle' && (
              <div className="w-full p-3 border rounded-md bg-gray-50 text-gray-600 text-sm">
                Please select a date first to view available time slots.
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="reason">Reason for Reschedule</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for rescheduling this batch..."
              rows={3}
            />
          </div>

          {/* Admin Approval Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              <strong>Note:</strong> Your reschedule request will be submitted to the admin for approval. 
              You will receive a notification once the request is reviewed and approved/rejected.
            </AlertDescription>
          </Alert>
        </form>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || availabilityStatus === 'checking'}
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {availabilityStatus === 'checking' ? 'Checking...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
