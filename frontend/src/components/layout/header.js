import { useState } from "react";
import { User, ChevronDown, KeyRound, LogOut } from "lucide-react";
import { adminAuthApi } from "../../../api.service";
import { toast } from "sonner";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutAllLoading, setLogoutAllLoading] = useState(false);

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

  const handleAllDevicesLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout from all devices?",
    );

    if (!confirmed) {
      return;
    }

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

  return (
    <header className="relative flex min-h-[4rem] items-center justify-between border-b border-[#E7E0D4] bg-[#FFFDF8] px-5 text-[#2A2622]">
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
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#E5D3AD] text-[#463421]">
            <User size={18} />
          </div>

          <span className="text-sm font-medium">Avinash</span>

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
              <div className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E5D3AD] text-[#463421]">
                <User size={28} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#2A2622]">
                  Avinash
                </p>

                <p className="truncate text-xs text-[#8A7B68]">
                  avinash@gmail.com
                </p>
              </div>
            </div>

            <div className="p-2">
              <button
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
                <span>{logoutLoading ? "Logging out..." : "Logout"}</span>{" "}
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
  );
}
