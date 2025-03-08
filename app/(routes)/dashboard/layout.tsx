import Link from "next/link";
import { redirect } from "next/navigation";
import { USER_ROLE } from "@prisma/client";

import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Footer } from "@/components/footer";
import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <AppBreadcrumb />

          {session.user.role === USER_ROLE.ADMIN ||
            (session.user.role === USER_ROLE.CREATOR && (
              <Button variant="accent" className="ml-auto" size="sm" asChild>
                <Link href="/studio">
                  <Clapperboard className="size-4" />
                  <span className="hidden md:flex">Go to Studio</span>
                </Link>
              </Button>
            ))}
        </header>

        <div className="flex flex-1 flex-col gap-4">
          <main className="p-4 pb-10">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
