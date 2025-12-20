import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
    type Table,
} from "@tanstack/react-table"
import { useState } from "react"

interface UseDataTableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
}

interface UseDataTableReturn<TData> {
    table: Table<TData>
    globalFilter: string
    setGlobalFilter: (value: string) => void
}

export function useDataTable<TData>({
    data,
    columns,
}: UseDataTableProps<TData>): UseDataTableReturn<TData> {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            globalFilter,
        },
    })

    return {
        table,
        globalFilter,
        setGlobalFilter,
    }
}
