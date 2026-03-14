import StatusBadge from "./StatusBadge";
import { EditIcon, TrashIcon } from "./Icons";

function Table({
  columns,
  data,
  emptyMessage = "Aucune donnée disponible",
  onEdit,
  onDelete,
}) {
  const isStatusColumn = (col) => {
    const lower = col.toLowerCase();
    return lower === "status" || lower === "statut";
  };

  const showActions = !!(onEdit || onDelete);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
              {showActions && (
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-5 py-10 text-center text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors duration-150"
                >
                  {columns.map((col, j) => (
                    <td
                      key={j}
                      className="px-5 py-3.5 text-slate-700 dark:text-slate-300 whitespace-nowrap"
                    >
                      {isStatusColumn(col) ? (
                        <StatusBadge status={row[col]} />
                      ) : (
                        <span className={j === 0 ? "font-medium text-slate-900 dark:text-white" : ""}>
                          {row[col]}
                        </span>
                      )}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {onEdit && (
                          <button
                            onClick={(e) => { console.log('Table: edit click', i); onEdit(i, row, e); }}
                            className="p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
                            title="Modifier"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => { console.log('Table: delete click', i); onDelete(i, row, e); }}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Supprimer"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
