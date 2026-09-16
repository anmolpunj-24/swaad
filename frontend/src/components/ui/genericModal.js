import { useEffect, useState } from "react";
import { Eye, EyeOff, LoaderCircle, X, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

export default function GenericModal({
  isOpen,
  onClose,
  title,
  description,
  inputs = [],
  onSubmit,
  buttonText = "Submit",
  buttonTextWhileLoading,
  loading = false,
}) {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const togglePassword = (name) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, loading]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (loading) return;

    reset();
    setVisiblePasswords({});
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !loading) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A2622]/45 px-4 py-6 backdrop-blur-[3px]"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#E9DFCD] bg-white shadow-[0_24px_80px_rgba(42,38,34,0.18)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-b border-[#EEE7DA] bg-[#FCFAF6] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-[#33281F]">
                  {title}
                </h2>

                {description && (
                  <p className="mt-1 max-w-sm text-xs leading-5 text-[#95846D]">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              disabled={loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E3DACB] bg-white text-[#806C52] transition-all duration-200 hover:border-[#C9A96A] hover:bg-[#FCF8EF] hover:text-[#463421] disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-6"
          noValidate
        >
          <div className="space-y-6">
            {inputs.map((input) => {
              const isPassword = input.type === "password";

              const inputType = isPassword
                ? visiblePasswords[input.name]
                  ? "text"
                  : "password"
                : input.type || "text";

              return (
                <div key={input.name}>
                  <div className="relative">
                    <label
                      htmlFor={input.name}
                      className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                    >
                      {input.label}

                      {input.required !== false && (
                        <span className="ml-1 text-[#B28B4C]">*</span>
                      )}
                    </label>

                    <input
                      id={input.name}
                      type={inputType}
                      disabled={loading}
                      placeholder={input.placeholder || ""}
                      {...register(input.name, {
                        required:
                          input.required === false
                            ? false
                            : `${input.label} is required!`,
                        ...input.validation,
                        ...(input.validation?.validate && {
                          validate: (value) =>
                            input.validation.validate(value, getValues),
                        }),
                      })}
                      className={`h-[52px] w-full rounded-xl border bg-white px-4 text-sm text-[#4B3A29] outline-none transition-all duration-200 placeholder:text-[#B0A18B] disabled:cursor-not-allowed disabled:opacity-60 ${
                        errors[input.name]
                          ? "border-[#C77A6E] focus:border-[#B96B5E] focus:ring-4 focus:ring-[#E8C7C2]/40"
                          : "border-[#DDD3C1] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
                      } ${isPassword ? "pr-12" : ""}`}
                    />

                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => togglePassword(input.name)}
                        disabled={loading}
                        aria-label={
                          visiblePasswords[input.name]
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52] transition-colors hover:text-[#463421] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {visiblePasswords[input.name] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>

                  {errors[input.name] && (
                    <p className="mt-2 px-1 text-[11px] font-medium text-[#963F32]">
                      {errors[input.name].message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#EEE7DA] pt-6">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3E6CC] text-[#9B783E]">
                <ShieldCheck size={12} />
              </span>

              <span className="text-[11px] font-medium text-[#95846D]">
                Your information is securely handled.
              </span>
            </div>

            <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[120px] items-center justify-center gap-2 rounded-xl bg-[#463421] px-6 py-3 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#59432C] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      className="h-4 w-4 animate-spin"
                      strokeWidth={2.5}
                    />
                    {buttonTextWhileLoading || "Processing..."}
                  </>
                ) : (
                  buttonText
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
