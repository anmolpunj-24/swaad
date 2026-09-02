import { useEffect, useState } from "react";
import { User, ChevronDown, KeyRound, LogOut, Loader2 } from "lucide-react";
import { adminAuthApi } from "../../../api.service";
import { toast } from "sonner";
import capitaliseFirstLetter from "@/utils/capitaliseFirstLetter";
import Image from "next/image";
import GenericModal from "../ui/genericModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutAllLoading, setLogoutAllLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);

  const handleCurrentDeviceLogout = async () => {
    setLogoutLoading(true);

    try {
      const res = await adminAuthApi.logoutCurrentDevice();

      if (res?.status === 200) {
        localStorage.removeItem("accessToken");

        toast.success(res?.data?.message || "Logged out successfully!");

        window.location.href = "/";
      } else {
        toast.error(res?.data?.message || "Logout failed!");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error("Unable to logout!");
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleAllDevicesLogout = () => {
    toast("Logout from all devices?", {
      description: "This will log you out from every active session.",
      action: {
        label: "Logout",
        onClick: () => performAllDevicesLogout(),
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const performAllDevicesLogout = async () => {
    setLogoutAllLoading(true);

    try {
      const res = await adminAuthApi.logoutAllDevices();

      if (res?.status === 200) {
        localStorage.removeItem("accessToken");

        toast.success(
          res?.data?.message || "Logged out from all devices successfully!",
        );

        window.location.href = "/";
      } else {
        toast.error(res?.data?.message || "Logout failed!");
      }
    } catch (error) {
      toast.error("Unable to logout from all devices!");
    } finally {
      setLogoutAllLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await adminAuthApi.currentUser();

        setUser(res?.data?.user);
      } catch (err) {
        if (err.response?.status !== 401) {
          toast.error("Unable to fetch user data!");
        }
      }
    };

    getUser();
  }, []);

  const handleProfileUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileLoading(true);

    try {
      const res = await adminAuthApi.uploadProfile(file);

      if (res?.status === 200) {
        setUser((prev) => ({
          ...prev,
          profile: res.data.profile,
        }));

        toast.success(res?.data?.message || "Profile picture updated!");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message || "Unable to upload profile picture!",
        );
      }
    } finally {
      setProfileLoading(false);

      event.target.value = "";
    }
  };

  const passwordInputs = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      validation: {
        pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain 8+ characters, uppercase, lowercase, number, and special character!",
      },
      },
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      validation: {
      validate: (value, getValues) =>
        value === getValues("newPassword") ||
        "Passwords do not match!",
    },
    },
  ];

  const handleUpdatePassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setUpdatePasswordLoading(true);

    try {
      const res = await adminAuthApi.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });5

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Password updated successfully!");

        setIsPasswordModalOpen(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to update password!",
      );
    } finally {
      setUpdatePasswordLoading(false);
    }
  };

  return (
    <>
      <header className="relative flex min-h-[3.5rem] items-center justify-between border-b border-[#E7E0D4] bg-[#FFFDF8] px-5 text-[#2A2622]">
        <div className="flex items-baseline gap-2">
          <h1 className="text-[2rem] font-[550] tracking-[-0.04em]">SWAAD</h1>

          <span className="text-[0.8rem] italic text-[#7A6F60]">
            Taste of Punjab
          </span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-colors duration-200 hover:bg-[#F7F4EC] hover:cursor-pointer"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#E5D3AD]">
              {user?.profile ? (
                <Image
                  src={user.profile}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#463421]">
                  <User size={18} />
                </div>
              )}
            </div>

            <span className="text-sm font-medium">
              {capitaliseFirstLetter(user?.name) || "User"}
            </span>

            <ChevronDown
              size={17}
              className={`text-[#7A6F60] transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+1rem)] z-50 w-[270px] overflow-hidden rounded-2xl border border-[#E7E0D4] bg-[#FFFDF8] shadow-[0_12px_35px_rgba(74,54,28,0.14)]">
              <div className="flex items-center gap-5 border-b border-[#E7E0D4] px-4 py-4">
                <label className="relative block h-15 w-15 cursor-pointer">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#E5D3AD] text-[#463421]">
                    {profileLoading ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <Loader2
                          size={20}
                          className="animate-spin text-[#463421]"
                        />
                      </div>
                    ) : user?.profile ? (
                      <Image
                        src={user.profile}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#463421]">
                        <User size={28} />
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleProfileUpload}
                    disabled={profileLoading}
                  />
                </label>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2A2622]">
                    {capitaliseFirstLetter(user?.name) || "User"}
                  </p>

                  <p className="truncate text-xs text-[#8A7B68]">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#463421] transition-colors hover:bg-[#F7F4EC] hover:cursor-pointer"
                >
                  <KeyRound size={17} />
                  <span>Update Password</span>
                </button>
              </div>

              <div className="border-t border-[#E7E0D4] p-2">
                <button
                  type="button"
                  onClick={handleCurrentDeviceLogout}
                  disabled={logoutLoading || logoutAllLoading}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#463421] transition-colors hover:bg-[#F7F4EC] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut size={17} />
                  <span>
                    {logoutLoading ? "Logging out..." : "Logout"}
                  </span>{" "}
                </button>

                <button
                  type="button"
                  onClick={handleAllDevicesLogout}
                  disabled={logoutLoading || logoutAllLoading}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#8B4035] transition-colors hover:bg-[#FBEDEA] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut size={17} />
                  <span>
                    {logoutAllLoading
                      ? "Logging out..."
                      : "Logout from all devices"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <GenericModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Update Password"
        description="Change your account password."
        inputs={passwordInputs}
        onSubmit={handleUpdatePassword}
        buttonText="Update Password"
        buttonTextWhileLoading="Updating..."
        loading={updatePasswordLoading}
      />
    </>
  );
}
