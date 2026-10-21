import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { adminAuthApi } from "../../api.service";
import { useRouter } from "next/router";
import { useState } from "react";
import GlobalLoader from "../components/ui/globalLoader";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderCircle, ArrowRight } from "lucide-react";
import GenericInput from "@/components/ui/genericInput";

export default function Login() {
  const { loading } = useAuth(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mainLoading, setMainLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    setMainLoading(true);

    try {
      const res = await adminAuthApi.login(loginData);

      if (res?.status === 200) {
        localStorage.setItem("accessToken", res.data.token);

        toast.success(res?.data?.message);

        router.replace("/dashboard");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      const errors = error.response?.data?.error;
      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((err) => {
          toast.error(`${err.message}`);
        });
      } else {
        toast.error(error.response?.data?.message ?? "An error occurred");
      }
    } finally {
      setMainLoading(false);
    }
  };

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#F0E0BB] px-5 py-10">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#9B7A43]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#463421]/10 blur-3xl" />
      <div className="relative grid w-full max-w-[900px] items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-6xl font-semibold tracking-[-0.055em] text-[#2A2622] sm:text-7xl">
            SWAAD
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#9B7A43]/60" />

            <p className="text-sm font-medium italic tracking-[0.12em] text-[#806C52]">
              Taste of Punjab
            </p>

            <span className="h-px w-8 bg-[#9B7A43]/60" />
          </div>
        </div>

        <div className="rounded-[28px] border border-[#9B7A43]/20 bg-[#FFF8E7]/70 p-7 shadow-[0_20px_60px_rgba(74,54,28,0.12)] backdrop-blur-xl sm:p-9">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-wide text-[#4B3927]">
              Welcome back
            </h2>

            <p className="mt-1.5 text-sm text-[#806C52]">
              Sign in to your SWAAD dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            <GenericInput
              id="email"
              label="Email"
              type="email"
              variant="cream"
              disabled={mainLoading}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required!",
              })}
            />

            <GenericInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="cream"
              disabled={mainLoading}
              error={errors.password?.message}
              button={showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              onButtonClick={togglePassword}
              {...register("password", {
                required: "Password is required!",
              })}
            />

            <button
              type="button"
              disabled={mainLoading}
              onClick={() => router.push("/forgot-password")}
              className="flex justify-end text-xs font-medium text-[#806C52] transition-colors duration-200 hover:text-[#463421] hover:underline disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
            >
              Forgot password?
            </button>

            <button
              type="submit"
              disabled={mainLoading}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#463421] py-3.5 text-sm font-semibold tracking-wide text-[#FFF8E7] shadow-sm transition-all duration-300 hover:bg-[#59432C] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 hover:cursor-pointer"
            >
              {mainLoading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-px flex-1 bg-[#9B7A43]/15" />

            <span className="text-[10px] uppercase tracking-[0.15em] text-[#806C52]/50">
              Admin Portal
            </span>

            <span className="h-px flex-1 bg-[#9B7A43]/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
