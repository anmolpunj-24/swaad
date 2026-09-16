import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { customerApi } from "../../../../api.service";
import CustomerForm from "@/components/ui/forms/customerForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditCustomer() {
  const router = useRouter();
  const { uuid } = router.query;

  const [customer, setCustomer] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !uuid) return;

    const oneCustomerData = async () => {
      try {
        const res = await customerApi.getOne(uuid);

        if (res?.status === 200) {
          setCustomer(res.data.customer);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch customer!",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    oneCustomerData();
  }, [router.isReady, uuid]);

  const handleCustomerUpdate = async (data) => {
    const formattedDob = data.dob
      ? `${data.dob.getFullYear()}-${String(data.dob.getMonth() + 1).padStart(
          2,
          "0",
        )}-${String(data.dob.getDate()).padStart(2, "0")}`
      : "";

    const updateCustomerData = {
      gender: data.gender,
      dob: formattedDob,
      phone: data.phone,
      isActive: data.isActive,
    };

    setUpdateLoading(true);

    try {
      const res = await customerApi.update(uuid, updateCustomerData);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Customer updated successfully!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update customer!",
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  const customerDefaultValues = useMemo(
    () => ({
      gender: customer?.gender || "",
      dob: customer?.dob ? new Date(customer.dob) : null,
      phone: customer?.phone || "",
      isActive: customer?.isActive ?? false,
    }),
    [customer?.gender, customer?.dob, customer?.phone, customer?.isActive],
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
              Edit Customer
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Edit an existing customer.
            </p>
          </div>
        </div>
      </div>

      <CustomerForm
        onSubmit={handleCustomerUpdate}
        buttonText="Update Customer"
        loadingButtonText="Updating Customer..."
        loading={updateLoading}
        defaultValues={customerDefaultValues}
      />
    </>
  );
}
