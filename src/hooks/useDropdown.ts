import { useState, useEffect, useRef } from "react";

export function useDropdown(
  initialValue?: string[],
  onChange?: (v: string[]) => void
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue ?? []);
  const ref = useRef<HTMLDivElement>(null);

  const toggleSelect = (val: string) => {
    const updated = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    setValue(updated);
    if (onChange) onChange(updated);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return { open, setOpen, value, toggleSelect, ref };
}
