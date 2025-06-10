import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ search, setSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative mb-4 sm:mb-6"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-50" />
        </motion.div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-white/80 dark:bg-gray-400/80 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-100"
        />
      </div>
    </motion.div>
  );
}