import { HTMLProps, ReactNode, useMemo } from "react";
import ChevronIcon from "./ChevronIcon";
import { useDropdown } from "../hooks/useDropdown";
import DropdownMenu from "./DropdownMenu";
import { DropdownContext } from "../context/DropdownContext";

export type DropdownOption = {
  label: string;
  value: string;
  description?: string;
};

export type DropdownPostion =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

export interface CustomDropdownProps {
  options: DropdownOption[];
  value?: string[];
  menuPosition?: DropdownPostion;
  multiSelect?: boolean;

  onValueChange?: (newValue: string[]) => void;
  searchable?: boolean;
  placeholder?: string;
  triggerType?: "input" | "button";

  handleButtonClick?: () => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
}

export type DropdownProps = CustomDropdownProps &
  Omit<HTMLProps<HTMLDivElement>, "onChange">;

export function Dropdown({
  options,
  value: initialValue,
  menuPosition = "bottom-left",
  multiSelect = true,
  onValueChange,
  searchable = true,
  placeholder = "Dropdown...",
  triggerType = "input",
  handleButtonClick,
  buttonIcon,
  buttonLabel = "Dropdown",
  ...props
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
  } = useDropdown(options, multiSelect, initialValue, onValueChange);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      value,
      toggleSelect,
      activeIndex,
      setActiveIndex,
      filteredOptions,
    }),
    [
      open,
      setOpen,
      value,
      toggleSelect,
      activeIndex,
      setActiveIndex,
      filteredOptions,
    ]
  );

  return (
    <DropdownContext.Provider value={{ ...contextValue, menuPosition }}>
      <div
        className="relative"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={ref}
        aria-expanded={open}
        aria-controls="dropdown-menu"
        {...props}
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
              {...(searchable && {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value),
              })}
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
              <ChevronIcon direction={open ? "up" : "down"} />
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
              <ChevronIcon direction={open ? "up" : "down"} />
            </button>
          </>
        )}
        <DropdownMenu />
      </div>
    </DropdownContext.Provider>
  );
}
