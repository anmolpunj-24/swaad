import "@/styles/globals.css";
import BaseLayout from "@/components/layout/baseLayout";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import GlobalLoader from "@/components/ui/globalLoader";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const pagesToNotShowHeaderFooterSidebar =
    router.pathname === "/" ||
    router.pathname === "/404" ||
    router.pathname === "/500";

  return pagesToNotShowHeaderFooterSidebar ? (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  ) : (
    <>
      {/* <GlobalLoader /> */}
      <Toaster />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
}
