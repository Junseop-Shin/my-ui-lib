import { Table } from "@tanstack/react-table";
import { createContext } from "react";

export type TableContextType<T> = {
  table: Table<T>;
  setColumnVisibility: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

export const TableContext = createContext<TableContextType<unknown>>(
  null as unknown as TableContextType<unknown>
);
