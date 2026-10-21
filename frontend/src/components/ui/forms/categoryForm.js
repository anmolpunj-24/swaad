import { useForm, Controller } from "react-hook-form";
import { Check, ChevronDown, FolderTree, ShieldCheck, Tag } from "lucide-react";
import { SlugifyHandler } from "@/utils/slugifyHandler";
import { useEffect } from "react";
import GenericInput from "../genericInput";
import GenericSelect from "../genericSelect";

export default function CategoryForm({
  defaultValues = {
    name: "",
    parentId: null,
    parentName: "",
    slug: "",
    isParent: false,
    isActive: true,
  },
  categories = [],
  onSubmit,
  buttonText,
  loading = false,
  loadingButtonText,
  handleCategoryDropdownOpen,
  currentCategoryId = "",
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [
    reset,
    defaultValues.name,
    defaultValues.parentId,
    defaultValues.parentName,
    defaultValues.slug,
    defaultValues.isActive,
    defaultValues.isParent,
  ]);

  const isParent = watch("isParent");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
              Category Information
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Add the basic information for this category.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GenericInput
            id="name"
            label="Category Name"
            type="text"
            required
            disabled={loading}
            error={errors.name?.message}
            placeholder="Enter category name"
            {...register("name", {
              required: "Category name is required!",
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
            type="text"
            required
            disabled={loading}
            error={errors.slug?.message}
            placeholder="category-slug"
            {...register("slug", {
              required: "Slug is required!",
            })}
            extraText="Automatically generated from category name"
          />
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <FolderTree size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Category Hierarchy
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Define whether this category is a parent or belongs to another
              category.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <div className="relative">
              <label
                htmlFor="isParent"
                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
              >
                Category Type
              </label>

              <Controller
                name="isParent"
                control={control}
                render={({ field }) => (
                  <button
                    type="button"
                    id="isParent"
                    disabled={loading}
                    onClick={() => {
                      const newValue = !field.value;

                      field.onChange(newValue);

                      if (newValue) {
                        setValue("parentId", null);
                        setValue("parentName", "");
                      }
                    }}
                    className={`flex h-[52px] w-full items-center justify-between rounded-xl bg-white border px-4 text-left outline-none transition-all duration-300 ${
                      field.value
                        ? "border-[#DCC9A5]"
                        : "border-[#DDD3C1]"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          field.value ? "bg-[#8DAA72]" : "bg-[#B9B0A3]"
                        }`}
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#4B3A29]">
                          {field.value ? "Parent Category" : "Child Category"}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#A29480]">
                          {field.value
                            ? "This category can contain child categories."
                            : "This category belongs under a parent."}
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

          {!isParent && (
            <GenericSelect
              id="parentId"
              label="Parent Category"
              required
              disabled={loading}
              error={errors.parentId?.message}
              {...register("parentId", {
                required: !isParent ? "Parent category is required!" : false,
                onChange: (e) => {
                  const selectedCategory = categories.find(
                    (category) => category._id === e.target.value,
                  );

                  setValue("parentName", selectedCategory?.name || "");
                },
              })}
              onFocus={handleCategoryDropdownOpen}
            >
              <option value="" disabled>
                Select parent category
              </option>

              {categories
                ?.filter((item) => item._id !== currentCategoryId)
                .map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </GenericSelect>
          )}
        </div>
      </div>

      <div className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <ShieldCheck size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#463525]">
              Category Status
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Control whether this category is currently available.
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
                      ? "Category is active"
                      : "Category is inactive"}
                  </p>

                  <p className="mt-1 text-xs text-[#95846D]">
                    {field.value
                      ? "This category is visible and available."
                      : "This category is currently disabled."}
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

          <span>Review the category information before saving.</span>
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
