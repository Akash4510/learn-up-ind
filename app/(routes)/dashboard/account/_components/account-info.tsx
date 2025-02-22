"use client";

import React, { useState, useTransition } from "react";
import { Camera, Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { UserWithKYC } from "@/types/user";
import { UserAvatar } from "@/components/user-avatar";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/file-upload";
import { updateProfilePic } from "@/actions/account";
import { useSession } from "next-auth/react";

interface AccountInfoProps {
  user: UserWithKYC;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  const { update: upadteSession } = useSession();
  const [, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(user.username || "");
    setCopied(true);

    toast.success("Username copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const onProfilePicChange = (url: string) => {
    startTransition(() => {
      updateProfilePic(url)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            setIsDialogOpen(false);
            toast.success(success.message);

            // Update the session
            upadteSession();
          }
          if (error) {
            toast.error(error.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div>
      <div className="flex gap-6">
        <div className="relative group">
          <UserAvatar url={user.image} size={90} />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="hidden group-hover:flex absolute -top-1 -right-1 bg-accent rounded-full p-1.5">
                <Hint label="Edit Profile Photo" side="top" asChild>
                  <Camera className="size-4" />
                </Hint>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update your profile photo</DialogTitle>
                <DialogDescription>
                  Your profile photo helps people recognize you across the
                  platform.
                </DialogDescription>
              </DialogHeader>

              <FileUpload
                endpoint="profilePhoto"
                onChange={(url) => {
                  if (url) {
                    console.log("New image URL:", url);
                    onProfilePicChange(url);
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

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
