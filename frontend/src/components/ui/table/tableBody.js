import ActionButtons from "./actionButtons";

export default function TableBody({
  columns = [],
  data = [],
  actions = [],
  onAction,
}) {
  return (
    <tbody>
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <tr
            key={row._id || rowIndex}
            className="border-b border-[#9B7A43]/20 transition-colors duration-200 hover:bg-[#F3E8D0]/40"
          >
            {columns.map((column) => (
              <td key={column.key} className="px-5 py-4 text-sm text-[#3E3021]">
                {column.render ? column.render(row) : (row[column.key] ?? "-")}
              </td>
            ))}

            {actions.length > 0 && (
              <td className="px-5 py-4">
                <ActionButtons
                  actions={actions}
                  row={row}
                  onAction={onAction}
                />
              </td>
            )}
          </tr>
        )) 
      ) : (
        <tr>
          <td
            colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
            className="px-5 py-10 text-center text-sm text-[#806C52]"
          >
            No data found
          </td>
        </tr>
      )}
    </tbody>
  );
}
