import CustomTable from "@/components/ui/table/customTable";
import { customerApi } from "../../../api.service";
import { useEffect, useState } from "react";
import { dateHandler } from "@/utils/dateHandler";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const customersData = await customerApi.getAll();

        if (customersData.status === 200) {
          const formattedCustomers = customersData?.data?.customers.map(
            (customer) => ({
              ...customer,
              dob: dateHandler(customer?.dob),
            }),
          );
          setCustomers(formattedCustomers);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message ?? "Failed to fetch data!");
      }
    };

    fetchCustomersData();
  }, []);

  const customerColumns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "gender",
      label: "Gender",
    },
    {
      key: "dob",
      label: "DOB",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.isActive
              ? "bg-[#9B7A43]/15 text-[#806C52]"
              : "bg-[#963F32]/10 text-[#963F32]"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Customers</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All customers of SWAAD.</p>
      </div>

      <CustomTable
        columns={customerColumns}
        data={customers}
        title="Customers"
        addButtonText="Add Customer"
        onAdd="/customers/add"
      />
    </>
  );
}
