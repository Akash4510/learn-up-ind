import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Payout, PAYOUT_STATUS } from "@prisma/client";
import { CheckCircle, IndianRupee, Info, Calendar, Hash } from "lucide-react";

interface PayoutStatusProps {
  payout: Payout;
}

export const PayoutStatus = ({ payout }: PayoutStatusProps) => {
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
        "bg-background rounded-md w-full p-2 flex items-center gap-2",
        payout.status === PAYOUT_STATUS.PENDING &&
          "bg-amber-500/15 text-amber-500",
        payout.status === PAYOUT_STATUS.COMPLETED &&
          "bg-emerald-500/15 text-emerald-500"
      )}
    >
      <Icon className="size-[1.15rem] shrink-0" />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <div>
            {payout.id.substring(0, 8)}...
            <Badge className="ml-2" variant="secondary">
              <span className="lowercase">{payout.status}</span>
            </Badge>
          </div>
          <span>
            <IndianRupee className="size-4 mr-1 inline-block" />
            {payout.amount}
          </span>
        </div>
        
        {payout.status === PAYOUT_STATUS.COMPLETED && (
          <div className="text-xs flex flex-col gap-1 mt-1">
            {payout.transactionId && (
              <div className="flex items-center gap-1">
                <Hash className="size-3" />
                <span>Transaction ID: {payout.transactionId}</span>
              </div>
            )}
            {payout.payoutDate && (
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <span>Paid on: {new Date(payout.payoutDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
