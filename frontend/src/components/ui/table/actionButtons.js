import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  LoaderCircle,
} from "lucide-react";

const actionIcons = {
  view: Eye,
  edit: Pencil,
  delete: Trash2,
};

export default function ActionButtons({ actions = [] }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedAction?.onClick || deleting) return;

    try {
      setDeleting(true);
      await selectedAction.onClick();
      setSelectedAction(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {actions.map((action, index) => {
          const Icon = actionIcons[action.type];

          if (!Icon) return null;

          const iconClassName = `flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:cursor-pointer ${
            action.type === "delete"
              ? "text-[#963F32] hover:bg-[#963F32]/10"
              : "text-[#806C52] hover:bg-[#F3E8D0]"
          }`;

          if (action.type === "delete" && action.onClick) {
            return (
              <button
                key={action.type}
                type="button"
                title={action.label || "Delete"}
                aria-label={action.label || "Delete"}
                onClick={() => setSelectedAction(action)}
                className={iconClassName}
              >
                <Icon size={17} />
              </button>
            );
          }

          if (action.link) {
            return (
              <Link
                key={`${action.type}-${index}`}
                href={action.link}
                title={action.label}
                aria-label={action.label}
                className={iconClassName}
              >
                <Icon size={17} />
              </Link>
            );
          }

          if (action.onClick) {
            return (
              <button
                key={`${action.type}-${index}`}
                type="button"
                title={action.label}
                aria-label={action.label}
                onClick={action.onClick}
                className={iconClassName}
              >
                <Icon size={17} />
              </button>
            );
          }

          return null;
        })}
      </div>

      {selectedAction && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleting) {
              setSelectedAction(null);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            className="w-full max-w-md rounded-2xl border border-[#E6DDCD] bg-[#FCFBF8] p-6 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#963F32]/10 text-[#963F32]">
                <AlertTriangle size={24} />
              </div>

              <div className="flex-1">
                <h2
                  id="delete-dialog-title"
                  className="text-lg font-bold text-[#463525]"
                >
                  {selectedAction.confirmTitle || "Delete this record?"}
                </h2>

                <p
                  id="delete-dialog-description"
                  className="mt-2 text-sm leading-6 text-[#806C52]"
                >
                  {selectedAction.confirmMessage ||
                    "Are you sure you want to delete this record? This action cannot be undone."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                disabled={deleting}
                aria-label="Close confirmation dialog"
                className="rounded-full p-2 text-[#806C52] transition hover:bg-[#F3E8D0] disabled:opacity-50 hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                disabled={deleting}
                className="rounded-3xl border border-[#DDD3C1] px-4 py-2.5 text-sm font-semibold text-[#66533C] transition hover:bg-[#F3E8D0] disabled:opacity-50 hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-3xl bg-[#963F32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7D3228] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
              >
                {deleting && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
