import { useEffect, useState } from "react";
import {
  User,
  ChevronDown,
  KeyRound,
  LogOut,
  Loader2,
  Camera,
} from "lucide-react";
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
          value === getValues("newPassword") || "Passwords do not match!",
      },
    },
  ];

  const handleUpdatePassword = async (data) => {
    const passwordData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setUpdatePasswordLoading(true);

    try {
      const res = await adminAuthApi.updatePassword(passwordData);

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
      <header className="shrink-0 relative flex min-h-[3.5rem] items-center justify-between border-b border-[#E7E0D4] bg-[#FFFDF8] px-5 text-[#2A2622]">
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
            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[290px] overflow-hidden rounded-2xl border border-[#E5DDCF] bg-white shadow-[0_18px_50px_rgba(74,54,28,0.16)]">
              <div className="bg-[#FCFAF6] px-4 py-4">
                <div className="flex items-center gap-3.5">
                  <label className="group relative block h-14 w-14 shrink-0 cursor-pointer">
                    <div className="h-full w-full rounded-full bg-[#F3E6CC] p-[2px] shadow-sm">
                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#E5D3AD] text-[#463421]">
                        {profileLoading ? (
                          <div className="flex h-full w-full items-center justify-center">
                            <Loader2
                              size={19}
                              className="animate-spin text-[#8F6C36]"
                            />
                          </div>
                        ) : user?.profile ? (
                          <Image
                            src={user.profile}
                            alt="Profile"
                            width={56}
                            height={56}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <User size={25} />
                        )}

                        {!profileLoading && (
                          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#2A2622]/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <Camera size={17} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className={`absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
                        user?.isActive ? "bg-[#8DAA72]" : "bg-[#B9B0A3]"
                      }`}
                    />

                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={handleProfileUpload}
                      disabled={profileLoading}
                    />
                  </label>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#33281F]">
                      {capitaliseFirstLetter(user?.name) || "User"}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-[#8A7B68]">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#EEE7DA] p-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-[#FCF8EF] hover:cursor-pointer"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5EBD8] text-[#9B783E] transition-colors group-hover:bg-[#F0E1C3]">
                    <KeyRound size={16} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#4B3929]">
                      Update Password
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#9A8B77]">
                      Change your account password
                    </p>
                  </div>
                </button>
              </div>

              <div className="border-t border-[#EEE7DA] p-2">
                <button
                  type="button"
                  onClick={handleCurrentDeviceLogout}
                  disabled={logoutLoading || logoutAllLoading}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-[#F7F4EC] disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3F0EA] text-[#746653] transition-colors group-hover:bg-[#ECE7DE]">
                    {logoutLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogOut size={16} />
                    )}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#4B3929]">
                      {logoutLoading ? "Logging out..." : "Logout"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#9A8B77]">
                      Sign out from this device
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleAllDevicesLogout}
                  disabled={logoutLoading || logoutAllLoading}
                  className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-[#FBEDEA] disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F9E9E5] text-[#9A493D] transition-colors group-hover:bg-[#F5DEDA]">
                    {logoutAllLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <LogOut size={16} />
                    )}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#8B4035]">
                      {logoutAllLoading
                        ? "Logging out..."
                        : "Logout from all devices"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#A56B62]">
                      End all active sessions
                    </p>
                  </div>
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
