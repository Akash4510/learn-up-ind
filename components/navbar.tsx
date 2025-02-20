"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Clapperboard, LogOut } from "lucide-react";

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

import { useAuth } from "@/hooks/use-auth";
import { mainRoutes } from "@/constants/nav-routes";
import { MobileSidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
      <div className="flex flex-shrink-0 items-center">
        <MobileSidebar />
        <div className="-mt-1">
          <Logo full asLink />
        </div>
      </div>

      <div className="hidden lg:flex ml-24">
        {!isDashboard && (
          <NavigationMenu>
            <NavigationMenuList>
              {mainRoutes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        {user ? (
          <>
            {!isDashboard && (
              <>
                <ThemeToggle />

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
              </>
            )}

            {isDashboard ? (
              <Button variant="accent" className="mr-2" asChild>
                <Link href="/">
                  <LogOut className="size-5 md:mr-1" />
                  <span className="hidden sm:block">Exit Dashboard</span>
                </Link>
              </Button>
            ) : (
              <Button variant="accent" className="mr-2" asChild>
                <Link href="/dashboard">
                  <Clapperboard className="size-5 md:mr-2" />
                  <span className="hidden sm:block">Dashboard</span>
                </Link>
              </Button>
            )}

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
