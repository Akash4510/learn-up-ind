"use client";

import Link from "next/link";

import { useSidebar } from "@/components/ui/sidebar";

interface SidebarLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export const SidebarLink = ({
  children,
  onClick,
  ...props
}: SidebarLinkProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
