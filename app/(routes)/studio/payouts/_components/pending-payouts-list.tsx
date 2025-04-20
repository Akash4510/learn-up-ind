"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Payout, KYC } from "@prisma/client";
import { IndianRupee, ChevronDown, ChevronUp } from "lucide-react";
import { PayoutDetails } from "./payout-details";
import { PayoutCompletionForm } from "./payout-completion-form";

interface PendingPayoutsListProps {
  payouts: (Payout & {
    affiliate: {
      user: {
        name: string | null;
        email: string | null;
        kyc: KYC | null;
      };
    };
  })[];
}

export const PendingPayoutsList = ({ payouts }: PendingPayoutsListProps) => {
  const [expandedPayoutId, setExpandedPayoutId] = useState<string | null>(null);

  const toggleExpand = (payoutId: string) => {
    if (expandedPayoutId === payoutId) {
      setExpandedPayoutId(null);
    } else {
      setExpandedPayoutId(payoutId);
    }
  };

  if (payouts.length === 0) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-muted-foreground">
            No pending payout requests
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {payouts.map((payout) => (
        <Card key={payout.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {payout.affiliate.user.name || "Unknown User"}

                <Badge variant="outline" className="font-mono">
                  Pyout Id: {payout.id}
                </Badge>
              </CardTitle>

              <div className="flex items-center gap-2">
                <div className="flex items-center font-bold">
                  <IndianRupee className="size-4 mr-1" />
                  {payout.amount}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleExpand(payout.id)}
                >
                  {expandedPayoutId === payout.id ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                User email:
                <Badge variant="outline">
                  {payout.affiliate.user.email || "No email"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                Requested at:
                <Badge variant="secondary">
                  {new Date(payout.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </CardHeader>

          {expandedPayoutId === payout.id && (
            <CardContent className="pt-0 space-y-6">
              <PayoutDetails payout={payout} />
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Complete Payout</h3>
                <PayoutCompletionForm payoutId={payout.id} />
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};
