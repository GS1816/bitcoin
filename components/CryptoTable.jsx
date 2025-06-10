"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, TrendingDown, Search, Zap, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

function CoinCard({ coin, index }) {
    const isPositive = coin.price_change_percentage_24h >= 0;
    const cardRef = useRef(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(
            isFavorite ? "Removed from Favorites" : "Added to Favorites",
            {
                description: `${coin.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
                duration: 3000,
            }
        );
    };

    const handleDialogOpen = () => {
        setDialogLoading(true);
        setTimeout(() => {
            setDialogLoading(false);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            ref={cardRef}
        >
            <Card className="group overflow-hidden transition-all duration-500 hover:shadow-2xl border-border hover:border-primary bg-white/80 dark:bg-gray-600/90 backdrop-blur-sm touch-manipulation select-none">
                <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white dark:bg-gray-100 rounded-full animate-pulse"></div>
                                </div>
                            </motion.div>
                            <div>
                                <CardTitle className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-50 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                                    {coin.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-100 uppercase text-xs sm:text-sm font-medium">
                                    {coin.symbol}
                                </CardDescription>
                            </div>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">
                                ${coin.current_price.toLocaleString()}
                            </p>
                            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {isPositive ? <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                                <span className="font-semibold text-sm sm:text-base">
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pb-4">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <motion.div
                            className="bg-gray-100 dark:bg-gray-500 rounded-xl p-2 sm:p-3"
                            whileHover={{ backgroundColor: "#e5e7eb", transition: { duration: 0.2 } }}
                        >
                            <p className="text-gray-600 dark:text-gray-100 text-xs sm:text-sm font-medium">Market Cap</p>
                            <p className="text-gray-900 dark:text-gray-50 font-bold text-sm sm:text-base">
                                ${(coin.market_cap / 1e9).toFixed(1)}B
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-gray-100 dark:bg-gray-500 rounded-xl p-2 sm:p-3"
                            whileHover={{ backgroundColor: "#e5e7eb", transition: { duration: 0.2 } }}
                        >
                            <p className="text-gray-600 dark:text-gray-100 text-xs sm:text-sm font-medium">Volume</p>
                            <p className="text-gray-900 dark:text-gray-50 font-bold text-sm sm:text-base">
                                ${(coin.total_volume / 1e9).toFixed(1)}B
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-3 sm:mt-4">
                        <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-100 mb-1">
                            <span>24h Change</span>
                            <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-400 rounded-full h-2">
                            <motion.div
                                className={`h-2 rounded-full ${isPositive ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(Math.abs(coin.price_change_percentage_24h) * 10, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            ></motion.div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Dialog onOpenChange={handleDialogOpen}>
                        <DialogTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto text-xs sm:text-sm text-gray-900 dark:text-gray-50 border-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500"
                                >
                                    View Details
                                </Button>
                            </motion.div>
                        </DialogTrigger>
                        <DialogContent className="max-w-[90vw] sm:max-w-lg bg-white dark:bg-gray-600">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-50">
                                    {dialogLoading ? (
                                        "Loading..."
                                    ) : (
                                        <>
                                            <img src={coin.image} alt={coin.name} className="w-6 h-6 sm:w-8 sm:h-8" />
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </>
                                    )}
                                </DialogTitle>
                                {!dialogLoading && (
                                    <DialogDescription className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-100">
                                        Current Price: ${coin.current_price.toLocaleString()}
                                    </DialogDescription>
                                )}
                            </DialogHeader>
                            {dialogLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 border-4 border-indigo-500 dark:border-indigo-400 border-t-transparent rounded-full"
                                    />
                                </div>
                            ) : (
                                <div className="grid gap-3 sm:gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <h4 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">Market Cap Rank</h4>
                                            <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">#{coin.market_cap_rank}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">24h Change</h4>
                                            <p className={`text-xs sm:text-sm md:text-base ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                                {coin.price_change_percentage_24h.toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <h4 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">24h High</h4>
                                            <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">${coin.high_24h.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">24h Low</h4>
                                            <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-gray-50">${coin.low_24h.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Star
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400'}`}
                            onClick={handleFavorite}
                        />
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

export default function CryptoPriceTracker({ coins }) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const fetchData = () => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        fetchData();
    }, []);

    const filteredCoins = coins.filter((coin) =>
        (coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())) &&
        (activeTab === "all" ||
         (activeTab === "gainers" && coin.price_change_percentage_24h > 0) ||
         (activeTab === "losers" && coin.price_change_percentage_24h < 0))
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4"
                    >
                        <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-600 rounded-full border-t-indigo-500 dark:border-t-indigo-400"></div>
                        <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                    </motion.div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Loading Market Data</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Fetching the latest cryptocurrency prices...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <Header />
                <SearchBar search={search} setSearch={setSearch} />
                
                <Tabs defaultValue="all" className="mb-4 sm:mb-6">
                    <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 bg-white/50 dark:bg-gray-600/50 backdrop-blur-sm rounded-xl p-1">
                        {["all", "gainers", "losers"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                onClick={() => setActiveTab(tab)}
                                className="text-xs sm:text-sm font-medium capitalize rounded-lg transition-all duration-300 data-[state=active]:bg-indigo-500 dark:data-[state=active]:bg-indigo-600 data-[state=active]:text-white dark:data-[state=active]:text-gray-100"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <AnimatePresence>
                    {filteredCoins.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-100" />
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Results Found</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Try searching for a different cryptocurrency</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {filteredCoins.map((coin, index) => (
                                <CoinCard key={coin.id} coin={coin} index={index} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .touch-manipulation {
                    touch-action: manipulation;
                }
            `}</style>
        </div>
    );
}