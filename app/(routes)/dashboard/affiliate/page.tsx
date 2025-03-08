import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getAffiliateByUserId } from "@/actions/affiliate/get-affiliate";

import { ReferralCodeBlock } from "./_components/referral-code-block";
import { ReferralLinkBlock } from "./_components/referral-link-block";

const AffiliatePage = async () => {
  const session = await auth();

  if (!session || !session.user.id) {
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div>
          <h3 className="text-2xl">
            Total Referrals -{" "}
            <span className="font-medium">{affiliate.referrals.length}</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Your completed referrals till now
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReferralCodeBlock code={affiliate.referralCode} />
        <ReferralLinkBlock code={affiliate.referralCode} />
      </div>
    </div>
  );
};

export default AffiliatePage;
