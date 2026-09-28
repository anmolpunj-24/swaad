export default function SectionHeaderProduct({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E6CC] text-[#9B783E]">
          <Icon size={18} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#463525]">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-[#95846D]">{description}</p>
        </div>
      </div>

      {action}
    </div>
  );
}
