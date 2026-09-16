import { ChevronDown } from "lucide-react";

export default function GenericSelect({
  id,
  label,
  required,
  error,
  icon: Icon,
  children,
  ...props
}) {
  return (
    <div>
      <div className="relative">
        <label
          htmlFor={id}
          className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
        >
          {label} {required && <span className="text-[#B28B4C]">*</span>}
        </label>

        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9B7A43]"
          />
        )}

        <select
          id={id}
          {...props}
          className="h-[52px] w-full appearance-none rounded-xl border border-[#DDD3C1] bg-white pl-11 pr-12 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {children}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52]"
        />
      </div>

      {error && (
        <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
          {error}
        </p>
      )}
    </div>
  );
}
