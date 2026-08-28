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
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-[#F7F4EC]">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
