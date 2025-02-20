import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="w-full h-16 fixed top-0 z-50 bg-background border-b">
        <Navbar />
      </header>

      <div className="pt-16 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
