import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Edit3,
  ExternalLink,
  Eye,
  Image as ImageIcon,
  Layers3,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tag,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Replace this with your actual API
// import { productApi } from "@/api.service";

export default function ProductDetails() {
  const router = useRouter();
  const { uuid } = router.query;

  const [product, setProduct] = useState({
    uuid,
    name: "Premium Raw Honey",
    slug: "premium-raw-honey",
    categoryId: "123",
    categoryName: "Honey",
    tagLine: "Pure goodness, straight from nature",
    description:
      "Naturally sourced raw honey collected from carefully selected apiaries. Rich in natural flavour, golden in colour and packed with the goodness of nature.",

    isActive: true,

    createdAt: "2026-09-10T10:30:00.000Z",
    updatedAt: "2026-09-15T14:20:00.000Z",

    images: [
      {
        _id: "1",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
        alt: "Premium raw honey jar",
        isPrimary: true,
      },
      {
        _id: "2",
        image: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
        alt: "Natural honey",
        isPrimary: false,
      },
      {
        _id: "3",
        image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        alt: "Honey jar",
        isPrimary: false,
      },
    ],

    variants: [
      {
        _id: "v1",
        name: "250g",
        sku: "HNY-250",
        price: 299,
        compareAtPrice: 349,
        stock: 42,
        isActive: true,
      },
      {
        _id: "v2",
        name: "500g",
        sku: "HNY-500",
        price: 499,
        compareAtPrice: 549,
        stock: 28,
        isActive: true,
      },
      {
        _id: "v3",
        name: "1kg",
        sku: "HNY-1000",
        price: 899,
        compareAtPrice: 999,
        stock: 8,
        isActive: true,
      },
    ],

    seo: {
      metaTitle: "Premium Raw Honey | SWAAD",
      metaDescription:
        "Shop naturally sourced premium raw honey from SWAAD. Pure, authentic and packed with natural goodness.",
      metaKeywords: ["honey", "raw honey", "organic honey", "punjab honey"],
    },

    reviews: [
      {
        _id: "r1",
        customerName: "Harpreet Singh",
        rating: 5,
        title: "Excellent quality",
        comment:
          "The honey tastes genuinely natural and the packaging is beautiful.",
        createdAt: "2026-09-13T09:20:00.000Z",
        isActive: true,
      },
      {
        _id: "r2",
        customerName: "Simran Kaur",
        rating: 4,
        title: "Very good honey",
        comment:
          "Loved the flavour. Delivery was quick and the product arrived safely.",
        createdAt: "2026-09-11T11:45:00.000Z",
        isActive: true,
      },
      {
        _id: "r3",
        customerName: "Aman Sharma",
        rating: 5,
        title: "Will buy again",
        comment: "Really good quality and authentic taste. Highly recommended.",
        createdAt: "2026-09-08T15:10:00.000Z",
        isActive: true,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!router.isReady || !uuid) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Replace with your actual API call
        //
        // const res = await productApi.getOne(uuid);
        //
        // if (res?.status === 200) {
        //   setProduct(res?.data?.product);
        // }

        // ---------------------------------------------------------
        // TEMPORARY DUMMY DATA
        // Remove this once your API is connected.
        // ---------------------------------------------------------
        setProduct({
          uuid,
          name: "Premium Raw Honey",
          slug: "premium-raw-honey",
          categoryId: "123",
          categoryName: "Honey",
          tagLine: "Pure goodness, straight from nature",
          description:
            "Naturally sourced raw honey collected from carefully selected apiaries. Rich in natural flavour, golden in colour and packed with the goodness of nature.",

          isActive: true,

          createdAt: "2026-09-10T10:30:00.000Z",
          updatedAt: "2026-09-15T14:20:00.000Z",

          images: [
            {
              _id: "1",
              image:
                "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
              alt: "Premium raw honey jar",
              isPrimary: true,
            },
            {
              _id: "2",
              image:
                "https://images.unsplash.com/photo-1471943311424-646960669fbc",
              alt: "Natural honey",
              isPrimary: false,
            },
            {
              _id: "3",
              image:
                "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
              alt: "Honey jar",
              isPrimary: false,
            },
          ],

          variants: [
            {
              _id: "v1",
              name: "250g",
              sku: "HNY-250",
              price: 299,
              compareAtPrice: 349,
              stock: 42,
              isActive: true,
            },
            {
              _id: "v2",
              name: "500g",
              sku: "HNY-500",
              price: 499,
              compareAtPrice: 549,
              stock: 28,
              isActive: true,
            },
            {
              _id: "v3",
              name: "1kg",
              sku: "HNY-1000",
              price: 899,
              compareAtPrice: 999,
              stock: 8,
              isActive: true,
            },
          ],

          seo: {
            metaTitle: "Premium Raw Honey | SWAAD",
            metaDescription:
              "Shop naturally sourced premium raw honey from SWAAD. Pure, authentic and packed with natural goodness.",
            metaKeywords: [
              "honey",
              "raw honey",
              "organic honey",
              "punjab honey",
            ],
          },

          reviews: [
            {
              _id: "r1",
              customerName: "Harpreet Singh",
              rating: 5,
              title: "Excellent quality",
              comment:
                "The honey tastes genuinely natural and the packaging is beautiful.",
              createdAt: "2026-09-13T09:20:00.000Z",
              isActive: true,
            },
            {
              _id: "r2",
              customerName: "Simran Kaur",
              rating: 4,
              title: "Very good honey",
              comment:
                "Loved the flavour. Delivery was quick and the product arrived safely.",
              createdAt: "2026-09-11T11:45:00.000Z",
              isActive: true,
            },
            {
              _id: "r3",
              customerName: "Aman Sharma",
              rating: 5,
              title: "Will buy again",
              comment:
                "Really good quality and authentic taste. Highly recommended.",
              createdAt: "2026-09-08T15:10:00.000Z",
              isActive: true,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [router.isReady, uuid]);

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E6CC] text-[#9B783E]">
            <Package size={24} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#463525]">
            Product not found
          </h2>

          <p className="mt-1 text-sm text-[#95846D]">
            The product you're looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-5 rounded-3xl bg-[#463421] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#59432C]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const variants = product.variants || [];
  const reviews = product.reviews || [];

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const totalStock = variants.reduce(
    (sum, variant) => sum + Number(variant.stock || 0),
    0,
  );

  const lowestPrice =
    variants.length > 0
      ? Math.min(...variants.map((variant) => Number(variant.price)))
      : 0;

  const highestPrice =
    variants.length > 0
      ? Math.max(...variants.map((variant) => Number(variant.price)))
      : 0;

  return (
    <div className="pb-10">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] shadow-sm transition hover:border-[#C9A96A] hover:bg-[#FBF7EE]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Product detail
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Review product details, variants and customer reviews.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          PRODUCT HERO
      ========================================================= */}
      <div className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white shadow-[0_12px_40px_rgba(78,57,28,0.07)]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          {/* IMAGE AREA */}
          <div className="border-b border-[#ECE4D6] bg-[#FCFAF6] p-6 lg:border-b-0 lg:border-r">
            <div className="flex gap-4">
              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="flex w-[72px] shrink-0 flex-col gap-3">
                  {images.map((image, index) => (
                    <button
                      key={image._id || index}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
                        selectedImage === index
                          ? "border-[#B99961] shadow-sm"
                          : "border-[#E5DCCA] hover:border-[#CDB98E]"
                      }`}
                    >
                      <img
                        src={image.image}
                        alt={image.alt || "Product image"}
                        className="h-full w-full object-cover"
                      />

                      {image.isPrimary && (
                        <span className="absolute bottom-1 left-1 rounded-full bg-[#463421] px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                          Main
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* MAIN IMAGE */}
              <div className="relative flex min-h-[430px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#E5DCCA] bg-white">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImage]?.image}
                    alt={
                      images[selectedImage]?.alt || product.name || "Product"
                    }
                    className="h-full max-h-[470px] w-full object-contain p-8"
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#B5A58D]">
                    <ImageIcon size={40} />
                    <p className="mt-3 text-xs">No product images</p>
                  </div>
                )}

                {product.isActive && (
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#D8E2CE] bg-[#F1F6ED] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6F8A5A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8DAA72]" />
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col p-7 lg:p-9">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#E5D4B4] bg-[#F8EEDB] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9B7A43]">
                {product.categoryName || "Uncategorized"}
              </span>

              {product.isActive ? (
                <span className="flex items-center gap-1.5 rounded-full bg-[#F1F6ED] px-3 py-1 text-[10px] font-bold text-[#6F8A5A]">
                  <BadgeCheck size={12} />
                  Available
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-[#F2EFEB] px-3 py-1 text-[10px] font-bold text-[#8B7D6B]">
                  <X size={12} />
                  Inactive
                </span>
              )}
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#33281F]">
              {product.name}
            </h2>

            {product.tagLine && (
              <p className="mt-2 text-sm font-medium italic text-[#9B7A43]">
                {product.tagLine}
              </p>
            )}

            {/* RATING */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    className={
                      star <= Math.round(averageRating)
                        ? "fill-[#B18A4D] text-[#B18A4D]"
                        : "text-[#D8CCB8]"
                    }
                  />
                ))}
              </div>

              <span className="text-sm font-bold text-[#4B3929]">
                {averageRating ? averageRating.toFixed(1) : "0.0"}
              </span>

              <span className="text-xs text-[#95846D]">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-7 rounded-2xl border border-[#E9DFC9] bg-[#FCF8EF] p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9A896F]">
                Price Range
              </p>

              <p className="mt-1 text-2xl font-bold text-[#463421]">
                ₹{lowestPrice.toLocaleString("en-IN")}
                {lowestPrice !== highestPrice &&
                  ` – ₹${highestPrice.toLocaleString("en-IN")}`}
              </p>

              <p className="mt-1 text-[11px] text-[#8D7A61]">
                Based on available product variants
              </p>
            </div>

            {/* QUICK STATS */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <StatCard
                icon={Layers3}
                label="Variants"
                value={variants.length}
              />

              <StatCard icon={Package} label="Stock" value={totalStock} />

              <StatCard icon={ImageIcon} label="Images" value={images.length} />
            </div>

            {/* META */}
            <div className="mt-auto pt-7">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#ECE4D6] pt-5 text-[11px] text-[#96866F]">
                <span className="flex items-center gap-1.5">
                  <Tag size={13} />
                  {product.slug}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={13} />
                  Updated {formatDate(product.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          PRODUCT OVERVIEW
      ========================================================= */}
      <DetailSection
        icon={Package}
        title="Product Overview"
        description="Core information and description of this product."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl border border-[#E7DED0] bg-[#FCFBF8] p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E6CC] text-[#9B783E]">
                <Package size={15} />
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-[#806C52]">
                Description
              </p>
            </div>

            <p className="text-sm leading-7 text-[#665542]">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="space-y-3">
            <InfoRow
              label="Category"
              value={product.categoryName || "-"}
              icon={Tag}
            />

            <InfoRow
              label="Product Slug"
              value={product.slug || "-"}
              icon={ExternalLink}
            />

            <InfoRow
              label="Product Status"
              value={product.isActive ? "Active" : "Inactive"}
              icon={ShieldCheck}
              success={product.isActive}
            />

            <InfoRow
              label="Created"
              value={formatDate(product.createdAt)}
              icon={CalendarDays}
            />
          </div>
        </div>
      </DetailSection>

      {/* =========================================================
          PRODUCT IMAGES
      ========================================================= */}
      <DetailSection
        icon={ImageIcon}
        title="Product Gallery"
        description={`${images.length} ${
          images.length === 1 ? "image" : "images"
        } associated with this product.`}
      >
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {images.map((image, index) => (
              <button
                key={image._id || index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] text-left transition hover:border-[#CDB98E] hover:shadow-md"
              >
                <img
                  src={image.image}
                  alt={image.alt || "Product image"}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 opacity-0 transition group-hover:opacity-100">
                  <p className="truncate text-xs font-medium text-white">
                    {image.alt || "Product image"}
                  </p>
                </div>

                {image.isPrimary && (
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#463421] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    <Check size={11} />
                    Primary
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={ImageIcon}
            title="No images available"
            description="This product does not have any images yet."
          />
        )}
      </DetailSection>

      {/* =========================================================
          VARIANTS
      ========================================================= */}
      <DetailSection
        icon={Layers3}
        title="Product Variants"
        description={`${variants.length} ${
          variants.length === 1 ? "variant" : "variants"
        } with individual pricing and inventory.`}
      >
        {variants.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-[#E5DCCA]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-[#E5DCCA] bg-[#FCFAF6]">
                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                      Variant
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                      SKU
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                      Compare Price
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                      Stock
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EEE7DA] bg-white">
                  {variants.map((variant) => (
                    <tr
                      key={variant._id || variant.uuid}
                      className="transition hover:bg-[#FCFAF6]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E6CC] text-[#9B783E]">
                            <Package size={15} />
                          </div>

                          <span className="text-sm font-bold text-[#4B3929]">
                            {variant.name || "-"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-[#F6F2E9] px-2.5 py-1.5 font-mono text-[11px] font-medium text-[#725D43]">
                          {variant.sku || "-"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-[#463421]">
                        ₹{Number(variant.price || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#95846D]">
                        {variant.compareAtPrice ? (
                          <span className="line-through">
                            ₹
                            {Number(variant.compareAtPrice).toLocaleString(
                              "en-IN",
                            )}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <StockBadge stock={variant.stock} />
                      </td>

                      <td className="px-5 py-4">
                        {variant.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F6ED] px-3 py-1.5 text-[10px] font-bold text-[#6F8A5A]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8DAA72]" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2EFEB] px-3 py-1.5 text-[10px] font-bold text-[#8B7D6B]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#B9B0A3]" />
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Layers3}
            title="No variants available"
            description="This product does not have any variants."
          />
        )}
      </DetailSection>

      {/* =========================================================
          SEO
      ========================================================= */}
      <DetailSection
        icon={Search}
        title="Search Optimization"
        description="SEO information configured for this product."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
              Meta Title
            </p>

            <p className="mt-2 text-sm font-semibold text-[#4B3929]">
              {product.seo?.metaTitle || "Not configured"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
              Meta Description
            </p>

            <p className="mt-2 text-sm leading-6 text-[#665542]">
              {product.seo?.metaDescription || "Not configured"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] p-5 lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#89765D]">
              Meta Keywords
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.seo?.metaKeywords?.length > 0 ? (
                product.seo.metaKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-[#E4D7BE] bg-[#F8EEDB] px-3 py-1.5 text-[10px] font-semibold text-[#80643B]"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#9A896F]">
                  No keywords configured.
                </span>
              )}
            </div>
          </div>
        </div>
      </DetailSection>

      {/* =========================================================
          REVIEWS
      ========================================================= */}
      <DetailSection
        icon={Star}
        title="Customer Reviews"
        description={`${reviews.length} ${
          reviews.length === 1 ? "review" : "reviews"
        } received for this product.`}
      >
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
            {/* REVIEW SUMMARY */}
            <div className="rounded-2xl border border-[#E9DFC9] bg-[#FCF8EF] p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9A896F]">
                Overall Rating
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-bold text-[#463421]">
                  {averageRating.toFixed(1)}
                </span>

                <span className="mb-1 text-xs text-[#95846D]">/ 5</span>
              </div>

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
                Based on {reviews.length} customer{" "}
                {reviews.length === 1 ? "review" : "reviews"}.
              </p>

              <div className="mt-5 border-t border-[#E5D8C2] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#89765D]">Active reviews</span>

                  <span className="text-sm font-bold text-[#4B3929]">
                    {reviews.filter((review) => review.isActive).length}
                  </span>
                </div>
              </div>
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
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

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-[#E7DED0] bg-[#FCFBF8] p-4">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[#9B783E]" />

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A896F]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-[#463421]">{value}</p>
    </div>
  );
};

/* =========================================================
   DETAIL SECTION
========================================================= */

const DetailSection = ({ icon: Icon, title, description, children }) => {
  return (
    <section className="mt-7 rounded-2xl border border-[#E6DDCD] bg-white p-7 shadow-[0_8px_30px_rgba(78,57,28,0.045)]">
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
};

/* =========================================================
   INFO ROW
========================================================= */

const InfoRow = ({ icon: Icon, label, value, success = false }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E7DED0] bg-[#FCFBF8] px-4 py-3.5">
      <div className="flex items-center gap-3">
        <Icon size={15} className="text-[#9B783E]" />

        <span className="text-xs font-medium text-[#89765D]">{label}</span>
      </div>

      <span
        className={`max-w-[60%] truncate text-right text-xs font-bold ${
          success ? "text-[#6F8A5A]" : "text-[#4B3929]"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   STOCK BADGE
========================================================= */

const StockBadge = ({ stock }) => {
  const numericStock = Number(stock || 0);

  let label = "In Stock";
  let className = "bg-[#F1F6ED] text-[#6F8A5A]";

  if (numericStock === 0) {
    label = "Out of Stock";
    className = "bg-[#FBEDEC] text-[#A45248]";
  } else if (numericStock <= 10) {
    label = "Low Stock";
    className = "bg-[#FFF5E5] text-[#A47735]";
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {label}
      </span>

      <span className="text-xs font-semibold text-[#5E4A34]">
        {numericStock}
      </span>
    </div>
  );
};

/* =========================================================
   REVIEW CARD
========================================================= */

const ReviewCard = ({ review }) => {
  return (
    <div className="rounded-2xl border border-[#E5DCCA] bg-[#FCFBF8] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E6CC] text-[#9B783E]">
            <UserRound size={17} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#4B3929]">
              {review.customerName}
            </p>

            <p className="mt-0.5 text-[10px] text-[#998A75]">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {review.isActive ? (
          <span className="flex items-center gap-1.5 rounded-full bg-[#F1F6ED] px-2.5 py-1 text-[9px] font-bold text-[#6F8A5A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8DAA72]" />
            Active
          </span>
        ) : (
          <span className="rounded-full bg-[#F2EFEB] px-2.5 py-1 text-[9px] font-bold text-[#8B7D6B]">
            Inactive
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= review.rating
                ? "fill-[#B18A4D] text-[#B18A4D]"
                : "text-[#D8CCB8]"
            }
          />
        ))}
      </div>

      {review.title && (
        <h3 className="mt-3 text-sm font-bold text-[#51402E]">
          {review.title}
        </h3>
      )}

      <p className="mt-2 text-sm leading-6 text-[#75634D]">
        {review.comment || "No comment provided."}
      </p>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-dashed border-[#DDD2BF] bg-[#FCFAF6] py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#A17D44]">
        <Icon size={21} />
      </div>

      <p className="mt-4 text-sm font-bold text-[#6B5942]">{title}</p>

      <p className="mt-1 text-xs text-[#9B8C77]">{description}</p>
    </div>
  );
};

/* =========================================================
   DATE FORMATTER
========================================================= */

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
