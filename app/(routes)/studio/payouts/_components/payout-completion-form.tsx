"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePayout } from "@/actions/payout";

interface PayoutCompletionFormProps {
  payoutId: string;
}

export const PayoutCompletionForm = ({ payoutId }: PayoutCompletionFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [transactionId, setTransactionId] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleCompletePayout = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID");
      return;
    }

    startTransition(() => {
      updatePayout(payoutId, transactionId, comment)
        .then((data) => {
          if (data.error) {
            toast.error(data.error.message);
          } else {
            toast.success(data.success.message);
            setTransactionId("");
            setComment("");
            router.refresh();
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="transactionId" className="text-sm font-medium">
          Transaction ID
        </label>
        <Input
          id="transactionId"
          placeholder="Enter transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="max-w-md"
        />
        <p className="text-xs text-muted-foreground">
          Enter the transaction ID from your payment gateway or bank transfer.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          Comment (Optional)
        </label>
        <Textarea
          id="comment"
          placeholder="Add any additional notes or comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Button 
        onClick={handleCompletePayout}
        disabled={isPending || !transactionId.trim()}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin mr-2" />
        ) : null}
        Complete Payout
      </Button>
    </div>
  );
}; 