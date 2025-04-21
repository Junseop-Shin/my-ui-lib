import { motion, AnimatePresence } from "framer-motion";

const TableHeaderSortButton = ({ sort }: { sort: "asc" | "desc" | false }) => {
  return (
    <AnimatePresence mode="wait">
      {sort === "asc" && (
        <motion.span
          key="asc"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          ▲
        </motion.span>
      )}
      {sort === "desc" && (
        <motion.span
          key="desc"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      )}
      {!sort && (
        <motion.span
          key="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          ▲▼
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default TableHeaderSortButton;
