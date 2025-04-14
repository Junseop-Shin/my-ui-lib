// context/DropdownContext.tsx
import { createContext, useContext } from "react";
import { DropdownOption, DropdownPostion } from "../common/Dropdown";

type DropdownContextType = {
  open: boolean;
  setOpen: (val: boolean) => void;
  value: string[];
  toggleSelect: (val: string) => void;
  filteredOptions: DropdownOption[];
  activeIndex: number | null;
  setActiveIndex: (val: number | null) => void;
  menuPosition: DropdownPostion;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownContext must be used within provider");
  return ctx;
}
