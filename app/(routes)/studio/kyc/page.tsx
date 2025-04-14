import { redirect } from "next/navigation";
import { USER_ROLE } from "@prisma/client";

import { auth } from "@/auth";
import { getPendingKyc } from "@/actions/affiliate/get-pending-kyc";
import { TitleBlock } from "@/components/title-block";
import { KycApprovalList, UserWithKYC } from "./_components/kyc-approval-list";

const StudioKycPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  // Check if user has admin or creator role
  const isStudioAccessible =
    session.user.role === USER_ROLE.ADMIN ||
    session.user.role === USER_ROLE.CREATOR;

  if (!isStudioAccessible) {
    redirect("/");
  }

  const result = await getPendingKyc();

  if (result.error) {
    return (
      <div className="space-y-6">
        <TitleBlock 
          title="KYC Approvals" 
          subtitle="Review and approve user KYC requests" 
        />
        <div className="bg-destructive/10 border-destructive/20 border rounded-md p-4">
          <p className="text-destructive">Error: {result.error.message}</p>
        </div>
      </div>
    );
  }

  if (!result.success?.users) {
    return (
      <div className="space-y-6">
        <TitleBlock 
          title="KYC Approvals" 
          subtitle="Review and approve user KYC requests" 
        />
        <div className="bg-destructive/10 border-destructive/20 border rounded-md p-4">
          <p className="text-destructive">No data available</p>
        </div>
      </div>
    );
  }

  const { users } = result.success;

  // Filter out users without KYC data
  const usersWithKyc = users.filter((user): user is UserWithKYC => user.kyc !== null);

  return (
    <div className="space-y-6">
      <TitleBlock 
        title="KYC Approvals" 
        subtitle="Review and approve user KYC requests" 
      />

      {usersWithKyc.length === 0 ? (
        <div className="bg-accent border rounded-md p-4">
          <p>No pending KYC requests</p>
        </div>
      ) : (
        <KycApprovalList users={usersWithKyc} />
      )}
    </div>
  );
};

export default StudioKycPage;
