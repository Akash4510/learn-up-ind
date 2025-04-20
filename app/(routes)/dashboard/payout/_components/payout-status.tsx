"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle,
  IndianRupee,
  Info,
  Calendar,
  Hash,
  CopyCheck,
  Copy,
} from "lucide-react";
import { Payout, PAYOUT_STATUS } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/ui/hint";

interface PayoutStatusProps {
  payout: Payout;
}

export const PayoutStatus = ({ payout }: PayoutStatusProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(payout.id);
    setCopied(true);

    toast.success("Referral code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  let Icon;

  switch (payout.status) {
    case PAYOUT_STATUS.PENDING:
      Icon = Info;
      break;

    case PAYOUT_STATUS.COMPLETED:
      Icon = CheckCircle;
      break;

    default:
      Icon = Info;
      break;
  }

  return (
    <div
      className={cn(
        "bg-background rounded-md w-full p-2 flex items-start gap-2 overflow-hidden",
        payout.status === PAYOUT_STATUS.PENDING &&
          "bg-amber-500/15 text-amber-500",
        payout.status === PAYOUT_STATUS.COMPLETED &&
          "bg-emerald-500/15 text-emerald-500"
      )}
    >
      <Icon className="size-[1.15rem] shrink-0 mt-1" />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <span>{payout.id}</span>
            <Hint label="Copy payout id" side="top" asChild>
              <button onClick={onCopy}>
                {copied ? (
                  <CopyCheck className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </Hint>
            <Badge variant="secondary">
              <span className="lowercase">{payout.status}</span>
            </Badge>
          </div>

          <span className="font-bold">
            <IndianRupee className="size-4 mr-1 inline-block" />
            {payout.amount}
          </span>
        </div>

        {payout.status === PAYOUT_STATUS.COMPLETED && (
          <div className="text-sm flex flex-col gap-1 mt-1">
            {payout.transactionId && (
              <div className="flex items-center gap-1">
                <Hash className="size-3" />
                <span>Transaction ID: {payout.transactionId}</span>
              </div>
            )}
            {payout.payoutDate && (
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <span>
                  Paid on: {new Date(payout.payoutDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
