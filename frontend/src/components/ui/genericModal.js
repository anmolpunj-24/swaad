import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, X } from "lucide-react";
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

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-2xl bg-[#F7F4EC] p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#2A2622]">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-[#6f665d]">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            disabled={loading}
            className="text-xl text-[#6f665d] hover:text-[#2A2622] hover:cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-7 border-b border-[#2A2622]/10" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7"
          noValidate
        >
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
                    className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
                  >
                    {input.label}
                  </label>

                  <input
                    id={input.name}
                    type={inputType}
                    disabled={loading}
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
                    className="w-full rounded-xl bg-[#F3E8D0]/70 px-4 py-4 pr-12 text-[#3E3021] outline-none transition-all duration-300 placeholder:text-[#806C52]/50 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
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
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-[#806C52] transition-colors hover:text-[#3E3021]"
                    >
                      {visiblePasswords[input.name] ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  )}
                </div>

                {errors[input.name] && (
                  <p className="mt-2 px-1 text-[12px] text-[#963F32]">
                    {errors[input.name].message}
                  </p>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#463421] py-3 text-[1rem] font-medium tracking-wide text-[#FFF8E7] transition-all duration-300 hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-70 hover:cursor-pointer"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {buttonTextWhileLoading}
              </>
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
