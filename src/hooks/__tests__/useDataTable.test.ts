import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDataTable } from '../useDataTable';
import { ColumnDef } from '@tanstack/react-table';

interface TestData {
    id: number;
    name: string;
}

const columns: ColumnDef<TestData>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
];

const data: TestData[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

describe('useDataTable', () => {
    it('should initialize table with data', () => {
        const { result } = renderHook(() => useDataTable({ data, columns }));

        expect(result.current.table.getRowModel().rows).toHaveLength(2);
        expect(result.current.globalFilter).toBe('');
    });

    it('should update global filter', () => {
        const { result } = renderHook(() => useDataTable({ data, columns }));

        act(() => {
            result.current.setGlobalFilter('Alice');
        });

        expect(result.current.globalFilter).toBe('Alice');
        // Note: Actual filtering depends on the table implementation reacting to the state change,
        // which useReactTable handles. We verify the state update here.
        expect(result.current.table.getState().globalFilter).toBe('Alice');
    });

    it('should handle sorting state updates', () => {
        const { result } = renderHook(() => useDataTable({ data, columns }));

        // Verify initial state
        expect(result.current.table.getState().sorting).toEqual([]);

        // Trigger sorting on first column
        act(() => {
            result.current.table.getColumn('name')?.toggleSorting();
        });

        expect(result.current.table.getState().sorting).toHaveLength(1);
        expect(result.current.table.getState().sorting[0].id).toBe('name');
    });
});
