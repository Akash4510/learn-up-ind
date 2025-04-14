"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { KYC, KYC_STATUS, User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateKycStatus } from "@/actions/affiliate/update-kyc-status";

type UserWithKYC = User & {
  kyc: KYC;
};

interface KycApprovalCardProps {
  user: UserWithKYC;
}

export const KycApprovalCard = ({ user }: KycApprovalCardProps) => {
  const [loadingAction, setLoadingAction] = useState<KYC_STATUS | null>(null);
  const router = useRouter();

  const handleKycAction = async (kycId: string, status: KYC_STATUS) => {
    setLoadingAction(status);
    try {
      const result = await updateKycStatus(kycId, status);
      
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success(result.success.message);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={user.image || undefined} />
          <AvatarFallback>
            {user.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name || "Unknown"}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Requested on: {new Date(user.kyc.createdAt).toLocaleDateString()}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium">Aadhaar Number</p>
              <p className="text-muted-foreground">{user.kyc.aadhaarNumber}</p>
            </div>
            <div>
              <p className="font-medium">Account Holder</p>
              <p className="text-muted-foreground">{user.kyc.accountHolderName}</p>
            </div>
            <div>
              <p className="font-medium">Bank Name</p>
              <p className="text-muted-foreground">{user.kyc.bankName}</p>
            </div>
            <div>
              <p className="font-medium">Account Number</p>
              <p className="text-muted-foreground">{user.kyc.bankAccountNumber}</p>
            </div>
            <div>
              <p className="font-medium">IFSC Code</p>
              <p className="text-muted-foreground">{user.kyc.bankIfscCode}</p>
            </div>
            <div>
              <p className="font-medium">UPI ID</p>
              <p className="text-muted-foreground">{user.kyc.upiId}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => handleKycAction(user.kyc.id, KYC_STATUS.REJECTED)}
          disabled={loadingAction !== null}
        >
          {loadingAction === KYC_STATUS.REJECTED ? (
            <Loader2 className="size-4 animate-spin mr-2" />
          ) : null}
          Reject
        </Button>
        <Button
          onClick={() => handleKycAction(user.kyc.id, KYC_STATUS.APPROVED)}
          disabled={loadingAction !== null}
        >
          {loadingAction === KYC_STATUS.APPROVED ? (
            <Loader2 className="size-4 animate-spin mr-2" />
          ) : null}
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
}; 