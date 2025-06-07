"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User, USER_ROLE } from "@prisma/client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const createColumns = (
  onRoleChange: (userId: string, role: USER_ROLE) => void,
  isPending: boolean
) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "User Name",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card">
              <DropdownMenuLabel>Change role to</DropdownMenuLabel>
              {[USER_ROLE.ADMIN, USER_ROLE.CREATOR, USER_ROLE.USER]
                .filter((role) => role !== user.role)
                .map((role) => (
                  <DropdownMenuItem
                    key={role}
                    className={cn(
                      "cursor-pointer",
                      role === USER_ROLE.ADMIN && "!text-destructive"
                    )}
                    onClick={() => onRoleChange(user.id, role)}
                    disabled={isPending}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
