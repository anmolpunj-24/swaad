import { useForm, Controller } from "react-hook-form";
import { getInfoOnTheBasisOfPincode } from "../../../../api.service";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function CustomerAddressForm({
  defaultValues = {
    addressLine_1: "",
    addressLine_2: "",
    country: "",
    state: "",
    postalCode: "",
    city: "",
    isDefault: false,
  },
  onSubmit,
  buttonText,
  loading = false,
  loadingButtonText,
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const postalCode = watch("postalCode");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    if (!/^\d{6}$/.test(postalCode || "")) {
      setValue("country", "");
      setValue("state", "");
      setValue("city", "");
      setIsLoadingLocation(false);

      return;
    }

    const getInfo = async () => {
      try {
        setIsLoadingLocation(true);

        const response = await getInfoOnTheBasisOfPincode(postalCode);

        const infoData = response?.data?.[0].PostOffice?.[0];

        if (!infoData) {
          setValue("country", "");
          setValue("state", "");
          setValue("city", "");
          return;
        }

        setValue("country", infoData.Country, { shouldValidate: true });
        setValue("state", infoData.State, { shouldValidate: true });
        setValue("city", infoData.District, { shouldValidate: true });
      } catch (error) {
        console.error("Failed to fetch pincode information:", error);

        setValue("country", "");
        setValue("state", "");
        setValue("city", "");
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getInfo();
  }, [postalCode, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-7 md:grid-cols-2"
      noValidate
    >
      <div>
        <div className="relative">
          <label
            htmlFor="addressLine_1"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Address Line 1
          </label>

          <input
            id="addressLine_1"
            type="text"
            disabled={loading}
            {...register("addressLine_1", {
              required: "Address Line 1 is required!",
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {errors.addressLine_1 && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.addressLine_1.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="addressLine_2"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Address Line 2
          </label>

          <input
            id="addressLine_2"
            type="text"
            disabled={loading}
            {...register("addressLine_2")}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {errors.addressLine_2 && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.addressLine_2.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="postalCode"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Postal Code
          </label>

          <input
            id="postalCode"
            type="text"
            disabled={loading}
            inputMode="numeric"
            maxLength={6}
            {...register("postalCode", {
              required: "Postal Code is required!",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Postal code must contain 6 digits!",
              },
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {errors.postalCode && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.postalCode.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="country"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Country
          </label>

          <input
            id="country"
            type="text"
            readOnly
            {...register("country", {
              required: "Country is required!",
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] cursor-not-allowed"
          />

          {isLoadingLocation && (
            <LoaderCircle
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#9B7A43]"
            />
          )}
        </div>

        <p className="mt-1 text-[0.5rem] text-black/60 text-right">
          *Automatically generated from pincode..
        </p>

        {errors.country && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.country.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="state"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            State
          </label>

          <input
            id="state"
            type="text"
            readOnly
            {...register("state", {
              required: "State is required!",
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] cursor-not-allowed"
          />

          {isLoadingLocation && (
            <LoaderCircle
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#9B7A43]"
            />
          )}
        </div>

        <p className="mt-1 text-[0.5rem] text-black/60 text-right">
          *Automatically generated from pincode..
        </p>

        {errors.state && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.state.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="city"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            City
          </label>

          <input
            id="city"
            type="text"
            readOnly
            {...register("city", {
              required: "City is required!",
            })}
            className="w-full rounded-xl bg-[#F3E8D0]/50 px-4 py-4 text-[#3E3021] outline-none transition-all duration-300 focus:bg-[#F3E8D0] cursor-not-allowed"
          />

          {isLoadingLocation && (
            <LoaderCircle
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#9B7A43]"
            />
          )}
        </div>

        <p className="mt-1 text-[0.5rem] text-black/60 text-right">
          *Automatically generated from pincode..
        </p>

        {errors.city && (
          <p className="mt-2 px-1 text-[12px] text-[#963F32]">
            {errors.city.message}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <label
            htmlFor="isDefault"
            className="absolute -top-2.5 left-3 z-10 px-2 text-[0.9rem] font-bold tracking-wide text-[#4B3927]"
          >
            Address Status
          </label>

          <Controller
            name="isDefault"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                id="isDefault"
                disabled={loading}
                onClick={() => field.onChange(!field.value)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-4 outline-none transition-all duration-300 ${
                  field.value ? "bg-[#F3E8D0]" : "bg-[#F3E8D0]/50"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span className="text-[#3E3021]">
                  {field.value ? "Default Address" : "Regular Address"}
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
          onClick={() => window.history.back()}
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
