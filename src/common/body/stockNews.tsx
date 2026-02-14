import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/shadcn/Card";
import StockNews from "@/src/models/stock-news-model";
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

interface StocknewsProps {
  symbol: String;
}

const Stocknews = ({ symbol }: StocknewsProps) => {
  const [stockNews, setStockNews] = useState<StockNews[]>([]); // Initialize with an empty array

  useEffect(() => {
    const fetchStockNews = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/finnhub/stock-news`,
          { symbol: symbol },
          {
            method: "POST",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken":
                document.cookie
                  .split(";")
                  .find((cookie) => cookie.trim().startsWith("csrftoken="))
                  ?.split("=")[1] || "",
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch stock news");
        }
        setStockNews(response.data);
      } catch (error) {
        console.error("Error fetching stock news:", error);
      } finally {
        console.log("Stock news fetch completed");
      }
    };
    fetchStockNews();
  }, [symbol]);

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-4">Stock News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6"></div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2"></CardFooter>
          </Card>
          {Object.entries(stockNews).map(([key, news]) => (
            <div
              key={key}
              className="bg-dark shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{news.headline}</h2>
              <p className="text-slate-50 mb-2">
                <strong>Source:</strong> {news.source}
              </p>
              <p className="text-slate-200 mb-2">
                <strong>Date:</strong>{" "}
                {new Date(Number(news.datetime) * 1000).toLocaleDateString()}
              </p>
              <p className="text-slate-300">{news.summary}</p>
              {news.image && (
                <img
                  src={news.image}
                  alt={news.headline}
                  className="mt-4 w-full h-auto rounded"
                />
              )}
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stocknews;
