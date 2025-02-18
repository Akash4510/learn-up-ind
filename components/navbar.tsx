"use client";

import Link from "next/link";
import { Bell, Clapperboard, MessageCircleMore } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
      <div className="flex flex-shrink-0 items-center">
        <div className="-mt-1">
          <Logo full asLink />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {user ? (
          <>
            <Button
              variant="accent"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link href="/dashboard">
                <MessageCircleMore className="size-[1.2rem]" />
              </Link>
            </Button>

            <Button
              variant="accent"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link href="/dashboard">
                <Bell className="size-[1.2rem]" />
              </Link>
            </Button>

            <Button variant="accent" className="mr-2" asChild>
              <Link href="/dashboard">
                <Clapperboard className="size-5 md:mr-2" />
                <span className="hidden md:block">Dashboard</span>
              </Link>
            </Button>

            <UserButton />
          </>
        ) : (
          <>
            <Button variant="accent" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
