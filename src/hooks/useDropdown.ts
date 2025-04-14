import { useState, useEffect, useRef, useMemo } from "react";
import { DropdownOption } from "../common/Dropdown";

export function useDropdown(
  options: DropdownOption[],
  initialValue?: string[],
  onChange?: (v: string[]) => void
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue ?? []);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const result = options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );

    return [
      {
        label: "전체 선택 해제",
        value: "__CLEAR_ALL__",
        description: "선택된 모든 옵션을 해제합니다.",
        disabled: value.length === 0,
      },
      ...result,
    ];
  }, [options, query, value]);

  const handleClear = () => {
    setValue([]);
    if (onChange) onChange([]);
  };

  const toggleSelect = (val: string) => {
    if (val == "__CLEAR_ALL__") {
      if (value.length === 0) return;
      handleClear();
      return;
    }
    const updated = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val];
    setValue(updated);
    if (onChange) onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      // 아래로 이동
      setActiveIndex((prev) =>
        prev === null ? 0 : Math.min(filteredOptions.length, prev + 1)
      );
    } else if (e.key === "ArrowUp") {
      // 위로 이동
      setActiveIndex((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
    } else if (e.key === "Enter") {
      // 선택
      if (activeIndex !== null) {
        if (activeIndex === 0) {
          handleClear();
        } else {
          toggleSelect(filteredOptions[activeIndex].value);
        }
      }
    } else if (e.key === "Escape") {
      // 닫기
      setOpen(false);
    }
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

  return {
    open,
    setOpen,
    value,
    toggleSelect,
    ref,
    query,
    setQuery,
    filteredOptions,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
  };
}
