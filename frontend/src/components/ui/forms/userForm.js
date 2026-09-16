import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/confetti.css";
import {
  CalendarDays,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import GenericInput from "../genericInput";
import GenericSelect from "../genericSelect";

export default function UserForm({
  defaultValues = {
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: null,
    phone: "",
    isActive: false,
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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password");

  const passwordRules = [
    {
      label: "8+ characters",
      valid: password?.length >= 8,
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(password || ""),
    },
    {
      label: "Lowercase letter",
      valid: /[a-z]/.test(password || ""),
    },
    {
      label: "Number",
      valid: /\d/.test(password || ""),
    },
    {
      label: "Special character",
      valid: /[@$!%*?&]/.test(password || ""),
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-7 space-y-8 rounded-2xl border border-[#E6DDCD] bg-white shadow-[0_12px_40px_rgba(78,57,28,0.07)]"
    >
      <div>
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <UserRound size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Account Information
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Add the basic information for this user account.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GenericInput
            id="name"
            label="Name"
            required
            disabled={loading}
            error={errors.name?.message}
            icon={UserRound}
            {...register("name", {
              required: "Name is required!",
            })}
          />

          <GenericInput
            id="email"
            label="Email"
            type="email"
            required
            disabled={loading}
            error={errors.email?.message}
            icon={Mail}
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email!",
              },
            })}
          />

          <GenericInput
            id="phone"
            label="Phone"
            type="tel"
            required
            disabled={loading}
            error={errors.phone?.message}
            icon={Phone}
            maxLength={10}
            {...register("phone", {
              required: "Phone is required!",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must contain 10 digits!",
              },
            })}
          />

          <GenericSelect
            id="gender"
            label="Gender"
            required
            disabled={loading}
            error={errors.gender?.message}
            icon={UserRound}
            {...register("gender", {
              required: "Gender is required!",
            })}
          >
            <option value="" disabled>
              Select gender
            </option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </GenericSelect>

          <div>
            <div className="relative">
              <label
                htmlFor="dob"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Date of Birth <span className="text-[#B28B4C]">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9B7A43]"
                />

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
                        static: true,
                      }}
                      disabled={loading}
                      className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white pl-11 pr-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  )}
                />
              </div>
            </div>

            {errors.dob && (
              <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                {errors.dob.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <LockKeyhole size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Account Security
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Set a secure password for the new account.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Password <span className="text-[#B28B4C]">*</span>
              </label>

              <LockKeyhole
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9B7A43]"
              />

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
                className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white pl-11 pr-12 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52] transition hover:text-[#463421] disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-[#E9DFC9] bg-[#FCF8EF] p-4">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#A47E43]" />

              <p className="text-xs font-bold text-[#594630]">
                Password requirements
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {passwordRules.map((rule) => (
                <div key={rule.label} className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full transition ${
                      rule.valid
                        ? "bg-[#B18A4D] text-white"
                        : "bg-[#E3DCCF] text-transparent"
                    }`}
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>

                  <span
                    className={`text-[11px] ${
                      rule.valid
                        ? "font-semibold text-[#6A5438]"
                        : "text-[#9A8B77]"
                    }`}
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">Account Status</h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Control whether this user can access the system.
            </p>
          </div>
        </div>

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <button
              type="button"
              disabled={loading}
              onClick={() => field.onChange(!field.value)}
              className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                field.value
                  ? "border-[#DCC9A5] bg-[#FCF8EF]"
                  : "border-[#E5DDD0] bg-[#FCFBF8]"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                    field.value
                      ? "bg-[#F1E1C2] text-[#9B783E]"
                      : "bg-[#ECE8E1] text-[#948878]"
                  }`}
                >
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#4B3929]">
                    {field.value ? "Account is active" : "Account is inactive"}
                  </p>

                  <p className="mt-1 text-xs text-[#95846D]">
                    {field.value
                      ? "This user can access the system."
                      : "This user will not be able to access the system."}
                  </p>
                </div>
              </div>

              <span
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                  field.value ? "bg-[#B18A4D]" : "bg-[#CFC7B9]"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    field.value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </span>
            </button>
          )}
        />
      </div>

      <div className="flex flex-col-reverse gap-4 border-t border-[#ECE4D6] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-[#95846C]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0E5D1] text-[#9B783E]">
            <Check size={13} />
          </span>

          <span>Review the information before creating the account.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {loadingButtonText}
            </>
          ) : (
            <>{buttonText}</>
          )}
        </button>
      </div>
    </form>
  );
}
