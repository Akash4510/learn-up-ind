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

export const AppBreadcrumb = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Map route segments to breadcrumb labels
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize the first letter

    return {
      label,
      href,
      isActive: href === pathname, // Check if this is the active page
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {!!index && <BreadcrumbSeparator />}
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
