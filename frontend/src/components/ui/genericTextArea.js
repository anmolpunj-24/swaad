export default function GenericTextarea({
  id,
  label,
  required = false,
  error,
  helperText,
  rows = 4,
  minHeight = "110px",
  resize = "y",
  labelBackground = "white",
  register,
  ...props
}) {
  const resizeClass =
    {
      none: "resize-none",
      y: "resize-y",
      both: "resize",
    }[resize] || "resize-y";

  return (
    <div className="min-w-0">
      <div className="relative">
        <label
          htmlFor={id}
          className="absolute -top-2.5 left-3 z-10 px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
          style={{ backgroundColor: labelBackground }}
        >
          {label}
          {required && <span className="ml-1 text-[#B28B4C]">*</span>}
        </label>

        <textarea
          id={id}
          rows={rows}
          {...register}
          {...props}
          style={{ minHeight }}
          className={`w-full ${resizeClass} rounded-xl border border-[#DDD3C1] bg-white px-4 py-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60 ${
            error ? "border-[#963F32]" : ""
          }`}
        />
      </div>

      {error ? (
        <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-2 px-1 text-[10px] font-medium text-[#A29480]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
