import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropdownContext } from "../context/DropdownContext";
import { DropdownOption } from "./Dropdown";
import Tooltip from "./Tooltip";

type DropdownMenuProps = { filtered: DropdownOption[] };

const DropdownMenu = ({ filtered }: DropdownMenuProps) => {
  const { open, value, toggleSelect } = useDropdownContext();

  return (
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
            filtered.map((opt) => {
              const selected = value.includes(opt.value);
              return (
                <Tooltip content={opt.description}>
                  <li
                    key={opt.value}
                    className={`relative group px-3 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 ${
                      selected ? "bg-gray-200 pl-2" : "pl-[33.5px]"
                    }`}
                    onClick={() => toggleSelect(opt.value)}
                  >
                    {selected && (
                      <span className="text-green-600 px-1 mr-1">✔</span>
                    )}
                    {opt.label}
                  </li>
                </Tooltip>
              );
            })
          )}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default memo(DropdownMenu);
