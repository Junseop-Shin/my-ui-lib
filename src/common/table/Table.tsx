import { flexRender, ColumnDef } from "@tanstack/react-table";
import TableHeaderSortButton from "./TableHeaderSortButton";
import { useTable } from "../../hooks/useTable";
import { TableContext, TableContextType } from "../../context/TableContext";
import { useMemo } from "react";
import TableEditor from "./TableEditor";

export type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
};

export function Table<T extends object>({ data, columns }: TableProps<T>) {
  const { table, setColumnVisibility } = useTable<T>(data, columns);

  const tableContextValue: TableContextType<T> = useMemo(
    () => ({ table, setColumnVisibility }),
    [table, setColumnVisibility]
  );

  return (
    <TableContext value={tableContextValue as TableContextType<unknown>}>
      <div className="p-4 rounded-xl border border-gray-200 shadow-sm overflow-auto">
        <TableEditor />
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-sm font-medium text-gray-700 px-3 py-2 border-b"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex w-full items-center gap-1 select-none justify-between"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <TableHeaderSortButton
                            sort={header.column.getIsSorted()}
                          />
                        )}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${
                  row.getIsSelected() && "bg-gray-100"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-sm text-gray-800 px-3 py-2 border-b"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableContext>
  );
}
