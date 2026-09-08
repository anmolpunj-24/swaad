import CustomerAddressForm from "@/components/ui/forms/customerAddressForm";
import { customerAddressApi } from "../../../../api.service";
import { useState } from "react";
import { toast } from "sonner";

export default function AddCustomerAddress() {
  const [addingAddress, setAddingAddress] = useState(false);

  const handleAddCustomerAddress = async (data) => {
    const addressData = {
      addressLine_1: data.addressLine_1,
      addressLine_2: data.addressLine_2,
      country: data.country,
      state: data.state,
      postalCode: data.postalCode,
      city: data.city,
      isDefault: data.isDefault,
    };

    setAddingAddress(true);

    try {
      const res = await customerAddressApi.add(addressData);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingAddress(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">
          Add Customer Address
        </h1>

        <p className="mt-1 text-sm text-[#6f665d]">
          Create a new customer address.
        </p>
      </div>

      <div className="max-w-full rounded-2xl bg-[#F7F4EC] p-6 shadow-[0_8px_30px_rgba(42,38,34,0.08)]">
        <CustomerAddressForm
          onSubmit={handleAddCustomerAddress}
          buttonText="Add Customer Address"
          loadingButtonText="Adding Address..."
          loading={addingAddress}
        />
      </div>
    </>
  );
}
