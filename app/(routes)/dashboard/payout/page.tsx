import { redirect } from "next/navigation";
import { PAYOUT_STATUS } from "@prisma/client";

import { auth } from "@/auth";
import { getPayouts } from "@/actions/payout";
import { getAffiliateByUserId } from "@/actions/affiliate";
import { TitleBlock } from "@/components/title-block";
import { PayoutStatus } from "./_components/payout-status";
import { PayoutRequestForm } from "./_components/payout-request-form";

const PayoutPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const affiliate = await getAffiliateByUserId(session.user.id);

  if (!affiliate) {
    return (
      <div>
        <p>
          You are not an affiliate yet! Please purchase a course to become an
          affiliate and start earning
        </p>
      </div>
    );
  }

  const payouts = await getPayouts(session.user.id);

  let totalPendingPayout = 0;
  payouts.forEach((payout) => {
    if (payout.status === PAYOUT_STATUS.PENDING) {
      totalPendingPayout += payout.amount;
    }
  });

  const pendingPayouts = payouts.filter(
    (p) => p.status === PAYOUT_STATUS.PENDING
  );

  const completedPayouts = payouts.filter(
    (p) => p.status === PAYOUT_STATUS.COMPLETED
  );

  return (
    <div className="space-y-6">
      <TitleBlock title="Payouts" subtitle="View your payout status" />

      <div className="bg-card border rounded-md p-4 space-y-3">
        <TitleBlock
          title="Request Payout"
          subtitle="Request a payout for your earnings"
          size="sm"
        />

        <PayoutRequestForm
          affiliateId={affiliate.id}
          pendingPayout={affiliate.pendingPayout}
        />
      </div>

      <div>
        {payouts.length ? (
          <>
            {pendingPayouts.length > 0 && (
              <div className="bg-card border rounded-md p-4 space-y-3 mb-6">
                <TitleBlock
                  title="Total pending payout"
                  subtitle="Your total pending payout yet to be completed from our side"
                  size="sm"
                />

                <div className="space-y-3">
                  <input
                    type="text"
                    value={`₹ ${totalPendingPayout}`}
                    readOnly
                    className="w-full bg-background/60 rounded-md p-2 font-mono border-none focus:border-none outline-none focus:outline-none"
                  />

                  <div className="space-y-3">
                    <TitleBlock
                      title="Pending Payouts"
                      subtitle="Below are the payout requests which are still pending or being processed from our side"
                      size="sm"
                    />

                    <div className="flex flex-col gap-2">
                      {pendingPayouts.map((payout) => (
                        <PayoutStatus key={payout.id} payout={payout} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {completedPayouts.length > 0 && (
              <div className="bg-card border rounded-md p-4 space-y-3">
                <TitleBlock
                  title="Completed Payouts"
                  subtitle="Your payout history"
                  size="sm"
                />

                <div className="flex flex-col gap-2">
                  {completedPayouts.map((payout) => (
                    <PayoutStatus key={payout.id} payout={payout} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <p>No payout history</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutPage;
