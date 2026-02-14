import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/shadcn/Card";
import API_BASE_URL from "../../config/api";

interface ComparisonData {
  scrip: string;
  companyName: string;
  marketCap: string;
  currentPrice: string;
  pe: string;
  roe: string;
  roce: string;
  yoySalesGrowth: number | null;
  yoyProfitGrowth: number | null;
  epsGrowth: number | null;
  epsCurrent: number | null;
  epsPreviousYear: number | null;
  institutionalHolding: number | null;
  publicHolding: number | null;
  bookValue: string;
  dividendYield: string;
  cumulativePercentileScore: number | null;
  error?: string;
}

interface ComparisonTableProps {
  companies?: string[];
}

const ComparisonTable = ({ companies }: ComparisonTableProps) => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default companies from your Excel file
  const defaultCompanies = [
    "LAURUSLABS",
    "FEDERALBNK",
    "BELRISE",
    "CANHLIFE",
    "ASTERDM",
  ];

  const companiesToFetch = companies || defaultCompanies;

  useEffect(() => {
    const fetchComparisonData = async () => {
      setLoading(true);
      setError(null);

      try {
        const csrfToken =
          document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("csrftoken="))
            ?.split("=")[1] || "";

        const response = await axios.post(
          `${API_BASE_URL}/upstox/comparison`,
          {
            companies: companiesToFetch,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
          },
        );

        if (response.data && response.data.companies) {
          setComparisonData(response.data.companies);
        }
      } catch (err) {
        console.error("Error fetching comparison data:", err);
        setError("Failed to load comparison data");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return value.toFixed(2);
  };

  const getGrowthColor = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "text-gray-400";
    if (value > 20) return "text-green-500";
    if (value > 10) return "text-blue-500";
    if (value > 0) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreColor = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "text-gray-400";
    if (value > 3) return "text-green-400";
    if (value > 2) return "text-blue-400";
    if (value > 1) return "text-yellow-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <Card className="w-full p-6 bg-black">
        <div className="text-center text-xl">Loading comparison data...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full p-6 bg-black">
        <div className="text-center text-xl text-red-500">{error}</div>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6 bg-black shadow-lg">
      <h2 className="text-3xl font-bold mb-4 underline decoration-yellow-500">
        Stock Comparison
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-3 font-bold">Scrip</th>
              <th className="text-left p-3 font-bold">Company Name</th>
              <th className="text-right p-3 font-bold">Market Cap (Cr)</th>
              <th className="text-right p-3 font-bold">Price (₹)</th>
              <th className="text-right p-3 font-bold">P/E</th>
              <th className="text-right p-3 font-bold">ROE %</th>
              <th className="text-right p-3 font-bold">ROCE %</th>
              <th className="text-right p-3 font-bold">Sales Growth %</th>
              <th className="text-right p-3 font-bold">Profit Growth %</th>
              <th className="text-right p-3 font-bold">EPS Growth %</th>
              <th className="text-right p-3 font-bold">Inst. Holding %</th>
              <th className="text-right p-3 font-bold">Public Holding %</th>
              <th className="text-right p-3 font-bold text-yellow-300">Score</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((company, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
              >
                <td className="p-3 font-semibold text-blue-400">
                  {company.scrip}
                </td>
                <td className="p-3">{company.companyName}</td>
                <td className="p-3 text-right">{company.marketCap}</td>
                <td className="p-3 text-right">{company.currentPrice}</td>
                <td className="p-3 text-right">{company.pe}</td>
                <td className="p-3 text-right">{company.roe}</td>
                <td className="p-3 text-right">{company.roce}</td>
                <td
                  className={`p-3 text-right font-semibold ${getGrowthColor(company.yoySalesGrowth)}`}
                >
                  {formatNumber(company.yoySalesGrowth)}
                </td>
                <td
                  className={`p-3 text-right font-semibold ${getGrowthColor(company.yoyProfitGrowth)}`}
                >
                  {formatNumber(company.yoyProfitGrowth)}
                </td>
                <td
                  className={`p-3 text-right font-semibold ${getGrowthColor(company.epsGrowth)}`}
                >
                  {formatNumber(company.epsGrowth)}
                </td>
                <td className="p-3 text-right">
                  {formatNumber(company.institutionalHolding)}
                </td>
                <td className="p-3 text-right">
                  {formatNumber(company.publicHolding)}
                </td>
                <td
                  className={`p-3 text-right font-bold ${getScoreColor(company.cumulativePercentileScore)}`}
                >
                  {formatNumber(company.cumulativePercentileScore)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>
          Growth metrics are color-coded:{" "}
          <span className="text-green-500">Green (&gt;20%)</span>,{" "}
          <span className="text-blue-500">Blue (&gt;10%)</span>,{" "}
          <span className="text-yellow-500">Yellow (&gt;0%)</span>,{" "}
          <span className="text-red-500">Red (&lt;0%)</span>
        </p>
      </div>
    </Card>
  );
};

export default ComparisonTable;
