import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { CourseWithProgress } from "@/types/course";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface CourseNavbarProps {
  course: CourseWithProgress;
  progressCount: number;
}

export const CourseNavbar = ({}: CourseNavbarProps) => {
  return (
    <>
      <div className="md:hidden pl-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-2 justify-end w-full">
        <Button variant="accent" asChild>
          <Link href="/dashboard">
            <LayoutDashboard size={18} className="md:mr-2" />
            <span className="hidden md:flex">Go to dashboard</span>
          </Link>
        </Button>

        <Button variant="accent" asChild>
          <Link href="/">
            <LogOut size={18} className="md:mr-2" />
            <span className="hidden md:flex">Exit</span>
          </Link>
        </Button>

        <UserButton />
      </div>
    </>
  );
};
