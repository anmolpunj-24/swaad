import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Check,
  FileText,
  HelpCircle,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { SlugifyHandler } from "@/utils/slugifyHandler";

export default function PageFaqForm({
  defaultValues = {
    pageSlug: "",
    pageName: "",
    faqs: [
      {
        questionSlug: "",
        question: "",
        answer: "",
        isActive: true,
      },
    ],
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const defaultValuesKey = JSON.stringify(defaultValues);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValuesKey, reset]);

  const addFaq = () => {
    append({
      questionSlug: "",
      question: "",
      answer: "",
      isActive: true,
    });
  };

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
              Define the page where these FAQs will be displayed.
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
                    setValue("pageSlug", SlugifyHandler(e.target.value), {
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
                htmlFor="pageSlug"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Page Slug <span className="text-[#B28B4C]">*</span>
              </label>

              <input
                id="pageSlug"
                type="text"
                disabled={loading}
                {...register("pageSlug", {
                  required: "Page slug is required!",
                })}
                placeholder="page-slug"
                className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#806C52] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="flex justify-between">
              {errors.pageSlug && (
                <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                  {errors.pageSlug.message}
                </p>
              )}

              <p className="mt-2 ml-auto px-1 text-right text-[10px] font-medium text-[#A29480]">
                Automatically generated from page name
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <HelpCircle size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">FAQ Content</h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Add the questions and answers that will appear on this page.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-2xl border border-[#E6DDCD] bg-[#FDFBF7] p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E6CC] text-xs font-bold text-[#9B783E]">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#463525]">
                      FAQ {index + 1}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-[#95846D]">
                      Add the question and answer for this FAQ.
                    </p>
                  </div>
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => remove(index)}
                    className="flex items-center gap-2 rounded-xl border border-[#E7D8D1] px-3 py-2 text-xs font-bold text-[#963F32] transition hover:bg-[#FBF1EE] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="min-w-0">
                  <div className="relative">
                    <label
                      htmlFor={`faqs.${index}.question`}
                      className="absolute -top-2.5 left-3 z-10 bg-[#FDFBF7] px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                    >
                      Question <span className="text-[#B28B4C]">*</span>
                    </label>

                    <input
                      id={`faqs.${index}.question`}
                      type="text"
                      disabled={loading}
                      {...register(`faqs.${index}.question`, {
                        required: "Question is required!",
                        onChange: (e) => {
                          setValue(
                            `faqs.${index}.questionSlug`,
                            SlugifyHandler(e.target.value),
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            },
                          );
                        },
                      })}
                      placeholder="Enter frequently asked question"
                      className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {errors.faqs?.[index]?.question && (
                    <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                      {errors.faqs[index].question.message}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="relative">
                    <label
                      htmlFor={`faqs.${index}.questionSlug`}
                      className="absolute -top-2.5 left-3 z-10 bg-[#FDFBF7] px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                    >
                      Question Slug <span className="text-[#B28B4C]">*</span>
                    </label>

                    <input
                      id={`faqs.${index}.questionSlug`}
                      type="text"
                      disabled={loading}
                      {...register(`faqs.${index}.questionSlug`, {
                        required: "Question slug is required!",
                      })}
                      placeholder="question-slug"
                      className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#806C52] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <div className="flex justify-between">
                    {errors.faqs?.[index]?.questionSlug && (
                      <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                        {errors.faqs[index].questionSlug.message}
                      </p>
                    )}

                    <p className="mt-2 ml-auto px-1 text-right text-[10px] font-medium text-[#A29480]">
                      Automatically generated from question
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="relative">
                    <label
                      htmlFor={`faqs.${index}.answer`}
                      className="absolute -top-2.5 left-3 z-10 bg-[#FDFBF7] px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                    >
                      Answer
                    </label>

                    <textarea
                      id={`faqs.${index}.answer`}
                      rows={6}
                      disabled={loading}
                      {...register(`faqs.${index}.answer`)}
                      placeholder="Enter the answer to this question"
                      className="min-h-[160px] w-full resize-none rounded-xl border border-[#DDD3C1] bg-white px-4 py-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  <p className="mt-2 px-1 text-[10px] font-medium text-[#A29480]">
                    Provide a clear and helpful answer for customers.
                  </p>
                </div>

                <div className="border-t border-[#ECE4D6] pt-6">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#463525]">
                        FAQ Status
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-[#95846D]">
                        Control whether this FAQ is currently available on the
                        frontend.
                      </p>
                    </div>
                  </div>

                  <Controller
                    name={`faqs.${index}.isActive`}
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        id={`faqs.${index}.isActive`}
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
                                ? "FAQ is active"
                                : "FAQ is inactive"}
                            </p>

                            <p className="mt-1 text-xs text-[#95846D]">
                              {field.value
                                ? "This FAQ is available to the frontend."
                                : "This FAQ is currently disabled."}
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
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={addFaq}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D7C5A5] bg-[#FCF8EF] px-5 py-4 text-xs font-bold text-[#9B783E] transition hover:border-[#B99961] hover:bg-[#F8F0DF] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          <Plus size={16} />
          Add Another FAQ
        </button>
      </div>

      <div className="flex flex-col-reverse gap-4 border-t border-[#ECE4D6] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-[#95846C]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0E5D1] text-[#9B783E]">
            <Check size={13} />
          </span>

          <span>Review the FAQ information before saving.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:cursor-pointer hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60"
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
