export default function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F4EC] text-[#A38A61]">
        <Icon size={21} strokeWidth={1.7} />
      </div>

      <p className="mt-3 text-sm font-bold text-[#554C44]">{title}</p>

      <p className="mt-1 max-w-xs text-xs leading-5 text-[#988E84]">{text}</p>
    </div>
  );
}
