import { motion } from "framer-motion";
import { Zap } from "lucide-react";
// import { ThemeToggle } from "./ThemeProvider"; // Remove this line

export default function Header() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 text-white shadow-lg"
        >
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-20 -left-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                    className="absolute -bottom-20 -right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                ></motion.div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                        <motion.div
                            className="p-2 sm:p-3 bg-white/20 dark:bg-gray-300/20 backdrop-blur-lg rounded-xl"
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-300" />
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300">
                            CryptoVault
                        </h1>
                    </div>
                    <p className="text-xs sm:text-sm md:text-lg text-purple-200 dark:text-purple-50 text-center">Real-time cryptocurrency market insights</p>
                </div>
                {/* <ThemeToggle /> */}
            </div>
        </motion.div>
    );
}