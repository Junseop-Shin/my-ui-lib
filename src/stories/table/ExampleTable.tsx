import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../common/table/Table";

export type Person = {
  company: string;
  name: string;
  years: number;
  date: string;
  phone: string;
  address: string;
};

const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => {
      return (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          // @ts-expect-error: 동작은 정상이나 tanstack과 input onChange간 타입 충돌 발생
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            table.getToggleAllRowsSelectedHandler()(e)
          }
        />
      );
    },
    cell: ({ row }) => {
      return (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          // @ts-expect-error: 동작은 정상이나 tanstack과 input onChange간 타입 충돌 발생
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            row.getToggleSelectedHandler()(e)
          }
        />
      );
    },
    size: 40,
  },
  {
    accessorKey: "company",
    header: "회사",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "years",
    header: "연차",
    cell: (info) => `${info.getValue()}년`,
  },
  {
    accessorKey: "date",
    header: "등록일자",
  },
  {
    accessorKey: "phone",
    header: "전화번호",
  },
  {
    accessorKey: "address",
    header: "주소",
  },
];

export default function ExampleTable({ data }: { data: Person[] }) {
  return <Table data={data} columns={columns} />;
}
