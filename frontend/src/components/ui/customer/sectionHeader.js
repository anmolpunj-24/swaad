export default function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  light = false,
}) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-5 ${
        light ? "border-b border-[#EEE8DE]" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            light
              ? "bg-[#F7F4EC] text-[#96733B]"
              : "bg-[#F3E8D0] text-[#8B6B38]"
          }`}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-sm font-extrabold tracking-wide text-[#39322C]">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-[#93887D]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
