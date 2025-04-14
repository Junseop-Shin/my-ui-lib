import { useState, ReactNode, useMemo } from "react";
import ChevronIcon from "./ChevronIcon";
import { useDropdown } from "../hooks/useDropdown";
import DropdownMenu from "./DropdownMenu";
import { DropdownContext } from "../context/DropdownContext";

export type DropdownOption = {
  label: string;
  value: string;
  description?: string;
};

export type DropdownProps = {
  options: DropdownOption[];
  value?: string[]; // 다중 선택 지원
  onChange?: (newValue: string[]) => void;
  searchable?: boolean;
  placeholder?: string;
  triggerType?: "input" | "button";

  handleButtonClick?: () => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
};

export function Dropdown({
  options,
  value: initialValue,
  onChange,
  searchable = true,
  placeholder = "Dropdown...",
  triggerType = "input",
  handleButtonClick,
  buttonIcon,
  buttonLabel = "Dropdown",
}: DropdownProps) {
  const { open, setOpen, value, ref, toggleSelect } = useDropdown(
    initialValue,
    onChange
  );
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      ),
    [options, query]
  );
  const contextValue = useMemo(
    () => ({ open, setOpen, value, toggleSelect }),
    [open, setOpen, value, toggleSelect]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        toggleSelect(filteredOptions[highlightedIndex].value);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative" ref={ref}>
        {triggerType === "input" ? (
          <>
            <input
              className="w-64 border px-3 py-2 rounded"
              readOnly={!searchable}
              onFocus={() => {
                setOpen(true);
                setQuery("");
              }}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              value={
                searchable && open
                  ? query
                  : value
                      .map((v) => options.find((o) => o.value === v)?.label)
                      .join(", ")
              }
              placeholder={placeholder}
            />
            <button
              className="absolute h-full p-2.5 right-1.5 cursor-pointer hover:opacity-50"
              onClick={() => {
                setOpen((prev) => !prev);
                setQuery("");
              }}
            >
              <ChevronIcon open={open} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleButtonClick}
              className="w-fit text-center border pl-3 pr-9 py-2 rounded cursor-pointer"
              onKeyDown={handleKeyDown}
            >
              {buttonIcon && <span className="mr-1">{buttonIcon}</span>}
              {buttonLabel}
            </button>
            <button
              className="absolute right-1 top-1 p-2.5 cursor-pointer hover:opacity-50"
              onClick={() => setOpen((prev) => !prev)}
            >
              <ChevronIcon open={open} />
            </button>
          </>
        )}
        <DropdownMenu filtered={filteredOptions} />
      </div>
    </DropdownContext.Provider>
  );
}
