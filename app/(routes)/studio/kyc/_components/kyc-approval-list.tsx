"use client";

import { KYC, User } from "@prisma/client";
import { KycApprovalCard } from "./kyc-approval-card";

type UserWithKYC = User & {
  kyc: KYC;
};

export type { UserWithKYC };

interface KycApprovalListProps {
  users: UserWithKYC[];
}

export const KycApprovalList = ({ users }: KycApprovalListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <KycApprovalCard key={user.id} user={user} />
      ))}
    </div>
  );
};
