import React, { useState } from "react";
import axios from "axios";

const TickerSearch = () => {
  const [query, setQuery] = useState(""); // Input query
  const [results, setResults] = useState([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY; // Replace with your key

  const searchTicker = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: query,
          apikey: API_KEY,
        },
      });

      if (response.data.bestMatches) {
        setResults(response.data.bestMatches);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Failed to fetch data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // // keyboard event Trigger api call
  // useEffect(() => {
  //   const tickerSearch = async (query: string) => {
  //     try {
  //       const response = await axios.get(`https://www.alphavantage.co/query`, {
  //         params: {
  //           function: "SYMBOL_SEARCH",
  //           keywords: query,
  //           apikey: API_KEY,
  //         },
  //       });

  //       if (response.data.bestMatches) {
  //         setResults(response.data.bestMatches);
  //       } else {
  //         setResults([]);
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch data. Try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   tickerSearch(query);
  // }, [query, API_KEY]);

  return (
    <div>
      <h2>Stock Ticker Search</h2>
      <form onSubmit={searchTicker}>  
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={query}
          className="search-input border border-gray-300 rounded-md px-4 py-2 mb-4 text-black"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((stock, index) => (
          <li key={index}>
            <strong>{stock["1. symbol"]}</strong> - {stock["2. name"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TickerSearch;
