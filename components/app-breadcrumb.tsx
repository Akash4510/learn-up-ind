"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Helper function to convert a string to title case
const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1)); // Capitalize each word
};

interface AppBreadcrumbProps {
  showHome?: boolean;
}

export const AppBreadcrumb = ({ showHome }: AppBreadcrumbProps) => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Map route segments to breadcrumb labels
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = toTitleCase(segment); // Convert to title case

    return {
      label,
      href,
      isActive: href === pathname, // Check if this is the active page
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {showHome && (
          <BreadcrumbItem>
            {pathname === "/" ? (
              // Active page (no link, white text)
              <span className="text-white">Home</span>
            ) : (
              // Non-active page (link)
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )}

        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {(!!index || showHome) && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isActive ? (
                // Active page (no link, white text)
                <span className="text-white">{item.label}</span>
              ) : (
                // Non-active page (link)
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
