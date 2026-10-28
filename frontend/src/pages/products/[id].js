import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Image as ImageIcon,
  Layers3,
  Package,
  Search,
  Star,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { productApi } from "../../../api.service";
import { dateHandler } from "@/utils/helperFunctions/dateHandler";
import Image from "next/image";

const formatPrice = (price) => `₹${Number(price || 0).toLocaleString("en-IN")}`;

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    if (!router.isReady || !id) return;

    let cancelled = false;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await productApi.getOne(id);

        if (res?.status === 200) {
          const responseData = res?.data;

          const productData = responseData?.product
            ? responseData
            : responseData?.data;

          if (!productData?.product) {
            throw new Error("Invalid product response.");
          }

          if (!cancelled) {
            setProduct(productData.product);
            setReviews(productData.reviews || []);

            const initialImages = {};

            (productData.variants || []).forEach((variant) => {
              const primaryIndex = (variant.images || []).findIndex(
                (image) => image.isPrimary,
              );

              initialImages[variant._id] = primaryIndex >= 0 ? primaryIndex : 0;
            });

            setSelectedImages(initialImages);
          }
        } else {
          throw new Error("Failed to fetch product details.");
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message ||
              error.message ||
              "Failed to fetch product details!",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [router.isReady, id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-[#F3E6CC] text-[#9B783E]">
            <Package size={23} />
          </div>
          <p className="mt-4 text-sm font-semibold text-[#806C52]">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E6CC] text-[#9B783E]">
            <Package size={24} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#463525]">
            Product not found
          </h2>

          <p className="mt-1 text-sm text-[#95846D]">
            The product could not be found or loaded.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-5 rounded-xl bg-[#463421] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#59432C]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const variants = product.variants || [];
  const activeVariants = variants.filter((variant) => variant.isActive);
  const totalStock = variants.reduce(
    (sum, variant) => sum + Number(variant.stock || 0),
    0,
  );

  const lowestPrice =
    variants.length > 0
      ? Math.min(
          ...variants.map((variant) => Number(variant.sellingPrice || 0)),
        )
      : 0;

  const highestPrice =
    variants.length > 0
      ? Math.max(
          ...variants.map((variant) => Number(variant.sellingPrice || 0)),
        )
      : 0;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
        reviews.length
      : 0;

  return (
    <div className="pb-10">
      <div className="mb-7 flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] shadow-sm transition hover:border-[#C9A96A] hover:bg-[#FBF7EE]"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
            Product Details
          </h1>
          <p className="mt-1 text-sm text-[#88765E]">
            Product information, variants, inventory and customer feedback.
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white shadow-[0_12px_40px_rgba(78,57,28,0.05)]">
        <div className="border-b border-[#ECE4D6] bg-[#FCFAF6] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#E5D4B4] bg-[#F8EEDB] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9B7A43]">
              {product.categoryName || "Uncategorized"}
            </span>

            <StatusBadge active={product.isActive} />
          </div>

          <div className="mt-5 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-3xl font-bold capitalize tracking-tight text-[#33281F]">
                {product.name}
              </h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-[#88765E]">
                <Tag size={14} />
                {product.slug || "-"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-xl border border-[#E7DED0] bg-white px-4 py-3 text-xs text-[#806C52]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9A896F]">
                  Selling price
                </span>
                <span className="mt-1 block text-base font-bold text-[#463421]">
                  {variants.length ? (
                    <>
                      {formatPrice(lowestPrice)}
                      {lowestPrice !== highestPrice &&
                        ` – ${formatPrice(highestPrice)}`}
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </span>

              <span className="rounded-xl border border-[#E7DED0] bg-white px-4 py-3 text-xs text-[#806C52]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9A896F]">
                  Total stock
                </span>
                <span className="mt-1 block text-base font-bold text-[#463421]">
                  {totalStock}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              icon={Layers3}
              label="Total variants"
              value={variants.length}
            />
            <StatCard
              icon={BadgeCheck}
              label="Active variants"
              value={activeVariants.length}
            />
            <StatCard
              icon={Package}
              label="Out of stock"
              value={
                variants.filter((variant) => Number(variant.stock) === 0).length
              }
            />
            <StatCard
              icon={Star}
              label="Customer rating"
              value={reviews.length ? `${averageRating.toFixed(1)} / 5` : "-"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoRow
            label="Product ID"
            value={String(product._id || "-")}
            icon={Package}
          />
          <InfoRow
            label="Category"
            value={product.categoryName || "-"}
            icon={Tag}
          />
          <InfoRow
            label="Created"
            value={dateHandler(product.createdAt)}
            icon={CalendarDays}
          />
          <InfoRow
            label="Last updated"
            value={dateHandler(product.updatedAt)}
            icon={Clock3}
          />
        </div>
      </section>

      <DetailSection
        icon={Layers3}
        title="Product Variants"
        description="Each variant has its own pricing, stock, description, images and SEO settings."
      >
        {variants.length ? (
          <div className="space-y-6">
            {variants.map((variant, index) => {
              const images = variant.images || [];
              const seo = variant.seo || null;

              const primaryIndex = images.findIndex((image) => image.isPrimary);

              const selectedIndex = Math.min(
                selectedImages[variant._id] ??
                  (primaryIndex >= 0 ? primaryIndex : 0),
                Math.max(images.length - 1, 0),
              );

              const selectedImage = images[selectedIndex];

              const selectedImagePreview = selectedImage?.image
                ? `http://localhost:5000/uploads/products/${product?._id}/${variant?._id}/${selectedImage.image}`
                : null;

              return (
                <article
                  key={variant._id}
                  className="overflow-hidden rounded-2xl border border-[#E5DCCA] bg-white"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EDE5D8] bg-[#FCFAF6] p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
                        <Package size={19} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A896F]">
                          Variant {index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-[#463525]">
                          {variant.size} {variant.unit}
                        </h3>
                        <p className="mt-1 text-xs text-[#95846D]">
                          ID: {String(variant._id || "-")}
                        </p>
                      </div>
                    </div>

                    <StatusBadge active={variant.isActive} />
                  </div>

                  <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-[0.85fr_1.15fr]">
                    <div>
                      <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-[#E5DCCA] bg-[#FCFAF6]">
                        {selectedImagePreview ? (
                          <img
                            src={selectedImagePreview}
                            alt={
                              selectedImage.alt ||
                              `${variant.size} ${variant.unit}`
                            }
                            className="max-h-[360px] w-full object-contain p-5"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-[#B5A58D]">
                            <ImageIcon size={34} />
                            <p className="mt-3 text-xs">No images available</p>
                          </div>
                        )}
                      </div>

                      {images.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                          {images.map((image, imageIndex) => (
                            <button
                              key={image._id || imageIndex}
                              type="button"
                              onClick={() =>
                                setSelectedImages((current) => ({
                                  ...current,
                                  [variant._id]: imageIndex,
                                }))
                              }
                              aria-label={`View image ${imageIndex + 1}`}
                              className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-white ${
                                selectedIndex === imageIndex
                                  ? "border-[#B99961]"
                                  : "border-[#E5DCCA] hover:border-[#CDB98E]"
                              }`}
                            >
                              {image?.image ? (
                                <img
                                  src={`http://localhost:5000/uploads/products/${product?._id}/${variant?._id}/${image?.image}`}
                                  alt={image?.alt || "Variant image"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon
                                  className="m-auto text-[#B5A58D]"
                                  size={18}
                                />
                              )}

                              {image?.isPrimary && (
                                <span className="absolute inset-x-0 bottom-0 bg-[#463421]/90 py-1 text-center text-[8px] font-bold uppercase text-white">
                                  Primary
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      {variant.tagLine && (
                        <p className="text-sm font-medium italic text-[#9B7A43]">
                          {variant.tagLine}
                        </p>
                      )}

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <PriceCard
                          label="Selling price"
                          value={formatPrice(variant.sellingPrice)}
                        />
                        <PriceCard
                          label="MRP"
                          value={formatPrice(variant.mrp)}
                        />
                        <PriceCard
                          label="You save"
                          value={formatPrice(
                            Math.max(
                              Number(variant.mrp || 0) -
                                Number(variant.sellingPrice || 0),
                              0,
                            ),
                          )}
                        />
                        <PriceCard
                          label="Available stock"
                          value={Number(variant.stock || 0)}
                        />
                      </div>

                      <div className="mt-5 rounded-xl border border-[#E7DED0] bg-[#FCFBF8] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#806C52]">
                          Variant description
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#665542]">
                          {variant.description || "No description available."}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <InfoRow
                          label="Created"
                          value={dateHandler(variant.createdAt)}
                          icon={CalendarDays}
                        />
                        <InfoRow
                          label="Updated"
                          value={dateHandler(variant.updatedAt)}
                          icon={Clock3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#EDE5D8] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E6CC] text-[#9B783E]">
                        <Search size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#463525]">
                          Variant SEO
                        </h4>
                        <p className="mt-0.5 text-xs text-[#95846D]">
                          Search metadata for this variant.
                        </p>
                      </div>
                    </div>

                    {seo ? (
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <SeoField label="Meta title" value={seo.metaTitle} />
                        <SeoField
                          label="Meta description"
                          value={seo.metaDescription}
                        />

                        <div className="rounded-xl border border-[#E5DCCA] bg-[#FCFBF8] p-4 lg:col-span-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                            Meta keywords
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {seo.metaKeywords?.length ? (
                              seo.metaKeywords.map((keyword) => (
                                <span
                                  key={keyword}
                                  className="rounded-full border border-[#E4D7BE] bg-[#F8EEDB] px-3 py-1.5 text-[10px] font-semibold text-[#80643B]"
                                >
                                  {keyword}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-[#95846D]">
                                No keywords configured.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-[#DDD2BF] bg-[#FCFAF6] p-5 text-sm text-[#95846D]">
                        SEO has not been configured for this variant.
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={Layers3}
            title="No variants available"
            description="No variants were returned for this product."
          />
        )}
      </DetailSection>

      <DetailSection
        icon={Star}
        title="Customer Reviews"
        description="Reviews associated with this product."
      >
        {reviews.length ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
            <div className="h-fit rounded-2xl border border-[#E9DFC9] bg-[#FCF8EF] p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9A896F]">
                Average rating
              </p>
              <p className="mt-3 text-4xl font-bold text-[#463421]">
                {averageRating.toFixed(1)}
                <span className="ml-1 text-sm font-medium text-[#95846D]">
                  / 5
                </span>
              </p>

              <div className="mt-3 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className={
                      star <= Math.round(averageRating)
                        ? "fill-[#B18A4D] text-[#B18A4D]"
                        : "text-[#D8CCB8]"
                    }
                  />
                ))}
              </div>

              <p className="mt-3 text-xs text-[#8D7A61]">
                Based on {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"}.
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <article
                  key={review._id}
                  className="rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E6CC] text-[#9B783E]">
                        <UserRound size={17} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#4B3929]">
                          {review.customerName || "Customer"}
                        </p>
                        <p className="mt-0.5 text-xs text-[#998A75]">
                          {review.customerCity || "City not provided"}
                          {" · "}
                          {dateHandler(review.createdAt)}
                        </p>
                      </div>
                    </div>

                    <StatusBadge active={review.isActive} />
                  </div>

                  <div className="mt-4 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= Number(review.rating || 0)
                            ? "fill-[#B18A4D] text-[#B18A4D]"
                            : "text-[#D8CCB8]"
                        }
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#806C52]">
                      {review.rating}/5
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#665542]">
                    {review.description || "No written review."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Star}
            title="No reviews yet"
            description="Customer reviews for this product will appear here."
          />
        )}
      </DetailSection>
    </div>
  );
}

function StatusBadge({ active }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F6ED] px-3 py-1.5 text-[10px] font-bold text-[#6F8A5A]">
      <BadgeCheck size={12} />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2EFEB] px-3 py-1.5 text-[10px] font-bold text-[#8B7D6B]">
      <X size={12} />
      Inactive
    </span>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#E7DED0] bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[#9B783E]" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A896F]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-lg font-bold text-[#463421]">{value}</p>
    </div>
  );
}

function PriceCard({ label, value }) {
  return (
    <div className="rounded-xl border border-[#E7DED0] bg-[#FCFBF8] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A896F]">
        {label}
      </p>
      <p className="mt-2 text-base font-bold text-[#463421]">{value}</p>
    </div>
  );
}

function DetailSection({ icon: Icon, title, description, children }) {
  return (
    <section className="mt-7 rounded-2xl border border-[#E6DDCD] bg-white p-5 shadow-[0_8px_30px_rgba(78,57,28,0.045)] sm:p-7">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#463525]">{title}</h2>
          <p className="mt-1 text-xs leading-5 text-[#95846D]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-[#E7DED0] bg-[#FCFBF8] px-4 py-3.5">
      <div className="flex items-center gap-2">
        <Icon size={14} className="shrink-0 text-[#9B783E]" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#89765D]">
          {label}
        </span>
      </div>
      <p
        className="mt-2 truncate text-xs font-bold text-[#4B3929]"
        title={String(value)}
      >
        {value}
      </p>
    </div>
  );
}

function SeoField({ label, value }) {
  return (
    <div className="rounded-xl border border-[#E5DCCA] bg-[#FCFBF8] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
        {label}
      </p>
      <p className="mt-2 break-words text-sm leading-6 text-[#665542]">
        {value || "Not configured"}
      </p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#DDD2BF] bg-[#FCFAF6] py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#A17D44]">
        <Icon size={21} />
      </div>
      <p className="mt-4 text-sm font-bold text-[#6B5942]">{title}</p>
      <p className="mt-1 text-xs text-[#9B8C77]">{description}</p>
    </div>
  );
}
