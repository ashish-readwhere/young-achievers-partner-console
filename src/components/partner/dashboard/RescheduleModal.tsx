
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string) => void;
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

  if (!batch) return null;

  const handleConfirm = () => {
    if (newDate && newTime) {
      onConfirm(newDate, newTime);
      onClose();
      setNewDate("");
      setNewTime("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Time
              </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!newDate || !newTime}>
            Confirm Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
