import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropdownContext } from "../context/DropdownContext";
import Tooltip from "./Tooltip";

const DropdownMenu = () => {
  const {
    open,
    value,
    toggleSelect,
    activeIndex,
    setActiveIndex,
    filteredOptions,
    handleClear,
  } = useDropdownContext();

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute w-full bg-white border rounded shadow-lg mt-1 max-h-60 overflow-auto z-10"
          onMouseLeave={handleMouseLeave}
        >
          <li
            className={`pr-3 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 pl-[33.5px]
                ${activeIndex === 0 ? "bg-gray-100" : ""}`}
            onClick={handleClear}
            onMouseEnter={() => handleMouseEnter(0)}
          >
            <span>Clear All</span>
          </li>
          {filteredOptions.length === 0 ? (
            <li className="px-3 py-2 text-gray-400">No results</li>
          ) : (
            filteredOptions.map((opt, index) => {
              const selected = value.includes(opt.value);
              return (
                <Tooltip content={opt.description}>
                  <li
                    key={opt.value}
                    className={`relative group px-3 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 ${
                      selected ? "bg-gray-200 pl-2" : "pl-[33.5px]"
                    }
                    ${activeIndex === index + 1 ? "bg-gray-100" : ""}
                    `}
                    onClick={() => toggleSelect(opt.value)}
                    onMouseEnter={() => handleMouseEnter(index + 1)}
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
