import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Check, Tag, ShieldCheck, Sparkles } from "lucide-react";
import GenericInput from "../genericInput";
import { SlugifyHandler } from "@/utils/helperFunctions/slugifyHandler";

export default function TagForm({
  defaultValues = {
    name: "",
    slug: "",
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

  useEffect(() => {
    reset({
      name: defaultValues.name ?? "",
      slug: defaultValues.slug ?? "",
      isActive: defaultValues.isActive ?? true,
    });
  }, [reset, defaultValues.name, defaultValues.slug, defaultValues.isActive]);

  const submitForm = (data) => {
    onSubmit({
      name: data.name ?? "",
      slug: data.slug ?? "",
      isActive: data.isActive ?? false,
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
            <Tag size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Tag Information
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Create a tag to organize and identify related content across
              SWAAD.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GenericInput
            id="name"
            label="Tag Name"
            required
            type="text"
            disabled={loading}
            placeholder="Enter tag name"
            error={errors.name?.message}
            {...register("name", {
              required: "Tag name is required!",
              pattern: {
                value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
                message: "Tag name can contain only letters and single spaces!",
              },
              onChange: (e) => {
                setValue("slug", SlugifyHandler(e.target.value), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              },
            })}
          />

          <GenericInput
            id="slug"
            label="Slug"
            required
            type="text"
            disabled={loading}
            placeholder="tag-slug"
            error={errors.slug?.message}
            extraText="Automatically generated from tag name"
            {...register("slug", {
              required: "Slug is required!",
              pattern: {
                value: /^[a-z]+(?:-[a-z]+)*$/,
                message:
                  "Slug must contain only lowercase letters and hyphens!",
              },
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
            <h2 className="text-lg font-bold text-[#463525]">Tag Status</h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Control whether this tag is available for use.
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
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    field.value
                      ? "bg-[#F1E1C2] text-[#9B783E]"
                      : "bg-[#ECE8E1] text-[#948878]"
                  }`}
                >
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#4B3929]">
                    {field.value ? "Tag is active" : "Tag is inactive"}
                  </p>

                  <p className="mt-1 text-xs text-[#95846D]">
                    {field.value
                      ? "This tag is enabled and available for use."
                      : "This tag is disabled and unavailable for normal use."}
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

          <span>Review the tag details before saving.</span>
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
            buttonText
          )}
        </button>
      </div>
    </form>
  );
}
