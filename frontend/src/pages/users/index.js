import CustomTable from "@/components/ui/table/customTable";
import { userApi } from "../../../api.service";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await userApi.getAll();

        if (res?.status === 200) {
          setUsers(res?.data?.users);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message ?? "Failed to fetch users!");
      }
    };

    fetchAllUsers();
  }, []);

  const userColumns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-xl px-3 py-1 text-xs font-semibold ${
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
        <h1 className="text-2xl font-semibold text-[#2A2622]">Users</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All users of SWAAD.</p>
      </div>

      <CustomTable columns={userColumns} data={users} title="Users" addButtonText="Add User" onAdd="/users/add"/>
    </>
  );
}
