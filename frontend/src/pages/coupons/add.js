import { useState } from "react";
import { toast } from "sonner";
import CouponForm from "@/components/ui/forms/couponForm";
import { couponApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddCoupon() {
  const router = useRouter();
  const [addingCoupon, setAddingCoupon] = useState(false);

  const handleAddCoupon = async (data) => {
    setAddingCoupon(true);

    try {
      const res = await couponApi.add(data);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
        router.push("/coupons")
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingCoupon(false);
    }
  };

  return (
    <>
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
              Add Coupon
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Create and manage discount coupons, set usage limits, and offer
              special deals to your customers.
            </p>
          </div>
        </div>
      </div>

      <CouponForm
        onSubmit={handleAddCoupon}
        buttonText="Add Coupon"
        loadingButtonText="Adding Coupon..."
        loading={addingCoupon}
      />
    </>
  );
}
