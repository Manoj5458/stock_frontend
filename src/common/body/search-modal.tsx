"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../../components/ui/animated-modal";
import { SignupFormDemo } from "./signUpForm";
import { SearchInput } from "../forms/search-input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/app/store";
import StockData from "@/src/models/stock-model";
import { setStockData } from "../../features/stockData";
import mapToStockData from "../../utils/mapScreenerData_service";
import { useSearchParams } from "react-router-dom";
// import { createAsyncThunk } from "@reduxjs/toolkit";

export function SearchModal() {
  const [results, setResults] = useState([]); // Search results
  const [searchValue, setSearchValue] = useState("");
  const [screenerData, setScreenerData] = useState<StockData>(); // Stock data
  const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
  const [csrfToken, setCsrfToken] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { setOpen } = useModal();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (val: string) => {
      setSearchParams({ q: val });
    },
    [setSearchParams],
  );

  // Fetch CSRF token from the server
  useEffect(() => {
    const token =
      document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("csrftoken="))
        ?.split("=")[1] || "";
    setCsrfToken(token);
    console.log("CSRF Token:", token);
  }, []); // Empty dependency array - only run once on mount

  // keyboard event Trigger api call
  // useEffect(() => {
  //   const tickerSearch = async (searchValue: string) => {
  //     try {
  //       if (!searchValue) {
  //         setResults([]);
  //         return;
  //       }
  //       const response = await axios.get(`https://www.alphavantage.co/query`, {
  //         params: {
  //           function: "SYMBOL_SEARCH",
  //           keywords: searchValue,
  //           apikey: API_KEY,
  //         },
  //       });

  //       if (response.data && Array.isArray(response.data.bestMatches)) {
  //         const mapped = response.data.bestMatches.map((m: any) => ({
  //           description: m["2. name"],
  //           symbol: m["1. symbol"],
  //           type: m["3. type"],
  //         }));
  //         setResults(mapped);
  //       } else {
  //         setResults([]);
  //       }
  //     } catch (err) {
  //       setResults([]);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   const tickerSearch = async (searchValue: string) => {
  //     try {
  //       const response = await axios.get(``)
  //     }
  //   tickerSearch(searchValue);
  // }, [searchValue, API_KEY]);

  const searchTicker = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchValue) return;
    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: searchValue,
          apikey: API_KEY,
        },
      });

      if (response.data && Array.isArray(response.data.bestMatches)) {
        const mapped = response.data.bestMatches.map((m: any) => ({
          description: m["2. name"],
          symbol: m["1. symbol"],
          type: m["3. type"],
        }));
        setResults(mapped);
      } else {
        setResults([]);
      }
    } catch (err) {
      setResults([]);
    } finally {
      console.log("Search completed");
    }
  };

  // const searchTicker = async (event: React?

  const onTickerSearch = async (searchValue: string) => {
    const trimmedSearchValue = searchValue.replace(/\..*$/, "");
    updateSearchParams(trimmedSearchValue);
    setOpen(false); // Close modal immediately
    try {
      const response = await axios.post(
        `${API_BASE_URL}/upstox/screener`,
        {
          searchValue: trimmedSearchValue,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken, // Include the CSRF token here
          },
        },
      );
      if (response.data) {
        setScreenerData(response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (screenerData) {
      const stockData = mapToStockData(screenerData); // Map the response data to StockData
      dispatch(setStockData(stockData)); // Dispatch the setStockData action with stockData as payload
    }
  }, [screenerData, dispatch]);

  // const onTickerSearch = createAsyncThunk<StockData, string>(
  //   "upstox/screener",
  //   async (searchValue: string) => {
  //     try {
  //       const response = await axios.post(
  //         `${API_BASE_URL}/`,
  //         {
  //           searchValue,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-CSRFToken": csrfToken, // Include the CSRF token here
  //           },
  //         }
  //       );
  //       if (response.data) {
  //         return dispatch(response.data); // Explicitly return the data
  //       }
  //       throw new Error("No data received");
  //     } catch (err) {
  //       throw new Error("Failed to fetch data. Try again later.");
  //     }
  //   }
  // );

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleResultsChange = useCallback((results: any) => {
    setResults(results);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger>
          <SignupFormDemo />
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center gap-2">
                <SearchInput
                  onSearchChange={handleSearchChange}
                  onResultsChange={handleResultsChange}
                  onFormSubmit={searchTicker}
                />
              </div>
            </div>
          </ModalContent>
          {searchValue && (
            <ModalFooter className="gap-4" setOpen={setOpen}>
              <div className="text-white p-4 text-xl ml-1 w-full">
                <ul>
                  {results.map((stock, index) => (
                    <li
                      key={index}
                      className="hover:border-solid hover:border-2 hover:border-sky-500 hover:bg-sky-950 w-full"
                    >
                      <button
                        className="text-start hover:text-purple-600 hover:ps-1 w-full"
                        onClick={() => onTickerSearch(stock["symbol"])} // Call the function with the stock symbol
                      >
                        <strong>{stock["description"]}</strong> {stock["type"]}{" "}
                        {stock["symbol"]}{" "}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </ModalFooter>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
