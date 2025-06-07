
import { TrendingUp, TrendingDown, Search, Zap, Star, DollarSign } from "lucide-react";
export default function SearchBar({ search, setSearch }) {
  return (
    <div className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-gray-100 focus:border-indigo-500 focus:outline-none transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
        />
      </div>
    </div>
  );
}
