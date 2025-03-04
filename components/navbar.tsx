"use client";

import Link from "next/link";
import { Bell, Clapperboard } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { mainMenus } from "@/constants/nav-menus";

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="h-full flex-1 flex items-center justify-between gap-4">
      <div className="flex flex-shrink-0 items-center">
        <div className="md:hidden flex items-center">
          {/* Mobile Sidebar Trigger */}
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>

        <div className="-mt-1">
          <Logo full asLink />
        </div>
      </div>

      <div className="hidden lg:flex ml-24">
        <NavigationMenu>
          <NavigationMenuList>
            {mainMenus.map((route) => (
              <NavigationMenuItem key={route.href}>
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {route.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center justify-center gap-2">
        {user ? (
          <>
            <Button
              variant="accent"
              size="icon"
              className="hidden sm:flex"
              asChild
            >
              <Link href="/dashboard">
                <Bell className="size-6" />
              </Link>
            </Button>

            <Button variant="accent" asChild>
              <Link href="/dashboard">
                <Clapperboard className="size-5 md:mr-2" />
                <span className="hidden sm:block">Dashboard</span>
              </Link>
            </Button>

            <ThemeToggle />

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
