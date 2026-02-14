import { useEffect, useRef, useState } from "react";
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
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      setError("Please upload a CSV or XLSX file");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_BASE_URL}/upstox/comparison/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data && response.data.companies) {
        setComparisonData(response.data.companies);
      }
    } catch (err: any) {
      console.error("Error uploading CSV:", err);
      const detail = err?.response?.data?.detail;
      setError(detail || "Failed to process CSV file");
    } finally {
      setLoading(false);
      // Reset file input so the same file can be re-uploaded
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
        <div className="text-center text-xl">
          {uploadFileName
            ? `Processing ${uploadFileName}... This may take a while for large files.`
            : "Loading comparison data..."}
        </div>
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold underline decoration-yellow-500">
          Stock Comparison
        </h2>

        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={handleCsvUpload}
            className="hidden"
            id="csv-upload"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Upload CSV / XLSX
          </button>
          {uploadFileName && (
            <span className="text-sm text-gray-400">
              {uploadFileName} ({comparisonData.length} stocks)
            </span>
          )}
        </div>
      </div>

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

