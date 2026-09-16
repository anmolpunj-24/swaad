export default function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FCFAF5] px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#92703A]">
        <Icon size={15} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#A0968C]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold text-[#4A423A]">
          {value}
        </p>
      </div>
    </div>
  );
}
