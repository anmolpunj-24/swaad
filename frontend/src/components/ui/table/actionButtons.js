import Link from "next/link";
import { Eye, Pencil, Trash2, Info } from "lucide-react";

const actionIcons = {
  view: Eye,
  edit: Pencil,
  delete: Trash2,
  info: Info,
};

export default function ActionButtons({ actions = [] }) {
  return (
    <div className="flex items-center">
      {actions
        .filter((action) => action.link)
        .map((action) => {
          const Icon = actionIcons[action.type];

          return (
            <Link
              key={action.type}
              href={action.link}
              title={action.label}
              aria-label={action.label}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:cursor-pointer ${
                action.type === "delete"
                  ? "text-[#963F32] hover:bg-[#963F32]/10"
                  : "text-[#806C52] hover:bg-[#F3E8D0]"
              }`}
            >
              {Icon && <Icon size={17} />}
            </Link>
          );
        })}
    </div>
  );
}
