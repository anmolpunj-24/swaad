import UserForm from "@/components/ui/forms/userForm";
import { userApi } from "../../../api.service";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddUser() {
  const router = useRouter();
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
              Add User
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Create a new users account.
            </p>
          </div>
        </div>
      </div>

      <UserForm
        onSubmit={handleAddUser}
        buttonText="Add User"
        loadingButtonText="Adding User..."
        loading={addingUser}
      />
    </>
  );
}
