
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Search, Zap, Star, DollarSign } from "lucide-react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

function CoinCard({ coin, index }) {
    const isPositive = coin.price_change_percentage_24h >= 0;

    return (
        <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl border-border hover:border-primary transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
            style={{
                animationName: 'slideUp',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${index * 100}ms`
            }}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
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
                            <CardTitle className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                {coin.name}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground uppercase text-sm font-medium">
                                {coin.symbol}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
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
            </CardHeader>

            <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-xl p-3">
                        <p className="text-muted-foreground text-sm font-medium">Market Cap</p>
                        <p className="text-foreground font-bold">
                            ${(coin.market_cap / 1e9).toFixed(1)}B
                        </p>
                    </div>
                    <div className="bg-muted rounded-xl p-3">
                        <p className="text-muted-foreground text-sm font-medium">Volume</p>
                        <p className="text-foreground font-bold">
                            ${(coin.total_volume / 1e9).toFixed(1)}B
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>24h Change</span>
                        <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-1000 ${isPositive ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                            style={{
                                width: `${Math.min(Math.abs(coin.price_change_percentage_24h) * 10, 100)}%`
                            }}
                        ></div>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                                {coin.name} ({coin.symbol.toUpperCase()})
                            </DialogTitle>
                            <DialogDescription>
                                Current Price: ${coin.current_price.toLocaleString()}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium">Market Cap Rank</h4>
                                    <p>#{coin.market_cap_rank}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">24h Change</h4>
                                    <p className={isPositive ? 'text-green-500' : 'text-red-500'}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium">24h High</h4>
                                    <p>${coin.high_24h.toLocaleString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium">24h Low</h4>
                                    <p>${coin.low_24h.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}

export default function CryptoPriceTracker({ coins }) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

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
        (coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())) &&
        (activeTab === "all" ||
         (activeTab === "gainers" && coin.price_change_percentage_24h > 0) ||
         (activeTab === "losers" && coin.price_change_percentage_24h < 0))
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-border rounded-full animate-spin border-t-primary mx-auto mb-4"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Zap className="w-8 h-8 text-primary animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Loading Market Data</h2>
                            <p className="text-muted-foreground">Fetching the latest cryptocurrency prices...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-7xl mx-auto">
                <Header />
                <SearchBar search={search} setSearch={setSearch} />
                
                <Tabs defaultValue="all" className="mb-6">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All Coins</TabsTrigger>
                        <TabsTrigger value="gainers" onClick={() => setActiveTab("gainers")}>Gainers</TabsTrigger>
                        <TabsTrigger value="losers" onClick={() => setActiveTab("losers")}>Losers</TabsTrigger>
                    </TabsList>
                </Tabs>

                {filteredCoins.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">No Results Found</h3>
                        <p className="text-muted-foreground">Try searching for a different cryptocurrency</p>
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