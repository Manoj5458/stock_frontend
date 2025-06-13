import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { marketData } from "../features/stockData";
import ScreenerUi from "../common/body/screenerUi";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState("Hello!");
  const screenerData = useSelector(marketData);

const [searchParams] = useSearchParams();
const searchValue = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/upstox/", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(screenerData);
  }, [screenerData]);

  return (
    <div className="grid justify-center">
      {screenerData.marketCap.length > 0 ? (
        <ScreenerUi />
      ) : (
        <>
          <h1>Welcome to Mr_Stocks App</h1>
          {message}
          <p>
            This is a stock market application that provides various features
            such as stock news, screener, and charts.
          </p>
        </>
      )}
      <div className="card w-150 h-100">{/* <Charts /> */}</div>
    </div>
  );
};

export default Home;
