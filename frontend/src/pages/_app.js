import "@/styles/globals.css";
import BaseLayout from "@/components/layout/baseLayout";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import GlobalLoader from "@/components/ui/globalLoader";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isLogin = router.pathname === "/";

  return isLogin ? (
    <>
      <Toaster position="top-right" duration={3000}/>
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
