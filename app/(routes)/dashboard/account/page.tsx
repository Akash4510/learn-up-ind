import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { TitleBlock } from "@/components/title-block";
import { Separator } from "@/components/ui/separator";

import { AccountInfo } from "./_components/account-info";
import { PersonalInfo } from "./_components/personal-info";
import { KYC } from "./_components/kyc";

const AccountPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { kyc: true },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="space-y-6">
      <TitleBlock title="Profile" subtitle="View and edit your profile here" />
      <Separator className="!mt-3" />

      <AccountInfo user={user} />
      <PersonalInfo user={user} />
      <KYC user={user} />
    </div>
  );
};

export default AccountPage;
