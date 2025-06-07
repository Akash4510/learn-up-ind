"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { User, USER_ROLE } from "@prisma/client";
import { toast } from "sonner";

import { DataTable } from "./data-table";
import { createColumns } from "./columns";
import { modifyUserRole } from "@/actions/auth/modify-user-role";

export const UsersTable = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onRoleChange = (userId: string, role: USER_ROLE) => {
    startTransition(() => {
      modifyUserRole(userId, role).then((data) => {
        const { success, error } = data;

        if (success) {
          toast.success(success.message);
        }
        if (error) toast.error(error.message);

        // To update the select value back to what it was on failure
        router.refresh();
      });
    });
  };

  const columns = createColumns(onRoleChange, isPending);

  return <DataTable data={users} columns={columns} />;
};
