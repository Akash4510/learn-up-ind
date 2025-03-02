import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="md:hidden">
        <AppSidebar />
      </div>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b px-4">
          <Navbar />
        </header>

        <div className="flex flex-1 flex-col gap-4">
          <main className="p-4 pb-10">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
