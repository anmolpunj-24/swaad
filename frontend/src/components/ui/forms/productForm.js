import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  ImagePlus,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  Tag,
  Trash2,
  Upload,
  LoaderCircle,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { SlugifyHandler } from "@/utils/slugifyHandler";

const DEFAULT_PRODUCT_VALUES = {
  categoryId: "",
  categoryName: "",
  isActive: false,

  variants: [
    {
      name: "",
      slug: "",
      tagLine: "",
      description: "",
      price: 0,
      stock: 0,
      isActive: false,
      images: [],
      seo: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      },
    },
  ],
};

export default function ProductForm({
  defaultValues = DEFAULT_PRODUCT_VALUES,
  categories = [],
  onSubmit,
  buttonText,
  loading = false,
  loadingButtonText,
  handleCategoryDropdownOpen,
  categoryLoading,
}) {
  const createEmptyVariant = () => ({
    id: `${Date.now()}-${Math.random()}`,
    name: "",
    slug: "",
    tagLine: "",
    description: "",
    price: 0,
    stock: 0,
    isActive: false,
    images: [],
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const createVariantId = () => `${Date.now()}-${Math.random()}`;

  const [activeTab, setActiveTab] = useState("general");
  const [variants, setVariants] = useState(
    (defaultValues.variants || []).map((variant) => ({
      ...variant,
      id: variant.id || createVariantId(),
      images: variant.images || [],
      seo: {
        metaTitle: variant.seo?.metaTitle || "",
        metaDescription: variant.seo?.metaDescription || "",
        metaKeywords: Array.isArray(variant.seo?.metaKeywords)
          ? variant.seo.metaKeywords.join(", ")
          : variant.seo?.metaKeywords || "",
      },
    })),
  );

  const [deletedVariantIds, setDeletedVariantIds] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);

    setDeletedVariantIds([]);
    setDeletedImages([]);

    setVariants(
      (defaultValues.variants || []).map((variant) => ({
        ...variant,
        id: variant.id || variant._id || `${Date.now()}-${Math.random()}`,

        images: (variant.images || []).map((image) => ({
          ...image,
          id: image.id || image._id || `${Date.now()}-${Math.random()}`,
          preview: image.image
            ? `http://localhost:5000/uploads/products/${defaultValues?._id}/${variant?._id}/${image.image}`
            : "",
        })),

        seo: {
          ...variant.seo,
          metaKeywords: Array.isArray(variant.seo?.metaKeywords)
            ? variant.seo.metaKeywords.join(", ")
            : variant.seo?.metaKeywords || "",
        },
      })),
    );
  }, [defaultValues, reset]);

  const categoryId = watch("categoryId");

  const tabs = [
    {
      id: "general",
      label: "General",
      description: "Product information",
      icon: Package,
    },
    {
      id: "variants",
      label: "Variants",
      description: "Variants, images & SEO",
      icon: Settings2,
    },
  ];

  const addVariant = () => {
    setVariants((prev) => [...prev, createEmptyVariant()]);
  };

  const removeVariant = (id) => {
    if (variants.length === 1) return;

    const variantToRemove = variants.find((variant) => variant.id === id);

    if (!variantToRemove) return;

    if (variantToRemove._id) {
      setDeletedVariantIds((prev) =>
        prev.includes(variantToRemove._id)
          ? prev
          : [...prev, variantToRemove._id],
      );
    }

    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  const updateVariant = (id, field, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              [field]: value,
            }
          : variant,
      ),
    );
  };

  const updateVariantSeo = (id, field, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              seo: {
                ...variant.seo,
                [field]: value,
              },
            }
          : variant,
      ),
    );
  };

  const handleVariantNameChange = (variantId, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              name: value,
              slug: SlugifyHandler(value),
            }
          : variant,
      ),
    );
  };

  const handleImageUpload = (variantId, event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id !== variantId) return variant;

        const remainingSlots = 5 - variant.images.length;

        if (remainingSlots <= 0) return variant;

        const filesToAdd = files.slice(0, remainingSlots);

        const newImages = filesToAdd.map((file, index) => ({
          id: `${Date.now()}-${Math.random()}-${index}`,
          file,
          preview: URL.createObjectURL(file),
          alt: "",
          isPrimary: variant.images.length === 0 && index === 0,
        }));

        return {
          ...variant,
          images: [...variant.images, ...newImages],
        };
      }),
    );

    event.target.value = "";
  };

  const removeImage = (variantId, imageId) => {
    const variant = variants.find((variant) => variant.id === variantId);

    if (!variant) return;

    const imageToRemove = variant.images.find((image) => image.id === imageId);

    if (!imageToRemove) return;

    if (imageToRemove.preview && imageToRemove.file) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    if (imageToRemove._id) {
      setDeletedImages((prev) => [
        ...prev,
        {
          _id: imageToRemove._id,
          variantId: variant._id,
        },
      ]);
    }

    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id !== variantId) return variant;

        let remainingImages = variant.images.filter(
          (image) => image.id !== imageId,
        );

        if (imageToRemove.isPrimary && remainingImages.length > 0) {
          remainingImages = remainingImages.map((image, index) => ({
            ...image,
            isPrimary: index === 0,
          }));
        }

        return {
          ...variant,
          images: remainingImages,
        };
      }),
    );
  };

  const setPrimaryImage = (variantId, imageId) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              images: variant.images.map((image) => ({
                ...image,
                isPrimary: image.id === imageId,
              })),
            }
          : variant,
      ),
    );
  };

  const updateImageAlt = (variantId, imageId, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              images: variant.images.map((image) =>
                image.id === imageId
                  ? {
                      ...image,
                      alt: value,
                    }
                  : image,
              ),
            }
          : variant,
      ),
    );
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();

    const product = {
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      isActive: data.isActive,
    };

    const variantsData = variants.map((variant) => ({
      ...(variant._id && {
        _id: variant._id,
      }),
      clientId: variant.id,

      name: variant.name,
      slug: variant.slug,
      tagLine: variant.tagLine,
      price: Number(variant.price),
      stock: Number(variant.stock),
      description: variant.description,
      isActive: variant.isActive,

      seo: {
        ...(variant.seo?._id && {
          _id: variant.seo._id,
        }),

        metaTitle: variant.seo?.metaTitle || "",
        metaDescription: variant.seo?.metaDescription || "",
        metaKeywords: variant.seo?.metaKeywords || "",
      },
    }));

    const imageMetadata = [];

    let fileIndex = 0;

    variants.forEach((variant) => {
      variant.images.forEach((image) => {
        if (image._id) {
          imageMetadata.push({
            variantId: variant.id,
            _id: image._id,
            alt: image.alt,
            isPrimary: image.isPrimary,
            isActive: image.isActive,
          });

          return;
        }

        imageMetadata.push({
          variantId: variant.id,
          clientId: image.id,
          alt: image.alt,
          isPrimary: image.isPrimary,
          isActive: true,
          fileIndex,
        });

        formData.append("images", image.file);

        fileIndex++;
      });
    });

    formData.append("product", JSON.stringify(product));

    formData.append("variants", JSON.stringify(variantsData));
    formData.append("imageMetadata", JSON.stringify(imageMetadata));

    formData.append("deletedVariantIds", JSON.stringify(deletedVariantIds));

    formData.append("deletedImages", JSON.stringify(deletedImages));

    onSubmit(formData);
  };

  const handleContinue = () => {
    if (activeTab === "general" && categoryId) {
      setActiveTab("variants");
    }
  };

  const handlePrevious = () => {
    if (activeTab === "variants") {
      setActiveTab("general");
    }
  };

  const handleCategoryFocus = () => {
    if (!categories.length && !categoryLoading) {
      handleCategoryDropdownOpen();
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <div className="overflow-hidden rounded-2xl border border-[#E2DCCF] bg-white shadow-[0_12px_40px_rgba(73,58,42,0.06)]">
        <div className="border-b border-[#E8E1D5] bg-[#FCFAF6] px-6 py-4">
          <div className="flex items-center gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <div key={tab.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={tab.id === "variants" && !categoryId}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition ${
                      isActive
                        ? "bg-[#F3E8D0] text-[#33281F]"
                        : "text-[#978873] hover:bg-[#F7F2E8] hover:text-[#5A4B3A] "
                    } ${
                      tab.id === "variants" && !categoryId
                        ? "cursor-not-allowed opacity-40"
                        : "hover:bg-[#F7F2E8] hover:text-[#5A4B3A] hover:cursor-pointer"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-[#D9B66F] text-white"
                          : "bg-[#F1ECE3] text-[#907D63]"
                      }`}
                    >
                      <Icon size={14} />
                    </div>

                    <div className="text-left">
                      <p className="text-xs font-bold">{tab.label}</p>

                      <p className="hidden text-[10px] text-[#A49683] sm:block">
                        {tab.description}
                      </p>
                    </div>
                  </button>

                  {index < tabs.length - 1 && <ChevronRightIcon />}
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="p-6 lg:p-8">
            {activeTab === "general" && (
              <section>
                <SectionHeader
                  icon={Package}
                  title="Product Information"
                  description="Add the category and availability settings for this product."
                />

                <div className="mt-7 rounded-2xl border border-[#E7DFD1] bg-[#FDFBF7] p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="min-w-0">
                      <div className="relative">
                        <label
                          htmlFor="categoryId"
                          className="absolute -top-2.5 left-3 z-10 bg-[#FDFBF7] px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                        >
                          Category <span className="text-[#B28B4C]">*</span>
                        </label>

                        <div className="relative">
                          <select
                            id="categoryId"
                            disabled={loading}
                            {...register("categoryId", {
                              required: "Category is required!",

                              onChange: (e) => {
                                const selectedCategory = categories.find(
                                  (category) => category._id === e.target.value,
                                );

                                setValue("categoryId", e.target.value, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });

                                setValue(
                                  "categoryName",
                                  selectedCategory?.name || "",
                                  {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  },
                                );
                              },
                            })}
                            onMouseDown={handleCategoryFocus}
                            className="h-[52px] w-full appearance-none rounded-xl border border-[#DDD3C1] bg-white px-4 pr-12 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 hover:cursor-pointer"
                          >
                            <option value="" disabled>
                              Select category
                            </option>

                            {categories.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                          {categoryLoading ? (
                            <LoaderCircle
                              size={18}
                              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#806C52]"
                            />
                          ) : (
                            <ChevronDown
                              size={18}
                              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806C52]"
                            />
                          )}
                        </div>
                      </div>

                      {errors.categoryId && (
                        <p className="mt-2 px-1 text-[12px] font-medium text-[#963F32]">
                          {errors.categoryId.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#ECE4D6] pt-8">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#463525]">
                        Product Status
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-[#95846D]">
                        Control whether this product is currently available.
                      </p>
                    </div>
                  </div>

                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <button
                        type="button"
                        disabled={false}
                        onClick={() => field.onChange(!field.value)}
                        className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                          field.value
                            ? "border-[#DCC9A5] bg-[#FCF8EF]"
                            : "border-[#E5DDD0] bg-[#FCFBF8]"
                        }`}
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
                                ? "Product is active"
                                : "Product is inactive"}
                            </p>

                            <p className="mt-1 text-xs text-[#95846D]">
                              {field.value
                                ? "This product is visible and available."
                                : "This product is currently disabled."}
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

                <div className="mt-8 rounded-2xl border border-[#E6D9BD] bg-[#FBF6EA] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAD6A8] text-[#8B6A32]">
                      <Check size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#514333]">
                        Product structure
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#88765E]">
                        This product requires at least one variant. Product
                        name, slug, tagline and description are maintained at
                        the variant level.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "variants" && (
              <section>
                <SectionHeader
                  icon={Settings2}
                  title="Product Variants"
                  description="Configure each variant with its details, images and SEO."
                  action={
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex items-center gap-2 rounded-3xl bg-[#463421] px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:cursor-pointer hover:bg-[#59432C]"
                    >
                      <span className="text-base leading-none">+</span>
                      Add Variant
                    </button>
                  }
                />

                <div className="mt-7 space-y-8">
                  {variants.map((variant, index) => (
                    <div
                      key={variant.id}
                      className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white shadow-[0_8px_25px_rgba(78,57,28,0.04)]"
                    >
                      <div className="flex items-center justify-between border-b border-[#ECE4D6] bg-[#FCFAF6] px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E6CC] text-sm font-bold text-[#9B783E]">
                            {index + 1}
                          </div>

                          <div>
                            <h3 className="text-sm font-bold text-[#463525]">
                              Variant {index + 1}
                            </h3>

                            <p className="mt-1 text-xs text-[#95846D]">
                              Configure variant information, images and SEO.
                            </p>
                          </div>
                        </div>

                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariant(variant.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#A0927F] transition hover:bg-red-50 hover:text-red-500"
                            title="Remove variant"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="p-6">
                        <VariantSectionHeader
                          icon={Tag}
                          title="Variant Information"
                          description="Define the content and pricing information for this variant."
                        />

                        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                          <FloatingInput
                            label="Variant Name"
                            required
                            value={variant.name}
                            onChange={(e) =>
                              handleVariantNameChange(
                                variant.id,
                                e.target.value,
                              )
                            }
                            placeholder="Enter variant name"
                          />

                          <FloatingInput
                            label="Slug"
                            required
                            value={variant.slug}
                            onChange={(e) =>
                              updateVariant(variant.id, "slug", e.target.value)
                            }
                            placeholder="variant-slug"
                          />

                          <FloatingInput
                            label="Tagline"
                            value={variant.tagLine}
                            onChange={(e) =>
                              updateVariant(
                                variant.id,
                                "tagLine",
                                e.target.value,
                              )
                            }
                            placeholder="Enter variant tagline"
                          />

                          <FloatingInput
                            label="Price"
                            required
                            type="number"
                            min="0"
                            value={variant.price}
                            onChange={(e) =>
                              updateVariant(variant.id, "price", e.target.value)
                            }
                            placeholder="Enter price"
                          />

                          <FloatingInput
                            label="Stock"
                            type="number"
                            min="0"
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariant(variant.id, "stock", e.target.value)
                            }
                            placeholder="Enter stock quantity"
                          />

                          <div className="md:col-span-2">
                            <div className="relative">
                              <label
                                htmlFor={`description-${variant.id}`}
                                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                              >
                                Description
                              </label>

                              <textarea
                                id={`description-${variant.id}`}
                                rows={6}
                                value={variant.description}
                                onChange={(e) =>
                                  updateVariant(
                                    variant.id,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                placeholder="Describe this variant..."
                                className="w-full resize-none rounded-xl border border-[#DDD3C1] bg-white px-4 py-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 border-t border-[#ECE4D6] pt-8">
                          <VariantSectionHeader
                            icon={ShieldCheck}
                            title="Variant Status"
                            description="Control whether this variant is currently available."
                          />

                          <button
                            type="button"
                            onClick={() =>
                              updateVariant(
                                variant.id,
                                "isActive",
                                !variant.isActive,
                              )
                            }
                            className={`mt-6 flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                              variant.isActive
                                ? "border-[#DCC9A5] bg-[#FCF8EF]"
                                : "border-[#E5DDD0] bg-[#FCFBF8]"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                  variant.isActive
                                    ? "bg-[#F1E1C2] text-[#9B783E]"
                                    : "bg-[#ECE8E1] text-[#948878]"
                                }`}
                              >
                                <ShieldCheck size={19} />
                              </div>

                              <div>
                                <p className="text-sm font-bold text-[#4B3929]">
                                  {variant.isActive
                                    ? "Variant is active"
                                    : "Variant is inactive"}
                                </p>

                                <p className="mt-1 text-xs text-[#95846D]">
                                  {variant.isActive
                                    ? "This variant is currently available."
                                    : "This variant is currently disabled."}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                                variant.isActive
                                  ? "bg-[#B18A4D]"
                                  : "bg-[#CFC7B9]"
                              }`}
                            >
                              <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                                  variant.isActive
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </span>
                          </button>
                        </div>

                        <div className="mt-8 border-t border-[#ECE4D6] pt-8">
                          <VariantSectionHeader
                            icon={ImagePlus}
                            title="Variant Images"
                            description="Add up to 5 images. One image can be marked as the primary image."
                            action={
                              variant.images.length < 5 ? (
                                <label className="flex cursor-pointer items-center gap-2 rounded-3xl border border-[#DCCFB9] bg-white px-5 py-2.5 text-xs font-bold text-[#6C5C49] transition hover:border-[#B99961] hover:bg-[#FCF8EF]">
                                  <Upload size={14} />
                                  Upload Images
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={(e) =>
                                      handleImageUpload(variant.id, e)
                                    }
                                  />
                                </label>
                              ) : null
                            }
                          />

                          {variant.images.length === 0 ? (
                            <label className="mt-6 flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8CCBA] bg-[#FDFBF8] transition hover:border-[#B99961] hover:bg-[#FCF8EE]">
                              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
                                <ImagePlus size={21} />
                              </div>

                              <p className="text-sm font-bold text-[#5D5042]">
                                Add images for this variant
                              </p>

                              <p className="mt-1 text-xs text-[#A29481]">
                                PNG, JPG or WEBP · Maximum 5 images
                              </p>

                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) =>
                                  handleImageUpload(variant.id, e)
                                }
                              />
                            </label>
                          ) : (
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {variant.images.map((image, imageIndex) => (
                                <div
                                  key={image.id}
                                  className="group overflow-hidden rounded-2xl border border-[#E3D9C8] bg-[#FDFBF8]"
                                >
                                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EEE5]">
                                    <img
                                      src={image.preview}
                                      alt={
                                        image.alt ||
                                        `Variant image ${imageIndex + 1}`
                                      }
                                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    />

                                    {image.isPrimary && (
                                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-[#463421] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                        <Check size={10} />
                                        Primary
                                      </div>
                                    )}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeImage(variant.id, image.id)
                                      }
                                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#776854] opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 hover:text-red-500"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>

                                  <div className="space-y-3 p-4">
                                    <div className="relative">
                                      <label
                                        htmlFor={`alt-${image.id}`}
                                        className="absolute -top-2 left-2 z-10 bg-[#FDFBF8] px-1.5 text-[10px] font-bold text-[#66533C]"
                                      >
                                        Alt Text
                                      </label>

                                      <input
                                        id={`alt-${image.id}`}
                                        type="text"
                                        value={image.alt}
                                        onChange={(e) =>
                                          updateImageAlt(
                                            variant.id,
                                            image.id,
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Image description"
                                        className="h-11 w-full rounded-xl border border-[#DDD3C1] bg-white px-3 text-xs text-[#4B3A29] outline-none placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/30"
                                      />
                                    </div>

                                    {!image.isPrimary && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setPrimaryImage(variant.id, image.id)
                                        }
                                        className="text-xs font-bold text-[#9A7335] transition hover:text-[#6F5228]"
                                      >
                                        Set as primary
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-8 border-t border-[#ECE4D6] pt-8">
                          <VariantSectionHeader
                            icon={Search}
                            title="Variant SEO"
                            description="Configure search metadata specifically for this variant."
                          />

                          <div className="mt-6 space-y-6">
                            <FloatingInput
                              label="Meta Title"
                              value={variant.seo.metaTitle}
                              onChange={(e) =>
                                updateVariantSeo(
                                  variant.id,
                                  "metaTitle",
                                  e.target.value,
                                )
                              }
                              placeholder="SEO title"
                            />

                            <div className="relative">
                              <label
                                htmlFor={`meta-description-${variant.id}`}
                                className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]"
                              >
                                Meta Description
                              </label>

                              <textarea
                                id={`meta-description-${variant.id}`}
                                rows={4}
                                value={variant.seo.metaDescription}
                                onChange={(e) =>
                                  updateVariantSeo(
                                    variant.id,
                                    "metaDescription",
                                    e.target.value,
                                  )
                                }
                                placeholder="Describe this variant for search engines..."
                                className="w-full resize-none rounded-xl border border-[#DDD3C1] bg-white px-4 py-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
                              />
                            </div>

                            <FloatingInput
                              label="Meta Keywords"
                              value={variant.seo.metaKeywords}
                              onChange={(e) =>
                                updateVariantSeo(
                                  variant.id,
                                  "metaKeywords",
                                  e.target.value,
                                )
                              }
                              placeholder="honey, punjab honey, natural honey"
                            />

                            <p className="px-1 text-left text-[10px] font-medium text-[#A29480]">
                              Separate multiple keywords with commas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[#E6D9BD] bg-[#FBF6EA] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAD6A8] text-[#8B6A32]">
                      <Settings2 size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#514333]">
                        Variant Structure
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#88765E]">
                        This product currently contains{" "}
                        <span className="font-bold text-[#5D4B37]">
                          {variants.length}
                        </span>{" "}
                        {variants.length === 1 ? "variant" : "variants"}. Each
                        variant manages its own content, pricing, inventory,
                        images and SEO.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="border-t border-[#ECE4D6] bg-[#FCFAF6] px-6 py-5 lg:px-8">
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeTab === "general"}
                className="flex items-center justify-center gap-2 rounded-3xl border border-[#DDD3C1] bg-white px-6 py-3 text-xs font-bold text-[#6C5C49] shadow-sm transition hover:cursor-pointer hover:bg-[#FAF7F0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={15} />
                Previous
              </button>

              {activeTab === "general" ? (
                <button
                  disabled={!categoryId}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleContinue();
                  }}
                  className="flex items-center justify-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:cursor-pointer hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
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
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
          <Icon size={18} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#463525]">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-[#95846D]">{description}</p>
        </div>
      </div>

      {action}
    </div>
  );
}

function VariantSectionHeader({ icon: Icon, title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
          <Icon size={18} />
        </div>

        <div>
          <h3 className="text-base font-bold text-[#463525]">{title}</h3>

          <p className="mt-1 text-xs leading-5 text-[#95846D]">{description}</p>
        </div>
      </div>

      {action}
    </div>
  );
}

function FloatingInput({ label, required, className = "", ...props }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]">
          {label} {required && <span className="text-[#B28B4C]">*</span>}
        </label>

        <input
          {...props}
          className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
        />
      </div>
    </div>
  );
}

function ChevronRightIcon() {
  return <ChevronRight size={15} className="text-[#C9BDAA]" />;
}
