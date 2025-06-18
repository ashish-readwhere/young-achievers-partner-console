import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerInfo: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    specializations: string[];
  };
}

export function EditProfileModal({ isOpen, onClose, partnerInfo }: EditProfileModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: partnerInfo.name,
    contactPerson: partnerInfo.name, // Same as name since teacher is the partner
    email: partnerInfo.email,
    phone: partnerInfo.phone,
    address: partnerInfo.address,
    specializations: [...partnerInfo.specializations]
  });
  const [newSpecialization, setNewSpecialization] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // If name changes, also update contactPerson since they're the same
      ...(field === "name" && { contactPerson: value })
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization.trim() && !formData.specializations.includes(newSpecialization.trim())) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()]
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to submit changes for admin review
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send email notification to admin (simulated)
      const adminEmail = "admin@youngachievers.com";
      const emailSubject = "Partner Profile Update Request - Review Required";
      const emailBody = `
        Partner Profile Update Request:
        
        Partner: ${formData.name}
        
        Requested Changes:
        - Full Name: ${formData.name}
        - Email: ${formData.email}
        - Phone: ${formData.phone}
        - Address: ${formData.address}
        - Specializations: ${formData.specializations.join(", ")}
        
        Please review and approve/reject these changes in the admin panel.
      `;

      // In a real application, this would be an API call
      console.log("Sending admin notification email:", {
        to: adminEmail,
        subject: emailSubject,
        body: emailBody
      });

      toast({
        title: "Changes Submitted Successfully!",
        description: "Your profile changes have been sent for admin review. You will be notified once they are approved.",
        duration: 5000,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Partner Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partnerName">Full Name *</Label>
              <Input
                id="partnerName"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Specializations</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new specialization"
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialization())}
              />
              <Button type="button" onClick={addSpecialization} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> All changes will be sent to the admin for review and approval. 
              You will receive a notification once your changes are processed.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
