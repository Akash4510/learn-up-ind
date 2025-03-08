import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  getAffiliateByUserId,
  getAffiliateEarningMetrics,
} from "@/actions/affiliate";
import { AmountCard } from "@/components/amount-card";
import { TitleBlock } from "@/components/title-block";
import { UserAvatar } from "@/components/user-avatar";

const DashboardPage = async () => {
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

  const { totalEarnings, lastMonthEarnings, lastWeekEarnings, todayEarnings } =
    await getAffiliateEarningMetrics(affiliate.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <UserAvatar url={session.user.image} />
        </div>

        <div>
          <h3 className="text-2xl">
            Total Referrals -{" "}
            <span className="font-medium">{affiliate.referrals.length}</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            You have completed {affiliate.referrals.length} referrals till now
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <TitleBlock
          title="Your earnings"
          subtitle="View your detailed earnings analytics here"
          size="sm"
        />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <AmountCard title="Today's Earning" amount={todayEarnings} />
          <AmountCard title="Last Month's Earning" amount={lastMonthEarnings} />
          <AmountCard title="Last Week's Earning" amount={lastWeekEarnings} />
          <AmountCard title="Total Earning" amount={totalEarnings} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
