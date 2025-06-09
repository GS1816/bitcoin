
import { TrendingUp, TrendingDown, Search, Zap, Star, DollarSign } from "lucide-react";
import { ThemeToggle } from "./ThemeProvider";

export default function Header() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-3xl p-8 mb-8 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 flex justify-between items-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              CryptoVault
            </h1>
          </div>
          <p className="text-lg text-purple-200 mb-6">Real-time cryptocurrency market insights</p>
        </div>
        
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}