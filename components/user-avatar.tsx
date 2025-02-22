import { UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  url: string | null;
  size?: number;
}

export const UserAvatar = ({ url, size = 50 }: UserAvatarProps) => {
  return (
    <Avatar style={{ width: size, height: size }}>
      <AvatarImage src={url || ""} />
      <AvatarFallback className="bg-muted">
        <UserIcon style={{ width: size / 2, height: size / 2 }} />
      </AvatarFallback>
    </Avatar>
  );
};
