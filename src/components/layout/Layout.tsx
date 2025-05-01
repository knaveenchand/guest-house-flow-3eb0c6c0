
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full bg-black text-white">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
