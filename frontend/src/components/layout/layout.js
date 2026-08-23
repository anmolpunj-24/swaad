import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>

      <Footer />
    </>
  );
}
