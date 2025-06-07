import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { TitleBlock } from "@/components/title-block";
import { UsersTable } from "./_components/users-table";

const UserRoleManagementPage = async () => {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const users = await db.user.findMany({
    where: {
      NOT: [{ id: session.user.id }],
    },
  });

  return (
    <div className="space-y-6">
      <TitleBlock
        title="Manage User Roles"
        subtitle="Be cautious while managing user roles! This action might be dangerous."
      />

      <UsersTable users={users} />
    </div>
  );
};

export default UserRoleManagementPage;
