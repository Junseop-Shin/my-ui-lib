import { useState, useRef, useEffect, ReactNode } from "react";
import ChevronIcon from "./ChevronIcon";
import { AnimatePresence, motion } from "motion/react";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  value: string[]; // 다중 선택 지원
  onChange: (newValue: string[]) => void;
  searchable?: boolean;
  placeholder?: string;
  triggerType?: "input" | "button";

  handleButtonClick?: () => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
};

export function Dropdown({
  options,
  value,
  onChange,
  searchable = true,
  placeholder = "Dropdown...",
  triggerType = "input",
  handleButtonClick,
  buttonIcon,
  buttonLabel = "Dropdown",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (val: string) => {
    onChange(
      value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
    );
  };

  return (
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
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute w-full bg-white border rounded shadow-lg mt-1 max-h-60 overflow-auto z-10"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-gray-400">No results</li>
            ) : (
              filtered.map((opt) => (
                <li
                  key={opt.value}
                  className={`px-3 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 ${
                    value.includes(opt.value) ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => toggleSelect(opt.value)}
                >
                  {opt.label}
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
