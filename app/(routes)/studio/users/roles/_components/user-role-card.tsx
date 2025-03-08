"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { User, USER_ROLE } from "@prisma/client";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modifyUserRole } from "@/actions/auth/modify-user-role";

interface UserRoleCardProps {
  user: User;
}

export const UserRoleCard = ({ user }: UserRoleCardProps) => {
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

  return (
    <div className="w-full p-4 bg-accent rounded-md flex items-center justify-between">
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>

      <div>
        <Select
          disabled={isPending}
          defaultValue={user.role}
          onValueChange={(role) => onRoleChange(user.id, role as USER_ROLE)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {[USER_ROLE.ADMIN, USER_ROLE.CREATOR, USER_ROLE.USER].map(
              (role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
