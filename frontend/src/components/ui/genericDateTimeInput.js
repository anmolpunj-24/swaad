import { Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { CalendarDays } from "lucide-react";
import "flatpickr/dist/themes/confetti.css";

export default function GenericDateTimeInput({
  id,
  name,
  label,
  control,
  required = false,
  error,
  disabled = false,
  minDate,
  maxDate,
  placeholder,
  rules = {},
}) {
  return (
    <div>
      <div className="relative">
        <label
          htmlFor={id || name}
          className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
        >
          {label} {required && <span className="text-[#B28B4C]">*</span>}
        </label>

        <CalendarDays
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9B7A43]"
        />

        <Controller
          name={name}
          control={control}
          rules={{
            ...(required ? { required: `${label} is required!` } : {}),
            ...rules,
          }}
          render={({ field }) => (
            <Flatpickr
              id={id || name}
              value={
                field.value &&
                field.value !== "-" &&
                !Number.isNaN(new Date(`${field.value}`.slice(0, 10)).getTime())
                  ? `${field.value}`.slice(0, 10)
                  : null
              }
              onChange={(dates) => {
                const date = dates[0];

                if (!date) {
                  field.onChange("");
                  return;
                }

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");

                field.onChange(`${year}-${month}-${day}`);
              }}
              options={{
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "F j, Y",
                time_24hr: false,
                minDate,
                maxDate,
                static: true,
              }}
              disabled={disabled}
              placeholder={placeholder || "Select date"}
              onClose={field.onBlur}
              className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white pl-11 pr-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
            />
          )}
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
