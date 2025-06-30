
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Calendar, AlertCircle, CheckCircle } from "lucide-react";

const editMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentPhone: z.string().min(10, "Parent phone must be at least 10 digits"),
  parentEmail: z.string().email("Invalid parent email address"),
});

type EditMemberFormData = z.infer<typeof editMemberSchema>;

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    id: number;
    name: string;
    email: string;
    phone: string;
    parentPhone: string;
    parentEmail: string;
    avatar: string;
    canEdit: boolean;
  } | null;
}

export function EditMemberModal({ isOpen, onClose, member }: EditMemberModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<EditMemberFormData>({
    resolver: zodResolver(editMemberSchema),
    defaultValues: {
      name: member?.name || "",
      email: member?.email || "",
      phone: member?.phone || "",
      parentPhone: member?.parentPhone || "",
      parentEmail: member?.parentEmail || "",
    },
  });

  // Reset form when member changes
  useEffect(() => {
    if (member) {
      form.reset({
        name: member.name,
        email: member.email,
        phone: member.phone,
        parentPhone: member.parentPhone,
        parentEmail: member.parentEmail,
      });
      setRequestSent(false);
    }
  }, [member, form]);

  const onSubmit = async (data: EditMemberFormData) => {
    if (!member) return;
    
    console.log("Submitting member edit request:", data);
    setIsSubmitting(true);

    try {
      // Simulate API call to submit edit request for admin approval
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Member edit request submitted successfully");
      setRequestSent(true);
      
      toast({
        title: "Edit Request Submitted",
        description: "Your request to edit member details has been sent to admin for approval.",
      });
      
    } catch (error) {
      console.error("Error submitting member edit request:", error);
      toast({
        title: "Error",
        description: "Failed to submit edit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRequestSent(false);
    form.reset();
    onClose();
  };

  if (!member) return null;

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
              <h2 className="text-xl font-bold">Edit Member Details</h2>
              <p className="text-sm text-gray-600">{member.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {!member.canEdit && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm font-medium text-yellow-800">
                Limited Access
              </p>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              You can only edit details for students in your batches. This student is in a different batch.
            </p>
          </div>
        )}

        {requestSent ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Edit Request Submitted
            </h3>
            <p className="text-gray-600 mb-6">
              Your request to edit {member.name}'s details has been sent to the admin for approval. 
              You'll be notified once the changes are reviewed.
            </p>
            <Button onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Current vs Proposed Changes Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    Admin Approval Required
                  </p>
                </div>
                <p className="text-sm text-blue-700">
                  Changes to member details require admin approval. Your proposed changes will be reviewed before being applied.
                </p>
              </div>

              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Student Information
                </h3>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={!member.canEdit || isSubmitting}
                          placeholder="Enter student's full name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            disabled={!member.canEdit || isSubmitting}
                            placeholder="student@email.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!member.canEdit || isSubmitting}
                            placeholder="+1 (555) 123-4567"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Parent/Guardian Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="parentEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            disabled={!member.canEdit || isSubmitting}
                            placeholder="parent@email.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Phone</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            disabled={!member.canEdit || isSubmitting}
                            placeholder="+1 (555) 123-4500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  type="submit"
                  disabled={!member.canEdit || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting Request..." : "Submit for Approval"}
                </Button>
              </div>

              {!member.canEdit && (
                <p className="text-sm text-gray-500 text-center">
                  You can only edit students in your batches
                </p>
              )}
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
