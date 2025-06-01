"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPayout } from "@/actions/payout";
import { truncateDecimals } from "@/lib/utils";

interface PayoutRequestFormProps {
  affiliateId: string;
  pendingPayout: number;
}

export const PayoutRequestForm = ({
  affiliateId,
  pendingPayout,
}: PayoutRequestFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState<string>("");
  const router = useRouter();

  const handleRequestPayout = () => {
    const payoutAmount = parseFloat(amount);

    if (isNaN(payoutAmount) || payoutAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (payoutAmount > pendingPayout) {
      toast.error(
        `Amount cannot exceed your available pending payout of ₹${pendingPayout}`
      );
      return;
    }

    startTransition(() => {
      createPayout(affiliateId, payoutAmount)
        .then((data) => {
          if (data.error) {
            console.error("Payout error:", data.error);
            toast.error(data.error.message);
            if (data.error.details) {
              console.error("Error details:", data.error.details);
            }
          } else {
            toast.success(data.success.message);
            setAmount("");
            router.refresh();
          }
        })
        .catch((error) => {
          console.error("Payout request failed:", error);
          toast.error("Something went wrong! Please try again.");
        });
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-xl pb-1">
        Available for payout: ₹{truncateDecimals(pendingPayout, 2)}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          max={pendingPayout}
          step="10"
          className="sm:max-w-[200px]"
        />

        <Button
          onClick={handleRequestPayout}
          disabled={
            isPending ||
            !amount ||
            parseFloat(amount) <= 0 ||
            parseFloat(amount) > pendingPayout
          }
        >
          {isPending ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
          Request Payout
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Enter the amount you want to request for payout. This will be deducted
        from your available pending payout.
      </p>
    </div>
  );
};
