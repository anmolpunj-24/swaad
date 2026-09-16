import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import useAuth from "@/hooks/useAuth";
import GlobalLoader from "@/components/ui/globalLoader";

export default function BaseLayout({ children }) {
  const { loading, authenticated } = useAuth(true);

  if (loading) {
    return <GlobalLoader />;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar />

        <main className="min-h-0 flex-1 overflow-y-auto bg-[#F8F5ED] p-8">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
