import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { adminAuthApi } from "../../api.service";
import { useRouter } from "next/router";
import { useState } from "react";
import GlobalLoader from "../components/ui/globalLoader";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

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
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setMainLoading(false);
    }
  };

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <>
      {!loading && (
        <div className="min-h-screen flex items-center justify-center px-8 bg-[linear-gradient(180deg,#f7e9c8_0%,#c9a15f_50%,#604528_100%)]">
          <div className="grid w-full max-w-[900px] grid-cols-2 items-center gap-6">
            <div className="text-[#2A2622]">
              <h1 className="text-6xl font-[550] tracking-[-0.045em]">SWAAD</h1>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-px w-9 bg-[#F7E6BA]/60" />

                <p className="text-[1.05rem] font-light italic tracking-wide text-[#F7E6BA]">
                  Taste of Punjab
                </p>

                <span className="h-px w-9 bg-[#F7E6BA]/60" />
              </div>
            </div>
            <div className="rounded-[18px] p-9 shadow-[10px_12px_35px_rgba(74,54,28,0.16)]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-7"
                noValidate
              >
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required!" })}
                    className="w-full rounded-xl bg-[#FFF8E7]/15 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 placeholder:text-[#806C52]/40 focus:bg-[#FFF8E7]/30"
                  />

                  {errors.email && (
                    <p className="mt-2 px-1 text-[12px] text-[#963F32]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required!",
                      })}
                      className="w-full rounded-xl bg-[#FFF8E7]/15 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 placeholder:text-[#806C52]/40 focus:bg-[#FFF8E7]/30"
                    />

                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-[#806C52] transition-colors hover:text-[#3E3021]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 px-1 text-[12px] text-[#963F32]">
                      {errors.password.message}
                    </p>
                  )}

                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => router.push("/forgot-password")}
                      className="text-sm font-medium text-[#6B5135] transition-colors hover:text-[#463421] hover:cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={mainLoading}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#463421] py-3.5 text-[1rem] font-medium tracking-wide text-[#FFF8E7] transition-all duration-300 hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {mainLoading ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
