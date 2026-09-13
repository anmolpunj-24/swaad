import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { useRouter } from "next/router";

export default function CustomTable({
  columns = [],
  data = [],
  actions = [],
  onAction,
  addButtonText,
  title,
  onAdd,
}) {
  const router = useRouter();
  // Dummy actions for now
  const dummyActions = [
    {
      type: "view",
      label: "View",
    },
    {
      type: "edit",
      label: "Edit",
    },
    {
      type: "delete",
      label: "Delete",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] shadow-sm">
      <TableHeader
        title={title}
        total={data.length}
        searchValue=""
        onSearch={(value) => console.log("Search:", value)}
        onAdd={() => router.push(onAdd)}
        addButtonText={addButtonText}
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-[#9B7A43]/20 bg-[#F3E8D0]/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#4B3927]"
                >
                  {column.label}
                </th>
              ))}

              {dummyActions.length > 0 && (
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#4B3927]">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <TableBody
            columns={columns}
            data={data}
            actions={dummyActions}
            onAction={(action, row) => {
              console.log("Action:", action);
              console.log("Row:", row);
            }}
          />
        </table>
      </div>
    </div>
  );
}
