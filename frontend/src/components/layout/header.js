import { User, ChevronDown } from "lucide-react";

export default function Header() {
  return (
  <header className="border-b border-[#E7E0D4] bg-[#FFFDF8] text-[black] min-h-[4rem] flex justify-between px-4 items-center">
  <div className="flex items-baseline gap-2">
    <h1 className="font-[550] text-[2rem]">SWAAD</h1>
    <span className="text-[0.8rem] italic text-[#7A6F60]">
      Taste of Punjab
    </span>
  </div>

  <div className="flex items-center">
    <User size={18} />
    <p className="mr-[0.7rem]">User</p>
    <ChevronDown size={20} />
  </div>
</header>
  );
}
