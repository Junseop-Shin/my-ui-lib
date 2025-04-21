// context/DropdownContext.tsx
import { createContext } from "react";
import { DropdownOption, DropdownPostion } from "../common/Dropdown";

type DropdownContextType = {
  open: boolean;
  setOpen: (val: boolean) => void;
  value: string[];
  toggleSelect: (option: DropdownOption) => void;
  filteredOptions: DropdownOption[];
  activeIndex: number | null;
  setActiveIndex: (val: number | null) => void;
  menuPosition: DropdownPostion;
};

export const DropdownContext = createContext<DropdownContextType>(
  null as unknown as DropdownContextType
);
