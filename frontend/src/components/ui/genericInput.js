export default function GenericInput({
  id,
  label,
  required,
  error,
  icon: Icon,
  button,
  placeholder,
  onButtonClick,
  buttonDisabled = false,
  extraText,
  variant = "default",
  inputClassname = false,
  ...props
}) {
  const isCream = variant === "cream";

  return (
    <div className="min-w-0">
      <div className="relative">
        <label
          htmlFor={id}
          className={`absolute -top-2.5 left-3 z-10 rounded-2xl px-3 text-[0.8rem] font-bold tracking-wide ${
            isCream
              ? "bg-[#F7E9C8] text-[#4B3927]"
              : "bg-white px-2 text-[12px] text-[#66533C]"
          }`}
        >
          {label} {required && <span className="text-[#B28B4C]">*</span>}
        </label>

        {Icon && (
          <Icon
            size={17}
            className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 ${
              isCream ? "text-[#9B7A43]" : "text-[#9B7A43]"
            }`}
          />
        )}

        <input
          id={id}
          {...props}
          placeholder={placeholder && placeholder}
          className={`${inputClassname ? "font-bold uppercase tracking-wider" : ""} w-full rounded-xl border py-3.5 text-sm outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
            isCream
              ? `border-[#9B7A43]/20 bg-[#F3E8D0]/40 text-[#3E3021] placeholder:text-[#806C52]/40 focus:border-[#9B7A43]/50 focus:bg-[#F3E8D0]/70 ${
                  Icon ? "pl-11" : "px-4"
                } ${button ? "pr-12" : "pr-4"}`
              : `h-[52px] border-[#DDD3C1] bg-white text-[#4B3A29] placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 ${
                  Icon ? "pl-11" : "px-4"
                } ${button ? "pr-12" : "pr-4"}`
          }`}
        />

        {button && (
          <button
            type="button"
            onClick={onButtonClick}
            disabled={buttonDisabled || props.disabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52] transition-colors hover:text-[#3E3021] disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
          >
            {button}
          </button>
        )}
      </div>

      <div className="flex justify-between">
        {error && (
          <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
            {error}
          </p>
        )}

        <p className="mt-2 ml-auto px-1 text-[10px] font-medium text-[#A29480]">
          {extraText}
        </p>
      </div>
    </div>
  );
}
