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
import { CalendarIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

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

  useEffect(() => {
    if (selectedDate) {
      setAvailabilityStatus('checking');
      // Simulate checking availability
      setTimeout(() => {
        const randomAvailability = Math.random() > 0.5;
        if (randomAvailability) {
          setAvailableTimes(['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']);
          setAvailabilityStatus('available');
        } else {
          setAvailableTimes([]);
          setAvailabilityStatus('unavailable');
          toast({
            title: "No slots available on this date.",
            description: "Please select a different date.",
            variant: "destructive",
          })
        }
      }, 1000);
    }
  }, [selectedDate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && reason.trim()) {
      onReschedule(batch.id, selectedDate, selectedTime, reason);
      onClose();
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
    }
  };

  const isFormValid = selectedDate && selectedTime && reason.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Batch</DialogTitle>
          <DialogDescription>
            Select a new date and time for the batch.
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
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="time">New Time</Label>
            <Select onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="reason">Reason for Reschedule</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for rescheduling the batch"
            />
          </div>
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
          >
            {availabilityStatus === 'checking' ? 'Checking...' : 'Reschedule Batch'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
