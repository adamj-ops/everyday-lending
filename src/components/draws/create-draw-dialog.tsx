'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

const drawSchema = z.object({
  loanNumber: z.string().min(1, 'Loan number is required'),
  drawNumber: z.string().min(1, 'Draw number is required').refine(
    val => !isNaN(Number(val)) && Number(val) > 0,
    'Draw number must be a positive number',
  ),
  requestedAmount: z.string().min(1, 'Requested amount is required').refine(
    val => !isNaN(Number(val)) && Number(val) > 0,
    'Amount must be a positive number',
  ),
  description: z.string().min(1, 'Description is required'),
  contractorName: z.string().optional(),
  workCompleted: z.string().optional(),
});

type DrawFormData = z.infer<typeof drawSchema>;

type CreateDrawDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function CreateDrawDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateDrawDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DrawFormData>({
    resolver: zodResolver(drawSchema),
    defaultValues: {
      loanNumber: '',
      drawNumber: '',
      requestedAmount: '',
      description: '',
      contractorName: '',
      workCompleted: '',
    },
  });

  const onSubmit = async (data: DrawFormData) => {
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Draw Requested',
        description: `Draw request #${data.drawNumber} for loan ${data.loanNumber} has been submitted successfully.`,
      });

      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit draw request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Construction Draw</DialogTitle>
          <DialogDescription>
            Submit a new draw request for construction work. This will be reviewed and approved before disbursement.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="loanNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Number</FormLabel>
                    <FormControl>
                      <Input placeholder="LN-2025-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drawNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Draw Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requestedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="25000.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the work completed or to be completed..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contractorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contractor Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Construction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workCompleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Completed Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional details about completed work..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Draw Request'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
