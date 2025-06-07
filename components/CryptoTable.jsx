
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Search, Zap, Star, DollarSign } from "lucide-react";
import Header from "./Header";
import SearchBar from "./SearchBar";
function CoinCard({ coin, index }) {
    const isPositive = coin.price_change_percentage_24h >= 0;

    return (
        <div
            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
            style={{
                animationName: 'slideUp',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${index * 100}ms`
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {coin.name}
                        </h3>
                        <p className="text-gray-500 uppercase text-sm font-medium">{coin.symbol}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                        ${coin.current_price.toLocaleString()}
                    </p>
                    <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="font-semibold">
                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
                    <p className="text-gray-600 text-sm font-medium">Market Cap</p>
                    <p className="text-gray-900 font-bold">
                        ${(coin.market_cap / 1e9).toFixed(1)}B
                    </p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
                    <p className="text-gray-600 text-sm font-medium">Volume</p>
                    <p className="text-gray-900 font-bold">
                        ${(coin.total_volume / 1e9).toFixed(1)}B
                    </p>
                </div>
            </div>

            {/* Progress bar for 24h change */}
            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>24h Change</span>
                    <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-1000 ${isPositive ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                            }`}
                        style={{
                            width: `${Math.min(Math.abs(coin.price_change_percentage_24h) * 10, 100)}%`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default function CryptoPriceTracker({ coins }) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const fetchData = () => {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        };

        fetchData();
    }, []);

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600 mx-auto mb-4"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Zap className="w-8 h-8 text-indigo-600 animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Market Data</h2>
                            <p className="text-gray-600">Fetching the latest cryptocurrency prices...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
            <div className="max-w-7xl mx-auto">
                <Header />
                <SearchBar search={search} setSearch={setSearch} />

                {filteredCoins.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                        <p className="text-gray-600">Try searching for a different cryptocurrency</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCoins.map((coin, index) => (
                            <CoinCard key={coin.id} coin={coin} index={index} />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}