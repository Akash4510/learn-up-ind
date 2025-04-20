"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Payout, KYC } from "@prisma/client";
import { IndianRupee, User as UserIcon, Mail, CreditCard } from "lucide-react";

interface PayoutDetailsProps {
  payout: Payout & {
    affiliate: {
      user: {
        name: string | null;
        email: string | null;
        kyc: KYC | null;
      };
    };
  };
}

export const PayoutDetails = ({ payout }: PayoutDetailsProps) => {
  const { affiliate } = payout;
  const { user } = affiliate;
  const { kyc } = user;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Payout Details</span>
          <Badge variant="outline" className="font-mono">
            ID: {payout.id}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Amount</h3>
          <div className="flex items-center text-2xl font-bold">
            <IndianRupee className="size-6 mr-1" />
            {payout.amount}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">User Information</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <UserIcon className="size-4 text-muted-foreground" />
              <span>{user.name || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              <span>{user.email || "N/A"}</span>
            </div>
          </div>
        </div>

        {kyc && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bank Details</h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-muted-foreground" />
                <span className="font-medium">Bank:</span>
                <span>{kyc.bankName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Account Number:</span>
                <span className="font-mono">{kyc.bankAccountNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">IFSC Code:</span>
                <span className="font-mono">{kyc.bankIfscCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Account Holder:</span>
                <span>{kyc.accountHolderName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">UPI ID:</span>
                <span>{kyc.upiId}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Request Details</h3>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Requested On:</span>
              <span>{new Date(payout.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
