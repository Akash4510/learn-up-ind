"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Settings,
  UserIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { dashboardMenus, studioMenus } from "@/constants/sidebar-menus";
import { mainMenus } from "@/constants/nav-menus";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/actions/auth";
import { SidebarLink } from "./sidebar-link";

export const AppSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Determine which menu to show based on authentication status
  const menuGroups = user
    ? pathname.startsWith("/dashboard")
      ? dashboardMenus
      : studioMenus
    : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Logo />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h1 className="text-xl truncate font-medium">LearnUPIND</h1>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {user ? (
          // Render dashboard/studio menus for logged-in users
          menuGroups.map((group) => (
            <SidebarGroup key={group.groupLabel}>
              <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
              <SidebarMenu>
                {group.menus.map((item) => (
                  <React.Fragment key={item.label}>
                    {item.isCollapsible ? (
                      // Render collapsible menu
                      <Collapsible asChild defaultOpen={item.isOpen}>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild tooltip={item.label}>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <ChevronRight />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.label}>
                                  <SidebarMenuSubButton asChild>
                                    <SidebarLink href={subItem.url}>
                                      {subItem.icon && <subItem.icon />}
                                      <span>{subItem.label}</span>
                                    </SidebarLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      // Render non-collapsible menu
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={item.label}>
                          <SidebarLink href={item.url}>
                            {item.icon && <item.icon />}
                            <span>{item.label}</span>
                          </SidebarLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))
        ) : (
          // Render mainMenus for non-logged-in users
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {mainMenus.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <SidebarLink href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const UserMenu = () => {
  const { user } = useAuth();
  const { isMobile } = useSidebar();

  if (!user) {
    return null;
  }

  const onLogoutClick = async () => {
    await logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image || ""} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  <UserIcon className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="bg-card shadow-2xl p-4 px-2 mr-5 relative z-[999] w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <div className="flex items-center gap-4 px-2 pr-5 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-muted">
                  <UserIcon className="size-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs">{user.email}</p>
              </div>
            </div>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard/account" className="px-3 py-2.5">
                <Settings className="h-4 w-4 mr-3" />
                <span>Manage Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              onClick={onLogoutClick}
              className="cursor-pointer"
            >
              <div className="px-3 py-2.5">
                <LogOut className="h-4 w-4 mr-3" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
