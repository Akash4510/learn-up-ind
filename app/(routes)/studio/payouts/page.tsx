import { redirect } from "next/navigation";
import { USER_ROLE } from "@prisma/client";

import { auth } from "@/auth";
import { getPendingPayouts } from "@/actions/payout";
import { TitleBlock } from "@/components/title-block";
import { PendingPayoutsList } from "./_components/pending-payouts-list";

const PayoutsPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  if (session.user.role !== USER_ROLE.ADMIN) {
    redirect("/");
  }

  const result = await getPendingPayouts();

  if (result.error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{result.error.message}</p>
      </div>
    );
  }

  const { payouts } = result.success;

  return (
    <div className="space-y-6">
      <TitleBlock 
        title="Payout Requests" 
        subtitle="Process pending payout requests from affiliates" 
      />

      <div className="bg-accent border rounded-md p-4 space-y-3">
        <TitleBlock
          title="Pending Payouts"
          subtitle="Review and complete pending payout requests"
          size="sm"
        />
        
        <PendingPayoutsList payouts={payouts} />
      </div>
    </div>
  );
};

export default PayoutsPage;
