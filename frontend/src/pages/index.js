import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
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

            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required!",
                })}
                className="w-full rounded-xl bg-[#FFF8E7]/15 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 placeholder:text-[#806C52]/40 focus:bg-[#FFF8E7]/30"
              />

              {errors.password && (
                <p className="mt-2 px-1 text-[12px] text-[#963F32]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-full bg-[#463421] py-3.5 text-[1rem] font-medium tracking-wide text-[#F8E9C5] transition-all duration-300 hover:bg-[#362719] hover:shadow-[0_8px_24px_rgba(70,52,33,0.28)] hover:cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
