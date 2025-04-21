import { use, useCallback } from "react";
import { TableContext } from "../../context/TableContext";
import { Dropdown, DropdownOption } from "../Dropdown";

const TableColumnVisibilityModifier = () => {
  const { table, setColumnVisibility } = use(TableContext);

  const handleOptionClick = useCallback(
    (columnName: string) => {
      setColumnVisibility((prevVisibility) => ({
        ...prevVisibility,
        [columnName]:
          prevVisibility[columnName] !== undefined
            ? !prevVisibility[columnName]
            : false,
      }));
    },
    [setColumnVisibility]
  );

  const menuOptions: DropdownOption[] = table
    .getAllLeafColumns()
    .flatMap((column) => {
      if (column.getCanHide()) {
        return [
          {
            label: String(column.columnDef.header),
            handleClick: () => handleOptionClick(column.id),
            selected: column.getIsVisible(),
            value: column.id,
          },
        ];
      }
      return [];
    });

  return (
    <Dropdown
      options={menuOptions}
      triggerType="button"
      buttonLabel="컬럼 선택"
      className="relative text-sm font-medium"
    />
  );
};

export default TableColumnVisibilityModifier;
