import React, { useEffect, useState } from "react";
import axios from "axios";

const StockForm = ({ onAddStock }) => {
    const [stockSymbol, setStockSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [pricePerShare, setPricePerShare] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!stockSymbol || !quantity || !pricePerShare) {
            alert("Please fill in all fields.");
            return;
        }

        var symbol = stockSymbol.toUpperCase();
        const resp = axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`).then(res => {
            console.log(res.data)
            if (res.data["Global Quote"] == null || res.data["Global Quote"]["05. price"] == null) {
                alert("invalid Stock")
            } else {
                const stockData = {
                    symbol: stockSymbol.toUpperCase(),
                    quantity: parseInt(quantity),
                    pricePerShare: parseFloat(pricePerShare),
                    currentPricePerShare: parseFloat(res.data["Global Quote"]["05. price"]),
                    profitLoss: parseFloat(res.data["Global Quote"]["05. price"]-pricePerShare)
                }
                // Add the stock data to the parent component
                onAddStock(stockData);

                // Clear the form after submission
                setStockSymbol("");
                setQuantity("");
                setPricePerShare("");
                setCurrentPricePerShare("");
                setProfitLoss("")
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Stock Symbol:</label>
                <input
                    type="text"
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    placeholder="e.g., AAPL, GOOGL"
                />
            </div>

            <div>
                <label>Quantity of Shares:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g., 10"
                />
            </div>

            <div>
                <label>Purchase Price per Share:</label>
                <input
                    type="number"
                    step="0.01"
                    value={pricePerShare}
                    onChange={(e) => setPricePerShare(e.target.value)}
                    placeholder="e.g., 145.67"
                />
            </div>

            <button type="submit">Add Stock</button>
        </form>
    );
};

const StockDashboard = () => {
    const [stocks, setStocks] = useState([]);

    const addStock = (stock) => {
        setStocks([...stocks, stock]);
    };

    return (
        <div>
            <h1>Finance Dashboard</h1>
            <StockForm onAddStock={addStock} />
            <h2>Stock List</h2>
            <ul>
                {stocks.map((stock, index) => (
                    <li key={index}>
                        <p>Symbol: {stock.symbol}</p>
                        <p>Quantity: {stock.quantity}</p>
                        <p>Price: {stock.pricePerShare} </p>
                        <p>current price: {stock.currentPricePerShare}</p>
                        <p>Profit/Loss: {stock.profitLoss}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockDashboard;
