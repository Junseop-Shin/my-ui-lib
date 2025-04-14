import { useState, useRef, useEffect } from "react";
type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  value: string[]; // 다중 선택 지원
  onChange: (newValue: string[]) => void;
  searchable?: boolean;
  placeholder?: string;
  triggerType?: "input" | "button";
};

export function DropdownMenu({
  options,
  value,
  onChange,
  searchable = true,
  placeholder = "Select...",
  triggerType = "input",
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
    <ul className="absolute w-full bg-white border rounded shadow mt-1 max-h-60 overflow-auto z-10">
      {filtered.length === 0 ? (
        <li className="px-3 py-2 text-gray-400">No results</li>
      ) : (
        filtered.map((opt) => (
          <li
            key={opt.value}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
              value.includes(opt.value) ? "bg-gray-200 font-semibold" : ""
            }`}
            onClick={() => toggleSelect(opt.value)}
          >
            {opt.label}
          </li>
        ))
      )}
    </ul>
  );
}
