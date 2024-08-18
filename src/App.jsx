import { useState } from "react";
import StockDashboard from "./components/StockForm";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <StockDashboard />
        </>
    );
}

export default App;
