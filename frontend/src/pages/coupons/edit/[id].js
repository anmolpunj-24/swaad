import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { couponApi } from "../../../../api.service";
import CouponForm from "@/components/ui/forms/couponForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditCoupon() {
  const router = useRouter();
  const { id } = router.query;

  const [coupon, setCoupon] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const oneCouponData = async () => {
      try {
        const res = await couponApi.getOne(id);

        if (res?.status === 200) {
          const couponData = res.data.coupon;

          setCoupon(couponData);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch coupon!",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    oneCouponData();
  }, [router.isReady, id]);

  const handleCouponUpdate = async (data) => {
    setUpdateLoading(true);

    try {
      const res = await couponApi.update(id, data);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Coupon updated successfully!");
        router.push("/coupons");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update coupon!");
    } finally {
      setUpdateLoading(false);
    }
  };

  const couponDefaultValues = useMemo(
    () => ({
      code: coupon?.code ?? "",
      description: coupon?.description ?? "",
      discountType: coupon?.discountType ?? "percentage",
      discountValue: coupon?.discountValue ?? "",
      minOrderAmount: coupon?.minOrderAmount ?? "",
      maxDiscountAmount: coupon?.maxDiscountAmount ?? "",
      startDate: coupon?.startDate ? coupon.startDate.slice(0, 10) : "",
      endDate: coupon?.endDate ? coupon.endDate.slice(0, 10) : "",
      usageLimit: coupon?.usageLimit ?? "",
      usedCount: coupon?.usedCount ?? 0,
      isActive: coupon?.isActive ?? true,
    }),
    [coupon],
  );

  return (
    <>
      {fetchLoading && <GlobalLoader />}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:border-[#C9A96A] hover:bg-[#FBF7EE] hover:cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Edit Coupon
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Edit an existing toupon.
            </p>
          </div>
        </div>
      </div>

      <CouponForm
        onSubmit={handleCouponUpdate}
        buttonText="Update Coupon"
        loadingButtonText="Updating Coupon..."
        loading={updateLoading}
        defaultValues={couponDefaultValues}
      />
    </>
  );
}
