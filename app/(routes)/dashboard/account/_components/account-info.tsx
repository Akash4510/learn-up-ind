"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { UserWithKYC } from "@/types/user";
import { UserAvatar } from "@/components/user-avatar";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";

interface AccountInfoProps {
  user: UserWithKYC;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(user.username || "");
    setCopied(true);

    toast.success("Username copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex gap-6">
        <UserAvatar url={user.image} size={90} />

        <div className="mt-1">
          <p className="text-xl font-medium">{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>

          <div className="pt-2 flex items-center gap-2">
            <p className="font-bold">{user.username}</p>
            <Hint label="Copy username" side="right" asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCopy}
                className="size-6"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4 text-muted-foreground" />
                )}
              </Button>
            </Hint>
          </div>
        </div>
      </div>
    </div>
  );
};
