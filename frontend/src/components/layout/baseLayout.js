import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

export default function BaseLayout({ children }) {
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
