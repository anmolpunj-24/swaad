import GenericInput from "@/components/ui/genericInput";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {};

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F4EC] px-4">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold tracking-wide text-[#2A2622]">
            SWAAD
          </h1>

          <p className="mt-1 text-sm italic text-[#806C52]">Taste of Punjab</p>
        </div>

        <div className="rounded-2xl bg-[#F7F1E5] p-6 shadow-2xl">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#2A2622]">
                Reset Password
              </h2>

              <p className="mt-1 text-sm text-[#6f665d]">
                Create a new password for your account.
              </p>
            </div>
          </div>

          <div className="mb-7 border-b border-[#2A2622]/10" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
            noValidate
          >
            <GenericInput
              id="newPassword"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              variant="cream"
              disabled={isSubmitting}
              error={errors.newPassword?.message}
              button={
                showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />
              }
              onButtonClick={() => setShowNewPassword((prev) => !prev)}
              {...register("newPassword", {
                required: "New password is required!",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain 8 characters, uppercase, lowercase, number and special character.",
                },
              })}
            />

            <GenericInput
              id="confirmNewPassword"
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="cream"
              disabled={isSubmitting}
              error={errors.confirmNewPassword?.message}
              button={
                showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />
              }
              onButtonClick={() => setShowConfirmPassword((prev) => !prev)}
              {...register("confirmNewPassword", {
                required: "Please confirm your new password!",
                validate: (value) =>
                  value === newPassword || "Passwords do not match!",
              })}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#463421] py-3 text-[1rem] font-medium tracking-wide text-[#FFF8E7] transition-all duration-300 hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-70 hover:cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
