import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Check,
  TicketPercent,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import GenericInput from "../genericInput";
import GenericDateTimeInput from "../genericDateTimeInput";
import GenericTextarea from "../genericTextArea";

const generateCouponCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 8; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  return code;
};

export default function CouponForm({
  defaultValues = {
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: 0,
    maxDiscountAmount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    usedCount: 0,
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
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const discountType = watch("discountType");

  useEffect(() => {
    reset({
      ...defaultValues,
      startDate: defaultValues.startDate,
      endDate: defaultValues.endDate,
    });
  }, [
    reset,
    defaultValues.code,
    defaultValues.description,
    defaultValues.discountType,
    defaultValues.discountValue,
    defaultValues.minOrderAmount,
    defaultValues.maxDiscountAmount,
    defaultValues.startDate,
    defaultValues.endDate,
    defaultValues.usageLimit,
    defaultValues.usedCount,
    defaultValues.isActive,
  ]);

  const handleGenerateCode = () => {
    setValue("code", generateCouponCode(), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const submitForm = (data) => {
    onSubmit({
      ...data,
      code: data.code.trim().toUpperCase(),
      discountValue: Number(data.discountValue),
      minOrderAmount: Number(data.minOrderAmount || 0),
      maxDiscountAmount:
        data.maxDiscountAmount === "" || data.maxDiscountAmount === null
          ? null
          : Number(data.maxDiscountAmount),
      usageLimit:
        data.usageLimit === "" || data.usageLimit === null
          ? null
          : Number(data.usageLimit),
      usedCount: Number(data.usedCount || 0),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      noValidate
      className="space-y-8 rounded-2xl border border-[#E6DDCD] bg-white p-7 shadow-[0_12px_40px_rgba(78,57,28,0.07)]"
    >
      <div>
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <TicketPercent size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Coupon Information
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Create a unique coupon code and describe the offer available to
              your customers.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex-1">
            <GenericInput
              id="code"
              label="Coupon Code"
              required
              type="text"
              disabled={loading}
              autoComplete="off"
              placeholder="e.g. WELCOME20"
              extraText="Enter your own code or generate a random 8-character code."
              error={errors.code?.message}
              button={<Sparkles size={16} />}
              onButtonClick={handleGenerateCode}
              buttonDisabled={loading}
              {...register("code", {
                required: "Coupon code is required!",
                pattern: {
                  value: /^[A-Za-z0-9_-]+$/,
                  message:
                    "Coupon code can contain only letters, numbers, hyphens, and underscores!",
                },
                validate: (value) =>
                  value.trim().length > 0 || "Coupon code cannot be empty!",
                onChange: (e) => {
                  setValue("code", e.target.value.toUpperCase(), {
                    shouldDirty: true,
                    shouldValidate: false,
                  });
                },
              })}
              inputClassname={true}
            />
          </div>

          <GenericTextarea
            id="description"
            label="Description"
            register={register("description")}
            placeholder="Describe the coupon offer..."
            rows={4}
            minHeight="110px"
            resize="y"
            disabled={loading}
          />
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <Tag size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Discount Settings
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Choose the discount type and configure the minimum order
              requirements.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-[12px] font-bold tracking-wide text-[#66533C]">
              Discount Type <span className="text-[#B28B4C">*</span>
            </label>

            <Controller
              name="discountType"
              control={control}
              rules={{ required: "Discount type is required!" }}
              render={({ field }) => (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      value: "percentage",
                      title: "Percentage Discount",
                      description: "Reduce the order total by a percentage.",
                      symbol: "%",
                    },
                    {
                      value: "fixed",
                      title: "Fixed Discount",
                      description: "Deduct a fixed amount from the order.",
                      symbol: "₹",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      disabled={loading}
                      onClick={() => field.onChange(option.value)}
                      className={`rounded-2xl border p-5 text-left transition ${
                        field.value === option.value
                          ? "border-[#DCC9A5] bg-[#FCF8EF] ring-2 ring-[#EADCC2]/40"
                          : "border-[#E5DDD0] bg-white hover:bg-[#FCFBF8]"
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
                            field.value === option.value
                              ? "bg-[#F1E1C2] text-[#9B783E]"
                              : "bg-[#F5F1E9] text-[#95846D]"
                          }`}
                        >
                          {option.symbol}
                        </span>

                        <div>
                          <p className="text-sm font-bold text-[#4B3929]">
                            {option.title}
                          </p>
                          <p className="mt-1 text-xs text-[#95846D]">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            />

            {errors.discountType && (
              <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                {errors.discountType.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <GenericInput
              id="discountValue"
              label="Discount Value"
              required
              type="number"
              min="0"
              max={discountType === "percentage" ? 100 : undefined}
              step="0.01"
              disabled={loading}
              placeholder={discountType === "percentage" ? "20" : "100"}
              error={errors.discountValue?.message}
              extraText={
                discountType === "percentage"
                  ? "Percentage (%)"
                  : "Fixed amount (₹)"
              }
              {...register("discountValue", {
                required: "Discount value is required!",
                valueAsNumber: true,
                validate: {
                  validNumber: (value) =>
                    Number.isFinite(value) || "Enter a valid discount value!",
                  positive: (value) =>
                    value > 0 || "Discount value must be greater than 0!",
                  maxPercentage: (value) =>
                    discountType !== "percentage" ||
                    value <= 100 ||
                    "Percentage cannot exceed 100!",
                },
              })}
            />

            <GenericInput
              id="minOrderAmount"
              label="Minimum Order Amount (₹)"
              type="number"
              min="0"
              step="0.01"
              disabled={loading}
              placeholder="0"
              error={errors.minOrderAmount?.message}
              {...register("minOrderAmount", {
                valueAsNumber: true,
                validate: (value) =>
                  (Number.isFinite(value) && value >= 0) ||
                  "Minimum order amount cannot be negative!",
              })}
            />

            <GenericInput
              id="maxDiscountAmount"
              label="Maximum Discount Amount (₹)"
              type="number"
              min="0"
              step="0.01"
              disabled={loading || discountType === "fixed"}
              placeholder={
                discountType === "percentage" ? "No limit" : "Not applicable"
              }
              extraText={
                discountType === "percentage"
                  ? "Optional cap on the calculated discount."
                  : "Only applicable to percentage discounts."
              }
              error={errors.maxDiscountAmount?.message}
              {...register("maxDiscountAmount", {
                validate: (value) =>
                  value === "" ||
                  value === null ||
                  (Number.isFinite(Number(value)) && Number(value) >= 0) ||
                  "Maximum discount cannot be negative!",
              })}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <CalendarDays size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Validity & Usage
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Define when the coupon becomes valid and how many times it can be
              redeemed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GenericDateTimeInput
            id="startDate"
            name="startDate"
            label="Start Date"
            control={control}
            required
            disabled={loading}
            error={errors.startDate?.message}
            placeholder="Select start date"
          />

          <GenericDateTimeInput
            id="endDate"
            name="endDate"
            label="End Date"
            control={control}
            required
            disabled={loading}
            minDate={watch("startDate") || undefined}
            error={errors.endDate?.message}
            placeholder="Select end date"
            rules={{
              validate: (value) =>
                !watch("startDate") ||
                !value ||
                new Date(value) > new Date(watch("startDate")) ||
                "End date must be after the start date!",
            }}
          />

          <GenericInput
            id="usageLimit"
            label="Usage Limit"
            type="number"
            min="1"
            step="1"
            disabled={loading}
            placeholder="Unlimited"
            extraText="Leave empty for unlimited total redemptions."
            error={errors.usageLimit?.message}
            {...register("usageLimit", {
              validate: (value) =>
                value === "" ||
                value === null ||
                (Number.isInteger(Number(value)) && Number(value) >= 1) ||
                "Usage limit must be a positive integer!",
            })}
          />

          <GenericInput
            id="usedCount"
            label="Already Used"
            type="number"
            min="0"
            step="1"
            disabled={loading}
            placeholder="0"
            extraText="Typically managed by the order redemption process."
            error={errors.usedCount?.message}
            {...register("usedCount", {
              valueAsNumber: true,
              validate: (value) =>
                (Number.isInteger(value) && value >= 0) ||
                "Used count must be a non-negative integer!",
            })}
          />
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">Coupon Status</h2>
            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Control whether this coupon can be considered for redemption.
            </p>
          </div>
        </div>

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <button
              type="button"
              id="isActive"
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
                    {field.value ? "Coupon is active" : "Coupon is inactive"}
                  </p>

                  <p className="mt-1 text-xs text-[#95846D]">
                    {field.value
                      ? "The coupon is enabled, subject to its validity and usage limits."
                      : "The coupon is disabled and should not be redeemable."}
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

          <span>Review the coupon details before saving.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
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
