import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useForm, Controller } from "react-hook-form";
import {
  Check,
  FileText,
  Tag,
  ImagePlus,
  ShieldCheck,
  Sparkles,
  Search,
  X,
  Plus,
  CalendarDays,
  Globe,
  Tags,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import GenericInput from "../genericInput";
import { SlugifyHandler } from "@/utils/helperFunctions/slugifyHandler";
import GenericSelect from "../genericSelect";
import GenericTextarea from "../genericTextArea";
import ContentEditor from "@/components/ui/contentEditor";

const inputClass =
  "w-full rounded-xl border border-[#DDD3C1] bg-white px-4 py-3 text-sm text-[#4B3A29] outline-none transition placeholder:text-[#B0A18B] focus:border-[#B99961] focus:ring-4 focus:ring-[#EADCC2]/40 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "mb-2 block text-xs font-bold tracking-wide text-[#66533C]";

const sectionHeadingClass = "text-lg font-bold text-[#463525]";

const sectionDescriptionClass = "mt-1 text-xs leading-5 text-[#95846D]";

const createCroppedImage = (imageSrc, pixelCrop) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Unable to crop this image."));
        return;
      }

      context.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Unable to prepare the cropped image."));
            return;
          }

          resolve(blob);
        },
        "image/jpeg",
        0.92,
      );
    };

    image.onerror = () => reject(new Error("Unable to load this image."));
    image.src = imageSrc;
  });

const EMPTY_BLOG_VALUES = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  categoryId: "",
  tagIds: [],
  status: "draft",
  isFeatured: false,
  isActive: true,
  publishedAt: "",
  seo: {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  },
};

export default function BlogForm({
  defaultValues = EMPTY_BLOG_VALUES,
  onSubmit,
  buttonText = "Save Blog",
  loadingButtonText = "Saving Blog...",
  loading = false,
  categories = [],
  tags = [],
  onCreateTag,
  handleCategoryDropdownOpen,
  categoryLoading,
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
    defaultValues: {
      ...defaultValues,
      status: defaultValues?.status || "draft",
    },
  });

  const [newTagName, setNewTagName] = useState("");
  const [creatingTag, setCreatingTag] = useState(false);
  const [tagError, setTagError] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState("");
  const [contentImageFiles, setContentImageFiles] = useState([]);
  const [removeFeaturedImage, setRemoveFeaturedImage] = useState(false);

  const [cropImage, setCropImage] = useState("");
  const [cropSourceFile, setCropSourceFile] = useState(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [cropZoom, setCropZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const selectedTagIds = watch("tagIds") || [];
  const currentFeaturedImage = watch("featuredImage");

  useEffect(() => {
    reset({
      ...EMPTY_BLOG_VALUES,
      ...defaultValues,
      seo: {
        ...EMPTY_BLOG_VALUES.seo,
        ...defaultValues.seo,
        metaKeywords: Array.isArray(defaultValues.seo?.metaKeywords)
          ? defaultValues.seo.metaKeywords.join(", ")
          : defaultValues.seo?.metaKeywords || "",
      },
      status: defaultValues.status || "draft",
      tagIds: defaultValues.tagIds || [],
    });

    setFeaturedImageFile(null);
    setContentImageFiles([]);
    setRemoveFeaturedImage(false);
    setCropImage("");
    setCropSourceFile(null);
    setCropPosition({ x: 0, y: 0 });
    setCropZoom(1);
    setCroppedAreaPixels(null);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!featuredImageFile) {
      setFeaturedImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(featuredImageFile);
    setFeaturedImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [featuredImageFile]);

  const handleCategoryFocus = () => {
    if (!categories.length && !categoryLoading) {
      handleCategoryDropdownOpen();
    }
  };

  const handleCreateTag = async () => {
    const name = newTagName.trim();

    if (!name) {
      setTagError("Tag name is required.");
      return;
    }

    if (tags.some((tag) => tag.name.toLowerCase() === name.toLowerCase())) {
      setTagError("This tag already exists.");
      return;
    }

    if (!onCreateTag) {
      setTagError("Tag creation is not configured.");
      return;
    }

    try {
      setCreatingTag(true);
      setTagError("");

      const createdTag = await onCreateTag({
        name,
        slug: SlugifyHandler(name),
        isActive: true,
      });

      if (!createdTag?._id) {
        setTagError("Could not create the tag. Please try again.");
        return;
      }

      setValue(
        "tagIds",
        [...new Set([...selectedTagIds, String(createdTag._id)])],
        { shouldDirty: true, shouldValidate: true },
      );

      setNewTagName("");
    } catch (error) {
      setTagError(
        error?.response?.data?.message ?? "Failed to create the tag.",
      );
    } finally {
      setCreatingTag(false);
    }
  };

  const toggleTag = (tagId) => {
    const id = String(tagId);

    const nextIds = selectedTagIds.includes(id)
      ? selectedTagIds.filter((selectedId) => selectedId !== id)
      : [...selectedTagIds, id];

    setValue("tagIds", nextIds, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const buildBlogFormData = (data) => {
    const formData = new FormData();
    const html = data.content || "";
    const documentNode = document.createElement("div");

    documentNode.innerHTML = html;

    const localImages = Array.from(
      documentNode.querySelectorAll("img[data-local-image-id]"),
    );

    const imageFileMap = new Map(
      contentImageFiles.map(({ id, file }) => [id, file]),
    );

    const imageIds = localImages.map((image) =>
      image.getAttribute("data-local-image-id"),
    );

    for (const id of imageIds) {
      if (!id || !imageFileMap.has(id)) {
        throw new Error(
          "An editor image is missing its file. Please remove it and insert it again.",
        );
      }
    }

    if (featuredImageFile) {
      formData.append("featuredImage", featuredImageFile);
    }

    formData.append("removeFeaturedImage", String(removeFeaturedImage));

    imageIds.forEach((id) => {
      formData.append("contentImages", imageFileMap.get(id));
    });

    formData.append("contentImageIds", JSON.stringify(imageIds));
    formData.append("title", data.title.trim());
    formData.append("slug", SlugifyHandler(data.slug));
    formData.append("excerpt", (data.excerpt || "").trim());
    formData.append("content", html);
    formData.append("categoryId", data.categoryId);
    formData.append("tagIds", JSON.stringify(data.tagIds || []));
    formData.append("status", data.status || "draft");
    formData.append("isFeatured", String(Boolean(data.isFeatured)));
    formData.append("isActive", String(data.isActive !== false));
    formData.append("publishedAt", data.publishedAt || "");

    formData.append(
      "seo",
      JSON.stringify({
        metaTitle: (data.seo?.metaTitle || "").trim(),
        metaDescription: (data.seo?.metaDescription || "").trim(),
        metaKeywords: Array.isArray(data.seo?.metaKeywords)
          ? data.seo.metaKeywords
          : String(data.seo?.metaKeywords || "")
              .split(",")
              .map((keyword) => keyword.trim())
              .filter(Boolean),
      }),
    );

    return formData;
  };

  const handleFormSubmit = async (data) => {
    try {
      const formData = buildBlogFormData(data);
      await onSubmit(formData);
    } catch (error) {
      toast.error(error?.message || "Unable to prepare blog data.");
    }
  };

  const handleFeaturedImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    event.target.value = "";

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Please select a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Featured image cannot exceed 5 MB.");
      return;
    }

    setCropSourceFile(file);
    setCropImage(URL.createObjectURL(file));
    setCropPosition({ x: 0, y: 0 });
    setCropZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleCancelCrop = () => {
    setCropImage("");
    setCropSourceFile(null);
    setCroppedAreaPixels(null);
    setCropPosition({ x: 0, y: 0 });
    setCropZoom(1);
  };

  const handleApplyCrop = async () => {
    if (!cropImage || !cropSourceFile || !croppedAreaPixels) {
      toast.error("Please position the image before applying the crop.");
      return;
    }

    try {
      const croppedBlob = await createCroppedImage(
        cropImage,
        croppedAreaPixels,
      );

      if (croppedBlob.size > 5 * 1024 * 1024) {
        toast.error("Cropped image cannot exceed 5 MB.");
        return;
      }

      const originalName = cropSourceFile.name.replace(/\.[^.]+$/, "");
      const croppedFile = new File(
        [croppedBlob],
        `${originalName}-cropped.jpg`,
        {
          type: "image/jpeg",
          lastModified: Date.now(),
        },
      );

      setFeaturedImageFile(croppedFile);
      setRemoveFeaturedImage(false);
      setCropImage("");
      setCropSourceFile(null);
      setCroppedAreaPixels(null);
      setCropPosition({ x: 0, y: 0 });
      setCropZoom(1);
      toast.success("Featured image cropped successfully.");
    } catch (error) {
      toast.error(error?.message || "Unable to crop the featured image.");
    }
  };

  const handleRemoveFeaturedImage = () => {
    setFeaturedImageFile(null);
    setRemoveFeaturedImage(true);
    setValue("featuredImage", "", { shouldDirty: true });
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase()),
  );

  const activeFilteredTags = filteredTags.filter(
    (tag) => tag.isActive !== false,
  );

  const selectedTags = tags.filter((tag) =>
    selectedTagIds.includes(String(tag._id)),
  );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="space-y-8 rounded-2xl border border-[#E6DDCD] bg-white p-5 shadow-[0_12px_40px_rgba(78,57,28,0.07)] sm:p-7"
    >
      <section>
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <FileText size={18} />
          </div>

          <div>
            <h2 className={sectionHeadingClass}>Blog Information</h2>
            <p className={sectionDescriptionClass}>
              Add the blog title, URL slug, excerpt, and main content.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <GenericInput
              id="title"
              label="Blog Title"
              required
              type="text"
              disabled={loading}
              placeholder="Enter blog title"
              error={errors.title?.message}
              {...register("title", {
                required: "Blog title is required!",
                validate: (value) =>
                  value.trim().length > 0 || "Blog title cannot be empty!",
                onChange: (event) => {
                  setValue("slug", SlugifyHandler(event.target.value), {
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
              placeholder="blog-slug"
              extraText="Automatically generated from the blog title."
              error={errors.slug?.message}
              {...register("slug", {
                required: "Slug is required!",
                validate: (value) =>
                  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.trim()) ||
                  "Enter a valid URL slug.",
              })}
            />
          </div>

          <GenericTextarea
            id="excerpt"
            label="Blog Excerpt"
            register={register("excerpt")}
            rows={3}
            minHeight="110px"
            resize="y"
            disabled={loading}
            placeholder="Write a short summary of this blog..."
            helperText="A short introduction displayed in blog listings."
          />

          <div>
            <label htmlFor="blog-content-editor" className={labelClass}>
              Blog Content <span className="text-[#963F32]">*</span>
            </label>

            <Controller
              name="content"
              control={control}
              rules={{
                required: "Blog content is required!",
                validate: (value) =>
                  value.replace(/<[^>]*>/g, "").trim().length > 0 ||
                  "Blog content cannot be empty!",
              }}
              render={({ field }) => (
                <ContentEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  onImageFilesChange={setContentImageFiles}
                  disabled={loading}
                />
              )}
            />

            {errors.content && (
              <p className="mt-2 text-xs font-medium text-[#963F32]">
                {errors.content.message}
              </p>
            )}

            <p className="mt-2 text-xs leading-5 text-[#95846D]">
              Format your blog with headings, lists, links, images, and text
              styling.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <Tag size={18} />
          </div>

          <div>
            <h2 className={sectionHeadingClass}>Category & Tags</h2>
            <p className={sectionDescriptionClass}>
              Select a category and assign existing tags or create a new one.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <GenericSelect
            id="categoryId"
            label="Category"
            required
            disabled={loading}
            loading={categoryLoading}
            error={errors.categoryId?.message}
            {...register("categoryId", {
              required: "Please select a category!",
              onChange: (e) => {
                setValue("categoryId", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              },
            })}
            onMouseDown={handleCategoryFocus}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category?.name}
              </option>
            ))}
          </GenericSelect>

          <div className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-[#FCFBF8] shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-[#EAE1D2] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6D5B6] bg-[#F5EAD5] text-[#8A6838]">
                  <Tags size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#463525]">
                    Blog Tags
                    <span className="ml-1.5 text-[#B28B4C]">*</span>
                  </h3>
                  <p className="mt-0.5 text-xs text-[#95846D]">
                    Categorize your content for easier discovery.
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-lg border border-[#E6DDCD] bg-white px-3 py-1.5 text-xs font-bold text-[#806C52]">
                {selectedTags.length} selected
              </span>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#66533C]">
                  Find a tag
                </label>

                <div className="relative">
                  <Search
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08A6C]"
                  />

                  <input
                    type="text"
                    value={tagSearch}
                    onChange={(event) => setTagSearch(event.target.value)}
                    disabled={loading}
                    placeholder="Search tags by name..."
                    className={`${inputClass} pl-10 pr-10`}
                  />

                  {tagSearch && (
                    <button
                      type="button"
                      onClick={() => setTagSearch("")}
                      disabled={loading}
                      aria-label="Clear tag search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#95846D] transition hover:bg-[#F3E8D0] hover:text-[#463525]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="rounded-xl border border-[#E6D5B6] bg-[#F8F1E5] p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8D5B3] text-[#75552C]">
                        <Check size={12} strokeWidth={2.5} />
                      </span>

                      <p className="text-xs font-bold text-[#624A2D]">
                        Selected tags
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        selectedTags.forEach((tag) => toggleTag(tag._id))
                      }
                      className="text-[11px] font-semibold text-[#8B6A3E] transition hover:text-[#463525] disabled:opacity-50"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <button
                        key={tag._id}
                        type="button"
                        disabled={loading}
                        onClick={() => toggleTag(tag._id)}
                        className="group inline-flex items-center gap-2 rounded-lg border border-[#D8C19A] bg-white px-3 py-2 text-xs font-semibold text-[#674B28] shadow-sm transition hover:border-[#B99961] hover:bg-[#FFFCF6] disabled:opacity-60"
                      >
                        {tag.name}
                        <X
                          size={13}
                          className="text-[#A38A66] transition group-hover:text-[#963F32]"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-[#66533C]">
                    Available tags
                  </p>

                  <span className="text-[11px] text-[#95846D]">
                    Click to{" "}
                    {selectedTags.length ? "select or remove" : "select"}
                  </span>
                </div>

                <div className="flex max-h-48 min-h-20 flex-wrap content-start gap-2 overflow-y-auto rounded-xl border border-[#E6DDCD] bg-white p-4">
                  {activeFilteredTags.length > 0 ? (
                    activeFilteredTags.map((tag) => {
                      const selected = selectedTagIds.includes(String(tag._id));

                      return (
                        <button
                          key={tag._id}
                          type="button"
                          disabled={loading}
                          onClick={() => toggleTag(tag._id)}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                            selected
                              ? "border-[#B99961] bg-[#F4E7CF] text-[#674B28] shadow-sm"
                              : "border-[#EAE2D5] bg-[#FCFBF8] text-[#806C52] hover:border-[#D5BD95] hover:bg-[#F8F0E2]"
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {selected ? (
                            <Check size={13} strokeWidth={2.5} />
                          ) : (
                            <Plus size={13} />
                          )}
                          {tag.name}
                        </button>
                      );
                    })
                  ) : (
                    <div className="flex w-full flex-col items-center justify-center py-4 text-center">
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5EAD5] text-[#9B7A43]">
                        <Search size={16} />
                      </div>

                      <p className="text-xs font-semibold text-[#66533C]">
                        {tagSearch.trim()
                          ? "No matching tags found"
                          : "No tags available yet"}
                      </p>

                      <p className="mt-1 text-[11px] text-[#95846D]">
                        Create a new tag below to get started.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-[#EAE1D2] pt-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F2E5CD] text-[#8A6838]">
                    <Plus size={17} />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#463525]">
                      Create a new tag
                    </h4>
                    <p className="mt-1 text-[11px] leading-5 text-[#95846D]">
                      Add a tag to your library without leaving this form.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(event) => {
                      setNewTagName(event.target.value);
                      setTagError("");
                    }}
                    disabled={loading || creatingTag}
                    placeholder="e.g. Punjabi Recipes"
                    className={`${inputClass} min-w-0 flex-1`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();

                        if (!loading && !creatingTag && newTagName.trim()) {
                          handleCreateTag();
                        }
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleCreateTag}
                    disabled={loading || creatingTag || !newTagName.trim()}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-3xl bg-[#463421] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
                  >
                    {creatingTag ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      "Create Tag"
                    )}
                  </button>
                </div>

                {tagError && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#963F32]">
                    <AlertCircle size={14} />
                    {tagError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <ImagePlus size={18} />
          </div>

          <div>
            <h2 className={sectionHeadingClass}>Featured Image</h2>
            <p className={sectionDescriptionClass}>
              Upload the main image that represents your blog.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {(featuredImagePreview ||
            (!removeFeaturedImage && currentFeaturedImage)) && (
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#E6DDCD] bg-[#F7F4EC]">
              <img
                src={featuredImagePreview || currentFeaturedImage}
                alt="Blog featured image preview"
                className="max-h-72 w-full object-contain"
              />

              <button
                type="button"
                disabled={loading}
                onClick={handleRemoveFeaturedImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#963F32] shadow-md disabled:opacity-60"
                aria-label="Remove featured image"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="space-y-3">
            <label
              htmlFor="featuredImage"
              className="block text-sm font-semibold text-[#66533C]"
            >
              Featured Image
            </label>

            {!featuredImageFile && (
              <input
                id="featuredImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={loading}
                className="block w-full rounded-xl border border-[#DDD3C1] bg-white p-3 text-sm text-[#66533C]"
                onChange={handleFeaturedImageChange}
              />
            )}

            {(featuredImageFile || currentFeaturedImage) && (
              <div className="flex items-center justify-between rounded-xl border border-[#DDD3C1] bg-[#FCFBF8] p-3">
                <span className="truncate text-sm text-[#66533C]">
                  {featuredImageFile?.name || "Featured image selected"}
                </span>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setFeaturedImageFile(null);
                    setValue("featuredImage", "");
                    setRemoveFeaturedImage(true);
                  }}
                  className="ml-3 shrink-0 text-sm font-semibold text-[#963F32] hover:underline disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            )}

            <p className="text-xs leading-5 text-[#95846D]">
              Supported formats: JPEG, PNG, and WebP. Maximum file size: 5 MB.
            </p>
          </div>
        </div>
      </section>

      {cropImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="featured-image-crop-title"
        >
          <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]">
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#ECE4D6] px-4 py-3 sm:px-6 sm:py-4">
              <div>
                <h2
                  id="featured-image-crop-title"
                  className="text-base font-bold text-[#463525] sm:text-lg"
                >
                  Crop Featured Image
                </h2>
                <p className="mt-1 text-xs text-[#95846D]">
                  Adjust the image to fit a 16:9 landscape frame.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelCrop}
                className="shrink-0 rounded-full p-2 text-[#806C52] transition hover:bg-[#F3E8D0] hover:cursor-pointer"
                aria-label="Cancel cropping"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="relative h-[min(42dvh,320px)] min-h-[160px] overflow-hidden rounded-xl bg-[#211E1B] sm:h-[min(48dvh,400px)]">
                <Cropper
                  image={cropImage}
                  crop={cropPosition}
                  zoom={cropZoom}
                  aspect={16 / 9}
                  objectFit="contain"
                  onCropChange={setCropPosition}
                  onZoomChange={setCropZoom}
                  onCropComplete={(_, areaPixels) =>
                    setCroppedAreaPixels(areaPixels)
                  }
                  minZoom={1}
                  maxZoom={3}
                  showGrid
                />
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#66533C]">
                  <label htmlFor="featured-image-zoom">Zoom</label>
                  <span>{cropZoom.toFixed(1)}×</span>
                </div>

                <input
                  id="featured-image-zoom"
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={cropZoom}
                  onChange={(event) => setCropZoom(Number(event.target.value))}
                  className="w-full accent-[#B28B4C]"
                />
              </div>
            </div>

            <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#ECE4D6] bg-white px-4 py-3 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={handleCancelCrop}
                className="rounded-3xl border border-[#DDD3C1] px-5 py-2.5 text-xs font-bold text-[#66533C] transition hover:bg-[#FCFBF8] hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApplyCrop}
                className="rounded-3xl bg-[#463421] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#59432C] hover:cursor-pointer"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <CalendarDays size={18} />
          </div>

          <div>
            <h2 className={sectionHeadingClass}>Publishing Settings</h2>
            <p className={sectionDescriptionClass}>
              Choose the publication status, schedule, and visibility.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                disabled={loading}
                onClick={() => field.onChange(!field.value)}
                className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                  field.value
                    ? "border-[#DCC9A5] bg-[#FCF8EF]"
                    : "border-[#E5DDD0] bg-[#FCFBF8]"
                } disabled:opacity-60`}
              >
                <div className="flex items-center gap-4">
                  <Sparkles size={20} className="text-[#9B783E]" />
                  <div>
                    <p className="text-sm font-bold text-[#4B3929]">
                      Featured Blog
                    </p>
                    <p className="mt-1 text-xs text-[#95846D]">
                      Highlight this blog in featured content sections.
                    </p>
                  </div>
                </div>

                <span
                  className={`relative h-7 w-12 shrink-0 rounded-full ${
                    field.value ? "bg-[#B18A4D]" : "bg-[#CFC7B9]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      field.value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </button>
            )}
          />

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                disabled={loading}
                onClick={() => field.onChange(!field.value)}
                className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                  field.value
                    ? "border-[#DCC9A5] bg-[#FCF8EF]"
                    : "border-[#E5DDD0] bg-[#FCFBF8]"
                } disabled:opacity-60`}
              >
                <div className="flex items-center gap-4">
                  <ShieldCheck size={20} className="text-[#9B783E]" />
                  <div>
                    <p className="text-sm font-bold text-[#4B3929]">
                      {field.value ? "Blog is active" : "Blog is inactive"}
                    </p>
                    <p className="mt-1 text-xs text-[#95846D]">
                      Control whether the blog is enabled for normal use.
                    </p>
                  </div>
                </div>

                <span
                  className={`relative h-7 w-12 shrink-0 rounded-full ${
                    field.value ? "bg-[#B18A4D]" : "bg-[#CFC7B9]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      field.value ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </button>
            )}
          />
        </div>
      </section>

      <section className="border-t border-[#ECE4D6] pt-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
            <Globe size={18} />
          </div>

          <div>
            <h2 className={sectionHeadingClass}>SEO Settings</h2>
            <p className={sectionDescriptionClass}>
              Optimize the blog metadata for search engines.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <GenericInput
              id="seo.metaTitle"
              label="Meta Title"
              type="text"
              disabled={loading}
              placeholder="SEO title"
              error={errors.seo?.metaTitle?.message}
              {...register("seo.metaTitle", {
                maxLength: {
                  value: 60,
                  message: "Meta title cannot exceed 60 characters.",
                },
              })}
            />

            <p className="mt-1 text-right text-xs text-[#95846D]">
              {(watch("seo.metaTitle") || "").length}/60
            </p>
          </div>

          <div>
            <GenericTextarea
              id="seo.metaDescription"
              label="Meta Description"
              register={register("seo.metaDescription", {
                maxLength: {
                  value: 160,
                  message: "Meta description cannot exceed 160 characters.",
                },
              })}
              rows={3}
              minHeight="110px"
              resize="y"
              disabled={loading}
              placeholder="Describe this blog for search results..."
              error={errors.seo?.metaDescription?.message}
            />

            <p className="mt-1 text-right text-xs text-[#95846D]">
              {(watch("seo.metaDescription") || "").length}/160
            </p>
          </div>

          <div>
            <GenericInput
              id="seo.metaKeywords"
              label="Meta Keywords"
              placeholder="honey, health benefits, natural products"
              disabled={loading}
              {...register("seo.metaKeywords")}
            />

            <p className="mt-1 text-xs text-[#95846D]">
              Separate keywords with commas.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-[#E6DDCD] bg-gradient-to-br from-[#FFFCF5] via-white to-[#F7F0E3] p-5 shadow-[0_8px_24px_rgba(78,57,28,0.05)] sm:p-6">
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#EAD9B8]/25 blur-2xl" />

        <div className="relative mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E6D5B5] bg-white text-[#9B783E] shadow-sm">
            <Sparkles size={20} />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#463525]">
              Ready to share your story?
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#95846D]">
              Choose how your blog should appear on your website.
            </p>
          </div>
        </div>

        <Controller
          name="status"
          control={control}
          rules={{ required: "Please select a blog status!" }}
          render={({ field }) => (
            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => field.onChange("draft")}
                aria-pressed={field.value === "draft"}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  field.value === "draft"
                    ? "border-[#C8A66D] bg-[#FFF9EC] shadow-[0_5px_16px_rgba(155,120,62,0.12)] ring-2 ring-[#EADCC2]/60"
                    : "border-[#E8E0D3] bg-white/80 hover:border-[#D5BD94] hover:bg-white"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                      field.value === "draft"
                        ? "bg-[#EAD9B8] text-[#795927]"
                        : "bg-[#F5F1E9] text-[#95846D] group-hover:bg-[#F1E5D0]"
                    }`}
                  >
                    <FileText size={23} strokeWidth={1.8} />
                  </div>

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                      field.value === "draft"
                        ? "border-[#A98345] bg-[#A98345] text-white"
                        : "border-[#DCD2C2] bg-white text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#463525]">
                      Keep as Draft
                    </span>
                    <span className="rounded-full bg-[#F0E5D1] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#856638]">
                      Private
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs leading-5 text-[#95846D]">
                    Save your progress and finish the blog whenever you're
                    ready.
                  </p>
                </div>

                {field.value === "draft" && (
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C6A16A] to-[#E8D4AF]" />
                )}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => field.onChange("published")}
                aria-pressed={field.value === "published"}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  field.value === "published"
                    ? "border-[#64866B] bg-[#F1F8F0] shadow-[0_5px_16px_rgba(56,105,66,0.12)] ring-2 ring-[#CFE2D0]/70"
                    : "border-[#E8E0D3] bg-white/80 hover:border-[#A9C7AB] hover:bg-white"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                      field.value === "published"
                        ? "bg-[#D5E9D5] text-[#28663C]"
                        : "bg-[#F5F1E9] text-[#95846D] group-hover:bg-[#E8F2E6]"
                    }`}
                  >
                    <Globe size={23} strokeWidth={1.8} />
                  </div>

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                      field.value === "published"
                        ? "border-[#38734A] bg-[#38734A] text-white"
                        : "border-[#DCD2C2] bg-white text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#463525]">
                      Publish Blog
                    </span>
                    <span className="rounded-full bg-[#DCEEDD] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#28663C]">
                      Go Live
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs leading-5 text-[#95846D]">
                    Make your blog available to readers on your website.
                  </p>
                </div>

                {field.value === "published" && (
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#4D8758] to-[#B4D6AF]" />
                )}
              </button>
            </div>
          )}
        />

        {errors.status && (
          <p className="relative mt-3 text-xs font-medium text-[#963F32]">
            {errors.status.message}
          </p>
        )}

        <div className="relative mt-4 flex items-center gap-2 border-t border-[#EAE0D0] pt-3">
          <span className="h-2 w-2 rounded-full bg-[#9B783E]" />
          <p className="text-xs text-[#95846D]">
            {watch("status") === "published"
              ? "Your blog is set to go live when you submit."
              : "Your changes will be saved without publishing."}
          </p>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-4 border-t border-[#ECE4D6] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-[#95846C]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0E5D1] text-[#9B783E]">
            <Check size={13} />
          </span>
          <span>Review your blog details before saving.</span>
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
