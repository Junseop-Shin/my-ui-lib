import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useDeferredValue,
} from "react";
import { DropdownOption } from "../common/Dropdown";

export function useDropdown(
  options: DropdownOption[],
  multiSelect: boolean,
  initialValue?: string[],
  onChange?: (v: string[]) => void
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue ?? []);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const result = options.filter((opt) =>
      opt.label.toLowerCase().includes(deferredQuery.toLowerCase())
    );

    // multiSelect가 아닐 때는 Clear All 버튼을 포함하지 않음
    if (!multiSelect) {
      return result;
    }

    return [
      {
        label: "전체 선택 해제",
        value: "__CLEAR_ALL__",
        description: "선택된 모든 옵션을 해제합니다.",
        disabled: value.length === 0,
      },
      ...result,
    ];
  }, [options, deferredQuery, value, multiSelect]);

  const handleClear = useCallback(() => {
    setValue([]);
    onChange?.([]);
    options.forEach((opt) => {
      opt.selected = false;
    });
  }, [setValue, onChange, options]);

  const toggleSelect = useCallback(
    (option: DropdownOption) => {
      const val = option.value;
      if (!multiSelect) {
        options.forEach((opt) => {
          opt.selected = opt.value === val;
        });
        onChange?.([val]);
        option.handleClick?.();
        setValue([val]);
        setTimeout(() => {
          setOpen(false);
        }, 0);
        return;
      }
      if (val == "__CLEAR_ALL__") {
        if (value.length === 0) return;
        handleClear();
        return;
      }
      const updated = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      setValue(updated);
      onChange?.(updated);
      option.handleClick?.();
      option.selected = !option.selected;
    },
    [value, multiSelect, handleClear, onChange, options]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          if (!open) {
            return;
          }
          // 아래로 이동
          setActiveIndex((prev) =>
            prev === null ? 0 : Math.min(filteredOptions.length - 1, prev + 1)
          );
          break;
        case "ArrowUp":
          // 위로 이동
          if (!open) {
            return;
          }
          setActiveIndex((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
          break;
        case "Enter":
          if (!open) {
            setOpen(true);
            return;
          }
          // 선택
          if (activeIndex !== null) {
            if (multiSelect && activeIndex === 0) {
              handleClear();
            } else {
              toggleSelect(filteredOptions[activeIndex]);
            }
          }
          break;
        case "Escape":
          // 닫기
          setOpen(false);
          break;
        default:
          break;
      }
    },
    [open, activeIndex, multiSelect, filteredOptions, handleClear, toggleSelect]
  );

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
