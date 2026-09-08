import { useForm, Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { SlugifyHandler } from "@/utils/slugifyHandler";

export default function CategoryForm({
  defaultValues = {
    name: "",
    parentId: "",
    slug: "",
    isActive: true,
  },
  categories = [],
  onSubmit,
  buttonText,
  loading = false,
  loadingButtonText,
  onCategoryTypeChange,
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-7 md:grid-cols-2"
      noValidate
    >
      <div>
        <div className="relative">
          <label
            htmlFor="name"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Name
          </label>

          <input
            id="name"
            type="text"
            disabled={loading}
            {...register("name", {
              required: "Category name is required!",
              onChange: (e) => {
                setValue("slug", SlugifyHandler(e.target.value), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              },
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {errors.name && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="slug"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Slug
          </label>

          <input
            id="slug"
            type="text"
            {...register("slug", {
              required: "Slug is required!",
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#806C52] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
        <p className="mt-1 text-[0.5rem] text-black/60 text-right">
          *Automatically generated from category name..
        </p>

        {errors.slug && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="isParent"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Category Type
          </label>

          <Controller
            name="isParent"
            control={control}
            defaultValue={!defaultValues.parentId}
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
                  }

                  onCategoryTypeChange?.(newValue);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-4 outline-none transition-all duration-300 ${
                  field.value ? "bg-[#F3E8D0]" : "bg-[#F3E8D0]/50"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span className="text-[#3E3021]">
                  {field.value ? "Parent Category" : "Child Category"}
                </span>

                <span
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    field.value ? "bg-[#9B7A43]" : "bg-[#806C52]/40"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-[#FFF8E7] shadow-sm transition-transform duration-300 ${
                      field.value ? "translate-x-[3px]" : "-translate-x-[18px]"
                    }`}
                  />
                </span>
              </button>
            )}
          />
        </div>
      </div>

      {!watch("isParent") && (
        <div>
          <div className="relative">
            <label
              htmlFor="parentId"
              className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
            >
              Parent Category
            </label>

            <div className="relative">
              <select
                id="parentId"
                disabled={loading}
                {...register("parentId", {
                  required: !watch("isParent")
                    ? "Parent category is required!"
                    : false,
                })}
                className="w-full appearance-none rounded-xl bg-[#F3E8D0]/50 px-4 py-4 pr-12 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="" disabled>
                  Select parent category
                </option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={20}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52]"
              />
            </div>
          </div>

          {errors.parentId && (
            <p className="mt-2 px-1 text-[12px] text-[#963F32]">
              {errors.parentId.message}
            </p>
          )}
        </div>
      )}

      <div>
        <div className="relative">
          <label
            htmlFor="isActive"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Category Status
          </label>

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                id="isActive"
                disabled={loading}
                onClick={() => field.onChange(!field.value)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-4 outline-none transition-all duration-300 ${
                  field.value ? "bg-[#F3E8D0]" : "bg-[#F3E8D0]/50"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span className="text-[#3E3021]">
                  {field.value ? "Active" : "Inactive"}
                </span>

                <span
                  className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                    field.value ? "bg-[#9B7A43]" : "bg-[#806C52]/40"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-[#FFF8E7] shadow-sm transition-transform duration-300 ${
                      field.value ? "translate-x-[3px]" : "-translate-x-[18px]"
                    }`}
                  />
                </span>
              </button>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 md:col-span-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => router.back()}
          className="rounded-full border border-[#9B7A43] px-7 py-3 font-medium tracking-wide text-[#4B3927] transition-all duration-200 hover:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#463421] px-8 py-3 font-medium tracking-wide text-[#FFF8E7] transition-all duration-200 hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          {loading ? loadingButtonText : buttonText}
        </button>
      </div>
    </form>
  );
}
