'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CryptoTable from "@/components/CryptoTable";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(res.data);
    };
    fetchData();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CryptoTable coins={filteredCoins} />
    </>
  );
}
