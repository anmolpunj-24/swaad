import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ImagePlus,
  Package,
  Search,
  Settings2,
  Trash2,
  Upload,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const tabs = [
  {
    id: "general",
    label: "General",
    description: "Product information",
    icon: Package,
  },
  {
    id: "images",
    label: "Images",
    description: "Product gallery",
    icon: ImagePlus,
  },
  {
    id: "variants",
    label: "Variants",
    description: "Sizes & pricing",
    icon: Settings2,
  },
  {
    id: "seo",
    label: "SEO",
    description: "Search optimization",
    icon: Search,
  },
];

export default function AddProducts() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("general");

  const [images, setImages] = useState([]);

  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      name: "",
      sku: "",
      price: "",
      compareAtPrice: "",
      stock: "",
      isActive: true,
    },
  ]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      categoryId: "",
      categoryName: "",
      tagLine: "",
      description: "",
      isActive: true,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  });

  const productName = watch("name");
  const metaDescription = watch("metaDescription");

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        sku: "",
        price: "",
        compareAtPrice: "",
        stock: "",
        isActive: true,
      },
    ]);
  };

  const removeVariant = (id) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  const updateVariant = (id, field, value) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);

    const newImages = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      alt: "",
      isPrimary: images.length === 0 && index === 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const filtered = prev.filter((image) => image.id !== id);

      if (filtered.length > 0 && !filtered.some((image) => image.isPrimary)) {
        filtered[0].isPrimary = true;
      }

      return filtered;
    });
  };

  const setPrimaryImage = (id) => {
    setImages((prev) =>
      prev.map((image) => ({
        ...image,
        isPrimary: image.id === id,
      })),
    );
  };

  const updateImageAlt = (id, value) => {
    setImages((prev) =>
      prev.map((image) => (image.id === id ? { ...image, alt: value } : image)),
    );
  };

  const onSubmit = async (data) => {
    const payload = {
      product: data,
      images,
      variants,
    };

    console.log("PRODUCT PAYLOAD:", payload);

    // Your API flow:
    // 1. Create product
    // 2. Get productId
    // 3. Create product images
    // 4. Create product variants
    // 5. Redirect to product detail
  };

  const goNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const goPrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:border-[#C9A96A] hover:bg-[#FBF7EE]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
                Add Product
              </h1>
            </div>

            <p className="mt-1 text-sm text-[#88765E]">
              Create a complete product with images, variants and SEO details.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-[#E6DDCD] bg-white shadow-[0_12px_40px_rgba(78,57,28,0.07)]"
      >
        <div className="border-b border-[#ECE4D6] bg-[#FCFAF6] px-5 pt-5">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex min-w-[190px] items-center gap-3 rounded-t-xl px-5 py-4 text-left transition ${
                    active
                      ? "bg-white text-[#4A3826] shadow-[0_-2px_10px_rgba(75,55,30,0.03)]"
                      : "text-[#927F65] hover:bg-[#F7F2E9]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                      active
                        ? "bg-[#F3E5CA] text-[#9B783E]"
                        : "bg-[#F3F0E9] text-[#9A8B77]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p
                      className={`text-sm font-bold ${
                        active ? "text-[#493624]" : "text-[#766650]"
                      }`}
                    >
                      {tab.label}
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#A1927D]">
                      {tab.description}
                    </p>
                  </div>

                  {index < tabs.length - 1 && !active && (
                    <span className="absolute -right-1 text-[#D8CCB8]">
                      <ChevronRight size={14} />
                    </span>
                  )}

                  {active && (
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-[#B28B4C]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[620px] p-7">
          {activeTab === "general" && (
            <div className="space-y-7">
              <SectionHeader
                number="01"
                title="Product Information"
                description="Tell your customers what makes this product special."
              />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <InputField
                  label="Product Name"
                  required
                  placeholder="e.g. Premium Raw Honey"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  error={errors.name?.message}
                />

                <InputField
                  label="Slug"
                  required
                  placeholder="premium-raw-honey"
                  {...register("slug", {
                    required: "Slug is required",
                  })}
                  error={errors.slug?.message}
                />

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]">
                    Category <span className="text-[#B28B4C]">*</span>
                  </label>

                  <select
                    {...register("categoryId", {
                      required: "Category is required",
                    })}
                    className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 pr-12"
                  >
                    <option value="">Select category</option>
                    <option value="honey">Honey</option>
                    <option value="oils">Oils</option>
                    <option value="pickles">Pickles</option>
                  </select>

                  {errors.categoryId && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>

                <InputField
                  label="Category Name"
                  placeholder="Honey"
                  {...register("categoryName")}
                />

                <div className="lg:col-span-2">
                  <InputField
                    label="Tagline"
                    placeholder="Pure goodness, straight from nature"
                    {...register("tagLine")}
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-[#51402E]">
                    Description
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Write a detailed description of your product..."
                    {...register("description")}
                    className="w-full resize-none rounded-xl border border-[#DDD3C1] bg-white px-4 py-3.5 text-sm leading-6 text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
                  />
                </div>
              </div>

              {/* STATUS */}
              <div className="flex items-center justify-between rounded-xl border border-[#E9DFC9] bg-[#FCF8EF] px-5 py-4">
                <div>
                  <p className="text-sm font-bold text-[#4B3928]">
                    Product Status
                  </p>
                  <p className="mt-1 text-xs text-[#8D7A61]">
                    Make this product available to customers immediately.
                  </p>
                </div>

                <Toggle register={register} name="isActive" />
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-7">
              <SectionHeader
                number="02"
                title="Product Gallery"
                description="Upload beautiful product imagery and choose a primary image."
              />

              {/* UPLOAD */}
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DCCFB9] bg-[#FCFAF5] px-6 py-14 transition hover:border-[#B99961] hover:bg-[#FBF6EA]">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2E4C7] text-[#A37D43] shadow-sm transition group-hover:scale-105">
                  <Upload size={25} />
                </div>

                <h3 className="mt-5 text-sm font-bold text-[#4A3827]">
                  Upload product images
                </h3>

                <p className="mt-1 text-xs text-[#96866F]">
                  PNG, JPG or WEBP · Multiple images supported
                </p>

                <span className="mt-5 rounded-3xl bg-[#463421] px-4 py-2 text-xs font-bold text-white transition group-hover:bg-[#59432C]">
                  Choose Images
                </span>
              </label>

              {/* IMAGE GRID */}
              {images.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-2xl border border-[#E5DCCA] bg-white shadow-sm"
                    >
                      <div className="group relative aspect-[4/3] overflow-hidden bg-[#F6F2E9]">
                        <img
                          src={image.preview}
                          alt={image.alt || "Product preview"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#765E44] shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>

                        {image.isPrimary && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#463421] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                            <Check size={12} />
                            Primary
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 p-4">
                        <div>
                          <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-[#8B785F]">
                            Alt Text
                          </label>

                          <input
                            value={image.alt}
                            onChange={(e) =>
                              updateImageAlt(image.id, e.target.value)
                            }
                            placeholder="Describe this image"
                            className="h-10 w-full rounded-lg border border-[#E0D6C5] bg-[#FBF9F5] px-3 text-xs text-[#4B3929] outline-none focus:border-[#B99961]"
                          />
                        </div>

                        {!image.isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(image.id)}
                            className="text-xs font-bold text-[#9B783E] hover:text-[#72572E]"
                          >
                            Make primary image
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#ECE3D4] bg-[#FCFAF7] py-10 text-center">
                  <ImagePlus size={28} className="mx-auto text-[#B7A78E]" />

                  <p className="mt-3 text-sm font-bold text-[#6B5942]">
                    No images added yet
                  </p>

                  <p className="mt-1 text-xs text-[#9B8C77]">
                    Your product gallery will appear here.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "variants" && (
            <div className="space-y-7">
              <div className="flex items-start justify-between gap-5">
                <SectionHeader
                  number="03"
                  title="Product Variants"
                  description="Create different sizes, packs or quantities for this product."
                />

                <button
                  type="button"
                  onClick={addVariant}
                  className="flex shrink-0 items-center gap-2 rounded-3xl bg-[#463421] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C]"
                >
                  Add Variant
                </button>
              </div>

              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div
                    key={variant.id}
                    className="rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2E4C7] text-xs font-bold text-[#9B783E]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div>
                          <p className="text-sm font-bold text-[#4B3929]">
                            Variant {index + 1}
                          </p>

                          <p className="text-[11px] text-[#9B8B75]">
                            Define pricing and inventory
                          </p>
                        </div>
                      </div>

                      {variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(variant.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9B8870] transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                      <VariantInput
                        label="Variant Name"
                        placeholder="500g"
                        value={variant.name}
                        onChange={(value) =>
                          updateVariant(variant.id, "name", value)
                        }
                      />

                      <VariantInput
                        label="SKU"
                        placeholder="HNY-500"
                        value={variant.sku}
                        onChange={(value) =>
                          updateVariant(variant.id, "sku", value)
                        }
                      />

                      <VariantInput
                        label="Price"
                        placeholder="499"
                        type="number"
                        value={variant.price}
                        onChange={(value) =>
                          updateVariant(variant.id, "price", value)
                        }
                      />

                      <VariantInput
                        label="Compare Price"
                        placeholder="549"
                        type="number"
                        value={variant.compareAtPrice}
                        onChange={(value) =>
                          updateVariant(variant.id, "compareAtPrice", value)
                        }
                      />

                      <VariantInput
                        label="Stock"
                        placeholder="50"
                        type="number"
                        value={variant.stock}
                        onChange={(value) =>
                          updateVariant(variant.id, "stock", value)
                        }
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#ECE4D6] pt-4">
                      <div>
                        <p className="text-xs font-bold text-[#5B4935]">
                          Variant Status
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#998A75]">
                          Allow customers to purchase this variant.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          updateVariant(
                            variant.id,
                            "isActive",
                            !variant.isActive,
                          )
                        }
                        className={`relative h-6 w-11 rounded-full transition ${
                          variant.isActive ? "bg-[#B18A4D]" : "bg-[#D4CCBF]"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                            variant.isActive ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[#E9DFC9] bg-[#FCF8EF] p-4">
                <Package size={17} className="mt-0.5 shrink-0 text-[#A47E43]" />

                <div>
                  <p className="text-xs font-bold text-[#5A4630]">
                    Variant pricing
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8B795F]">
                    Each variant maintains its own SKU, price and inventory.
                    This keeps your product catalog flexible as your store
                    grows.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-7">
              <SectionHeader
                number="04"
                title="Search Optimization"
                description="Control how this product appears in search engines."
              />

              <div className="grid grid-cols-1 gap-6">
                <InputField
                  label="Meta Title"
                  placeholder={productName || "Premium Raw Honey | SWAAD"}
                  {...register("metaTitle")}
                />

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-bold text-[#51402E]">
                      Meta Description
                    </label>

                    <span
                      className={`text-[11px] font-semibold ${
                        metaDescription?.length > 160
                          ? "text-red-500"
                          : "text-[#9A896F]"
                      }`}
                    >
                      {metaDescription?.length || 0}/160
                    </span>
                  </div>

                  <textarea
                    rows={5}
                    maxLength={160}
                    placeholder="A short description that helps customers discover your product..."
                    {...register("metaDescription")}
                    className="w-full resize-none rounded-xl border border-[#DDD3C1] bg-white px-4 py-3.5 text-sm leading-6 text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#51402E]">
                    Meta Keywords
                  </label>

                  <input
                    placeholder="honey, organic honey, raw honey, punjab honey"
                    {...register("metaKeywords")}
                    className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
                  />

                  <p className="mt-2 text-[11px] text-[#9A896F]">
                    Separate keywords with commas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#E9E1D4] bg-[#FCFAF6] px-7 py-5">
          <div className="flex items-center gap-2 text-xs text-[#95846C]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0E5D1] text-[#9B783E]">
              <Check size={13} />
            </span>

            <span>
              {activeTab === "seo"
                ? "Ready to create your product"
                : "Complete all sections before saving"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {activeTab !== "general" && (
              <button
                type="button"
                onClick={goPrevious}
                className="rounded-3xl border border-[#DDD3C2] bg-white px-5 py-2.5 text-xs font-bold text-[#65533D] transition hover:bg-[#F8F4EC]"
              >
                Previous
              </button>
            )}

            {activeTab !== "seo" ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-2 rounded-3xl bg-[#463421] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C]"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 rounded-3xl bg-[#463421] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C]"
              >
                Create Product
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const SectionHeader = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[11px] font-black tracking-wider text-[#9B783E]">
        {number}
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#463525]">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-[#95846D]">{description}</p>
      </div>
    </div>
  );
};

const InputField = ({ label, required, error, ...props }) => {
  return (
    <div>
      <div className="relative">
        <label className="absolute -top-2.5 left-3 z-10 bg-white px-2 text-[12px] font-bold tracking-wide text-[#66533C]">
          {label} {required && <span className="text-[#B28B4C]">*</span>}
        </label>

        <input
          {...props}
          className="h-[52px] w-full rounded-xl border border-[#DDD3C1] bg-white px-4 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40"
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

const VariantInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#89765D]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-[#DDD3C1] bg-white px-3 text-xs text-[#4B3929] outline-none transition placeholder:text-[#B2A38F] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/30"
      />
    </div>
  );
};

const Toggle = ({ register, name }) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" {...register(name)} className="peer sr-only" />

      <div className="h-6 w-11 rounded-full bg-[#D6CEC0] transition peer-checked:bg-[#B18A4D]" />

      <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
    </label>
  );
};
