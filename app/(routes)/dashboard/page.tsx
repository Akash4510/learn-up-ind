import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  getAffiliateByUserId,
  getAffiliateEarningMetrics,
} from "@/actions/affiliate";
import { AmountCard } from "@/components/amount-card";
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
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col justify-center items-center gap-5 lg:w-[400px] border rounded-md py-6 bg-gradient-to-bl from-card to-accent">
        <div>
          <UserAvatar url={session.user.image} size={100} />
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold">{session.user.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">My Earnings</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="flex-1 grid grid-cols-1 gap-4">
          <AmountCard
            title="Today's Earning"
            amount={todayEarnings}
            className="bg-gradient-to-bl from-sky-700 to-bg-card hover:scale-[102%] transition-all"
          />
          <AmountCard
            title="Last Month's Earning"
            amount={lastMonthEarnings}
            className="bg-gradient-to-bl from-cyan-800 to-bg-card hover:scale-[102%] transition-all"
          />
          <AmountCard
            title="Last Week's Earning"
            amount={lastWeekEarnings}
            className="bg-gradient-to-bl from-secondary to-bg-card hover:scale-[102%] transition-all"
          />
          <AmountCard
            title="Total Earning"
            amount={totalEarnings}
            className="bg-gradient-to-bl from-primary/70 to-bg-card hover:scale-[102%] transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
