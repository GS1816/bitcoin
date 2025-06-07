export default function CryptoTable({ coins }) {
  return (
    <div className="overflow-x-auto shadow-lg rounded">
      <table className="min-w-full bg-white text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Coin</th>
            <th className="p-3">Price</th>
            <th className="p-3">24h %</th>
            <th className="p-3">Market Cap</th>
            <th className="p-3">Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, i) => (
            <tr key={coin.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{i + 1}</td>
              <td className="p-3 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td className="p-3">${coin.current_price.toLocaleString()}</td>
              <td
                className={`p-3 ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="p-3">${coin.market_cap.toLocaleString()}</td>
              <td className="p-3">${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
