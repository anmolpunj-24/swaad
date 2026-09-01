import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { adminAuthApi } from "../../api.service";
import { toast } from "sonner";

const useAuth = (requireAuth = false) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setAuthenticated(false);
        setLoading(false);

        if (requireAuth) {
          toast.error("Please login to continue.");
          router.replace("/");
        }

        return;
      }

      if (!requireAuth) {
        setAuthenticated(true);
        setLoading(false);
        router.replace("/dashboard");
        return;
      }

      try {
        const response = await adminAuthApi.currentUser();

        if (response?.status === 200) {
          setAuthenticated(true);

          if (!requireAuth) {
            router.replace("/dashboard");
          }
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

        if (requireAuth) {
          toast.error("Your session has expired. Please login again.");
          router.replace("/");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, router]);

  return {
    loading,
    authenticated,
  };
};

export default useAuth;
