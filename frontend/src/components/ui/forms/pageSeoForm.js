import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Check, FileText, Search, ShieldCheck } from "lucide-react";
import { SlugifyHandler } from "@/utils/slugifyHandler";

export default function PageSeoForm({
  defaultValues = {
    slug: "",
    pageName: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
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
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [
    reset,
    defaultValues.slug,
    defaultValues.pageName,
    defaultValues.metaTitle,
    defaultValues.metaDescription,
    defaultValues.metaKeywords,
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
            <FileText size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Page Information
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Define the page name and URL used for this SEO configuration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <div className="relative">
              <label
                htmlFor="pageName"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Page Name <span className="text-[#B28B4C]">*</span>
              </label>

              <input
                id="pageName"
                type="text"
                disabled={loading}
                {...register("pageName", {
                  required: "Page name is required!",
                  onChange: (e) => {
                    setValue("slug", SlugifyHandler(e.target.value), {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  },
                })}
                placeholder="Enter page name"
                className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {errors.pageName && (
              <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                {errors.pageName.message}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <div className="relative">
              <label
                htmlFor="slug"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Slug <span className="text-[#B28B4C]">*</span>
              </label>

              <input
                id="slug"
                type="text"
                disabled={loading}
                {...register("slug", {
                  required: "Slug is required!",
                })}
                placeholder="page-slug"
                className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#806C52] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="flex justify-between">
              {errors.slug && (
                <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                  {errors.slug.message}
                </p>
              )}

              <p className="mt-2 px-1 text-right text-[10px] font-medium text-[#A29480]">
                Automatically generated from page name
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <Search size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Search Engine Metadata
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Configure the metadata that search engines can use for this page.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="min-w-0">
            <div className="relative">
              <label
                htmlFor="metaTitle"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Meta Title
              </label>

              <input
                id="metaTitle"
                type="text"
                disabled={loading}
                {...register("metaTitle")}
                placeholder="Enter meta title"
                className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <p className="mt-2 px-1 text-[10px] font-medium text-[#A29480]">
              Recommended: keep the title concise and relevant to the page.
            </p>
          </div>

          <div className="min-w-0">
            <div className="relative">
              <label
                htmlFor="metaDescription"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Meta Description
              </label>

              <textarea
                id="metaDescription"
                rows={5}
                disabled={loading}
                {...register("metaDescription")}
                placeholder="Enter meta description"
                className="min-h-[130px] w-full resize-none rounded-xl border border-[#DDD3C1] bg-white px-4 py-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="relative">
              <label
                htmlFor="metaKeywords"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Meta Keywords
              </label>

              <input
                id="metaKeywords"
                type="text"
                disabled={loading}
                {...register("metaKeywords")}
                placeholder="honey, punjabi food, natural honey"
                className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <p className="mt-2 px-1 text-[10px] font-medium text-[#A29480]">
              Separate multiple keywords with commas.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">SEO Status</h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Control whether this SEO configuration is currently available.
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
                    {field.value
                      ? "SEO configuration is active"
                      : "SEO configuration is inactive"}
                  </p>

                  <p className="mt-1 text-xs text-[#95846D]">
                    {field.value
                      ? "This SEO configuration is available to the frontend."
                      : "This SEO configuration is currently disabled."}
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

          <span>Review the SEO information before saving.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
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
