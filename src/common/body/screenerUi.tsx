import { useSelector } from "react-redux";
import { marketData } from "../../features/stockData";
import { Card } from "../../components/shadcn/Card";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import PerformanceSnapshot from "../charts/performanceSnapshot";
import useReturnMetrics from "../../hooks/return-metrics";
import Stocknews from "./stockNews";
const ScreenerUi = () => {
  const screenerData = useSelector(marketData);
  const { dividendPershare, cagr, estimatedPrices } = useReturnMetrics();

  return (
    <>
      <div className="w-full container px-4 py-3">
        <Card className="w-full h-full p-5 bg-black shadow-lg">
          <div>
            <h1 className="text-4xl underline font-bold decoration-yellow-500">
              {screenerData.companyName}
            </h1>
          </div>
          <div>
            <h2 className="text-2xl mt-5">{screenerData.about}</h2>
          </div>
          <div className="grid grid-cols-3 mt-5">
            <div className="col-span-2">
              <section className="key-metrics">
                <h3 className="text-3xl mt-5 mb-2 font-bold">Key Metrics : </h3>
                <span className="flex">
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    className="mr-2"
                  />
                  Key Metrics are derived from the company's financial data,
                  including balance sheet, income statement, and cash flow
                </span>
                <div className="grid grid-cols-3 gap-4 p-4 mt-5 shadow-md rounded-lg border">
                  <div className="text-lg flex justify-between">
                    <b>Market Cap :</b> &#8377; {screenerData.marketCap} Cr.
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>Current Price :</b> &#8377; {screenerData.currentPrice}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>High / Low :</b> {screenerData.highPrice} /{" "}
                    {screenerData.lowPrice}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>Stock P/E :</b> &#8377; {screenerData.pe}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>Book Value :</b> &#8377; {screenerData.bookValue}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>Dividend Yield :</b> &#8377; {screenerData.dividendYield}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>ROCE :</b> &#8377; {screenerData.roce}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>ROE :</b> &#8377; {screenerData.roe}
                  </div>
                  <div className="text-lg flex justify-between">
                    <b>Face Value :</b> &#8377; {screenerData.faceValue}
                  </div>
                </div>
              </section>

              <section className="return-metrics">
                <h3 className="text-3xl mt-5 mb-2 font-bold">
                  Return Metrics :{" "}
                </h3>
                <span className="flex">
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    className="mr-2"
                  />
                  Based on growth (CAGR), profitability, and dividends to
                  reflect return potential.
                </span>

                <div className="grid gap-4 p-4 shadow-md rounded-lg border mt-5">
                  <div className="text-lg">
                    <b>Dividend Per Share :</b> &#8377;{" "}
                    {Math.round(dividendPershare)}
                  </div>
                  <div className="grid grid-cols-4 text-lg">
                    <b className="w-auto col-span-1">Stock Growth Forecast :</b>
                    <div className="col-span-3 grid grid-cols-4">
                      {Object.entries(cagr).map(([period, value]) => (
                        <span key={period}>
                          {period}:{" "}
                          {value !== null ? `${value.toFixed(2)}%` : "N/A"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 text-lg">
                    <b className="w-auto col-span-1">Estimated Prices:</b>
                    <div className="col-span-3 grid grid-cols-4">
                      {Object.entries(estimatedPrices).map(
                        ([period, value]) => (
                          <span key={period}>
                            {period}:{" "}
                            {value !== null
                              ? new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                }).format(value)
                              : "N/A"}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* <section className="custom-calc">
                <h3 className="text-3xl mt-5 mb-2 font-bold">Calculate : </h3>
                <span className="flex">
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    className="mr-2"
                  />
                  Calculate your potential returns based on your investment
                </span>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <input
                      type="number"
                      value={investmentAmount}
                      placeholder="Investment Amount"
                      onChange={(e) =>
                        setInvestmentAmount(Number(e.target.value))
                      }
                      className="w-full text-white bg-black p-2 border rounded-lg mt-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <Icon path={mdiAlphaXCircleOutline} size={1} />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={investmentDuration}
                      onChange={(e) =>
                        setInvestmentDuration(Number(e.target.value))
                      }
                      placeholder="Investment Duration (Years)"
                      className="w-full text-white
                       bg-black p-2 border rounded-lg mt-2"
                    />
                  </div>
                </div>
              </section> */}

              <section className="stock-news">
                <div className="grid mt-5 gap-4 p-4 shadow-md rounded-lg border">
                  <Stocknews symbol={screenerData["companyCode"]} />
                </div>
              </section>
            </div>
            <div className="ml-5 col-span-1">
              <PerformanceSnapshot stockScore={screenerData.stockScore} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ScreenerUi;
