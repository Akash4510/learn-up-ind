import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const StudioLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="w-full h-16 fixed top-0 z-50 bg-background border-b">
        <Navbar />
      </header>

      <div className="pt-16 flex flex-row flex-1 h-screen">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 p-4 pb-10">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default StudioLayout;
