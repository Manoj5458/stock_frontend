import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { marketData, setStockData } from "../features/stockData";
import ScreenerUi from "../common/body/screenerUi";
import ComparisonTable from "../common/body/comparisonTable";
import { useSearchParams } from "react-router-dom";
import mapToStockData from "../utils/mapScreenerData_service";
import { AppDispatch } from "../app/store";

const Home = () => {
  const [message, setMessage] = useState("Hello!");
  const screenerData = useSelector(marketData);
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/upstox/`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // FastAPI returns {message: "..."}, extract the message string
        setMessage(response.data.message || response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Fetch screener data when URL has a query parameter
  useEffect(() => {
    const fetchScreenerData = async () => {
      if (!searchValue) return;

      try {
        const csrfToken =
          document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("csrftoken="))
            ?.split("=")[1] || "";

        const response = await axios.post(
          `${API_BASE_URL}/upstox/screener`,
          {
            searchValue: searchValue,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
          },
        );

        if (response.data) {
          const stockData = mapToStockData(response.data);
          dispatch(setStockData(stockData));
        }
      } catch (error) {
        console.error("Error fetching screener data:", error);
      }
    };

    fetchScreenerData();
  }, [searchValue, dispatch]);

  useEffect(() => {
    console.log(screenerData);
  }, [screenerData]);

  return (
    <div className="grid justify-center">
      {screenerData.marketCap.length > 0 ? (
        <ScreenerUi />
      ) : (
        <div className="container px-4 py-3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome to Mr_Stocks App
            </h1>
            <p className="text-xl text-gray-400">
              Compare stocks and analyze market data with ease
            </p>
          </div>
          <ComparisonTable />
        </div>
      )}
      <div className="card w-150 h-100">{/* <Charts /> */}</div>
    </div>
  );
};

export default Home;
