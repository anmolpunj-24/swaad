import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { adminAuthApi } from "../../api.service";
import { toast } from "sonner";

const useAuth = (requireAuth = false) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const isAtRoot = router.asPath === "/";

      if (!token) {
        setAuthenticated(false);
        setLoading(false);

        if (requireAuth && !isAtRoot) {
          toast.error("Please login to continue.");
          router.replace("/");
        }

        return;
      }

      if (!requireAuth) {
        setAuthenticated(true);
        setLoading(false);
        if (router.asPath !== "/dashboard") {
          await router.replace("/dashboard");
        }
        return;
      }

      try {
        const response = await adminAuthApi.currentUser();

        if (response?.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          localStorage.removeItem("accessToken");

          if (requireAuth) {
            router.replace("/");
          }
        }
      } catch (error) {
        setAuthenticated(false);
        localStorage.removeItem("accessToken");

        if (requireAuth && !isAtRoot) {
          toast.error("Your session has expired. Please login again.", {
            id: "session-expired",
          });
          await router.replace("/");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, router.isReady, router.asPath]);

  return {
    loading,
    authenticated,
  };
};

export default useAuth;
