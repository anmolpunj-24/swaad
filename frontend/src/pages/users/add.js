import UserForm from "@/components/ui/forms/userForm";
import { userApi } from "../../../api.service";
import { useState } from "react";
import { toast } from "sonner";

export default function AddUser() {
  const [addingUser, setAddingUser] = useState(false);

  const handleAddUser = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      dob: data.dob,
      phone: data.phone,
      isActive: data.isActive,
    };

    setAddingUser(true);

    try {
      const res = await userApi.add(userData);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingUser(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Add User</h1>

        <p className="mt-1 text-sm text-[#6f665d]">
          Create a new user account.
        </p>
      </div>

      <div className="max-w-full rounded-2xl bg-[#F7F4EC] p-6 shadow-[0_8px_30px_rgba(42,38,34,0.08)]">
        <UserForm
          onSubmit={handleAddUser}
          buttonText="Add User"
          loadingButtonText="Adding User..."
          loading={addingUser}
        />
      </div>
    </>
  );
}
