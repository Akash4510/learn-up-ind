import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

import { AccountInfo } from "../_components/account-info";
import { KYC } from "../_components/kyc";

const AccountKYCPage = async () => {
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
      <AccountInfo user={user} />

      <div className="max-w-[1000px] space-y-4">
        <KYC user={user} />

        <div className="p-4 bg-accent rounded-lg">
          <Link
            href="/dashboard/account"
            className="hover:underline underline-offset-4 flex items-center gap-1"
          >
            Want to view or edit your personal details? Click Here{" "}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountKYCPage;
