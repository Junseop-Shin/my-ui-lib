import { ReactNode, useMemo } from "react";
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
  const {
    open,
    setOpen,
    value,
    ref,
    toggleSelect,
    query,
    setQuery,
    activeIndex,
    setActiveIndex,
    filteredOptions,
    handleKeyDown,
    handleClear,
  } = useDropdown(options, initialValue, onChange);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      value,
      toggleSelect,
      activeIndex,
      setActiveIndex,
      filteredOptions,
      handleClear,
    }),
    [
      open,
      setOpen,
      value,
      toggleSelect,
      activeIndex,
      setActiveIndex,
      filteredOptions,
      handleClear,
    ]
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        className="relative"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={ref}
      >
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
        <DropdownMenu />
      </div>
    </DropdownContext.Provider>
  );
}
