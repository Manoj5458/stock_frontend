import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { marketData } from "../features/stockData";
import { useSelector } from "react-redux";

const Charts = () => {
  const symbol = useSelector(marketData);
  return (
    <>
      <AdvancedRealTimeChart
        timezone="Asia/Kolkata"
        symbol="infy"
        theme="dark"
      ></AdvancedRealTimeChart>
    </>
  );
};

export default Charts;
