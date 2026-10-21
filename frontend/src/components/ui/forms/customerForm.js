import { useForm, Controller } from "react-hook-form";
import { Check, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useEffect } from "react";
import GenericInput from "../genericInput";
import GenericSelect from "../genericSelect";
import GenericDateTimeInput from "../genericDateTimeInput";

export default function CustomerForm({
  defaultValues = {
    gender: "",
    dob: null,
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [
    reset,
    defaultValues.gender,
    defaultValues.dob,
    defaultValues.phone,
    defaultValues.isActive,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8 rounded-2xl border border-[#E6DDCD] bg-white p-7 shadow-[0_12px_40px_rgba(78,57,28,0.07)]"
    >
      <div>
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <UserRound size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Customer Information
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Update the personal information associated with this customer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GenericInput
            id="phone"
            label="Phone"
            type="tel"
            disabled={loading}
            error={errors.phone?.message}
            icon={Phone}
            maxLength={10}
            {...register("phone", {
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must contain 10 digits!",
              },
            })}
          />

          <GenericSelect
            id="gender"
            label="Gender"
            disabled={loading}
            error={errors.gender?.message}
            icon={UserRound}
            {...register("gender", {})}
          >
            <option value="" disabled>
              Select gender
            </option>

            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </GenericSelect>

          <GenericDateTimeInput
            id="dob"
            name="dob"
            label="Date of Birth"
            control={control}
            disabled={loading}
            maxDate="today"
            minDate="1900-01-01"
            error={errors.dob?.message}
          />
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Customer Status
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Control whether this customer account is currently active.
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
                    {field.value
                      ? "Customer is active"
                      : "Customer is inactive"}
                  </p>

                  <p className="mt-1 text-xs text-[#95846D]">
                    {field.value
                      ? "This customer can use the platform."
                      : "This customer will not be able to use the platform."}
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

          <span>Review the changes before updating the customer.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              {loadingButtonText}
            </>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </form>
  );
}
