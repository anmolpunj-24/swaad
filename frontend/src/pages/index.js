import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_45%,#FFECBD_1%,transparent_35%),radial-gradient(circle_at_15%_20%,#DDBB72_0%,transparent_35%),radial-gradient(circle_at_85%_80%,#C99A4E_0%,transparent_35%),linear-gradient(135deg,#2A1D12,#76572D,#2A1D12)]">
      <h1 className="text-center text-5xl font-[550] tracking-[-0.02rem] text-[#2A2622] pt-18">
        SWAAD Login
      </h1>
      <div className="mx-auto mt-12 w-full max-w-[40%] rounded-[10px] border border-white/5 bg-black/[0.15] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[3px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-2 left-3 z-10 px-2 text-sm font-medium text-[#F7E6BA]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required!" })}
              className="w-full rounded-xl border border-white/15 bg-black/10 px-4 py-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-[#2A2622]/50 focus:bg-black/15"
            />

            {errors.email && (
              <p className="mt-2 px-1 text-[12px] text-red-300">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="absolute -top-2 left-3 z-10 px-2 text-sm font-medium text-[#F7E6BA]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required!",
              })}
              className="w-full rounded-xl border border-white/15 bg-black/10 px-4 py-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-[#2A2622]/50 focus:bg-black/15"
            />

            {errors.password && (
              <p className="mt-2 px-1 text-[12px] text-red-300">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-full bg-[#2A2622] py-3.5 text-[1rem] font-medium tracking-wide text-[#F7E6BA] transition-all duration-300 hover:bg-[#211E1B] hover:shadow-[0_8px_24px_rgba(42,38,34,0.3)] hover:cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
