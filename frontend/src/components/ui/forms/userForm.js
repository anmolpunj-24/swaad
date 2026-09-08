import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/confetti.css";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function UserForm({
  defaultValues = {
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    phone: "",
    isActive: true,
  },
  onSubmit,
  buttonText,
  loading = false,
  loadingButtonText,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-7 md:grid-cols-2"
      noValidate
    >
      <div>
        <div className="relative">
          <label
            htmlFor="name"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            disabled={loading}
            {...register("name", {
              required: "Name is required!",
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {errors.name && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
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
            disabled={loading}
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email!",
              },
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

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
            disabled={loading}
            {...register("password", {
              required: "Password is required!",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain 8+ characters, uppercase, lowercase, number and special character!",
              },
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={loading}
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
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="gender"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Gender
          </label>

          <div className="relative">
            <select
              id="gender"
              disabled={loading}
              {...register("gender", {
                required: "Gender is required!",
              })}
              className="w-full appearance-none rounded-xl bg-[#F3E8D0]/50 px-4 py-4 pr-12 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52]"
            />
          </div>
        </div>

        {errors.gender && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.gender.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="dob"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Date of Birth
          </label>

          <Controller
            name="dob"
            control={control}
            rules={{
              required: "Date of birth is required!",
            }}
            render={({ field }) => (
              <Flatpickr
                value={field.value}
                onChange={(dates) => {
                  field.onChange(dates[0] || null);
                }}
                options={{
                  dateFormat: "Y-m-d",
                  altInput: true,
                  altFormat: "F j, Y",
                  maxDate: "today",
                  minDate: "1900-01-01",
                }}
                disabled={loading}
                className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
              />
            )}
          />
        </div>

        {errors.dob && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.dob.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="phone"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Phone
          </label>

          <input
            id="phone"
            type="tel"
            disabled={loading}
            {...register("phone", {
              required: "Phone is required!",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must contain 10 digits!",
              },
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {errors.phone && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="isActive"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            User Status
          </label>

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                id="isActive"
                disabled={loading}
                onClick={() => field.onChange(!field.value)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-4 outline-none transition-all duration-300 ${
                  field.value ? "bg-[#F3E8D0]" : "bg-[#F3E8D0]/50"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span className="text-[#3E3021]">
                  {field.value ? "Active" : "Inactive"}
                </span>

                <span
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    field.value ? "bg-[#9B7A43]" : "bg-[#806C52]/40"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-[#FFF8E7] shadow-sm transition-transform duration-300 ${
                      field.value ? "translate-x-[3px]" : "-translate-x-[18px]"
                    }`}
                  />
                </span>
              </button>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 md:col-span-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => router.back()}
          className="rounded-full border border-[#9B7A43] px-7 py-3 font-medium tracking-wide text-[#4B3927] transition-all duration-200 hover:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#463421] px-8 py-3 font-medium tracking-wide text-[#FFF8E7] transition-all duration-200 hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          {loading ? loadingButtonText : buttonText}
        </button>
      </div>
    </form>
  );
}
