// context/DropdownContext.tsx
import { createContext, useContext } from "react";

type DropdownContextType = {
  open: boolean;
  setOpen: (val: boolean) => void;
  value: string[];
  toggleSelect: (val: string) => void;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownContext must be used within provider");
  return ctx;
}
